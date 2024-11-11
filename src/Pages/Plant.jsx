// Lidia

// Plant page
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Pages.css';

const Plant = () => {
  const { plantId } = useParams(); // Get the plantId from the URL
  const [plant, setPlant] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the plant based on ID
    const fetchPlant = async () => {
      const response = await fetch(
        `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/plants/${plantId}?_embed`
      );
      const data = await response.json();
      setPlant(data);
      fetchImageUrl(data.acf.image); // Fetch image
    };
    const navigate = useNavigate();  

    const fetchImageUrl = async (imageId) => {
      if (imageId && typeof imageId === 'number') {
        try {
          const response = await fetch(
            `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/media/${imageId}`
          );
          const data = await response.json();
          setImageUrl(data.source_url || 'https://freerangestock.com/sample/118476/camera-vector-icon.jpg');
        } catch (error) {
          console.error("Error fetching image URL", error);
          setImageUrl('https://freerangestock.com/sample/118476/camera-vector-icon.jpg');
        }
      }
    };

    fetchPlant();
  }, [plantId]);

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <main className="landing-page">
      <section className="plant-header">
      <button className='back' onClick={() => navigate(-1)}>Go back</button>
        {imageUrl && <img src={imageUrl} alt={plant.acf.name} className="plant-image" />}
        <h1>{plant.acf.name}</h1>
      </section>

      <section className="plant-content">
      <p className="scientific-name">{plant.acf?.other}</p>
              <div className="tags">
                {plant.acf?.difficulty && (
                  <span className={`tag ${plant.acf.difficulty.toLowerCase()}`}>
                    {plant.acf.difficulty.charAt(0).toUpperCase() + plant.acf.difficulty.slice(1)}
                  </span>
                )}
                {plant.acf?.edible === 'edible' && (
                  <span className="tag edible">Edible</span>
                )}
                {plant.acf?.place && (
                  <span className="tag">{plant.acf.place.charAt(0).toUpperCase() + plant.acf.place.slice(1)}</span>
                )}
              </div>
              <p>Fun fact: {plant.acf.fun}</p>
              <p>{plant.acf.desc}</p>
              <p>{plant.acf.watering}</p>
              <p>{plant.acf.sun}</p>
              <p>{plant.acf.care}</p>
              <p>{plant.acf.tips}</p>
      </section>
    </main>
  );
};

export default Plant;
