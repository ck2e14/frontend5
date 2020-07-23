import React from "react";
// import { compose, withProps, lifecycle } from "recompose";
import { Map, GoogleApiWrapper, InfoWindow, Marker, MarkerCluster } from 'google-maps-react';   
import container from '../establishments/container.css'
import './ShowMap.css'


class ShowMap extends React.Component {

   constructor(){
      super()
      this.state = {
      establishments: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      selectedPlaceRating: '',
      selectedPlaceType: '',
      finishedSetState: false,

   }
}

   componentDidMount(){
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true

      })
   }

   componentDidUpdate(prevProps){
      if(prevProps === this.props) return
      this.setState({
         establishments: this.props.estabs,
         finishedSetState: true

      })
   }

   onMarkerClick = (props, marker, e) =>
      this.setState({
      selectedPlace: props,
      selectedPlaceRating: props.rating,
      selectedPlaceType: props.type_of,
      activeMarker: marker,
      showingInfoWindow: true
   });

   onClose = props => {
      if (this.state.showingInfoWindow) {
      this.setState({
         showingInfoWindow: false,
         activeMarker: null
      });
      }
   };

   displayMarkers = () => {
      return this.state.establishments.map((estab, index) => {
         return <Marker key={index} id={index} position={{
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
         border: '5px solid #524632'
      };

      return(
         <div className='main-map-div'>  
         {this.state.finishedSetState ?
            <Map
               google={this.props.google}
               zoom={15.5}
               style={mapStyles}
               mapTypeId='satellite'
               initialCenter={{ lat: this.props.latitude, lng: this.props.longitude}}
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
                     <h5>Type: {this.state.selectedPlace.typeOf}</h5>
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