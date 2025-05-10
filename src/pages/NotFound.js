import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="notfound-link">Go back home →</a>
    </div>
  );
};

export default NotFound;
