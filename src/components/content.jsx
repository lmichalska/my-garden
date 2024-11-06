//Filip


//Landing page content
import React from 'react';
import "../index.css"
import './content.css';

const Content = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to MyGarden 🌿</h1>
        <p>Make your plant journey easy, fun, and rewarding!</p>
      </header>

      <section className="feature">
        <img src="yourImagePath/garden.png" alt="Your Garden" className="feature-image"/>
        <div className="feature-text">
          <h2>🌱 Your Garden, Your Way</h2>
          <p>
            Build your personal garden in the app! Add your plants, from leafy friends to flowering beauties, 
            and watch your virtual garden grow alongside the real thing.
          </p>
        </div>
      </section>

      <section className="feature">
        <img src="yourImagePath/schedule.png" alt="Care Schedule" className="feature-image"/>
        <div className="feature-text">
          <h2>🗓️ Never Miss a Watering Day</h2>
          <p>
            Stay on top of your plant care schedule effortlessly. Set reminders for watering, fertilizing, 
            pruning, and repotting. We'll remind you, so your plants never miss their TLC!
          </p>
        </div>
      </section>

      <section className="feature">
        <img src="yourImagePath/identify.png" alt="Identify Plants" className="feature-image"/>
        <div className="feature-text">
          <h2>📸 Snap & Identify</h2>
          <p>
            Mystery plant in your garden? Snap a photo, and let our app identify it! Get plant names, 
            care tips, and interesting facts about every green guest.
          </p>
        </div>
      </section>

      <section className="feature">
        <img src="yourImagePath/diagnose.png" alt="Diagnose Problems" className="feature-image"/>
        <div className="feature-text">
          <h2>🔍 Diagnose Plant Problems</h2>
          <p>
            Yellow leaves? Drooping stems? Our diagnosis tool helps you understand and treat your plant's 
            issues fast. Get back to thriving with just a few taps!
          </p>
        </div>
      </section>

      <section className="feature">
        <img src="yourImagePath/learn.png" alt="Learn" className="feature-image"/>
        <div className="feature-text">
          <h2>📚 Grow Your Knowledge</h2>
          <p>
            From gardening basics to expert tips, discover new skills and expand your plant knowledge. 
            Our library is packed with articles, how-tos, and more to keep you learning.
          </p>
        </div>
      </section>

      <section className="feature">
        <img src="yourImagePath/community.png" alt="Community" className="feature-image"/>
        <div className="feature-text">
          <h2>🌐 Join the Green Thumb Community</h2>
          <p>
            Connect with other plant lovers, share progress, and exchange tips! Earn badges, level up, 
            and showcase your gardening achievements. It’s fun, friendly, and full of plant passion!
          </p>
        </div>
      </section>

      <section className="feature">
        <img src="yourImagePath/badges.png" alt="Badges and Levels" className="feature-image"/>
        <div className="feature-text">
          <h2>🏆 Earn Badges & Level Up!</h2>
          <p>
            Show off your gardening skills! Earn badges for milestones, care streaks, and mastering plant types. 
            Unlock levels as you grow, and become the ultimate plant pro.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>Your garden journey made joyful, easy, and rewarding.</p>
      </footer>
    </div>
  );
};


export default Content;
