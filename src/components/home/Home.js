import React from "react"
import API from '../../adapters/API'
import EstabContainer from '../establishments/EstabContainer'
import ShowMap from '../map/ShowMap'
import NewNavbar from '../NavBar/NewNavBar'
import helpIcon from '../../Assets/helpIcon.png'
import './home.css'
// import handwash from '../../Assets/handwash.jpg'
// import Popup from '../BlacklistPopup/FeedbackPopup'

export default class Home extends React.Component {

   constructor(props){
      super(props)
      this.state = { 
         establishments: [{ name: 'Get Started!' }],
         blacklist: [],
         finishedFetch: true,
         currentUserId: '',
         longitude: '',
         latitude: '',
         filter: "",
         search: "",
         geolocationFailure: false,
         recenterToGeocode: {},
         displayWelcomeMessage: this.props.displayShader,
         displayShader: this.props.displayShader,
      }
   }
   // generic handleChange handles all form inputs - ensure your 'name' attribute inline for the JSX input matches the state key you wanna put the values into
   handleChange = event => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }

   shaderClick = () => {
      this.setState({ displayShader: !this.state.displayShader, displayWelcomeMessage: !this.state.displayWelcomeMessage })
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
      API.newEstab(estabObject, this.props.user.id)
      alert(`${estabObject.name} has been blacklisted. Visit your blacklist if you wish to remove it.`)
      this.setState({ filter: '' }) 
   }
   // geolocation takes three args here - mandatory success callback, optional error callback and an object with PositionOptions
   setEstablishmentsFromYourLocation() {
      if (!navigator.geolocation) {
         console.log('Geolocation is not enabled by your browser');
         alert('Geolocation is not enabled by your browser. Please enable location services to use &nbsp; _Hygenik or enter a search term below. ')
      } else {
         console.log('Locating...')      
         this.setState({finishedFetch: false}) 
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
         () => alert('Geolocation failure. Please ensure _Hygenik has access to locations services and hard-refresh the page (clearing cache) or enter a search term below.'),
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
            currentUserId: this.props.user.id
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
      // this.setEstablishmentsFromYourLocation(); 
   }
   // TODO: put an event listener on the whole document on load for keypress. Then in the escapeClick method above put a check for esc keycode and if so trigger the setState
   
   render(){
      const {filter} = this.state
      const {search} = this.state
      const {displayShader} = this.state
      const {displayWelcomeMessage} = this.state
      return(
         <> 
            <img src={helpIcon} onClick={this.shaderClick} alt="About Hygenik" className="help-icon"/>

         { displayShader ? <div className="shader-layer" onClick={this.shaderClick}></div> : null }

         { displayWelcomeMessage ? 
            <div className="explanation-and-welcome">
      <div className="escape-key" onClick={() => this.shaderClick()}>X</div>
      <span> Welcome to  &nbsp;  _Hygenik!</span> <br/><br/>

      <span className='highlight-this'>I hope you find this app useful for exploring the FSA-assessed hygiene ratings of places to eat near you - particularly considering the current situation. <br/><br/>

      On that note - since March, the FSA have experienced a big surge in the number of requests made to their resources. At peak usage requests are being dynamically throttled. <br/><br/>Unfortunately this may mean waiting longer than usual to load, or the service may be made temporarily unavailable entirely. Please refresh / hard refresh the page after a couple of minutes if that is the case - hopefully the throttling will have been relaxed!
      <br/><br/>
      This app remains in development. Please report any bugs you encounter to <a href="mailto:chriswkennedy@icloud.com">Chris Kennedy.</a> Suggestions are also welcome! Thanks!<br/><br/>
      More information can be found <a  target="_blank" rel="noopener noreferrer"href="https://api.ratings.food.gov.uk/Help/Status" className="fsa-link">here.</a></span> 
      <br/><br/>
      Please note: NO personal data is stored by Hygenik. Using location services improves the utility and flow of the app, but if you would prefer to search manually feel free to revoke location services in your browser. 
      {/* Please also note that Heroku unloads apps from its servers when they haven't been very recently accessed - you may have experienced longer loading times of the website itself because of this upon initial visit.  */}
   </div>  : null }

            <div className='big-div'> 
            {/* <img src={handwash} alt="" className="background"/> */}

               { this.props.user ? 
                  <NewNavbar user={this.props.user} logout={this.props.logout}/> 
               : 
                  null }

               <div className="filter-elements">

                  <div className="click-for-location-find" onClick={() => this.setEstablishmentsFromYourLocation()} >
                     Use My Location
                  </div>

                  { this.state.establishments ?
                     this.state.establishments.length > 1 ? 
                        <input className='filter-search' type="text" name="filter" tabIndex='1' placeholder="Filter results by name" position="left" float="left" value={filter} onChange={this.handleChange} />
                     : null
                  : null }

                  <form onSubmit={event => this.handleSearchAddressSubmit(event)} className="address-search-form">
                     <input className="search-by-address filter-search" tabIndex='1' placeholder="Search Placename" type="text" name="search"  value={search} onChange={this.handleChange}/>
                  </form>

                  {this.state.search.length > 0 ?
                     <div className="submit-button">GO</div>  
                  : null }

                  { this.state.filter.length >= 1 ? 
                     <div className="clear-search-button" title='Clear Filter' onClick={this.clearFilterWithClick}>
                        X 
                     </div>
                  : null }
               
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

