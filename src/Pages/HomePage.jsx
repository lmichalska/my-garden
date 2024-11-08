import React, { useState, useEffect } from "react";
import "..//Pages/Pages.css";

const HomePage = () => {
  // features
  const [posts, setPosts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  // Fetch data and images
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/features?scf_format=standard&_embed"
      );
      const data = await response.json();
      setPosts(data);
      await fetchImages(data);
    }

    // Fetch images based on the media ID
    const fetchImages = async (features) => {
      const imagePromises = features.map(async (feature) => {
        if (feature.acf.image) {
          const imageUrl = await fetchImageUrl(feature.acf.image);
          return { id: feature.id, url: imageUrl };
        }
        return { id: feature.id, url: null }; // In case no image is available
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, { id, url }) => {
        acc[id] = url;
        return acc;
      }, {});
      setImageUrls(imageMap);
    };

    // Fetch the actual image URL from the media endpoint
    const fetchImageUrl = async (imageId) => {
      const response = await fetch(
        `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/media/${imageId}`
      );
      const data = await response.json();
      return data.source_url; // This is the image URL
    };

    getData();
  }, []);

  // Render the page
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
            <a href="https://www.figma.com/proto/MakSeudQzQmVzMS7ArnvaH/Gardening-App-(WebApp)?page-id=114%3A8398&node-id=461-6619&node-type=frame&viewport=1411%2C-34%2C0.18&t=XL8ldni9K79ShwlW-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=461%3A6619&show-proto-sidebar=1">
              <button className="promo-button">Get MyGarden app</button>
            </a>
          </div>
        </div>
      </div>

      <div className="landing-page">
        <header className="header">
          <h1>Welcome to MyGarden 🌿</h1>
          <p>Make your plant journey easy, fun, and rewarding!</p>
        </header>

        {/* Display the features */}
        {posts.map((feature) => (
          <section
            key={feature.id}
            className={feature.acf.reverse === "true" ? "feature2" : "feature"}
          >
            {imageUrls[feature.id] ? (
              <img
                src={imageUrls[feature.id]} // Display the image URL dynamically
                alt={feature.acf.title || "Default Title"}
                className="feature-image"
              />
            ) : (
              <div className="placeholder-image">Loading image...</div> // Fallback placeholder
            )}
            <div className="feature-text">
              <h2>{feature.acf.title || "Default Title"}</h2>
              <p>{feature.acf.desc || "No description available"}</p>
            </div>
          </section>
        ))}
      </div>

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
