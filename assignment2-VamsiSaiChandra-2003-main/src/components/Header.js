import React from 'react';

const SiteNavigation = () => {
  return (
    <nav className="main-nav">
      <div className="brand">
        <h1>ShopSmart</h1>
      </div>
      <div className="tagline">
        <p>Discover Deals, Shop with Ease</p>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default SiteNavigation;