import React from 'react';
import API from '../../adapters/API'
import paths from '../../paths';
import {
   BrowserRouter as Router,
   Switch,
   Route,      
   Redirect,
   Link,
   NavLink
 } from "react-router-dom";
 import NavStyling from './NavBar.css'

const dashStyle = {
   width: '10px',
   padding: '0px',
   align: 'left',
   margin: '0 25px 25px',
   textdecoration: 'none',
   color: 'black'
}

const Navbar = (props) => {
   return(
  <div className='nav-div'>
        <NavLink className="links"
        to='/home'
        exact
        style={dashStyle}
        >Premises Lookup</NavLink>
        <NavLink className="links"
        to='/dashboard'
        exact
        style={dashStyle}
        >User Dashboard</NavLink>
       {props.user.id ? <button onClick={props.logout}>Log Out</button> : null}
  </div>
   )
}

export default Navbar
