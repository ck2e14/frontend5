import React from "react";
// import { compose, withProps, lifecycle } from "recompose";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import container from '../establishments/container.css'


class ShowMap extends React.Component {

   constructor(){
      super()
      this.state = {
      establishments: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      selectedPlaceRating: '',
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
         // onClick={() => console.log(estab.id, estab.name)} 
         />
      })
   }


  
    render(){

      const mapStyles = {
         width: '65%',
         height: '100%',
       };


      return(
         <div className='main-map-div'>  
         {this.state.finishedSetState ?
            <Map
              google={this.props.google}
              zoom={15.5}
              style={mapStyles}
              initialCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
           >
           {this.displayMarkers()}
           <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <h4>Hygiene Rating: {this.state.selectedPlaceRating}</h4>
          </div>
        </InfoWindow>
        </Map> 
        : null }
          
       </div>
      
      )
   }
}

export default GoogleApiWrapper({
   apiKey: 'AIzaSyCYAoS5qLokXR7YPVpa4IBt2BRxLsY89hE'
})(ShowMap)