import React, { useState, useEffect } from 'react';
import  './estabCard.css'


const EstabCard = props => {
  console.log(props)

  return (
    <div className="card-wrapper">
      

        <div className="name">{props.establishment.name}</div>
        
        <div className="info-pane">
          <span>Rating: </span> {props.establishment.ratingValue} &nbsp;&nbsp; <span>Assessment Date: </span> {props.establishment.ratingDate}<br/>
          <span>Type: </span> {props.establishment.type_of}<br/>
          <span>Address </span><br/>{props.establishment.addressLine1}<br/>{props.establishment.addressLine2}<br/>{props.establishment.postcode}<br/>
          <span>Responsible Authority: </span> {props.establishment.localAuth} ({props.establishment.localAuthEmail})
          <div className="blacklist-button"
            onClick={() => props.handleBlacklistClick(props.establishment)} 
            >BLACKLIST</div>
      </div>

   
    
    </div>
  )



  
}

export default EstabCard;
