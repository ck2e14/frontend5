import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import hygenikLogo from '../../Assets/hygenik logo.png'

export default class MenuExampleBasic extends Component {
   state = {
      activeItem: ''
   }

   handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
   }

   render() {
      const { activeItem } = this.state

      return (
         <Menu>
            <Link to='/find-premises'>
               <Menu.Item
                  name='Premises Lookup'
                  // active={activeItem === 'Premises Lookup'}
                  onClick={this.handleItemClick}
               >
                  Premises Lookup
               </Menu.Item>
            </Link>

            <Link to='/blacklist'>
               <Menu.Item
                  name='My Blacklisted Sites'
                  background-color="black"
                  // active={activeItem === 'My Blacklisted Sites'}
                  onClick={this.handleItemClick}
               >
                  My Blacklist
               </Menu.Item>
            </Link>

            <Link to='/'>
               <Menu.Item
                  name='Log Out'
                  active={activeItem === 'Log Out'}
                  onClick={this.props.logout}
               >
                  Log Out
               </Menu.Item>
            </Link>
            {/* <a href="/home" className="logo-link-to-homepage"> */}
            {/* re-insert the logo into the commented-out anchor tag once you have a logo that only occupies the area the graphic covers, not a huge clickable area KEKW */}
               <img src={hygenikLogo} alt="HygenikLogo" className="logo"/>
            {/* </a> */}
         </Menu>
      )
   }
}