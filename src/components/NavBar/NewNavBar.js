import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleBasic extends Component {
  state = {
     activeItem: ''
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (

      <Menu>
         <Link to='/home'>
            <Menu.Item
               name='Premises Lookup'
               active={activeItem === 'Premises Lookup'}
               onClick={this.handleItemClick}
            >
               Premises Lookup
            </Menu.Item>
         </Link>

         <Link to='/blacklist'>
            <Menu.Item
               name='My Blacklisted Sites'
               background-color="black"
               active={activeItem === 'My Blacklisted Sites'}
               onClick={this.handleItemClick}
            >
               Blacklist
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
         </Menu>

    )
  }
}