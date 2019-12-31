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
// import Navbar from '../NavBar/Navbar'
import ShowMap from '../map/ShowMap'
import NewNavbar from '../NavBar/NewNavBar'
import { Button, Input, Footer, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact'



 export default class Home extends React.Component {

   constructor(){
      super()
      this.state = { 
         establishments: [],
         blacklist: [],
         finishedFetch: false,
         currentUserId: '',
         longitude: '',
         latitude: '',
         search: "",
      }
   }

   onChange = e => {
      this.setState({ search: e.target.value })
   }



   handleEstabClick = (estabObject, userID) => {
      API.newEstab(estabObject, this.state.currentUserId)
      
   }




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
                  currentLatitude: location.coords.latitude,
                  currentLongitude: location.coords.longitude,
                  finishedFetch: true,
                  currentUserId: this.props.user.id
 
               }))
         )})   

      }
   }


   componentDidMount(){
  
      this.setEstablishments()
   }

  filteredEstabs = (search) => this.state.establishments.filter(estab => {
      if(!estab.name) return
      return estab.name.toLowerCase().includes(search.toLowerCase()) 
   })
   
   

   render(){
      const {search} = this.state
      
      return(
            <div>
               {this.props.user ? <NewNavbar user={this.props.user} logout={this.props.logout}/> : null}

               <Input label="Search Premises" icon="search" value={search} onChange={this.onChange} />

               {this.state.finishedFetch ? 
               <EstabContainer user={this.props.user} handleBlacklistClick={this.handleEstabClick} establishments={this.filteredEstabs(search)} /> 
               : null }


               {this.state.finishedFetch ? 
               <ShowMap estabs={this.filteredEstabs(search)} latitude={this.state.currentLatitude} longitude={this.state.currentLongitude}/>
               : null }
               
            </div>
      )
   }
 }
