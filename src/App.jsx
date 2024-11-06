// Lidia


// landing page
import React from "react";
import "../src/index.css";
import Content from "./Components/content.jsx"; 
import Landing from "./Components/Landing.jsx";
import Footer from "./Components/Footer.jsx" 
import NavBar from "./Components/NavBar/NavBar.jsx"; 

export default function App() {
    return (
        <main className="page-layout">
            <NavBar />
            <Landing />
            <Content />
            <Footer />
        </main>
    );
}
