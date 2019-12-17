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

const dashStyle = {
   width: '100px',
   padding: '0px',
   align: 'center',
   margin: '0 25px 25px',
   textdecoration: 'none',
   color: 'black'
}

const Navbar = (props) => {
   return(
  <div>
        <NavLink
        to='/home'
        exact
        style={dashStyle}
        >Premises Lookup</NavLink>
        <NavLink
        to='/dashboard'
        exact
        style={dashStyle}
        >User Dashboard</NavLink>
       {props.user.id ? <button onClick={props.logout}>Log Out</button> : null}

  </div>
// flesh out the navbar so that the method is passed down here as a prop and check that it clear tshte clocal auth token correctrly


   )
}

export default Navbar
