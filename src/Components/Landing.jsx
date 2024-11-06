//Filip


//Landing screen
import React from 'react';
import "../index.css";
import './landing.css'

const Landing = () => {
  return (
    <div className='container'>
    <div className="app-promo">
      <div className="background-image"></div>
      <div className="promo-content">
        <h1><span className="highlight">My</span>Garden</h1>
        <p>Your go-to app for plant care and garden success.</p>
        <button className="promo-button">Get MyGarden app</button>
      </div>
    </div></div>
  );
};

export default Landing;
