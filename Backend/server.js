const mongoose = require('mongoose');
const database = mongoose.connection
const uri = 'mongodb+srv://user1:SDEYkyA80iWiW0pa@ecommerce-cluster.qndyp.mongodb.net/Ecommerce';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB error:', err);
});
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const axios = require('axios');

// mongoose.connect(mongostring)
app.listen(9000,() =>{
    
    console.log(`server started and is using some functionality`)
});

app.use(express.json());
app.use(cors());

const Product = require('./models/Product'); // Mongoose model for products
const CartItem = require('./models/CartItem');
const Wishlist = require('./models/Wishlist');

app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find({});
      console.log(products)
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Add item to cart
  app.post('/api/cart', async (req, res) => {
    const { productId } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).send({ message: 'Product not found' });
  
      let cartItem = await CartItem.findOne({ product: productId });
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        cartItem = new CartItem({ product: productId, quantity: 1, price: product.price });
        await cartItem.save();
      }
  
      res.status(201).send(cartItem);
    } catch (error) {
      res.status(500).send({ message: 'Error adding item to cart', error });
    }
  });
  


// Endpoint to get all cart items with populated product details
app.get('/api/cart', async (req, res) => {
    try {
      const cartItems = await CartItem.find().populate('product'); // Populate product details
      res.json(cartItems);
    } catch (error) {
      res.status(500).send('Error fetching cart items');
    }
  });
  
  // Endpoint to move an item from the cart to the wishlist
  app.post('/api/wishlist', async (req, res) => {
    const { productId, sessionToken } = req.body;
  
    try {
      // Verify required data
      if (!productId || !sessionToken) {
        return res.status(400).json({ message: 'Product ID and session token are required' });
      }
  
      // Find the item in the cart to get details
      const cartItem = await CartItem.findOne({ product: productId }).populate('product');
      if (!cartItem) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      // Create a new wishlist item with the session token
      const newWishlistItem = new Wishlist({
        product: cartItem.product._id,
        sessionToken: sessionToken
      });
  
      // Save the item to the wishlist
      await newWishlistItem.save();
  
      res.json({ message: 'Item added to wishlist', item: newWishlistItem });
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      res.status(500).json({ message: 'Error adding item to wishlist', error });
    }
  });
  
  
  // Endpoint to remove an item from the cart
  app.delete('/api/cart/:id', async (req, res) => {
    try {
      const cartItem = await CartItem.findByIdAndDelete(req.params.id);
      if (!cartItem) return res.status(404).send({ message: 'Item not found in cart' });
  
      res.send({ message: 'Item removed from cart', cartItem });
    } catch (error) {
      res.status(500).send({ message: 'Error removing item from cart', error });
    }
  });
  
  // Endpoint to update the quantity of an item in the cart
  app.patch('/api/cart/:id', async (req, res) => {
    const { quantity } = req.body;
  
    try {
      const cartItem = await CartItem.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
      if (!cartItem) return res.status(404).send({ message: 'Item not found in cart' });
  
      res.json(cartItem);
    } catch (error) {
      res.status(500).send({ message: 'Error updating cart item quantity', error });
    }
  });+


  

  app.get('/api/wishlist', async (req, res) => {
    try {
      const { sessionToken } = req.query; // Assuming sessionToken is passed in the query string
  
      // Find all wishlist items for this session and populate product details
      const wishlistItems = await Wishlist.find().populate('product');
      res.json(wishlistItems);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      res.status(500).json({ message: 'Error fetching wishlist items', error });
    }
  });
  





// DELETE /api/wishlist/:id
app.delete('/api/wishlist/:id', async (req, res) => {
    try {
      const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
      if (!wishlistItem) {
        return res.status(404).json({ message: 'Item not found in wishlist' });
      }
      res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      res.status(500).json({ message: 'Error removing item from wishlist', error });
    }
  });
  

  app.post('/api/wishlist/move-to-cart', async (req, res) => {
    const { itemId } = req.body;
  
    try {
      // Find the item in the wishlist
      const wishlistItem = await Wishlist.findById(itemId).populate('product');
      if (!wishlistItem) {
        return res.status(404).json({ message: 'Item not found in wishlist' });
      }
  
      // Create a new cart item with the product information from the wishlist
      const cartItem = new CartItem({
        product: wishlistItem.product._id,
        quantity: 1, // Default quantity, adjust as needed
        price: wishlistItem.product.price
      });
      await cartItem.save();
  
      // Remove the item from the wishlist
      await Wishlist.findByIdAndDelete(itemId);
  
      res.json({ message: 'Item moved to cart', cartItem });
    } catch (error) {
      console.error('Error moving item to cart:', error);
      res.status(500).json({ message: 'Error moving item to cart', error });
    }
  });
  





database.on(`error`, (error)=>console.log(error))

database.once(`connected`, ()=>console.log('Database connected'))