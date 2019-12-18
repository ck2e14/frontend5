import React from "react";
// import { compose, withProps, lifecycle } from "recompose";
import { Map, GoogleApiWrapper } from 'google-maps-react';


class ShowMap extends React.Component {

   render(){

      const mapStyles = {
         width: '50%',
         height: '100%',
       };


      return(
         <Map
         google={this.props.google}
         zoom={8}
         style={mapStyles}
         initialCenter={{ lat: 47.444, lng: -122.176}}
       />
      )
   }
}

export default GoogleApiWrapper({
   apiKey: 'AIzaSyCYAoS5qLokXR7YPVpa4IBt2BRxLsY89hE'
})(ShowMap)