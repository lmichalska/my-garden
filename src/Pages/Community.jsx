import React, { useState, useEffect } from 'react';
import './Pages.css';

const Community = () => {
  const [posts, setPosts] = useState([]);  // Original posts data
  const [filteredPosts, setFilteredPosts] = useState([]); // Posts after applying filter and sort
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    image: '',
    flair: ''
  });

  const [filter, setFilter] = useState(''); // For filtering posts based on flair
  const [sortBy, setSortBy] = useState('date'); // For sorting posts (e.g., by date or level)

  // Fetch data on component mount
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/community?scf_format=standard&_embed"
      );
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data); // Initially, set filtered posts to be all posts
    }

    getData();
  }, []);  // Empty dependency array ensures this runs only once on mount

  // Filter posts based on the selected flair
  const filterPosts = () => {
    let filtered = posts;
    if (filter) {
      filtered = posts.filter((post) => post.acf.flair && post.acf.flair.includes(filter));
    }
    return filtered;
  };

  // Sort posts based on the selected criteria (e.g., date, level)
  const sortPosts = (filteredPosts) => {
    let sorted = [...filteredPosts]; // Clone the filtered posts array
    if (sortBy === 'date') {
      sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)
    } else if (sortBy === 'level') {
      sorted = sorted.sort((a, b) => b.acf.level - a.acf.level); // Sort by user level (higher first)
    }
    return sorted;
  };

  // Update the posts when filter or sort changes
  useEffect(() => {
    let filtered = filterPosts();
    let sorted = sortPosts(filtered);
    setFilteredPosts(sorted); // Update the displayed posts with filter and sort applied
  }, [filter, sortBy, posts]); // This effect will run whenever filter, sortBy, or posts change

  // Handler to add a new post
  const handleAddPost = () => {
    if (newPost.text.trim()) {
      setPosts([
        {
          id: posts.length + 1,  // Assign a new id based on the current length
          name: "You",
          level: 1,
          profilePicture: "/path/to/your-profile.jpg", // Replace with actual profile picture URL
          title: newPost.title,
          content: newPost.text,
          image: newPost.image,
          flair: newPost.flair,
          comments: 0
        },
        ...posts  // Add the new post to the top of the list
      ]);
      setNewPost({ title: '', text: '', image: '', flair: '' });  // Reset the form after posting
    }
  };

  return (
    <main className="landing-page">
      {/* Intro Section */}
      <section className="intro">
        <h1>Welcome to the Community 🌻</h1>
        <p>Connect with fellow plant enthusiasts, share tips, and watch your garden grow!</p>
      </section>

      {/* Post Form */}
      <section className="post-form">
        <h2>Share your thoughts</h2>
        <label><input
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Post Title"
        /></label>
        <label><textarea
          value={newPost.text}
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          placeholder="What’s happening in your garden?"
        /></label>
        <label><input
          type="text"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
          placeholder="Image URL"
        /></label>
        <label><input
          type="text"
          value={newPost.flair}
          onChange={(e) => setNewPost({ ...newPost, flair: e.target.value })}
          placeholder="Flair (e.g., Achievement, Question)"
        /></label>
        <button onClick={handleAddPost}>Post</button>
      </section>

      {/* Community Posts Section */}
      <section className="posts">
        <h2>Community Posts</h2>
        {/* Filter and Sort Section */}
      <section className="filter-sort">
        <label htmlFor="filter">Filter by Flair:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Advice">Advice</option>
          <option value="Discussion">Discussion</option>
          {/* Add other flairs if needed */}
        </select>

        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="level">User Level</option>
        </select>
      </section>

        <div className="post-list">
          {filteredPosts.map((post) => (
            <div className="community-post" key={post.id}>
              <div className="post-header">
                <img
                  src={post.acf.pfp || "/default-profile.jpg"} // Default profile picture if none exists
                  alt={`${post.acf.user_name}'s profile`}
                  className="profile-picture"
                />
                <div className="post-user-info">
                  <h3>{post.acf.user_name}</h3>
                  <span className="user-level">{post.acf.level}</span>
                  <span className="post-time">{new Date(post.date).toLocaleString()}</span> {/* Format date */}
                </div>
                {post.acf.flair && <span className="post-flair">{post.acf.flair}</span>}
              </div>

              {post.acf.title && <h2 className="post-title">{post.acf.title}</h2>}
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
