import React from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
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
         recenterToHere: {
            lat: this.props.latitude,
            lng: this.props.longitude,
         },
         mapZoom: 14,
      };
   }

   componentDidMount() {
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true,
      });
   }

   componentDidUpdate(prevProps) {
      if (prevProps === this.props) return;
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true,
         recenterToHere: { 
            lat: this.props.latitude,
            lng: this.props.longitude,
         },
         mapZoom: this.props.estabs?.length > 1 ? (this.props.estabs.length > 200 ? 13 : 14) : 5,
      });
   }

   onMarkerClick = (props, marker, e) => {
      this.props.interpolateMarker(marker.name);
      // this.props.interpolateMarker(marker.id);
      console.log(marker.id);
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
         this.props.interpolateMarker("");
         return this.setState({
            showingInfoWindow: false,
            activeMarker: null,
         });
      }
   };

   displayMarkers = () => {
      if (!this.state.establishments) {
         // window.location.reload()
         return null;
      }
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

   render() {
      const mapStyles = {
         width: "100%",
         height: "100%",
         borderRadius: "10px",
         // border: '5px solid #3ddef6'
      };

      return (
         <div className='main-map-div'>
            {this.state.finishedSetState ? (
               <Map
                  google={this.props.google}
                  zoom={this.state.mapZoom}
                  style={mapStyles}
                  yesIWantToUseGoogleMapApiInternals
                  mapTypeId='terrain'
                  initialCenter={{
                     lat: this.props.latitude || 54.2361,
                     lng: this.props.longitude || 4.5481,
                  }}
                  center={{
                     lat: this.props.latitude,
                     lng: this.props.longitude,
                  }}>
                  {this.displayMarkers()}
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
