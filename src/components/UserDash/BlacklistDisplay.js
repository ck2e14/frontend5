import React from 'react'
import API from '../../adapters/API'
import BlacklistCard from '../UserDash/BlacklistCard'
// import BlacklistStyle from './BlacklistStyle.css'
import NewNavBar from '../NavBar/NewNavBar'

export default class BlacklistDisplay extends React.Component {

   constructor(props){
      super(props)
      this.state = {
         userInfo: this.props.user,
         readyToRender: false,
         rebuilt: []
      }
   }

   // The blacklist fetch works like this:
   //  1) fetches user object from /users endpoint, using logged-in user's ID. This returns 
   //     a blacklist key (an array of objects). Each object contains an 'establishment
   //     ID. This is a reference to the local copy of FSA-returned establishments that
   //     takes place when user clicks 'blacklist' on estabCard.
   //  2) calls rebuildEstabs, which enumerates over the blacklists array, and for each 
   //     object it fetches the local versions of estabs (protecting against request 
   //     throttling by FSA)
   //  3) pushes reconstructed estabs (from their local IDs) into BlacklistDisplay state
   //     NOTE: use of spread operator, otherwise each enumeration will wipe the previous
   componentDidMount(){
      if(this.props.userID){
      fetch(`https://mod5-api.herokuapp.com/api/v1/users/${this.props.user.id}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
         }
      })
      .then(res => res.json())
      .then(userObject => this.rebuildEstabs(userObject))
      .then(this.setState({ readyToRender: true }) )
   }
   }

   rebuildEstabs = (objects) => {
      console.log(objects)
      objects.blacklists.map(object => {
         return fetch(` https://mod5-api.herokuapp.com/api/v1/establishments/${object.establishment_id}`, {
                  method: "GET",
                  headers: {
                     "Content-Type": "application/json",
                     Accept: "application/json"
                  }
               }).then(res => res.json())
               .then(data => this.setState({
                  rebuilt: [...this.state.rebuilt, data]
               }))
      })
   }
// removes blacklisting record from blacklist table and then filters state to remove estab with matching ID. We are incrementing the BLACKLISTING record ID by 1 because it is ALWAYS THE CASE (until you add validation UPON CREATION of a blacklisting that the estab hasn't already been added - remember we make a local estab copy only ever at point of making a blacklisting addition) that an estab ID will be 1 more than a blacklisting ID.
// so the blacklist id is used to delete from blacklist/:id and then its also used to +1 to give us the right value to filter state to get the right ESTABLISHMENT id, since in state the ID per establishment is estab ID not blacklist ID.
// You can verify this is still the case by creating a new account, adding an estab to blacklist and checking on your API that the new blacklisting record ID is one less than the new estab ID. just got to https://mod5-api.herokuapp.com/api/v1/users and look inside the new user's blacklist. If you ever put validation to stop duplicated blacklistings/estabs you will need to handle the state filtering differently - by addressLine1 might work - is unique enough. 
   handleRemoveEstab = (id) => {
      API.removeBlacklist(id);
      console.log(id)
      alert(`Removed premises from your blacklist.`);
      this.setState({
         rebuilt: this.state.rebuilt.filter(
            estab => estab.id !== (id + 1)
         )
      })
   }


   buildCards = () => this.state.rebuilt.map(estab => {
      return <BlacklistCard remove={this.handleRemoveEstab} establishment={estab} user={this.props.user} />
   })

   render(){
      return(
         <div className='main-div'>

            <NewNavBar user={this.props.user} logout={this.props.logout} />

               <div className='border-box'>

               <h1> My Blacklisted Sites</h1>

                  <div className='display-cards-div'>     


                     { this.state.readyToRender ?
                        console.log(this.state.userInfo.blacklists)
                     : null }

                     {this.buildCards()}

                  </div>

               </div>

         </div>
      )
   }
}