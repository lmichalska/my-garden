// Contact.jsx
import React, { useState } from 'react';
import "..//Pages/Pages.css";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! We'll be in touch soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="landing-page">
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! 🌱</p>
            <form onSubmit={handleSubmit} className="contact-form">
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Your Awesome Name" 
                        required 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="youremail@example.com" 
                        required 
                    />
                </label>
                <label>
                    Message:
                    <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="What's on your mind?" 
                        rows="4" 
                        required 
                    />
                </label>
                <button type="submit">Send Message</button>
            </form>
        </div></div>
    );
};

export default Contact;
