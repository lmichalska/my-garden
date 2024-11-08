//Lidia

import React, { useState } from 'react';
import './Pages.css';

// Profile component
const Acc = () => {
  // Sample user data as initial state
  const [user, setUser] = useState({
    name: 'Elowen Ravenscroft',
    email: 'johndoe@example.com',
    level: '2',
    location: 'Denmark',
    exp: 'Beginner',
    bio: '🌱 Just a plant lover learning as I grow! Into organic gardening, easy-care plants, and creating little green spaces everywhere. Let’s swap tips and celebrate our garden wins together! 🌿',
    profilePic: 'https://via.placeholder.com/150', // Placeholder profile image
    backgroundPic: 'https://freerangestock.com/sample/150810/a-close-up-of-a-plant.jpg',
    skills: ['Giorgio - Monstera', 'Carl - Ficus Bonsai', 'Bubby - Monstera', 'Frank - Aloe vera'],
    recentActivity: [
      { date: '2024-11-01', activity: 'Joined MyGarden' },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);

  // Handler for saving updated profile data
  const handleSave = (updatedData) => {
    setUser(updatedData);
    setIsEditing(false); // Switch back to view mode after saving
  };

  // Handler for profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="landing-page">
      <div className="profile-container">
        {/* Profile Header with background image */}
        <div className="profile-header">
          <img
            className="background-img"
            src={user.backgroundPic}
            alt="Profile Background"
          />
          <div className="profile-pic-container">
            <img
              className="profile-pic"
              src={newProfilePic || user.profilePic}
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

        {/* Profile Information */}
        <div className="profile-info">
          {isEditing ? (
            <ProfileEditForm user={user} onSave={handleSave} />
          ) : (
            <div className="profile-details">
              <h2>{user.name}</h2>
              <span className="user-level">Level {user.level}</span>
              <p>{user.bio}</p>
              <div className='info'><span>Experience: {user.exp}</span>
              <span>Location: {user.location}</span></div>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              
              <div className="skills">
                <h3>Your Garden</h3>
                <ul>
                  {user.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
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

// Profile Edit Form Component
const ProfileEditForm = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser); // Pass updated data to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
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
          type="experience"
          name="experience"
          value={editedUser.exp}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="location"
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
