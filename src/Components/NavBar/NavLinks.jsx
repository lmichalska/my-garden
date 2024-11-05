// NavLinks.jsx

import './NavBar.css'; // Ensure this path is correct

const NavLinks = ({ isClicked, closeMenu }) => {
    return (
        <nav className="NavLinks">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/#services">Services</a>
                </li>
                <li>
                    <a href="/#about">About Us</a>
                </li>
                <li>
                    <a href="/#contact">Contact Us</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
