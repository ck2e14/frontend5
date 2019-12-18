import { Route, Redirect, Switch, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import EstabCard from './estabCard'
import container from '../establishments/container.css'

export default class EstabContainer extends React.Component {

   buildCards = () => this.props.establishments.map(estab => {
      return <EstabCard handleBlacklistClick={this.props.handleBlacklistClick} establishment={estab} user={this.props.user} />
   })

   render(){   
      const cards = this.buildCards()
      return( 
         <div>
            <h1 className="title" > <strong>Nearby Food-serving Premises (LATER INTERPOLATE CURRENT LOCATION SEARCHED OR CURRENT GEOLOCATION) </strong></h1>
            <div className="estabs-div"> 
               {cards}
            </div>
         </div>
      )
   }
}