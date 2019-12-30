import React from 'react'
import API from '../../adapters/API'
import Navbar from '../NavBar/Navbar'
import { trackPromise } from 'react-promise-tracker';
import BlacklistDisplay from './BlacklistDisplay'

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
         <button onClick={this.showMenu}>
           Show menu
         </button>
         
         {
           this.state.showMenu
             ? (
               <div className="menu">
                <a href="/home" ><button> Premises Lookup </button> </a>
                <a href="/blacklist"> <button> Blacklist </button> </a>
                
               </div>
             )
             : (
               null
             )
         }
       </div>
      )
   }
}
