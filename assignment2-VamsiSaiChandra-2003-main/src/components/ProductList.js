import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // if you need to implement search, manage this state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products); // Correct place to log products to see updated state
  }, [products]); // Listen for changes to 'products'

  // Implement filtering logic
  const filteredProducts = searchTerm
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  // Function to add product to cart
  const addToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:9000/api/cart', {
        productId: product._id
      });
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="container">
      <h1>Available Books</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ margin: '20px 0', padding: '10px' }}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <li key={product._id} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <img 
                src={`${process.env.PUBLIC_URL}/${product.image}`} 
                alt={product.name} 
                style={{ width: '200px', height: 'auto' }} 
              />
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductList;
