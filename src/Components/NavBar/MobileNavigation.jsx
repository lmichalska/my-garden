//MobileNavigation.js

import NavLinks from "./NavLinks";
import './NavBar.css';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import { useState } from "react";


const MobileNavigation = () =>{
    const [click, setclick] = useState(false);

    const Hamburger = <MdOutlineMenu className="HamburgerMenu"
           size="30px" color="black"
           onClick={() => setclick(!click)} />

    const Close = <MdClose className="HamburgerMenu"
            size="30px" color="black"
           onClick={() => setclick(!click)} 
           />
           const closeMenu = () => setclick(false);
          

    return(
        <nav className="MobileNavigation">
             <h2 className="logo">Logo</h2>
             { click ? Close : Hamburger}
             {click && <NavLinks />}
        </nav>
    )
}

export default MobileNavigation;
