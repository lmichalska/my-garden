// Lidia
import React, { useState, useEffect } from 'react';
import './Pages.css';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    image: '',
    flair: '',
  });

  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isFormVisible, setIsFormVisible] = useState(false); 

  // Filip - community database
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/community?scf_format=standard&_embed"
      );
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data); 
    }
    getData();
  }, []);

  // Filter posts 
  const filterPosts = () => {
    if (!filter) return posts;
    return posts.filter((post) => post.acf.flair && post.acf.flair.includes(filter));
  };

  // Sort posts
  const sortPosts = (filteredPosts) => {
    return [...filteredPosts].sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'level') return b.acf.level - a.acf.level;
      return 0;
    });
  };

  useEffect(() => {
    const filtered = filterPosts();
    const sorted = sortPosts(filtered);
    setFilteredPosts(sorted);
  }, [filter, sortBy, posts]);

  // New post
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


  // COMMUNITY PAGE
  return (
    <main className="landing-page">
      <section className="intro">
        <h1>Welcome to the Community 🌻</h1>
        <p>Connect with fellow plant enthusiasts, share tips, and watch your garden grow!</p>
      </section>
      <section className={`horizontal ${isFormVisible ? 'form-visible' : ''}`}>
  <section className="new-post-section">
    <button className="postnew" onClick={() => setIsFormVisible(!isFormVisible)}>
      {isFormVisible ? 'Cancel' : 'Create New Post'}
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
    <label htmlFor="filter">Filter</label>
    <select
      id="filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="">All</option>
      <option value="Advice">Advice</option>
      <option value="Discussion">Discussion</option>
    </select>
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
        <div className="post-list">
          {filteredPosts.map((post) => (
            <div className="community-post" key={post.id}>
              <div className="post-header">
                <div className='smalldiv'>
                <img
                  src={post.acf.pfp || "/default-profile.jpg"}
                  alt={`${post.acf.user_name}'s profile`}
                  className="profile-picture"
                />
                <div className="post-user-info">
                  <h3>{post.acf.user_name}</h3>
                  <span className="user-level">{post.acf.level}</span>
                </div></div>
                <span className="post-time">{new Date(post.date).toLocaleString()}</span>
              </div>
              {post.acf.title && <h2 className="post-title">{post.acf.title}</h2>}
              {post.acf.flair && <span className="post-flair">{post.acf.flair}</span>}
              <p className="post-content">{post.acf.content}</p>
              {post.acf.image && (
                <div className="post-image">
                  <img src={post.acf.image} alt="Post visual content" />
                </div>
              )}
              <div className="post-actions">
                <button className="like-button">👍 Like</button>
                <button className="dislike-button">👎 Dislike</button>
                <button className="comments-button">💬 {post.comments} comments</button>
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
