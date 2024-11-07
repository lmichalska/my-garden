 //Lidia
 
 
 //DesktopNavigation
 import NavLinks from './NavLinks';
 import './NavBar.css';
 
 const DesktopNavigation = () => {
     return (
         <nav className="DesktopNavigation">
             <h2 className="logo">
                 <span className="color">My</span>Garden
             </h2>
             <NavLinks />
         </nav>
     );
 };
 
 export default DesktopNavigation;
 