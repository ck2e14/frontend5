import React from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker, Circle } from "google-maps-react";
import "./ShowMap.css";

class ShowMap extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         establishments: [],
         showingInfoWindow: false,
         activeMarker: {},
         selectedPlace: {},
         selectedPlaceRating: "",
         selectedPlaceType: "",
         finishedSetState: false,
         userLocation: true,
         youAreHereMsgDisplay: false,
         recenterToHere: {
            lat: this.props.latitude,
            lng: this.props.longitude,
         },
      };
   }

   componentDidMount() {
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true,
         mapZoom: this.props.latitude ? 14 : 5,
         // userLocation: this.props.userLocation && this.props.userLocation
      });
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps === this.props) return;
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true,
         activeMarker: {},
         showingInfoWindow: false,
         recenterToHere: {
            lat: this.props.latitude,
            lng: this.props.longitude,
         },
         mapZoom: this.props.estabs?.length > 1 && 12,
      });
   }

   onMarkerClick = (props, marker, e) => {
      this.props.interpolateIdFromMarkerToFilter(marker.id);
      return this.setState({
         selectedPlace: props,
         selectedPlaceRating: props.rating,
         selectedPlaceType: props.type_of,
         activeMarker: marker,
         showingInfoWindow: true,
      });
   };

   onClose = props => {
      if (this.state.showingInfoWindow) {
         this.props.interpolateIdFromMarkerToFilter("");
         return this.setState({
            showingInfoWindow: false,
            activeMarker: null,
         });
      }
   };

   displayMarkers = () => {
      if (!this.state.establishments) return null;
      return this.state.establishments.map((estab, index) => {
         return (
            <Marker
               key={index}
               id={estab.id}
               position={{
                  lat: estab.latitude,
                  lng: estab.longitude,
               }}
               onClick={this.onMarkerClick}
               name={estab.name}
               rating={estab.ratingValue}
               typeOf={estab.type_of}
            />
         );
      });
   };

   youAreHereCircleEnter = () => {
      this.setState({ youAreHereMsgDisplay: true });
      setTimeout(() => {
         this.setState({ youAreHereMsgDisplay: false });
      }, 3000);
   };

   displayMyLocationMarker = () => {
      let coords = {
         lat: this.props.youAreHere.lat,
         lng: this.props.youAreHere.lng,
      };
      return (
         <Circle
            radius={400}
            center={coords}
            // onMouseover={() => this.props.handleYouAreHereHover()}
            // onMouseover={() => this.youAreHereCircleEnter()}
            // onClick={() => this.youAreHereCircleClick()}
            // onMouseout={() => this.youAreHereCircleLeave()}
            strokeColor='transparent'
            strokeOpacity={0}
            strokeWeight={5}
            fillColor='rgb(221, 158, 23)'
            fillOpacity={0.7}
         />
      );
   };

   render() {
      const mapStyles = {
         width: "100%",
         height: "100%",
         borderRadius: "10px",
         // border: '5px solid #3ddef6'
      };

      return (
         <div className='main-map-div'>
            {/* {this.props.youAreHere.lat !== '' && (
               <div className="youAreHereMsg-container">
                  TEST
               </div>
            )} */}
            {this.state.finishedSetState ? (
               <Map
                  google={this.props.google}
                  zoom={this.state.mapZoom}
                  style={mapStyles}
                  yesIWantToUseGoogleMapApiInternals
                  defaultMapTypeId='satellite'
                  initialCenter={{
                     lat: this.props.latitude || 54.4862,
                     lng: this.props.longitude || -3.8904,
                  }}
                  center={{
                     lat: this.props.latitude,
                     lng: this.props.longitude,
                  }}>
                  {this.displayMarkers()}
                  {this.props.youAreHere && this.displayMyLocationMarker()}
                  <InfoWindow
                     marker={this.state.activeMarker}
                     visible={this.state.showingInfoWindow}
                     onClose={this.onClose}>
                     <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <h4>Hygiene Rating: {this.state.selectedPlaceRating}</h4>
                        <h4>Type: {this.state.selectedPlace.typeOf}</h4>
                     </div>
                  </InfoWindow>
               </Map>
            ) : null}
         </div>
      );
   }
}

export default GoogleApiWrapper({
   apiKey: "AIzaSyCYAoS5qLokXR7YPVpa4IBt2BRxLsY89hE",
})(ShowMap);
