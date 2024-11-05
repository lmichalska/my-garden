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
                    <a href="/#about">About Us</a>
                </li>
                <li>
                    <a href="/#about">MyGarden Pro</a>
                </li>
                <li>
                    <a href="/#contact">Contact Us</a>
                </li>
                <li>
                    <a href="/#contact">Log in</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
