// Lidia

// Mobile navigation
import NavLinks from "./NavLinks";
import './NavBar.css';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import { useState } from "react";
import { Link } from 'react-router-dom';

const MobileNavigation = () => {
    const [click, setClick] = useState(false);

    const handleMenuToggle = () => setClick(!click);

    const closeMenu = () => setClick(false);

    return (
        <nav className="MobileNavigation">
            <Link to="/" onClick={closeMenu}><h2 className="logo"><span className='color'>My</span>Garden</h2></Link>
            {click ? (
                <MdClose className="HamburgerMenu" size="30px" color="black" onClick={handleMenuToggle} />
            ) : (
                <MdOutlineMenu className="HamburgerMenu" size="30px" color="black" onClick={handleMenuToggle} />
            )}
            {click && <NavLinks closeMenu={closeMenu} />}
        </nav>
    );
};

export default MobileNavigation;
