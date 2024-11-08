//Bianka
import React, { useState } from 'react';
import "..//Pages/Pages.css";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
// confirmation message
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! We'll be in touch soon.");
        setFormData({ name: '', email: '', message: '' });
    };
// contact us page
    return (
        <div className="landing-page">
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p className='contact'>You can contact us through the form below, or you can email us directly at <span className='green'>contact@mygarden.com</span>. We aim to respond to all inquiries as quickly as possible. <br></br><br></br>Thank you for being part of our community! 🌱</p>
            <form onSubmit={handleSubmit} className="contact-form">
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Your Name" 
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
                        placeholder="Your message" 
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
