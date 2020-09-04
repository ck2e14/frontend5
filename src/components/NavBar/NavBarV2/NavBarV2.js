import React from 'react'
import './NavBarV2-style.css'
// import MobileNavBar from './MobileNavBar/MobileNavBar'
import { Link } from 'react-router-dom'
// import { isMobile } from "react-device-detect";

const NavBar = props => {

   const { logout } = props

   // if(isMobile){
   //    return(
   //       <MobileNavBar />
   //    )
   //    } else { 
      return(
         <div className="navbar-container" 
            >

            <div className="not-expanded">
               <h5 className="">M E N U</h5>
            </div>

            <div className="navbar-flex-container">
               
               <Link to='/find-premises' className="nav-item">
                  <div>Find Sites</div>
               </Link>

               <Link to='/blacklist' className="nav-item">
                  <div>Blacklist</div>  
               </Link>

               <Link to='/' onClick={logout}className="nav-item">
                  <div>Log Out</div>
               </Link>
{/*                
               <Link to='/contact' className="nav-item">
                  <div>CONTACT</div>
               </Link> */}


            </div>
            
         </div>
      )
   // }
}

export default NavBar 