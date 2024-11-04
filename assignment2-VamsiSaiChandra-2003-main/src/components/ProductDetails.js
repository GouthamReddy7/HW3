import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css'; // Import a CSS file for styling

const ProductDetails = ({ products, addToCart, addToWishlist }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((prod) => prod.id === parseInt(id)); // Find the product by ID
  const navigate = useNavigate();

  if (!product) {
    return <h2>Product not found</h2>; // Handle case where product is not found
  }

  return (
    <div className="product-details-container">
      <img 
        src={process.env.PUBLIC_URL + '/' + product.image} 
        alt={product.name} 
        className="product-image" 
      />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <div>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
        </div>
        <button onClick={() => navigate(-1)}>Go Back</button> {/* Button to go back to the previous page */}
      </div>
    </div>
  );
};

export default ProductDetails;
