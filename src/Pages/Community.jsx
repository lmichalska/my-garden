import React, { useState, useEffect } from 'react';
import './Pages.css';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    image: '',
    flair: '',
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch community posts data
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/community?scf_format=standard&_embed"
      );
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data); // Initialize with all posts
      await fetchImages(data); // Fetch images for each post
    }

    // Fetch image URLs for profile pictures and post images
    const fetchImages = async (posts) => {
      const imagePromises = posts.map(async (post) => {
        let pfpUrl = 'https://secure.gravatar.com/avatar/74761bb7e11b9485551c53c4c0281f3c?s=128&d=mm&r=g'; // Default placeholder
        let postImageUrl = ''; // Leave empty if no post image

        // Fetch profile picture if it has an ID
        if (post.acf?.pfp) {
          pfpUrl = await fetchImageUrl(post.acf.pfp);
        }

        // Fetch post image if it has an ID
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

    const fetchImageUrl = async (imageId) => {
      try {
        const response = await fetch(
          `https://mygarden-data.lmichalska.dk/wp-json/wp/v2/media/${imageId}`
        );
        const data = await response.json();
        return data.source_url || '/pip-placeholder.png';
      } catch (error) {
        console.error("Error fetching image URL for ID", imageId, error);
        return '/pip-placeholder.png';
      }
    };

    getData();
  }, []);

  // Filter and sort posts whenever filter or sorting criteria change
  useEffect(() => {
    const filtered = activeFilter === 'All'
      ? posts
      : posts.filter(post => post.acf?.flair?.toLowerCase() === activeFilter.toLowerCase());

    const sorted = sortPosts(filtered);
    setFilteredPosts(sorted);
  }, [activeFilter, sortBy, posts]);

  const sortPosts = (postsToSort) => {
    return [...postsToSort].sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'level') return b.acf.level - a.acf.level;
      return 0;
    });
  };

  const handleAddPost = () => {
    if (newPost.text.trim()) {
      const newPostData = {
        id: posts.length + 1,
        acf: {
          user_name: 'You',
          level: 1,
          pfp: '/path/to/your-profile.jpg',
          title: newPost.title,
          content: newPost.text,
          image: newPost.image,
          flair: newPost.flair,
        },
        comments: 0,
        date: new Date().toISOString(),
      };
      setPosts([newPostData, ...posts]);
      setNewPost({ title: '', text: '', image: '', flair: '' });
      setIsFormVisible(false);
    }
  };

  return (
    <main className="landing-page">
      <section className="intro">
        <h1>Welcome to the Community 🌻</h1>
        <p>Connect with fellow plant enthusiasts, share tips, and watch your garden grow!</p>
      </section>

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
        
        <section className="filter-sort">
          <label htmlFor="sort">Sort</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="level">User Level</option>
          </select>
        </section>
      </section>

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
