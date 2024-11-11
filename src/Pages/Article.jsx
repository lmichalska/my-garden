// Lidia

// Article page
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Pages.css';

const Article = () => {
  const { articleId } = useParams(); // Get the articleId from the URL
  const [article, setArticle] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the article based on ID
    const fetchArticle = async () => {
      const response = await fetch(
        `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/articles/${articleId}?_embed`
      );
      const data = await response.json();
      setArticle(data);
      fetchImageUrl(data.acf.image); // Fetch image
    };

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

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className="landing-page">
      <section className="article-header">
        {imageUrl && <img src={imageUrl} alt={article.acf.title} className="article-image2" />}
        <h1>{article.acf.title}{article.acf.new && <span className="new-label">New</span>}</h1>
        <span>By: {article.acf.author}</span>
      </section>

      <section className="article-content">
      <p>{article.acf.desc}</p>
      <p>{article.acf.content}</p>
      <h3 className="article-subtitle">{article.acf.subtitle}</h3>
      <p>{article.acf.more}</p>
      <p>{article.acf.some}</p>
      <p>{article.acf.text}</p>
      <p>{article.acf.end}</p>
      <p>{article.acf.conclusion}</p>
      </section>
    </main>
  );
};

export default Article;
