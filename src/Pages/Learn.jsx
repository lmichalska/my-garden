import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Pages.css';

const Learn = () => {
  // Articles data, search term, active filter, and image URLs
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    async function getData() {
      let allArticles = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
        const response = await fetch(
            // Bianka & Lidia
          "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/articles?scf_format=standard&_embed&page=" + page
        );
        const data = await response.json();
        allArticles = [...allArticles, ...data];
        const totalPagesFromResponse = response.headers.get('X-WP-TotalPages');
        totalPages = totalPagesFromResponse ? parseInt(totalPagesFromResponse) : 1;
        page++;
      }

      setArticles(allArticles);
      fetchImages(allArticles);
    }

    // Fetch image URLs for each article
    const fetchImages = async (articles) => {
      const imagePromises = articles.map(async (article) => {
        let imageUrl = '';

        if (article.acf?.image && typeof article.acf.image === 'number') {
          imageUrl = await fetchImageUrl(article.acf.image);
        } else if (article.acf?.image) {
          imageUrl = article.acf.image;
        }

        return { id: article.id, url: imageUrl };
      });

      const images = await Promise.all(imagePromises); // Wait for all images
      const imageMap = images.reduce((acc, { id, url }) => {
        acc[id] = url;
        return acc;
      }, {});
      setImageUrls(imageMap);
    };

    // Fetch images
    const fetchImageUrl = async (imageId) => {
      try {
        const response = await fetch(
          `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/media/${imageId}`
        );
        const data = await response.json();
        return data.source_url || 'https://freerangestock.com/sample/118476/camera-vector-icon.jpg';
      } catch (error) {
        console.error("Error fetching image URL for ID", imageId, error);
        return 'https://freerangestock.com/sample/118476/camera-vector-icon.jpg';
      }
    };

    getData();
  }, []);

  // Filter articles based on search and active filter
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      (article.acf.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (article.acf.desc && article.acf.desc.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'New' && article.acf.new) ||
      (article.acf.flair && article.acf.flair.toLowerCase() === activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const handleFilterClick = (type) => {
    setActiveFilter(type); // Update active filter
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
        <h1 className='headline-all'>Learn About Gardening 🌱</h1>
        <p>Explore articles from experts, tips, and insights to help your plants thrive!</p>
      </section>

      {/* Filter buttons */}
      <div className="filter-buttons">
        {['All', 'New', 'Advice', 'Tips', 'Guides'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterClick(type)} 
            className={`filter-button ${activeFilter === type ? 'active' : ''}`} // Highlight active filter
          >
            {type}
          </button>
        ))}
      </div>

      {/* ARTICLES */}
      <section className="articles">
        <div className="article-list">
          {filteredArticles.map((article) => (
            <div className="article" key={article.id}>
              {imageUrls[article.id] && (
                <div className="article-image">
                  <img src={imageUrls[article.id]} alt="Article visual content" />
                </div>
              )}
              <div className="article-header">
                <h2 className="article-title">
                  <Link to={`/article/${article.id}`}>{article.acf.title}</Link>
                </h2>
                {article.acf.new && <span className="new-label">New</span>}
              </div>
              <p className="article-desc">{article.acf.desc}</p>
              <div className="article-author">
                <span>By: {article.acf.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Learn;
