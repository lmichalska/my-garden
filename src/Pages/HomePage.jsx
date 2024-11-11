// Lidia

import React, { useState, useEffect } from "react";
import "..//Pages/Pages.css";
import { Link } from 'react-router-dom';
import Acc from "./Acc";

const HomePage = () => {
  const [posts, setPosts] = useState([]); 
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/features?scf_format=standard&_embed"
      );
      const data = await response.json();
      setPosts(data);
      await fetchImages(data);
    }

    // Fetch images
    const fetchImages = async (features) => {
      const imagePromises = features.map(async (feature) => {
        if (feature.acf.image) {
          const imageUrl = await fetchImageUrl(feature.acf.image);
          return { id: feature.id, url: imageUrl };
        }
        return { id: feature.id, url: null };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, { id, url }) => {
        acc[id] = url; // Map post IDs to image URLs
        return acc;
      }, {});
      setImageUrls(imageMap);
    };

    const fetchImageUrl = async (imageId) => {
      const response = await fetch(
        `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/media/${imageId}`
      );
      const data = await response.json();
      return data.source_url; // Return the image URL
    };

    getData();
  }, []);

  // HOME PAGE CONTENT
  return (
    <main className="page-layout">
      {/* landing screen */}
      <div className="container">
        <div className="app-promo">
          <div className="background-image" aria-label="monstera picture"></div>
          <div className="promo-content">
            <h1>
              <span className="highlight">My</span>Garden
            </h1>
            <p>Your go-to app for plant care and garden success.</p>
            <a href="https://www.figma.com/proto/MakSeudQzQmVzMS7ArnvaH/Gardening-App-(WebApp)?page-id=114%3A8398&node-id=461-6619&node-type=frame&viewport=1411%2C-34%2C0.18&t=XL8ldni9K79ShwlW-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=461%3A6619&show-proto-sidebar=1">
              <button className="promo-button">Get MyGarden app</button>
            </a>
            <Link to="/acc" className="browser">Continue in the browser</Link>
          </div>
        </div>
      </div>

      {/* Main section */}
      <div className="landing-page">
        <header className="header">
          <h1 className='headline-all'>Welcome to MyGarden 🌿</h1>
          <p>Make your plant journey easy, fun, and rewarding!</p>
        </header>
        {posts
          .sort((a, b) => a.id - b.id)
          .map((feature) => (
            <section
              id="features"
              key={feature.id}
              className={feature.acf.reverse === "true" ? "feature2" : "feature"}
            >
              {imageUrls[feature.id] ? (
                <img
                  src={imageUrls[feature.id]} 
                  alt={feature.acf.title || "Default Title"}
                  className="feature-image"
                />              
              ) : (
                <div className="placeholder-image">Loading image...</div> 
              )}

              <div className="feature-text">
                <h2>{feature.acf.title || "Default Title"}</h2>
                <p>{feature.acf.desc || "No description available"}</p>
              </div>
            </section>
          ))}
      </div>

      {/* Last section to get them to download the app */}
      <section className="cta">
        <h2>🌱 Ready to Dig In? 🌿</h2>
        <p>Transform your garden into a thriving oasis with MyGarden!</p>
        <div className="cta-content">
          <p>Explore all the amazing features and grow with us!</p>
          <a href="https://www.figma.com/proto/MakSeudQzQmVzMS7ArnvaH/Gardening-App-(WebApp)?page-id=114%3A8398&node-id=461-6619&node-type=frame&viewport=1411%2C-34%2C0.18&t=XL8ldni9K79ShwlW-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=461%3A6619&show-proto-sidebar=1">
            <button className="promo-button">Get MyGarden App</button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
