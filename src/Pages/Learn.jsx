import React, { useState, useEffect } from 'react';
import './Pages.css';

const Learn = () => {
  const [articles, setArticles] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // Track the active filter

  // Fetch articles data
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/articles?scf_format=standard&_embed"
      );
      const data = await response.json();
      setArticles(data);
    }
    getData();
  }, []);

  // Filter articles based on the search term and active filter
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.acf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.acf.desc && article.acf.desc.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'New' && article.acf.new) ||
      (article.acf.flair && article.acf.flair.toLowerCase() === activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // Update active filter when a filter button is clicked
  const handleFilterClick = (type) => {
    setActiveFilter(type);
  };

  return (
    <main className="landing-page">
      <section className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </section>
      <section className="intro-learn">
        <h1>Learn About Gardening 🌱</h1>
        <p>Explore articles from experts, tips, and insights to help your plants thrive!</p>
      </section>
      <div className="filter-buttons">
        {['All', 'New', 'Advice', 'Tips', 'Guides'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterClick(type)}
            className={`filter-button ${activeFilter === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>
      <section className="articles">
        <div className="article-list">
          {filteredArticles.map((article) => (
            <div className="article" key={article.id}>
              <div className="article-header">
                <h2 className="article-title">{article.acf.title}</h2>
                {article.acf.new && <span className="new-label">New</span>}
              </div>

              <p className="article-desc">{article.acf.desc}</p>
              <div className="article-author">
                <span>By: {article.acf.author}</span>
              </div>

              {article.acf.image && (
                <div className="article-image">
                  <img src={article.acf.image} alt="Article visual content" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Learn;
