import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  
import ProductList from './components/ProductList'; 
import Cart from './components/Cart'; 
import Wishlist from './components/Wishlist'; 

function App() {
 
 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              
            />} 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              
            />} 
        />
        <Route 
          path="/wishlist" 
          element={
            <Wishlist 
              
            />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
