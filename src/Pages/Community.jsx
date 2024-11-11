// Lidia

import React, { useState, useEffect } from 'react';
import './Pages.css';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  // Store the new post info
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    image: '',
    flair: '',
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('descending');
// Hide new post form
  const [isFormVisible, setIsFormVisible] = useState(false); 

  useEffect(() => {
    async function getData() {
      let allPosts = [];
      let page = 1;
      let totalPages = 1; 

      // Fetch all posts, with pagination
      //Filip
      while (page <= totalPages) {
        const response = await fetch(
          `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/community?scf_format=standard&_embed&page=${page}`
        );
        const data = await response.json();
        allPosts = [...allPosts, ...data];

        const totalPagesFromResponse = response.headers.get('X-WP-TotalPages');
        totalPages = totalPagesFromResponse ? parseInt(totalPagesFromResponse) : 1;
        page++;
      }

      setPosts(allPosts);
      setFilteredPosts(allPosts);
      await fetchImages(allPosts); 
    }

    // Fetch images (profile picture and post image)
    const fetchImages = async (posts) => {
      const imagePromises = posts.map(async (post) => {
        let pfpUrl = 'https://secure.gravatar.com/avatar/74761bb7e11b9485551c53c4c0281f3c?s=128&d=mm&r=g'; 
        let postImageUrl = ''; 
        if (post.acf?.pfp) {
          pfpUrl = await fetchImageUrl(post.acf.pfp);
        }

        if (post.acf?.image) {
          postImageUrl = await fetchImageUrl(post.acf.image);
        }

        return { id: post.id, pfpUrl, postImageUrl };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, { id, pfpUrl, postImageUrl }) => {
        acc[id] = { pfpUrl, postImageUrl };
        return acc;
      }, {});
      setImageUrls(imageMap);
    };

    // Helper function to fetch image URL from ID
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

  // Filter and sort posts
  useEffect(() => {
    const filtered = activeFilter === 'All'
      ? posts
      : posts.filter(post => post.acf?.flair?.toLowerCase() === activeFilter.toLowerCase());

    const sorted = sortPosts(filtered);
    setFilteredPosts(sorted);
  }, [activeFilter, sortOrder, posts]);

  // Sort posts by date
  const sortPosts = (postsToSort) => {
    return [...postsToSort].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
    });
  };

  // New post
  const handleAddPost = () => {
    if (newPost.text.trim()) {
      const newPostData = {
        id: posts.length + 1,
        acf: {
          user_name: 'Elowen Ravenscroft',
          level:'Level 2',
          pfp: 'https://via.placeholder.com/150',
          title: newPost.title,
          content: newPost.text,
          image: newPost.image,
          flair: newPost.flair,
        },
        date: new Date().toISOString(),
      };
      setPosts([newPostData, ...posts]);
      setNewPost({ title: '', text: '', image: '', flair: '' });
      setIsFormVisible(false); // Hide form after submitting
    }
  };

  return (
    <main className="landing-page">
      <section className="intro">
        <h1 className='headline-all'>Welcome to the Community 🌻</h1>
        <p>Connect with fellow plant enthusiasts, share tips, and watch your garden grow!</p>
      </section>

      {/* Hide new post form, change display from row to column when visible */}
      <section className={`horizontal ${isFormVisible ? 'form-visible' : ''}`}>
        <section className="new-post-section">
          <button className="postnew" onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Cancel' : 'New Post'}
          </button>
          {isFormVisible && (
            <section className="post-form">
              <h2>Share your thoughts</h2>
              <label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Post Title"
                />
              </label>
              <label>
                <textarea
                  value={newPost.text}
                  onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
                  placeholder="What’s happening in your garden?"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  placeholder="Image URL"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={newPost.flair}
                  onChange={(e) => setNewPost({ ...newPost, flair: e.target.value })}
                  placeholder="Flair (e.g., Advice, Discussion)"
                />
              </label>
              <button onClick={handleAddPost}>Post</button>
            </section>
          )}
        </section>

        {/* Sorting*/}
        <section className="filter-sort">
          <label htmlFor="order">Sort by</label>
          <select
            id="order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="descending">Newest to Oldest</option>
            <option value="ascending">Oldest to Newest</option>
          </select>
        </section>
      </section>

      {/* Filter categories */}
      <section className="posts">
        <div className="filter-buttons">
          {['All', 'Advice', 'Discussion', 'Achievement', 'Question'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`filter-button ${activeFilter === type ? 'active' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Posts section */}
        <div className="post-list">
          {filteredPosts.map((post) => (
            <div className="community-post" key={post.id}>
              <div className="post-header">
                <div className='smalldiv'>
                  <img
                    src={imageUrls[post.id]?.pfpUrl || "https://secure.gravatar.com/avatar/74761bb7e11b9485551c53c4c0281f3c?s=128&d=mm&r=g"}
                    alt={`${post.acf.user_name}'s profile`}
                    className="profile-picture"
                  />
                  <div className="post-user-info">
                    <h3>{post.acf.user_name}</h3>
                    <span className="user-level">{post.acf.level}</span>
                  </div>
                </div>
                <span className="post-time">{new Date(post.date).toLocaleString()}</span>
              </div>
              {post.acf.title && <h2 className="post-title">{post.acf.title}</h2>}
              {post.acf.flair && <span className="post-flair">{post.acf.flair}</span>}
              <p className="post-content">{post.acf.content}</p>
              {imageUrls[post.id]?.postImageUrl && (
                <div className="post-image">
                  <img src={imageUrls[post.id].postImageUrl} alt="Post visual content" />
                </div>
              )}
              <div className="post-actions">
                <button className="like-button">👍 Like</button>
                <button className="dislike-button">👎 Dislike</button>
                <button className="comments-button">💬 Comments</button>
                <button className="share-button">↗️ Share</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Community;
