import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavLinks = ({ closeMenu }) => {
    return (
        <nav className="NavLinks">
            <ul>
                <li>
                    <Link to="/my-account" onClick={closeMenu}>My Account</Link>
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
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                </li>
            </ul>
            <button className="promo-nav">Get MyGarden app</button>
        </nav>
    );
};

export default NavLinks;
