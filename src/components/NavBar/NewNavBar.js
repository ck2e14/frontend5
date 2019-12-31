import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
   <Segment>
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
               active={activeItem === 'My Blacklisted Sites'}
               onClick={this.handleItemClick}
            >
               Blacklisted and Visited Places
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
         </Segment>
    )
  }
}