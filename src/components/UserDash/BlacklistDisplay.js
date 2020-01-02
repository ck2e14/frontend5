import React from 'react'
import API from '../../adapters/API'
import BlacklistCard from '../UserDash/BlacklistCard'
import BlacklistStyle from './BlacklistStyle.css'
import NewNavBar from '../NavBar/NewNavBar'
export default class BlacklistDisplay extends React.Component {

   constructor(){
      super()
      this.state = {
         userInfo: '',
         readyToRender: false,
         rebuilt: []
      }
   }


   // abstract the below function into the API file. 
componentDidMount(){
   if(this.props.userID){
   fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
          Accept: "application/json"
      }
   })
   .then(res => res.json())
   .then(objects => this.rebuildEstabs(objects)
   )
 };
}


buildCards = () => this.state.rebuilt.map(estab => {
   return <BlacklistCard establishment={estab} user={this.props.user} />
})

rebuildEstabs = (objects) => {
      objects.blacklists.map(object => {
         fetch(`http://localhost:3000/api/v1/establishments/${object.establishment_id}`, {
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

   render(){
      

      return(
         <div className='main-div'>
            <NewNavBar user={this.props.user} logout={this.props.logout} />
               <div className='border-box'>
                  {/* {console.log(this.props.user.id)} */}
                  <div className='display-cards-div'>     
                     <h1> My Blacklisted Sites</h1>

                     {/* {this.truthyCheck() && this.state.readyToRender ? this.state.userInfo.blacklists.map(estab => {
                     return(<p>{estab.id}</p>)})  : null} */}
                     {this.state.readyToRender ? this.state.userInfo.blacklists.map(estab => {
                     return(<p>{estab.id}</p>)}) : null }
                     {/* {this.state.readyToRender ? this.buildCards() : null } */}
                     {this.buildCards()}
                  </div>

                  
               </div>
         </div>
      )
   }
}