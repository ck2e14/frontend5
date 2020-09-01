import React from "react";
import API from "../../adapters/API";
import EstabContainer from "../establishments/EstabContainer";
import ShowMap from "../map/ShowMap";
import NewNavbar from "../NavBar/NewNavBar";
import WelcomeMsg from "../WelcomeMsg/WelcomeMsg";
import helpIcon from "../../Assets/helpIcon.png";
import "./home.css";
import WelcomeMSg from "../WelcomeMsg/WelcomeMsg";
// import handwash from '../../Assets/handwash.jpg'
// import Popup from '../BlacklistPopup/FeedbackPopup'

export default class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         establishments: [{ name: "Get Started!" }],
         blacklist: [],
         finishedFetch: true,
         currentUserId: "",
         longitude: "",
         latitude: "",
         filter: "",
         search: "",
         type1: false,
         type2: false,
         type3: false,
         geolocationFailure: false,
         recenterToGeocode: {},
         displayWelcomeMessage: this.props.displayShader,
         displayShader: this.props.displayShader,
      };
   }
   // generic handleChange handles all form inputs - ensure your 'name' attribute inline for the JSX input matches the state key you wanna put the values into
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

   clearFilterWithClick = () => this.setState({ filter: "" });

   // interpolateMarkerToFilter is responsible for taking the marker click and pushing it into the search (controlled component) which in turn filters the establishments that are in state from the initial fetch (in the below method)
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

   // write function that interpolates arguments into the === comparison,
   // up to 3 args, with defaults to empty strings
   // make a UI component of some kind that will pass user's type selections into this function 
   // the below method DOES WORK but only when hardcoding the function call inside the establishments
   // props passed to the EstabContainer component. 
   // *** I.E. 
   //          establishments={this.filterEstabsByType('Restaurant/Cafe/Canteen', 'Pub/bar/nightclub', 'Caring Premises')}
   // ***
   
   // It's far less verbose than the if statement-loaded old filterEstabsByType method. Improve this by making a tickbox which adds selections (if made) to 3 separate state keys which are initialised as empty strings, and then use those in place of the default args. 
   filterEstabsByType = () => {
      const type1 = this.state.type1
      const type2 = this.state.type2
      const type3 = this.state.type3
      if(type1 === false && type2 === false && type3 === false) return this.filteredEstabs(this.state.filter);
      return this.filteredEstabs(this.state.filter).filter((estab) => {
         return estab.type_of === type1 || estab.type_of === type2 || estab.type_of === type3;
      })
   }


   // filterEstabsByType = (type1="", type2="", type3="") => {
   //    return this.filteredEstabs(this.state.filter).filter((estab) => {
   //       return estab.type_of === type1 || estab.type_of === type2 || estab.type_of === type3;
   //    })
   // }

   // filterEstabsByType = () => {
   //    const typeOfEstab = this.state.type;
   //    if (typeOfEstab === "all") {
   //       return this.filteredEstabs(this.state.filter);
   //    }
   //    if (typeOfEstab === "Caring Premises") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Caring Premises";
   //       });
   //    }
   //    if (typeOfEstab === "Pub/bar/nightclub/restaurant/cafe") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Pub/bar/nightclub" || estab.type_of === "";
   //       });
   //    }
   //    if (typeOfEstab === "Takeaway/sandwich shop") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Takeaway/sandwich shop";
   //       });
   //    }
   //    if (typeOfEstab === "Misc") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Other catering premises";
   //       });
   //    }
   //    if (typeOfEstab === "School/college/university") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "School/college/university";
   //       });
   //    }
   //    if (typeOfEstab === "Hotel/bed & breakfast/guest house") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Hotel/bed & breakfast/guest house";
   //       });
   //    }
   //    if (typeOfEstab === "Restaurant/Cafe/Canteen") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Restaurant/Cafe/Canteen";
   //       });
   //    }
   //    if (typeOfEstab === "Retail") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          if (!estab.type_of) return null;
   //          return estab.type_of.includes("Retailers");
   //       });
   //    }
   //    if (typeOfEstab === "Distributors/Transporters") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Distributors/Transporters";
   //       });
   //    }
   //    if (typeOfEstab === "Hospitals/Childcare/Caring Premises") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Hospitals/Childcare/Caring Premises";
   //       });
   //    }
   //    if (typeOfEstab === "Importers/Exporters") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Importers/Exporters";
   //       });
   //    }
   //    if (typeOfEstab === "Manufacturers/packers") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Manufacturers/packers";
   //       });
   //    }
   //    if (typeOfEstab === "Mobile caterer") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Mobile caterer";
   //       });
   //    }
   //    if (typeOfEstab === "Farmers/growers") {
   //       return this.filteredEstabs(this.state.filter).filter((estab) => {
   //          return estab.type_of === "Farmers/growers";
   //       });
   //    }
   // };

   componentDidMount() {
      // this.setEstablishmentsFromYourLocation();
   }
   // TODO: put an event listener on the whole document on load for keypress. Then in the escapeClick method above put a check for esc keycode and if so trigger the setState

   render() {
      const { filter } = this.state;
      const { search } = this.state;
      const { displayShader } = this.state;
      const { displayWelcomeMessage } = this.state;
      return (
         <>
            <img
               src={helpIcon}
               onClick={this.shaderClick}
               alt='About Hygenik'
               className='help-icon'
            />

            {displayShader ? (
               <div className='shader-layer' onClick={this.shaderClick}></div>
            ) : null}

            {displayWelcomeMessage && (
               <WelcomeMSg
                  shaderClick={this.shaderClick}
                  username={this.props.user.username}
               />
            )}

            <div className='big-div'>
               {this.props.user ? (
                  <NewNavbar
                     user={this.props.user}
                     logout={this.props.logout}
                  />
               ) : null}

               <div className='filter-elements'>
                  <div
                     className='click-for-location-find'
                     onClick={() => this.setEstablishmentsFromYourLocation()}>
                     Use My Location
                  </div>

                  {this.state.establishments ? (
                     this.state.establishments.length > 1 ? (
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
                     ) : null
                  ) : null}

                  <form
                     onSubmit={(event) => this.handleSearchAddressSubmit(event)}
                     className='address-search-form'>
                     <input
                        className='search-by-address filter-search'
                        tabIndex='1'
                        placeholder='Search Placename'
                        type='text'
                        name='search'
                        value={search}
                        onChange={this.handleChange}
                     />
                  </form>
                  
                  <input type="text" onChange={this.handleChange} name="type1" className="type-changer"/>

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
                        X
                     </div>
                  ) : null}
               </div>

               <div className='primary-map-wrapper'>
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
