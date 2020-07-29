import React from "react"
import API from '../../adapters/API'
import EstabContainer from '../establishments/EstabContainer'
import ShowMap from '../map/ShowMap'
import NewNavbar from '../NavBar/NewNavBar'
// import Popup from '../BlacklistPopup/FeedbackPopup'
import './home.css'

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
         filter: "",
         search: "",
         geolocationFailure: false,
         recenterToGeocode: {}
      }
   }

   // generic handleChange handles all form inputs - ensure your 'name' attribute inline for the JSX input matches the state key you wanna put the values into
   handleChange = event => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }

   shaderClick = () => {
      this.setState({ displayShader: false, displayWelcomeMessage: false })
   }

   handlePremisesLookupClick = () => {
   }

   handleEstabCardClick = estabObject => {
      // console.log(estabObject)
      return this.setState({ 
         filter: estabObject.name, 
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
   setEstablishmentsFromYourLocation() {
      if (!navigator.geolocation) {
         console.log('Geolocation is not enabled by your browser');
         alert('Geolocation is not enabled by your browser. Please enable location services to use &nbsp; _Hygenik or enter a search term below. ')
      } else {
         console.log('Locating...')       
         window.navigator.geolocation.getCurrentPosition(location => {   
            API.autoGetEstabs(location)
               .then(estabs => this.setState({
                  establishments: estabs,
                  currentLatitude: location.coords.latitude, 
                  currentLongitude: location.coords.longitude,
                  finishedFetch: true,
                  currentUserId: this.props.user.id
               }))
         }, 
         () => alert('Geolocation failure. Please ensure _Hygenik has access to locations services and refresh the page, or enter a search term below.'),
         {'enableHighAccuracy':true,'timeout': 8000,'maximumAge':0}
         )   
      }
   }

   handleSearchAddressSubmit = event => {
      event.preventDefault()
      this.setState({ finishedFetch: false })
      this.setEstablishmentsFromAddressSearch(this.state.search)
      
   }

   setEstablishmentsFromAddressSearch = (search) => {
      this.clearFilterWithClick()
      API.getLatLongFromGeocode(search).then(locationObject => this.setState({
         currentLongitude: locationObject.geocodedLongitude,
         currentLatitude: locationObject.geocodedLatitude, 
      }))
      API.getEstabsFromAddress(search)
         .then(estabs => this.setState({
            establishments: estabs,
            finishedFetch: true,
            currentUserId: this.props.user.id,  
         }))
   }

   escapeClick = (event) => {
      this.setState({ displayWelcomeMessage: false, displayShader: false})
   }

   clearFilterWithClick = () => this.setState({ filter: '' })

   // interpolateMarkerToFilter is responsible for taking the marker click and pushing it into the search (controlled component) which in turn filters the establishments that are in state from the initial fetch (in the below method)
   interpolateMarkerToFilter = (searchTerm) => {
      this.setState({ filter: searchTerm })
   }

   filteredEstabs = search => {
      const lower = search.toLowerCase();
      return this.state.establishments ?
      this.state.establishments.filter(estab => {
         return estab.name.toLowerCase().includes(lower);
      }) : null;
   }

   componentDidMount(){
      this.setEstablishmentsFromYourLocation();
   }
   // TODO: put an event listener on the whole document on load for keypress. Then in the escapeClick method above put a check for esc keycode and if so trigger the setState
   
   render(){
      const {filter} = this.state
      const {search} = this.state
      return(
         <> 
            <div className='big-div'> 

               { this.props.user ? 
                  <NewNavbar user={this.props.user} logout={this.props.logout}/> 
               : 
                  null }

               <div className="filter-elements">

                  { this.state.establishments ?
                     <input className='filter-search' type="text" name="filter" tabIndex='1' placeholder="Filter results" position="left" float="left" value={filter} onChange={this.handleChange} />
                  : null }

                  <form onSubmit={event => this.handleSearchAddressSubmit(event)} className="address-search-form">
                     <input className="search-by-address filter-search" tabIndex='1' placeholder="Postcode/street/town" type="text" name="search"  value={search} onChange={this.handleChange}/>
                  </form>

                  { this.state.filter.length >= 1 ? 
                     <div className="clear-search-button" title='Clear Filter' onClick={this.clearFilterWithClick}>
                        X 
                     </div>
                  : null }
{/* 
                  <div className="search-by-address" onClick={() => this.setEstablishmentsFromAddressSearch('liverpool')}>
                     TEMP - REPLACE WITH INPUT.
                  </div> */}
               
               </div>
               
               <div className='primary-map-wrapper'>
                  { this.state.finishedFetch ? 
                     <EstabContainer 
                        user={this.props.user} 
                        handleEstabClick={this.handleEstabCardClick} 
                        handleBlacklistClick={this.handleBlacklistClick} 
                        establishments={this.filteredEstabs(filter)} 
                     /> 
                  :
                     <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                  }

                  { this.state.finishedFetch ? 
                     <ShowMap  
                        estabs={this.filteredEstabs(filter)} 
                        latitude={this.state.currentLatitude} 
                        longitude={this.state.currentLongitude} 
                        interpolateMarker={this.interpolateMarkerToFilter}
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

