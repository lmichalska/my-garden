import React, { useState } from 'react';
import './Pages.css'

const Community = () => {

  // Sample data for community posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Alice",
      level: 5,
      profilePicture: "/path/to/profile1.jpg",
      title: "Summer Succulents",
      content: "My succulents are thriving this summer!",
      image: "/path/to/image1.jpg",
      flair: "Achievement",
      comments: 5
    },
    {
      id: 2,
      name: "Bob",
      level: 4,
      profilePicture: "/path/to/profile2.jpg",
      title: "Tomato Harvest",
      content: "Just harvested the first tomatoes of the season!",
      image: "/path/to/image2.jpg",
      flair: "Harvest",
      comments: 3
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    image: '',
    flair: ''
  });

  // Handler to add a new post
  const handleAddPost = () => {
    if (newPost.text.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          name: "You",
          level: 1,
          profilePicture: "/path/to/your-profile.jpg",
          title: newPost.title,
          content: newPost.text,
          image: newPost.image,
          flair: newPost.flair,
          comments: 0
        },
        ...posts
      ]);
      setNewPost({ title: '', text: '', image: '', flair: '' });
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
        <input
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Post Title"
        />
        <textarea
          value={newPost.text}
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          placeholder="What’s happening in your garden?"
        />
        <input
          type="text"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
          placeholder="Image URL"
        />
        <input
          type="text"
          value={newPost.flair}
          onChange={(e) => setNewPost({ ...newPost, flair: e.target.value })}
          placeholder="Flair (e.g., Achievement, Question)"
        />
        <button onClick={handleAddPost}>Post</button>
      </section>

      {/* Community Posts Section */}
      <section className="posts">
        <h2>Community Posts</h2>
        <div className="post-list">
          {posts.map((post) => (
            <div className="community-post">
            <div className="post-header">
              <img src={post.profilePicture} alt={`${post.name}'s profile`} className="profile-picture" />
              <div className="post-user-info">
                <h3>{post.name}</h3>
                <span className="user-level">Level {post.level}</span>
                <span className="post-time">3hrs ago</span>
              </div>
              {post.flair && <span className="post-flair">{post.flair}</span>}
            </div>
      
            {post.title && <h2 className="post-title">{post.title}</h2>}
            <p className="post-content">{post.content}</p>
            
            {post.image && (
              <div className="post-image">
                <img src={post.image} alt="Post visual content" />
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
