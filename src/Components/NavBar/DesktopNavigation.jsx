// Lidia

// DesktopNavigation.jsx
import NavLinks from './NavLinks';
import './NavBar.css';
import { Link } from 'react-router-dom';

const DesktopNavigation = () => {
    const closeMenu = () => {
        console.log("Menu closed"); 
    };

    return (
        <nav className="DesktopNavigation">
            <Link to="/" onClick={closeMenu}>
                <h2 className="logo"><span className="color">My</span>Garden</h2>
            </Link>
            <NavLinks />
        </nav>
    );
};

export default DesktopNavigation;
