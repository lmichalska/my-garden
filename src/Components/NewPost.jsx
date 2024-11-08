import React, { useState } from 'react';

const NewPost = ({ handleAddPost }) => {
  // State to store new post data
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    image: '',
    flair: '',
  });

  return (
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
          placeholder="Flair (e.g., Achievement, Question)"
        />
      </label>
      <button onClick={() => handleAddPost(newPost)}>Post</button>
    </section>
  );
};

export default NewPost;
