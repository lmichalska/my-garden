import React, { useState } from 'react';
import './Pages.css';
import mygardenData from '../mygarden.json';
import { useNavigate} from "react-router-dom";

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
    recentActivity: [
      { date: '2024-11-10', activity: 'Remember to water Giorgio and Carl today!' },
      { date: '2024-11-01', activity: 'Joined MyGarden' },
    ],
    mygarden: mygardenData.mygarden, // Set mygarden to the JSON data
  });

  // Edit profile
  const [isEditing, setIsEditing] = useState(false);
  // Temporary new profile picture
  const [newProfilePic, setNewProfilePic] = useState(null);

  //back
  const navigate = useNavigate();

  // New plant form visibility and state
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newPlant, setNewPlant] = useState({ name: '', type: '' });

  // Handle profile picture change
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

  // Add a new plant to the garden
  const handleAddPlant = () => {
    if (newPlant.name.trim() && newPlant.type.trim()) {
      const updatedGarden = [...user.mygarden, { name: newPlant.name, type: newPlant.type }];
      setUser({ ...user, mygarden: updatedGarden });
      setNewPlant({ name: '', type: '' });
      setIsFormVisible(false);
    }
  };

  // Delete a plant from the garden
  const handleDeletePlant = (index) => {
    const updatedGarden = user.mygarden.filter((_, i) => i !== index);
    setUser({ ...user, mygarden: updatedGarden });
  };

  // Profile Page
  return (
    <div className="landing-page">
      <div className="profile-container">
        <div className="profile-header">
          <img
            className="background-img"
            src={user.backgroundPic}
            alt="Profile Background"
          />
            <button onClick={() => navigate(-1)}>Go back</button>
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

        <div className="profile-info">
          {isEditing ? (
            <ProfileEditForm user={user} onSave={(updatedData) => { setUser(updatedData); setIsEditing(false); }} />
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
              <div className='tasks'><h3>Task's for today:</h3>
              <p className='notifs'>- No task's for today!</p></div>
              <div className="mygarden">
                <div className='garden'>
                  <h3>Your Garden</h3>
                  <button onClick={() => setIsFormVisible(!isFormVisible)}>
                    {isFormVisible ? 'Cancel' : 'New Plant'}
                  </button>
                </div>

                {/* New plant form */}
                {isFormVisible && (
                  <section className="new-plant-form">
                    <h2>Add a new plant to your garden</h2>
                    <label>
                      <input
                        type="text"
                        value={newPlant.name}
                        onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                        placeholder="Plant name"
                      />
                    </label>
                    <label>
                      <input
                        type="text"
                        value={newPlant.type}
                        onChange={(e) => setNewPlant({ ...newPlant, type: e.target.value })}
                        placeholder="Plant type"
                      />
                    </label>
                    <button onClick={handleAddPlant}>Add</button>
                  </section>
                )}

                {/* Garden list with delete button */}
                <ul>
                  {user.mygarden.map((plant, index) => (
                    <li key={index}>
                        <article>
                      <strong>{plant.name}</strong> - {plant.type}</article>
                      <button className='delete' onClick={() => handleDeletePlant(index)}>Delete</button>
                    </li>
                  ))}
                </ul>
                <button>See the schedule</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="recent-activity">
        <h3>Notifications</h3>
        <p className='notifs'>You're signed up for e-mail notifications. <span className='unsubscribe'>Unsubscribe</span></p>
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
      [name]: value,
    }));
  };

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
