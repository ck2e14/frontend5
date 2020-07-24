import React, { useState, useEffect } from 'react';
import  './estabCard.css'


const EstabCard = props => {

  return (
    <div className="card-wrapper" onClick={() => props.handleEstabCardClick(props.establishment)}>

        <div className="name">{props.establishment.name}</div>
        
        <div className="info-pane">

          <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; <span>Assessment Date: </span> {props.establishment.ratingDate}<br/><br/>
          <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
          <span>Address: </span><br/>{props.establishment.addressLine2}<br/>{props.establishment.postcode}<br/><br/>
          <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} ({props.establishment.localAuthEmail})
          
          <div className="blacklist-button"
            onClick={() => props.handleBlacklistClick(props.establishment)} 
            >BLACKLIST
          </div>

      </div>
          
    </div>
  )  
}

export default EstabCard;
