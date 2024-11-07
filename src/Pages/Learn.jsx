//Lidia

import React from "react";
import "..//Pages/HomePage.css";

const HomePage = () => {
    return (
    <main className="page-layout">
      <div className="container">
        <div className="app-promo">
          <div className="background-image"></div>
          <div className="promo-content">
            <h1>
              <span className="highlight">My</span>Garden
            </h1>
            <p>Your go-to app for plant care and garden success.</p>
            <button className="promo-button">Get MyGarden app</button>
          </div>
        </div>
      </div>

      <div className="landing-page">
        <header className="header">
          <h1>Welcome to MyGarden 🌿</h1>
          <p>Make your plant journey easy, fun, and rewarding!</p>
        </header>

        {features.map((feature, index) => (
          <section
            key={index}
            className={feature.reverse ? "feature2" : "feature"}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="feature-image"
            />
            <div className="feature-text">
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </section>
        ))}

        <section className="cta">
          <p>Ready to transform your gardening experience and explore all the amazing features?</p>
          <button className="cta-button">Get MyGarden App</button>
        </section>
      </div>
    </main>
  );
};

export default HomePage;