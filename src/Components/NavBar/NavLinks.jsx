//Bianka


//navigation links
import './NavBar.css';

const NavLinks = ({ isClicked, closeMenu }) => {
    return (
        <nav className="NavLinks">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/#about">My Account</a>
                </li>
                <li>
                    <a href="/#about">Learn</a>
                </li>
                <li>
                    <a href="/#contact">Plantabase</a>
                </li>
                <li>
                    <a href="/#contact">Community</a>
                </li><li>
                    <a href="/#contact">Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
