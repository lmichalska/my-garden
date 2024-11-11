// DesktopNavigation
import NavLinks from './NavLinks';
import './NavBar.css';
import { Link } from 'react-router-dom';

const DesktopNavigation = () => {
    return (
        <nav className="DesktopNavigation">
            <Link to="/">
                <h2 className="logo"><span className="color">My</span>Garden</h2>
            </Link>
            <NavLinks />
        </nav>
    );
};

export default DesktopNavigation;
