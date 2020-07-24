import React from "react";
// import { compose, withProps, lifecycle } from "recompose";
import { Map, GoogleApiWrapper, InfoWindow, Marker, MarkerCluster } from 'google-maps-react';   
import container from '../establishments/container.css'
import './ShowMap.css'

class ShowMap extends React.Component {

   constructor(props){
      super(props)
      this.state = {
      establishments: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      selectedPlaceRating: '',
      selectedPlaceType: '',
      finishedSetState: false,
      recenterToHere: { lat: this.props.latitude, lng: this.props.longitude}
      }
   }

   componentDidMount(){
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true,
         // recenterToHere: {}
      })
   }

   componentDidUpdate(prevProps){
      if(prevProps === this.props) return
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true,
         recenterToHere: { 
            lat: this.props.recenterMapUponEstabClick.latitude,
            lng: this.props.recenterMapUponEstabClick.longitude
         }
      })
   }

   onMarkerClick = (props, marker, e) => {
      this.props.interpolateMarker(marker.name)
      return this.setState({
      selectedPlace: props,
      selectedPlaceRating: props.rating,
      selectedPlaceType: props.type_of,
      activeMarker: marker,
      showingInfoWindow: true
   });
   }

   onClose = props => {
      if (this.state.showingInfoWindow) {
         this.props.interpolateMarker('')
         return this.setState({
         showingInfoWindow: false,
         activeMarker: null
      });
      }
   };

   displayMarkers = () => {
      return this.state.establishments.map((estab, index) => {
         return <Marker key={index} id={estab.name} position={{
            lat: estab.latitude,
            lng: estab.longitude
         }}
         onClick={this.onMarkerClick}
         name={estab.name}
         rating={estab.ratingValue}
         typeOf={estab.type_of}
         // onClick={() => console.log(estab.id, estab.name)} 
         />
      })
   }
   
   render(){
      
      const mapStyles = {
         width: '60%',
         height: '83%',
         borderRadius: '20px',
         border: '5px solid #444444; '
      };

      return(
         <div className='main-map-div'>  
         {this.state.finishedSetState ?
            <Map
               google={this.props.google}
               zoom={14.5}
               style={mapStyles}
               yesIWantToUseGoogleMapApiInternals
               mapTypeId='terrain'
               initialCenter={{ lat: this.props.latitude, lng: this.props.longitude}}
               center={this.state.recenterToHere}
            >
         {this.displayMarkers()}
               <InfoWindow 
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
               >
                  <div>
                     <h1>{this.state.selectedPlace.name}</h1>
                     <h4>Hygiene Rating: {this.state.selectedPlaceRating}</h4>
                     <h4>Type: {this.state.selectedPlace.typeOf}</h4>
                  </div>
               </InfoWindow>
            </Map> 
         : 
            null 
         }
         </div>
      )
   }
}

export default GoogleApiWrapper({
   apiKey: 'AIzaSyCYAoS5qLokXR7YPVpa4IBt2BRxLsY89hE'
})(ShowMap)