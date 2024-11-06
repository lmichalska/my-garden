import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  // Show button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>MyGarden</h4>
          <p>Your app for everything plants! Track care schedules, diagnose plants, and connect with fellow gardeners.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MyGarden App. All rights reserved.</p>
      </div>

      {/* "Go to Top" button */}
      {showButton && (
        <button onClick={scrollToTop} className="go-to-top">
          ⬆ Go to Top
        </button>
      )}
    </footer>
  );
};

export default Footer;
