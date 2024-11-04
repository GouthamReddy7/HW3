import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Book Store
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>  {/* Link to Product List */}
          </li>
          <li>
            <Link to="/cart">Cart</Link>  {/* Link to Cart */}
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>  {/* Link to Wishlist */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
