import React from 'react'
import API from '../../adapters/API'
import Navbar from '../NavBar/Navbar'
import { trackPromise } from 'react-promise-tracker';
import BlacklistDisplay from './BlacklistDisplay'
import NewNavBar from '../NavBar/NewNavBar'

export default class UserDash extends React.Component{

   constructor(){
      super()
      this.state = {
         showMenu: false,
      }
   }

   showMenu = () => {
      this.setState({
         showMenu: !this.state.showMenu
      })
   }


   render(){
      return(
      <div>
         <NewNavBar logout={this.props.logout} user={this.props.user} />
         <BlacklistDisplay />
      </div>
      )
   }
}
