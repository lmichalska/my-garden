import React, { useState, useEffect } from 'react';
import './Pages.css';

const Community = () => {
  const [posts, setPosts] = useState([]);  // Initialize with an empty array
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    image: '',
    flair: ''
  });

  // Fetch data on component mount
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://mygarden-data.lmichalska.dk/wp-json/wp/v2/community?scf_format=standard&_embed"
      );
      const data = await response.json();
      setPosts(data);
    }

    getData();
  }, []);  // Empty dependency array ensures this runs only once on mount

  // Handler to add a new post
  const handleAddPost = () => {
    if (newPost.text.trim()) {
      setPosts([
        {
          id: posts.length + 1,  // Using posts.length to assign a new id
          name: "You",
          level: 1,
          profilePicture: "/path/to/your-profile.jpg", // You can replace this with an actual profile picture URL
          title: newPost.title,
          content: newPost.text,
          image: newPost.image,
          flair: newPost.flair,
          comments: 0
        },
        ...posts  // Add the new post to the top
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
        <div className="post-list">
          {posts.map((post) => (
            <div className="community-post" key={post.id}>
              <div className="post-header">
                <img
                  src={post.acf.pfp || "/default-profile.jpg"} // Use a default image if no profile picture exists
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
