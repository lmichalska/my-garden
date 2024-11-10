//Lidia

import React, { useState } from 'react';
import './Pages.css';


const Acc = () => {
  // User information
  const [user, setUser] = useState({
    name: 'Elowen Ravenscroft',
    level: '2',
    location: 'Denmark',
    exp: 'Beginner',
    bio: '🌱 Just a plant lover learning as I grow! Into organic gardening, easy-care plants, and creating little green spaces everywhere. Let’s swap tips and celebrate our garden wins together! 🌿',
    profilePic: 'https://via.placeholder.com/150',
    backgroundPic: 'https://freerangestock.com/sample/150810/a-close-up-of-a-plant.jpg',
    mygarden: ['Giorgio - Monstera', 'Carl - Ficus Bonsai', 'Bubby - Monstera', 'Frank - Aloe vera'],
    recentActivity: [
      { date: '2024-11-01', activity: 'Joined MyGarden' },
    ],
  });

  // Edit profile
  const [isEditing, setIsEditing] = useState(false);
// Temporary new profile picture
  const [newProfilePic, setNewProfilePic] = useState(null);

  // New user information
  const handleSave = (updatedData) => {
    setUser(updatedData);
    setIsEditing(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the image file
      reader.onloadend = () => {
        setNewProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // PROFILE PAGE 
  return (
    <div className="landing-page">
      <div className="profile-container">
        <div className="profile-header">
          <img
            className="background-img"
            src={user.backgroundPic}
            alt="Profile Background"
          />
          <div className="profile-pic-container">
            <img
              className="profile-pic"
              src={newProfilePic || user.profilePic} // Show the new profile pic if uploaded, else show default
              alt="Profile"
            />
            <label className="change-profile-pic">
              Edit
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="profile-info">
          {isEditing ? (
            // Profile edit form when isEditing is true
            <ProfileEditForm user={user} onSave={handleSave} />
          ) : (
            <div className="profile-details">
              <h2>{user.name}</h2>
              <span className="user-level">Level {user.level}</span>
              <p>{user.bio}</p>
              <div className='info'>
                <span>Experience: {user.exp}</span>
                <span>Location: {user.location}</span>
              </div>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              <div className="mygarden">
                <h3>Your Garden</h3>
                <ul>
                  {user.mygarden.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          {user.recentActivity.map((activity, index) => (
            <li key={index}>
              <strong>{activity.date}</strong>: {activity.activity}
            </li>
          ))}
        </ul>
      </div>
      <button className='logout'>Log out</button>
    </div>
  );
};

// Profile Edit Form
const ProfileEditForm = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value, // Update with the new value
    }));
  };

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <form onSubmit={handleSubmit} className='account'>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={editedUser.bio}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Experience:</label>
        <input
          type="text"
          name="exp"
          value={editedUser.exp}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={editedUser.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};

export default Acc;
