// App.jsx
import React from "react";
import "./index.css";
import Content from "./Components/content.jsx"; 
import NavBar from "./Components/NavBar/NavBar.jsx"; 

export default function App() {
    return (
        <main className="page-layout">
            <h1>Testing App Rendering</h1>
            <Content />
            <NavBar />
        </main>
    );
}
