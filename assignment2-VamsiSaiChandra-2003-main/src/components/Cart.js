import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch cart data from the backend
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    // Fetch wishlist data from the backend
    const fetchWishlistData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/wishlist');
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist data:', error);
      }
    };

    fetchCartData();
    fetchWishlistData();
  }, []);

  // Move item from cart to wishlist
  const moveToWishlist = async (productId) => {
    try {
      const item = cart.find(item => item.product._id === productId);
      if (!item) return;
  
      // Assume sessionToken is available in your component
      const sessionToken = 'your-session-token'; // Replace with actual sessionToken
  
      // Add item to wishlist in the backend
      await axios.post('http://localhost:9000/api/wishlist', { productId, sessionToken });
  
      // Remove item from cart in the backend
      await axios.delete(`http://localhost:9000/api/cart/${item._id}`);
  
      // Update frontend state
      setWishlist(currentWishlist => [...currentWishlist, item]);
      setCart(currentCart => currentCart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error moving item to wishlist:', error);
    }
  };
  

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:9000/api/cart/${itemId}`);
      setCart(currentCart => currentCart.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Update quantity of item in cart
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.patch(`http://localhost:9000/api/cart/${itemId}`, { quantity: newQuantity });
      setCart(currentCart => currentCart.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item._id} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h2>{item.product.name}</h2>
              <img src={`${process.env.PUBLIC_URL}/${item.product.image}`} alt={item.product.name} style={{ width: '100px', height: 'auto' }} />
              <p>Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
              <div>
                <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))} disabled={item.quantity <= 1}>-</button>
                <span> Quantity: {item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
              <button onClick={() => moveToWishlist(item.product._id)}>Move to Wishlist</button>
            </li>
          ))}
        </ul>
      )}
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
