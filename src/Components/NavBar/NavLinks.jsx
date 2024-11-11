// Lidia


import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


// Navigation links for mobile and desktop
const NavLinks = ({ closeMenu }) => {
    return (
        <nav className="NavLinks">
            <ul>
            <li>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                </li>
                <li>
                    <Link to="/learn" onClick={closeMenu}>Learn</Link>
                </li>
                <li>
                    <Link to="/plantabase" onClick={closeMenu}>Plantabase</Link>
                </li>
                <li>
                    <Link to="/community" onClick={closeMenu}>Community</Link>
                </li>
                <li>
                    <Link to="/acc" onClick={closeMenu}>My Account</Link>
                </li>
                <li>
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                </li>
                <li>
                <a href="https://www.figma.com/proto/MakSeudQzQmVzMS7ArnvaH/Gardening-App-(WebApp)?page-id=114%3A8398&node-id=461-6619&node-type=frame&viewport=1411%2C-34%2C0.18&t=XL8ldni9K79ShwlW-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=461%3A6619&show-proto-sidebar=1"><button className="promo-button">Get MyGarden app</button></a>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
