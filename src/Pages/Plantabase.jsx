import React, { useEffect, useState } from 'react';
import "../Pages/Pages.css";

function Plantabase() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [filters, setFilters] = useState({
    location: 'All',
    edible: 'All',
    type: 'All',
    searchQuery: ''
  });

  useEffect(() => {
    fetch('https://mygarden-data.lmichalska.dk/wp-json/wp/v2/plants?scf_format=standard&_embed')
      .then(response => response.json())
      .then(data => {
        setPlants(data);
        setFilteredPlants(data);
      })
      .catch(error => console.error('Error fetching plant data:', error));
  }, []);

const applyFilters = () => {
    let filtered = plants;
    if (filters.searchQuery) {
      filtered = filtered.filter(plant =>
        plant.acf?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.location !== 'All' && (filters.edible === 'All' && filters.type === 'All')) {
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
      <h1 className='plantabase-name'>Read more about plants!</h1>

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
            <img
              src={plant._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'placeholder-image.jpg'}
              alt={plant.acf?.name}
              className="plant-image"
            />
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