import NavLinks from "./NavLinks";
import './NavBar.css';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import { useState } from "react";
import { Link } from 'react-router-dom';

const MobileNavigation = () => {
    const [click, setClick] = useState(false);

    // Toggle menu open/close
    const handleMenuToggle = () => setClick(!click);

    // Close menu when a link is clicked
    const closeMenu = () => setClick(false);

    return (
        <nav className="MobileNavigation">
            <Link to="/" onClick={closeMenu}><h2 className="logo"><span className='color'>My</span>Garden</h2></Link>
            {/* Hamburger icon to open/close menu */}
            {click ? (
                <MdClose className="HamburgerMenu" size="30px" color="black" onClick={handleMenuToggle} />
            ) : (
                <MdOutlineMenu className="HamburgerMenu" size="30px" color="black" onClick={handleMenuToggle} />
            )}
            {/* Conditional rendering of the dropdown menu */}
            {click && <NavLinks closeMenu={closeMenu} />}
        </nav>
    );
};

export default MobileNavigation;
