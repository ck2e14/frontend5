import React from "react";
import API from "../../adapters/API";
import EstabContainer from "../establishments/EstabContainer";
import ShowMap from "../map/ShowMap";
import NewNavbar from "../NavBar/NewNavBar";
import NavBarV2 from "../NavBar/NavBarV2/NavBarV2";
import WelcomeMsg from "../WelcomeMsg/WelcomeMsg";
import helpIcon from "../../Assets/helpIcon.png";
import "./Home-style.css";
import WelcomeMSg from "../WelcomeMsg/WelcomeMsg";
// TODO: REMOVE the filter methods and put them in their own file so you can just call them in here, not express them too. De-clutter this component man!
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
         addPubsToFilter: false,
         addCaringPremsToFilter: false,
         addTakeawaysToFilter: false,
         addDistribsToFilter: false,
         addEducationToFilter: false,
         addRestaurantsToFilter: false,
         addHotelsToFilter: false,
         addMobileToFilter: false,
         addMarketsToFilter: false,
         addAllToFilter: false,
         geolocationFailure: false,
         recenterToGeocode: {},
         displayWelcomeMessage: this.props.displayShader,
         displayShader: this.props.displayShader,
      };
   }

   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   };

   shaderClick = () => {
      this.setState({
         displayShader: !this.state.displayShader,
         displayWelcomeMessage: !this.state.displayWelcomeMessage,
      });
   };

   handleEstabCardClick = (estabObject) => {
      // console.log(estabObject)
      return this.setState({
         filter: estabObject.name,
         selectedEstabToSendToMapCenter: estabObject,
      });
      // this method interpolates the name of the clicked establishment into 'search' state
      // key. the filterEstabs method is always controlling which establishment objects
      // are passed down to the map components, therefore this method isolates map markers
      // per estab click.
   };

   handleBlacklistClick = (estabObject, event) => {
      event.stopPropagation();
      API.newEstab(estabObject, this.props.user.id);
      alert(
         `${estabObject.name} has been blacklisted. Visit your blacklist if you wish to remove it.`
      );
      this.setState({ filter: "" });
   };

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
            (location) => {
               API.autoGetEstabs(location).then((estabs) =>
                  this.setState({
                     establishments: estabs,
                     currentLatitude: location.coords.latitude,
                     currentLongitude: location.coords.longitude,
                     finishedFetch: true,
                     currentUserId: this.props.user.id,
                  })
               );
            },
            () => this.unavailableGeolocation(),
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
         );
      }
   }

   handleSearchAddressSubmit = (event) => {
      event.preventDefault();
      this.setState({ finishedFetch: false });
      this.setEstablishmentsFromAddressSearch(this.state.search);
   };

   addressGoClick = () => {
      this.setEstablishmentsFromAddressSearch(this.state.search);
   };

   setEstablishmentsFromAddressSearch = (search) => {
      this.clearFilterWithClick();
      API.getLatLongFromGeocode(this.state.search).then((locationObject) =>
         this.setState({
            currentLongitude: locationObject.geocodedLongitude,
            currentLatitude: locationObject.geocodedLatitude,
         })
      );
      API.getEstabsFromAddress(search).then((estabs) =>
         this.setState({
            establishments: estabs,
            finishedFetch: true,
            currentUserId: this.props.user.id,
         })
      );
   };

   escapeClick = (event) => {
      this.setState({ displayWelcomeMessage: false, displayShader: false });
   };

   clearFilterWithClick = () => {
      this.setState({ filter: "" });
   };

   interpolateMarkerToFilter = (searchTerm) => {
      this.setState({ filter: searchTerm });
   };

   filteredEstabs = (filter) => {
      const lower = filter.toLowerCase();
      return this.state.establishments
         ? this.state.establishments.filter((estab) => {
              return estab.name.toLowerCase().includes(lower);
           })
         : null;
   };

   filterEstabsByType = () => {
      // TODO: Fix the selectAll checkbox functionality
      // const s = this.state
      // if(s.addCaringPremsToFilter, s.addTakeawaysToFilter, s.addDistribsToFilter, s.addEducationToFilter, s.addHotelsToFilter, s.addRestaurantsToFilter, s.addMarketsToFilter, s.addMobileToFilter === true) {
      //    this.setState({addAllToFilter: false})
      // }
      const pubs = this.state.addPubsToFilter ? "Pub/bar/nightclub" : "";
      const caringPrems = this.state.addCaringPremsToFilter
         ? "Caring Premises"
         : "";
      const takeaways = this.state.addTakeawaysToFilter
         ? "Takeaway/sandwich shop"
         : "";
      const distributors = this.state.addDistribsToFilter
         ? "Distributors/Transporters"
         : "";
      const education = this.state.addEducationToFilter
         ? "School/college/university"
         : "";
      const hotels = this.state.addHotelsToFilter
         ? "Hotel/bed & breakfast/guest house"
         : "";
      const mobilePrems = this.state.addMobileToFilter ? "Mobile caterer" : "";
      const supermarkets = this.state.addMarketsToFilter
         ? "Retailers - supermarkets/hypermarkets"
         : "";
      const restaurants = this.state.addRestaurantsToFilter
         ? "Restaurant/Cafe/Canteen"
         : "";

      if (
         pubs === "" &&
         caringPrems === "" &&
         takeaways === "" &&
         distributors === "" &&
         education === "" &&
         hotels === "" &&
         mobilePrems === "" &&
         supermarkets === "" &&
         restaurants === ""
      )
         return this.filteredEstabs(this.state.filter);

      return this.filteredEstabs(this.state.filter).filter((estab) => {
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

   handleFilterCheckboxChange = (event) => {
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

   componentDidMount() {
      // this.setEstablishmentsFromYourLocation();
   }

   render() {
      const { filter } = this.state;
      const { search } = this.state;
      const { displayShader } = this.state;
      const { displayWelcomeMessage } = this.state;
      return (
         <>
            <div className='hygenik-title-bar'>
               <span></span>Hygenik<span>.</span>com
            </div>
            {/* <img
               src={helpIcon}
               onClick={this.shaderClick}
               alt='About Hygenik'
               className='help-icon'
            /> */}

            {displayShader && (
               <div className='shader-layer' onClick={this.shaderClick}></div>
            )}

            {displayWelcomeMessage && (
               <WelcomeMSg
                  shaderClick={this.shaderClick}
                  username={this.props.user.username}
               />
            )}

            <div className='big-div'>
               {this.props.user ? (
                  <NavBarV2 user={this.props.user} logout={this.props.logout} />
               ) : null}

               <div className='primary-content-wrapper'>
                  <div className='filter-elements'>
                     <div
                        className='click-for-location-find'
                        onClick={() =>
                           this.setEstablishmentsFromYourLocation()
                        }>
                        Use My Location
                     </div>

                     <form
                        onSubmit={(event) =>
                           this.handleSearchAddressSubmit(event)
                        }>
                        <input
                           className='search-by-address'
                           tabIndex='1'
                           placeholder='Search Placename'
                           type='text'
                           name='search'
                           value={search}
                           onChange={this.handleChange}
                        />
                     </form>

                     {this.state.establishments ? (
                        this.state.establishments.length > 1 ? (
                           <form>
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
                        ) : null
                     ) : null}
                     {this.state.search.length > 0 ? (
                        <div
                           className='submit-button'
                           onClick={(event) => this.addressGoClick(event)}>
                           GO
                        </div>
                     ) : null}

                     {this.state.filter.length >= 1 ? (
                        <div
                           className='clear-search-button'
                           title='Clear Filter'
                           onClick={this.clearFilterWithClick}>
                           &times;
                        </div>
                     ) : null}
                  </div>
                  {this.state.establishments.length > 1 && (
                     <div className='typeOf-inputs-container'>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addPubsToFilter'
                              name='addPubsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addPubsToFilter}
                           />
                           <label for='addPubsToFilter'>
                              Pubs, Bars & Nightclubs
                           </label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addRestaurantsToFilter'
                              name='addRestaurantsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addRestaurantsToFilter}
                           />
                           <label for='addRestaurantsToFilter'>
                              Restaurants & Cafes
                           </label>
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
                           <label for='addCaringPremsToFilter'>
                              Care Premises
                           </label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addDistribsToFilter'
                              name='addDistribsToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addDistribsToFilter}
                           />
                           <label for='addDistribsToFilter'>
                              Distributors & Transporters
                           </label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addMobileToFilter'
                              name='addMobileToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addMobileToFilter}
                           />
                           <label for='addMobileToFilter'>
                              Mobile Caterers
                           </label>
                        </div>
                        <div className='checkbox-container'>
                           <input
                              type='checkbox'
                              id='addEducationToFilter'
                              name='addEducationToFilter'
                              onChange={this.handleFilterCheckboxChange}
                              checked={this.state.addEducationToFilter}
                           />
                           <label for='addEducationToFilter'>
                              Education Premises
                           </label>
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
                     {this.state.finishedFetch ? (
                        <ShowMap
                           estabs={this.filterEstabsByType()}
                           latitude={this.state.currentLatitude}
                           longitude={this.state.currentLongitude}
                           interpolateMarker={this.interpolateMarkerToFilter}
                        />
                     ) : null}
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
               | Full-stack developer | Stack: JavaScript ES6, React (hooks,
               router, async), JWT Auth | Ruby on Rails API | PostgreSQL | CD |
               Git
            </div>
         </>
      );
   }
}
