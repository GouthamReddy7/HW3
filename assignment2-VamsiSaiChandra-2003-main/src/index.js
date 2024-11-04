import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component
import './index.css'; // Import the CSS styles for global styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root element in the HTML
root.render(
  <React.StrictMode>
    <App /> // Render the App component
  </React.StrictMode>
);
