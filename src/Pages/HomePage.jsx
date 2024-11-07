//Lidia

import React from "react";
import "..//Pages/HomePage.css";

const HomePage = () => {
// features
  const features = [
    {
      title: "🌱 Your Garden, Your Way",
      description: "Build your personal garden in the app! Add your plants, from leafy friends to flowering beauties, and watch your virtual garden grow alongside the real thing.",
      image: "/assets/mockup1.png",
      reverse: false,
    },
    {
      title: "🗓️ Never Miss a Watering Day",
      description: "Stay on top of your plant care schedule effortlessly. Set reminders for watering, fertilizing, pruning, and repotting. We'll remind you, so your plants never miss their TLC!",
      image: "src/assets/mockup5.png",
      reverse: true,
    },
    {
      title: "📸 Snap & Identify",
      description: "Mystery plant in your garden? Snap a photo, and let our app identify it! Get plant names, care tips, and interesting facts about every green guest.",
      image: "src/assets/mockup2.png",
      reverse: false,
    },
    {
      title: "📚 Grow Your Knowledge",
      description: "From gardening basics to expert tips, discover new skills and expand your plant knowledge. Our library is packed with articles, how-tos, and more to keep you learning.",
      image: "src/assets/mockup6.png",
      reverse: true,
    },
    {
      title: "🌐 Join the Green Thumb Community",
      description: "Connect with other plant lovers, share progress, and exchange tips! Earn badges, level up, and showcase your gardening achievements. It’s fun, friendly, and full of plant passion!",
      image: "src/assets/mockup3.png",
      reverse: false,
    },
    {
      title: "🌟 Unlock Pro Features!",
      description: "Take your gardening experience to the next level with Pro! Chat directly with experts, diagnose plant issues instantly, enjoy unlimited space for your garden, and earn more points for each level. With Pro, the possibilities are endless!",
      image: "src/assets/mockup4.png",
      reverse: true,
    },
  ];

  //home page
  return (
    <main className="page-layout">
      <div className="container">
        <div className="app-promo">
          <div className="background-image"></div>
          <div className="promo-content">
            <h1>
              <span className="highlight">My</span>Garden
            </h1>
            <p>Your go-to app for plant care and garden success.</p>
            <a href="https://www.figma.com/proto/MakSeudQzQmVzMS7ArnvaH/Gardening-App-(WebApp)?page-id=114%3A8398&node-id=461-6619&node-type=frame&viewport=1411%2C-34%2C0.18&t=XL8ldni9K79ShwlW-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=461%3A6619&show-proto-sidebar=1"><button className="promo-button">Get MyGarden app</button></a>
          </div>
        </div>
      </div>

      <div className="landing-page">
        <header className="header">
          <h1>Welcome to MyGarden 🌿</h1>
          <p>Make your plant journey easy, fun, and rewarding!</p>
        </header>

        {features.map((feature, index) => (
          <section
            key={index}
            className={feature.reverse ? "feature2" : "feature"}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="feature-image"
            />
            <div className="feature-text">
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="cta">
    <h2>🌱 Ready to Dig In? 🌿</h2>
    <p>Transform your garden into a thriving oasis with MyGarden!</p>
    <div className="cta-content">
        <p>Explore all the amazing features and grow with us!</p>
        <a href="https://www.figma.com/proto/MakSeudQzQmVzMS7ArnvaH/Gardening-App-(WebApp)?page-id=114%3A8398&node-id=461-6619&node-type=frame&viewport=1411%2C-34%2C0.18&t=XL8ldni9K79ShwlW-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=461%3A6619&show-proto-sidebar=1">
            <button className="promo-button">
                Get MyGarden App
            </button>
        </a>
    </div>
</section>

    </main>
  );
};

export default HomePage;
