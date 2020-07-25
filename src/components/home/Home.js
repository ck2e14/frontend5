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
import ShowMap from '../map/ShowMap'
import NewNavbar from '../NavBar/NewNavBar'
import { Button, Input, Footer, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact'
import Popup from '../BlacklistPopup/FeedbackPopup'
import DropDownExampleSelection from '../DropdownSelector/Dropdown'
import homeStyle from './home.css'

export default class Home extends React.Component {

   constructor(props){
      super(props)
      this.state = { 
         establishments: [],
         blacklist: [],
         finishedFetch: false,
         currentUserId: '',
         longitude: '',
         latitude: '',
         search: "",
         geolocationFailure: false,
         displayWelcomeMessage: this.props.displayWelcome,
         displayShader: this.props.displayShader,
         selectedEstabToSendToMapCenter: {}
      }
   }

   onChange = e => {
      this.setState({ search: e.target.value }) 
   }

   shaderClick = () => {
      this.setState({ displayShader: false, displayWelcomeMessage: false })
   }

   handlePremisesLookupClick = () => {
   }

   handleEstabCardClick = estabObject => {
      // console.log(estabObject)
      return this.setState({ 
         search: estabObject.name, 
         selectedEstabToSendToMapCenter: estabObject 
      })
      // this method interpolates the name of the clicked establishment into 'search' state 
      // key. the filterEstabs method is always controlling which establishment objects
      // are passed down to the map components, therefore this method isolates map markers
      // per estab click.
   }

   handleBlacklistClick = (estabObject, userID) => {
      API.newEstab(estabObject, this.props.user.id);
      alert(`${estabObject.name} has been blacklisted. Visit your blacklist if you wish to remove it.`)
      
   }
   
   // geolocation takes three args here - mandatory success callback, optional error callback and an object with PositionOptions
   async setEstablishments() {
      if (!navigator.geolocation) {
         console.log('Geolocation is not supported by your browser');
         alert('Geolocation is not supported by your browser. Please enable location services to use &nbsp; _Hygenik.')
      } else {
         console.log('Locating...')       
         window.navigator.geolocation.getCurrentPosition(location => {   
            API.getEstabs(location)
               .then(estabs => this.setState({
                  establishments: estabs,
                  currentLatitude: location.coords.latitude, 
                  currentLongitude: location.coords.longitude,
                  finishedFetch: true,
                  currentUserId: this.props.user.id
               }))
         }, 
         () => alert('Geolocation failure. Please refresh the page and ensure _Hygenik has access to locations services.'),
         {'enableHighAccuracy':true,'timeout': 6000,'maximumAge':0}
         )   
      }
   }

   escapeClick = () => {
      this.setState({ displayWelcomeMessage: false, displayShader: false})
   }

   clearSearchWithClick = () => this.setState({ search: '' })

   interpolateMarkerToFilter = (searchTerm) => {
      this.setState({ search: searchTerm })
   }
   // Above method is responsible for taking the marker click and pushing it into the search 
   // (controlled component) which in turn filters the establishments that are in state from
   // the initial fetch (in the below method)

   filteredEstabs = (search) => this.state.establishments.filter(estab => {
      if(!estab.name) return
      return estab.name.toLowerCase().includes(search.toLowerCase()) 
   })

   componentDidMount(){
      this.setEstablishments();
   }
   // put an event listener on the whole document on load for keypress. Then in the 
   // escapeClick method above put a check for esc keycode and if so trigger the setState
   
   render(){
      const {search} = this.state
      const {displayShader} = this.state
      const {displayWelcomeMessage} = this.state
      return(
         <> 
            { displayShader ? <div className="shader-layer" onClick={this.shaderClick}></div> : null }

            <div className='big-div'> 

               { displayWelcomeMessage ?  
                  <div className="explanation-and-welcome">
                     <div className="escape-key" onClick={this.escapeClick}>X</div>
                  <span> Welcome to  &nbsp;  _Hygenik!</span> <br/><br/>

                  <span className='highlight-this'>I hope you find this app useful for exploring the FSA-assessed hygiene ratings of places to eat near you - particularly considering the current situation. <br/><br/>

                  On that note - since March, the FSA have experienced a big surge in the number of requests made to their resources. At peak usage requests are being throttled. <br/><br/>Unfortunately this may mean waiting longer than usual to load, or the service may be made temporarily unavailable entirely.
                  <br/><br/>
                  More information can be found <a href="https://api.ratings.food.gov.uk/Help/Status" className="fsa-link">here.</a></span> 
                  <br/><br/>
                  {/* Please also note that Heroku unloads apps from its servers when they haven't been very recently accessed - you may have experienced longer loading times of the website itself because of this upon initial visit.  */}
               </div> 
               :
                  null }

               { this.props.user ? 
                  <NewNavbar user={this.props.user} logout={this.props.logout}/> 
               : 
                  null }

               {/* <div className='drop-down-div'>
                  <DropDownExampleSelection />
               </div> */}

               <div className="filter-elements">
                  <input className='filter-search' type="text" placeholder="Filter by name" position="left" float="left" value={search} onChange={this.onChange} />

                  { this.state.search.length >= 1 ? 
                     <div className="clear-search-button" title='Clear Filter' onClick={this.clearSearchWithClick}>
                        X 
                     </div>
                  : null }
               
               </div>
               
               <div>
                  { this.state.finishedFetch ? 
                     <EstabContainer 
                        user={this.props.user} 
                        handleEstabClick={this.handleEstabCardClick} 
                        handleBlacklistClick={this.handleBlacklistClick} 
                        establishments={this.filteredEstabs(search)} 
                     /> 
                  :
                     <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                     // loading spinner 
                  }

                  { this.state.finishedFetch ? 
                     <ShowMap  
                        estabs={this.filteredEstabs(search)} 
                        latitude={this.state.currentLatitude} 
                        longitude={this.state.currentLongitude} 
                        interpolateMarker={this.interpolateMarkerToFilter}
                        recenterMapUponEstabClick={this.state.selectedEstabToSendToMapCenter}
                     />
                  : 
                     null }
               </div>
            </div>

            <div className="bot-bar">
               <a href="https://chriskennedy.live" target="_blank" rel="noopener noreferrer"className="portfolio-link">Christopher Kennedy</a> | Full-stack developer | Stack: JavaScript ES6, React (hooks, router, async), JWT Auth | Ruby on Rails | PostgreSQL | CD | Git   
            </div>
         </>
      )
   }
}
