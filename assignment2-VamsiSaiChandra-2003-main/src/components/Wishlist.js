import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch wishlist data from the backend when the component mounts
  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/wishlist');
        setWishlist(response.data); // Expecting the backend to return populated wishlist data
        console.log(wishlist)
      } catch (error) {
        console.error('Error fetching wishlist data:', error);
      }
    };

    fetchWishlistData();
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.delete(`http://localhost:9000/api/wishlist/${itemId}`);
      setWishlist((currentWishlist) => currentWishlist.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const moveToCart = async (item) => {
    try {
      // Move item from wishlist to cart in the backend
      await axios.post(`http://localhost:9000/api/wishlist/move-to-cart`, { itemId: item._id });

      // Update the wishlist in the frontend
      setWishlist((currentWishlist) => currentWishlist.filter((i) => i._id !== item._id));

      // Update the cart in the frontend
      setCart((currentCart) => [...currentCart, item]);
    } catch (error) {
      console.error('Error moving item to cart:', error);
    }
  };

  return (
    <div className="container">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item._id} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h2>{item.product.name}</h2>
              <img src={`${process.env.PUBLIC_URL}/${item.product.image}`} alt={item.product.name} style={{ width: '100px', height: 'auto' }} />
              <p>Price: ${item.product.price.toFixed(2)}</p>
              <button onClick={() => removeFromWishlist(item._id)}>Remove</button>
              <button onClick={() => moveToCart(item)}>Move to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
