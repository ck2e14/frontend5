import React from 'react';
import paths from '../../paths';
import cardStyle from './estabCard.css'


const estabCard = props => {
   
   return (
      <div className="wrapper" id=''>
      <div className="container">
        <div className="top">
        
        <h5 className="estab-name-display">{props.establishment.name}</h5>
       
        
        <div>
         
            <span className="tooltiptext">Click to Blacklist</span>
        </div>
          </div>

        </div>
        <div className="bottom"></div>
          <div className="left">
            <div className="details">
              {/* <h5>{props.establishment.name}</h5> */}
            </div>
            {/* <div className="tooltip" onClick={() => props.handleBlacklistClick(props.establishment)} className="blacklist"><img className="blacklist-icon" src="https://static.thenounproject.com/png/429749-200.png"/>
            <span className="tooltiptext">Click to Blacklist</span>
            </div>
          </div> */}
          <div className="right">
            <div className="done"><i className="material-icons">done</i></div>
            <div className="details">
            </div>
            <div className="remove"><i className="material-icons">clear</i></div>
          </div>
      </div>
      <div className="inside">
        <div className="icon"><i className="material-icons">Details</i></div>
        <div className="contents">
          <div className="card-contents-inside">
            <span>Composite Rating: </span>{props.establishment.ratingValue} <br/><br/>
            <span>Last Assessed: </span> {props.establishment.ratingDate} <br/><br/>
            <span>Premises Address: </span><br/>{props.establishment.addressLine1}<br/> 
                              {props.establishment.addressLine2} <br/>
                              {props.establishment.postcode}<br/><br/>
            <span>Premises Type: </span>{props.establishment.type_of} <br/><br/>
            <span>Local Authority & Contact </span><br/> {props.establishment.localAuth} <br/>
                              {props.establishment.localAuthEmail.toLowerCase()}
          </div>
          <div className="tooltip"
            onClick={() => props.handleBlacklistClick(props.establishment)} 
            className="blacklist"
            >BLACKLIST SITE</div>
            {/* // className="blacklist-icon"  */}
            {/* src="./Assets/blacklist-icon.png" */}
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"></link>
        </div>
      </div>
    </div>
   )
}

export default estabCard;
