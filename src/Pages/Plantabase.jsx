import React, { useEffect, useState } from 'react';
import "../Pages/Pages.css";

function Plantabase() {
  const [plants, setPlants] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [filters, setFilters] = useState({
    location: 'All',
    edible: 'All',
    type: 'All',
    searchQuery: ''
  });

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        'https://mygarden-data.lmichalska.dk/wp-json/wp/v2/plants?scf_format=standard&_embed'
      );
      const data = await response.json();
      setPlants(data);
      setFilteredPlants(data);
      await fetchImages(data);
    }

    const fetchImages = async (plants) => {
      const imagePromises = plants.map(async (plant) => {
        let imageUrl = null;

        if (plant.acf.image) {
          console.log(`Fetching image for plant ID ${plant.id}`);
          imageUrl = await fetchImageUrl(plant.acf.image);
        }

        return { id: plant.id, url: imageUrl };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, { id, url }) => {
        acc[id] = url;
        return acc;
      }, {});
      setImageUrls(imageMap);
    };

    const fetchImageUrl = async (imageId) => {
      try {
        const response = await fetch(
          `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/media/${imageId}`
        );
        const data = await response.json();
        return data.source_url || null;
      } catch (error) {
        console.error("Error fetching image URL for ID", imageId, error);
        return null;
      }
    };

    getData();
  }, []);

  const applyFilters = () => {
    let filtered = plants;
    if (filters.searchQuery) {
      filtered = filtered.filter(plant =>
        plant.acf?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.location !== 'All') {
      filtered = filtered.filter(plant => plant.acf?.place === filters.location.toLowerCase());
    }

    if (filters.edible !== 'All') {
      filtered = filtered.filter(plant => plant.acf?.edible === 'edible');
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(plant => plant.acf?.type === filters.type.toLowerCase());
    }

    setFilteredPlants(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, plants]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, searchQuery: '' };
      newFilters[filterType] = value;

      if (filterType !== 'location') newFilters.location = 'All';  
      if (filterType !== 'edible') newFilters.edible = 'All';
      if (filterType !== 'type') newFilters.type = 'All';
      return newFilters;
    });
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      searchQuery: searchQuery 
    }));
  };

  return (
    <div className="landing-page">
      <h1 className='headline-all'>Read more about plants!</h1>

      <input
        className='plantabase-input'
        type="text"
        placeholder="Search for a plant"
        value={filters.searchQuery}
        onChange={handleSearchChange} 
      />

      <div className="filter-buttons">
        {['All', 'Indoor', 'Outdoor'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange('location', type)}
            className={`filter-button ${filters.location === type && filters.edible === 'All' && filters.type === 'All' ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
        {['Edible'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange('edible', type)}
            className={`filter-button ${filters.edible === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
        {['Succulents', 'Flowers', 'Herbs'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange('type', type)}
            className={`filter-button ${filters.type === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="plant-cards">
        {filteredPlants.map((plant) => (
          <div className="plant-card" key={plant.id}>
            {imageUrls[plant.id] ? (
              <img
                src={imageUrls[plant.id]} 
                alt={plant.acf?.name || "Plant Image"}
                className="plant-image"
              />
            ) : (
              <div className="placeholder-image">Loading image...</div> 
            )}
            <div className="plant-info">
              <h2>{plant.acf?.name}</h2>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plantabase;
