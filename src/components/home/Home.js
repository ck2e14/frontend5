import React from "react";
import API from "../../adapters/API";
import EstabContainer from "../establishments/EstabContainer";
import ShowMap from "../map/ShowMap";
import NewNavbar from "../NavBar/NewNavBar";
import NavBarV2 from "../NavBar/NavBarV2/NavBarV2";
import WelcomeMsg from "../WelcomeMsg/WelcomeMsg";
import helpIcon from "../../Assets/helpIcon.png";
import AutoCompleteInput from "../AutoCompletePlaces/AutoCompletePlaces";
import "./Home-style.css";
import WelcomeMSg from "../WelcomeMsg/WelcomeMsg";
// TODO: REMOVE the filter methods and put them in their own file so you can just call them in here, not express them too. De-clutter this component man!
// TODO: Solve the annoying as fuck idea some scottish auths have for NOT BLOODY RECORDING PREMS' LAT/LONGS THUS NOT SHOWING UP AS RESULTS
// TODO: Take all the checkboxes into their own component, pass them the methods?
// TODO: Missing retail - other in checkboxes!!!
export default class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         establishments: [{ name: "Get Started!", id: "get-started" }],
         blacklist: [],
         finishedFetch: true,
         currentUserId: "",
         longitude: "",
         latitude: "",
         filter: "",
         search: "",
         userLocation: {lat: '', lng: ''},
         addPubsToFilter: false,
         addCaringPremsToFilter: false,
         addTakeawaysToFilter: false,
         addDistribsToFilter: false,
         addEducationToFilter: false,
         addRestaurantsToFilter: false,
         addHotelsToFilter: false,
         addMobileToFilter: false,
         addMarketsToFilter: false,
         addAllToFilter: true,
         addIdToFilter: false,
         geolocationFailure: false,
         recenterToGeocode: {},
         youAreHereMsgDisplay: false,
         // displayWelcomeMessage: this.props.displayShader,
         // displayShader: this.props.displayShader,
      };
   }

   // *** Methods for handling user-entered places *** //
   handleAutoCompleteInputChange = address => {
      this.setState({ search: address });
   };

   handleAutoCompleteInputSubmit = (address, latLng) => {
      this.setState({ search: address, currentLatitude: latLng.lat, currentLongitude: latLng.lng });
      this.setEstablishmentsFromAddressSearch(this.state.search);
   };

   addressGoClick = () => {
      this.setState({ finishedFetch: false });
      this.setEstablishmentsFromAddressSearch(this.state.search);
   };

   setEstablishmentsFromAddressSearch = search => {
      this.clearFilterWithClick();
      const latLongObj = {
         geocodedLongitude: this.state.currentLongitude,
         geocodedLatitude: this.state.currentLatitude,
      };
      API.getEstabsFromEnteredPlaceName(latLongObj).then(estabs => {
         this.setState({
            establishments: estabs,
            finishedFetch: true,
            currentUserId: this.props.user.id,
         });
      });
      // NO LONGER NEED TO HIT 3RD PARTY GEOCODE API, THIS ALREADY HAPPENS VIA THE AUTOCOMPLETE
   };
   // *** End of methods for handling user-entered places *** //




   // *** Methods for filtering returned establishments *** //
   interpolateIdFromMarkerToFilter = estabId => {
      this.setState({ addIdToFilter: estabId });
   };

   filteredEstabsByName = filter => {
      const lower = filter.toLowerCase();
      return this.state.establishments
         ? this.state.establishments.filter(estab => {
              return estab.name.toLowerCase().includes(lower);
           })
         : null;
   };

   filterEstabsByType = () => {
      // Explanation of this method:
      // (1) Without a filterID in state:
      //       It checks to see if any checkbox filters are active, if yes it
      //       adds the relevant string to the || conditional .filter(), which
      //       is executed on the returned array from filteredEstabsByName()
      //       and returns an array of matching estabs, i.e. runs two filters so as
      //       to include a user-typed-in filterbyname & user-selected checkboxes.
      // (2)With a filterID inside state:
      //       It ignores checkbox and 'byname' filters and returns a single element
      //       array containing the estab object that matches the passed in Id
      // (3)The EstabContainer component calls this.filterEstabsByType(). Any time
      //    one of the state keys called upon in this method changes, the method
      //    is fired again, changing the return & therefore what estabs are passed
      //    from state.establishments into the EstabContainer

      // TODO: Fix the selectAll checkbox functionality
      // const s = this.state
      // if(s.addCaringPremsToFilter, s.addTakeawaysToFilter, s.addDistribsToFilter, s.addEducationToFilter, s.addHotelsToFilter, s.addRestaurantsToFilter, s.addMarketsToFilter, s.addMobileToFilter === true) {
      //    this.setState({addAllToFilter: false})
      // }
      const pubs = this.state.addPubsToFilter ? "Pub/bar/nightclub" : "";
      const caringPrems = this.state.addCaringPremsToFilter ? "Caring Premises" : "";
      const takeaways = this.state.addTakeawaysToFilter ? "Takeaway/sandwich shop" : "";
      const distributors = this.state.addDistribsToFilter ? "Distributors/Transporters" : "";
      const education = this.state.addEducationToFilter ? "School/college/university" : "";
      const hotels = this.state.addHotelsToFilter ? "Hotel/bed & breakfast/guest house" : "";
      const mobilePrems = this.state.addMobileToFilter ? "Mobile caterer" : "";
      const supermarkets = this.state.addMarketsToFilter ? "Retailers - supermarkets/hypermarkets" : "";
      const restaurants = this.state.addRestaurantsToFilter ? "Restaurant/Cafe/Canteen" : "";
      const establishmentID = this.state.addIdToFilter;

      if (establishmentID) {
         return this.state.establishments?.filter(estab => {
            return estab.id === establishmentID;
         });
      }

      if (
         pubs === "" &&
         caringPrems === "" &&
         takeaways === "" &&
         distributors === "" &&
         education === "" &&
         hotels === "" &&
         mobilePrems === "" &&
         supermarkets === "" &&
         restaurants === "" &&
         !establishmentID
      )
         return this.filteredEstabsByName(this.state.filter);

      return this.filteredEstabsByName(this.state.filter)?.filter(estab => {
         return (
            estab.type_of === pubs ||
            estab.type_of === caringPrems ||
            estab.type_of === takeaways ||
            estab.type_of === distributors ||
            estab.type_of === education ||
            estab.type_of === hotels ||
            estab.type_of === mobilePrems ||
            estab.type_of === supermarkets ||
            estab.type_of === restaurants
         );
      });
   };

   handleFilterCheckboxChange = event => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState({
         [name]: value,
      });
   };

   addAllToFilter = () => {
      this.setState({
         addAllToFilter: true,
         addPubsToFilter: true,
         addCaringPremsToFilter: true,
         addTakeawaysToFilter: true,
         addDistribsToFilter: true,
         addEducationToFilter: true,
         addRestaurantsToFilter: true,
         addHotelsToFilter: true,
         addMobileToFilter: true,
         addMarketsToFilter: true,
      });
   };

   clearFilterWithClick = () => {
      this.setState({ filter: "", addIdToFilter: false });
   };

   handleEstabCardClick = estabObject => {
      return this.setState({
         addIdToFilter: estabObject.id,
         selectedEstabToSendToMapCenter: estabObject,
      });
   };
   // *** End of Methods for filtering returned establishments *** //




   // *** Methods for getting estabs from your geolocation data *** //
   unavailableGeolocation() {
      this.setState({ finishedFetch: true });
      alert(
         "Please enable location services in your browser settings. This site is secured via HTTPS, and at no point stores or shares your geolocation data. Thank you!"
      );
   }
   // geolocation takes three args:
   // (1)mandatory success callback,
   // (2)optional error callback and
   // (3)an object with PositionOptions
   setEstablishmentsFromYourLocation() {
      this.setState({ search: "" });
      if (!navigator.geolocation) {
         console.log("Geolocation is not enabled by your browser");
         alert(
            "Please enable location services in your browser settings. This site is secured via HTTPS, and at no point stores or shares your geolocation data. Thank you!"
         );
         this.unavailableGeolocation();
      } else {
         console.log("Locating...");
         this.setState({ finishedFetch: false });
         window.navigator.geolocation.getCurrentPosition(
            location => {
               API.autoGetEstabs(location).then(estabs =>
                  this.setState({
                     establishments: estabs,
                     currentLatitude: location.coords.latitude,
                     currentLongitude: location.coords.longitude,
                     finishedFetch: true,
                     currentUserId: this.props.user.id,
                     userLocation: {lat: location.coords.latitude, lng: location.coords.longitude,}
                  })
               );
            },
            () => this.unavailableGeolocation(),
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
         );
      }
   }
   // *** End of Methods for getting estabs from your geolocation data *** //



   
   escapeClick = event => {
      this.setState({ displayWelcomeMessage: false, displayShader: false });
   };

   shaderClick = () => {
      this.setState({
         displayShader: !this.state.displayShader,
         displayWelcomeMessage: !this.state.displayWelcomeMessage,
      });
   };

   handleBlacklistClick = (estabObject, event) => {
      event.stopPropagation();
      API.newEstab(estabObject, this.props.user.id);
      alert(`${estabObject.name} has been blacklisted. Visit your blacklist if you wish to remove it.`);
      this.setState({ filter: "" });
   };

   handleChange = event => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   };

   render() {
      const { filter } = this.state;
      const { search } = this.state;
      const { displayShader } = this.state;
      const { displayWelcomeMessage } = this.state;
      return (
         <>
            {this.state.youAreHereMsgDisplay && <div className='youAreHereMsg-container'>TEST</div>}
            <div className='hygenik-title-bar'>
               <span></span>Hygenik<span>.</span>com
            </div>

            <img src={helpIcon} onClick={this.shaderClick} alt='About Hygenik' className='help-icon' />

            {displayShader && <div className='shader-layer' onClick={this.shaderClick}></div>}

            {displayWelcomeMessage && (
               <WelcomeMSg shaderClick={this.shaderClick} username={this.props.user.username} />
            )}

            <div className='big-div'>
               {this.props.user && <NavBarV2 user={this.props.user} logout={this.props.logout} />}

               <div className='primary-content-wrapper'>
                  <div className='filter-elements'>
                     <div
                        className='click-for-location-find'
                        onClick={() => this.setEstablishmentsFromYourLocation()}>
                        Use My Location
                     </div>
                     <AutoCompleteInput
                        className={"autocomplete-input"}
                        handleChange={this.handleAutoCompleteInputChange}
                        handleSubmit={this.handleAutoCompleteInputSubmit}
                        value={this.state.search}
                        fetchFromFSA={this.addressGoClick}
                     />

                     {this.state.establishments?.length > 1 && (
                        <form onSubmit={e => e.preventDefault(e)}>
                           <input
                              className='filter-search'
                              type='text'
                              name='filter'
                              tabIndex='1'
                              placeholder='Filter results by name'
                              position='left'
                              float='left'
                              value={filter}
                              onChange={this.handleChange}
                           />
                        </form>
                     )}

                     {this.state.search?.length > 0 && (
                        <div className='submit-button' onClick={event => this.addressGoClick(event)}>
                           GO
                        </div>
                     )}

                     {(this.state.addIdToFilter || this.state.filter.length > 0) && (
                        <div
                           className='clear-search-button'
                           title='Clear Filter'
                           onClick={this.clearFilterWithClick}>
                           Return to All Results
                        </div>
                     )}
                  </div>
                  {this.state.finishedFetch && (
                     <div className='typeOf-inputs-container'>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addPubsToFilter'
                              name='addPubsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addPubsToFilter}
                           />
                           <label for='addPubsToFilter'>Pubs, Bars & Nightclubs</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addRestaurantsToFilter'
                              name='addRestaurantsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addRestaurantsToFilter}
                           />
                           <label for='addRestaurantsToFilter'>Restaurants & Cafes</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addMarketsToFilter'
                              name='addMarketsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addMarketsToFilter}
                           />
                           <label for='addMarketsToFilter'>Supermarkets</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addHotelsToFilter'
                              name='addHotelsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addHotelsToFilter}
                           />
                           <label for='addHotelsToFilter'>Hotels/B&Bs</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addTakeawaysToFilter'
                              name='addTakeawaysToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addTakeawaysToFilter}
                           />
                           <label for='addTakeawaysToFilter'>Takeaways</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addCaringPremsToFilter'
                              name='addCaringPremsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addCaringPremsToFilter}
                           />
                           <label for='addCaringPremsToFilter'>Care Premises</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addDistribsToFilter'
                              name='addDistribsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addDistribsToFilter}
                           />
                           <label for='addDistribsToFilter'>Distributors & Transporters</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addMobileToFilter'
                              name='addMobileToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addMobileToFilter}
                           />
                           <label for='addMobileToFilter'>Mobile Caterers</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addEducationToFilter'
                              name='addEducationToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addEducationToFilter}
                           />
                           <label for='addEducationToFilter'>Education Premises</label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addAllToFilter'
                              name='addAllToFilter'
                              onChange={this.addAllToFilter}
                              checked={this.state.addAllToFilter}
                           />
                           <label for='addAllToFilter'>Select All</label>
                        </div>
                        {/* <div className='checkbox-container'>
                        <input
                           type='checkbox'
                           id='removeAllFromFilter'
                           name='removeAllFromFilter'
                           onChange={this.addAllToFilter}
                           checked={this.state.removeAllFromFilter}
                        />
                        <label for='removeAllFromFilter'>
                           Remove All
                        </label>
                     </div> */}
                     </div>
                  )}

                  {this.state.finishedFetch ? (
                     <EstabContainer
                        user={this.props.user}
                        handleEstabClick={this.handleEstabCardClick}
                        handleBlacklistClick={this.handleBlacklistClick}
                        establishments={this.filterEstabsByType()}
                     />
                  ) : (
                     <div className='lds-ring'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                     </div>
                  )}

                  <div className='map-wrapper'>
                     {this.state.finishedFetch && (
                        <ShowMap
                           estabs={this.filterEstabsByType()}
                           latitude={this.state.currentLatitude}
                           longitude={this.state.currentLongitude}
                           interpolateIdFromMarkerToFilter={this.interpolateIdFromMarkerToFilter}
                           youAreHere={this.state.userLocation}
                        />
                     )}
                  </div>
               </div>
            </div>

            <div className='bot-bar'>
               <a
                  href='https://chriskennedy.live'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='portfolio-link'>
                  Chris Kennedy
               </a>{" "}
               | Full-stack developer | Stack: JavaScript ES6, React (hooks, router, async), JWT Auth | Ruby
               on Rails API | PostgreSQL | CD | Git
            </div>
         </>
      );
   }
}
