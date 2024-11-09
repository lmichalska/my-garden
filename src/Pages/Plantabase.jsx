import React, { useEffect, useState } from 'react';
import "../Pages/Pages.css";

function Plantabase() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [filters, setFilters] = useState({
    location: 'All',  // Keep All as default for location
    edible: 'All',    // Keep All as default for edible (now "Edible")
    type: 'All',      // Keep All as default for type
    searchQuery: ''   // Search query state
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

  // Combined filter function that takes into account search query and all filters
  const applyFilters = () => {
    let filtered = plants;

    // Apply search filter if search query is present
    if (filters.searchQuery) {
      filtered = filtered.filter(plant =>
        plant.acf?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply location filter if selected
    if (filters.location !== 'All' && (filters.edible === 'All' && filters.type === 'All')) {
      filtered = filtered.filter(plant => plant.acf?.place === filters.location.toLowerCase());
    }

    // Apply edible filter if selected
    if (filters.edible !== 'All') {
      filtered = filtered.filter(plant => plant.acf?.edible === 'edible');
    }

    // Apply type filter if selected
    if (filters.type !== 'All') {
      filtered = filtered.filter(plant => plant.acf?.type === filters.type.toLowerCase());
    }

    setFilteredPlants(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, plants]); // Reapply filters when filters or plants change

  // Filter button click handlers
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, searchQuery: '' }; // Reset search query on filter change
      newFilters[filterType] = value;

      // Reset other filters to 'All' to ensure only one filter is active at a time
      if (filterType !== 'location') newFilters.location = 'All';  // Reset location if not the selected filter
      if (filterType !== 'edible') newFilters.edible = 'All';      // Reset edible if not the selected filter
      if (filterType !== 'type') newFilters.type = 'All';          // Reset type if not the selected filter

      return newFilters;
    });
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      searchQuery: searchQuery // Update searchQuery without affecting other filters
    }));
  };

  return (
    <div className="landing-page">
      <h1>Read more about plants!</h1>

      <input
        type="text"
        placeholder="Search for a plant"
        value={filters.searchQuery}  // Bind search input to searchQuery state
        onChange={handleSearchChange} // Update searchQuery state on change
      />

      {/* Combined Filter Buttons Row */}
      <div className="filter-buttons">
        {/* Location Filters */}
        {['All', 'Indoor', 'Outdoor'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange('location', type)}
            className={`filter-button ${filters.location === type && filters.edible === 'All' && filters.type === 'All' ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}

        {/* Edible Filter */}
        {['Edible'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange('edible', type)}
            className={`filter-button ${filters.edible === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}

        {/* Type Filter */}
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