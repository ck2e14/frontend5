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
// import { promisify } from 'es6-promisify'

// const getCurrentPosition = promisify(navigator.geolocation.getCurrentPosition)

 export default class Home extends React.Component {

   constructor(){
      super()
      this.state = { 
         establishments: [],
         finishedFetch: false
      }
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
                  finishedFetch: true 
               }))
         )})   

      }
   }


   componentDidMount(){
      this.setEstablishments()
      // if (!navigator.geolocation) {
      //    console.log('Geolocation is not supported by your browser');
      //  } else {
      //    console.log('locating')
      //    navigator.geolocation.getCurrentPosition(API.getEstabs).then(resp => this.setState({ 
      //           establishments: resp,
      //          finishedFetch: true }))
      // }
      // //  API.getEstabs().then(resp => this.setState({ 
      // //     establishments: resp,
      // //    finishedFetch: true }))
   }

      
   

   render(){
     
      return(
            <div>
               {this.props.user && <Navbar user={this.props.user} logout={this.props.logout}/>}
               {this.state.finishedFetch ? 
               <EstabContainer user={this.props.user} establishments={this.state.establishments} /> 
               : null }
            </div>
      )
   }
 }
