import React from "react"
import API from '../../adapters/API'
import { 
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
   Link,
   useHistory 
 } from "react-router-dom";
import { render } from "react-dom";
import EstabContainer from '../establishments/EstabContainer'
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import Navbar from '../NavBar/Navbar'
import ShowMap from '../map/ShowMap'

// const getCurrentPosition = promisify(navigator.geolocation.getCurrentPosition)

 export default class Home extends React.Component {

   constructor(){
      super()
      this.state = { 
         establishments: [],
         blacklist: [],
         finishedFetch: false,
         currentUserId: ''
      }
   }



   handleEstabClick = (estabObject, userID) => {
      API.newEstab(estabObject, this.state.currentUserId)
      
   }

   //  the below method was kinda wrong since it was saving to state. Now, instead, the right response from blacklist click is to persist a new estab, then save that new id and current user id to the blacklist join table, then need to trigger a GET request to blacklists to fill where the user_id in the blacklist entry matches the current user ID
   // handleEstabClick = (estabObject) => {
   //    if(!this.state.blacklist.includes(estabObject.id)) {
   //       this.setState({
   //          blacklist: [...this.state.blacklist, 
   //             {
   //                establishment: {
   //                   id: estabObject.id,
   //                   name: estabObject.name,
   //                   localAuth: estabObject.localAuth,
   //                   ratingValue: estabObject.ratingValue,
   //                   hygieneRating: estabObject.hygieneRating,
   //                   latitiude: estabObject.latitude,
   //                   longitude: estabObject.longitude,
   //                   postcode: estabObject.postcode,
   //                   FSAid: estabObject.FSAid,
   //                   type_of: estabObject.type_of
   //                }
   //             }]
               
   //       })
   //       // invoke API.newEstab here and pass in the details above as an object for persisting locally.
   //    }
   // }

   // handleEstabClick = (estabObject) => {
   //    if(!this.state.blacklist.includes(estabObject.id)) {
   //       this.setState({
   //          blacklist: [...this.state.blacklist, 
   //             {
   //                estabObject.id: {
   //                   name: estabObject.name,
   //                   localAuth: estabObject.localAuth,
   //                   ratingValue: estabObject.RatingValue.toString(),
   //                   hygieneRating: estabObject.scores.Hygiene,
   //                   latitiude: estabObject.Geocode.Latitude.toString(),
   //                   longitude: estabObject.Geocode.Longitude.toString(),
   //                   postcode: estabObject.Postcode,
   //                   FSAid: estabObject.FHRSID
   //                }
   //             }
   //       })
   //       // invoke API.newEstab here and pass in the details above as an object for persisting locally.
   //    }
   // }



// trackPromise is an async promise tracker that allows me to put loading icons up for the duration of the async resolution. 
   async setEstablishments() {
      if (!navigator.geolocation) {
         console.log('Geolocation is not supported by your browser');
       } else {
         console.log('Locating...')       
         window.navigator.geolocation.getCurrentPosition(location => {   
            trackPromise(
            API.getEstabs(location)
               .then(estabs => this.setState({
                  establishments: estabs,
                  finishedFetch: true 
               }))
         )})   

      }
   }


   componentDidMount(){
      this.setState({
         currentUserId: this.props.user.id
      })
      this.setEstablishments()
   }

      
   

   render(){
     
      return(
            <div>
               {this.props.user && <Navbar user={this.props.user} logout={this.props.logout}/>}
               {this.state.finishedFetch ? 
               <EstabContainer user={this.props.user} handleBlacklistClick={this.handleEstabClick} establishments={this.state.establishments} /> 
               : null }
               {/* <ShowMap /> */}
            </div>
      )
   }
 }
