import React from 'react';
import './BlacklistStyle.css'

const BlacklistCard = props => {

  const ratingAsInteger = parseInt(props.establishment.ratingValue)
  const name = props.establishment.name
  const address1 = props.establishment.addressLine1
  const address2 = props.establishment.addressLine2

  if(ratingAsInteger === 5){
    return (    
      <div className="card-wrapper r-5" >
        
          <div className="name">{name}</div> &nbsp; <div className="color-code-name-box-estab-card-5">{props.establishment.ratingValue}/5</div>
          
          <div className="info-pane" style={{color: '#010101'}} >

            <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 

            <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
            
            <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
            
            <span>Postcode: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
            <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
            
            <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} 
            
            <div className="blacklist-button"
              onClick={() => props.remove(props.establishment.blacklists[0].id) }
              >REMOVE
            </div>

        </div>
            
      </div> 
    )
  } 
  
  if(ratingAsInteger === 4 || ratingAsInteger === 3) {
    return (
      <div className="card-wrapper r4-3" >

          <div className="name">{name}</div> &nbsp; <div className="color-code-name-box-estab-card-4-3">{props.establishment.ratingValue}/5</div>
          
          <div className="info-pane" style={{color: '#010101'}} >

            <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 

            <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
            
            <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
            
            <span>Postcode: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
            <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
            
            <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} 
            
            <div className="blacklist-button"
              onClick={() => props.remove(props.establishment.blacklists[0].id) }
              >REMOVE
            </div>

        </div>
            
      </div>
    ) 
  }

  if(props.establishment.ratingValue === 'AwaitingInspection' || props.establishment.ratingValue === 'Exempt' || props.establishment.ratingValue === 'AwaitingPublication') {
    return (
      <div className="card-wrapper r-other">
  
          <div className="name" style={{color: 'white'}}>{name}</div>
          
          <div className="info-pane">
  
            <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 
  
            <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
            
            <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
            
            <span>Postcode: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
            <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
            
            <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} 
            
            <div className="blacklist-button"
              onClick={() => props.remove(props.establishment.blacklists[0].id) }
              >REMOVE
            </div>
  
        </div>
            
      </div>
    ) 
  }

  return (
    <div className="card-wrapper r1-2" >

        <div className="name">{name}</div>&nbsp; <div className="color-code-name-box-estab-card-1-2">{props.establishment.ratingValue}/5</div>
                
        <div className="info-pane" style={{color: '#010101'}} >

        <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 

        <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
        
        <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
        
        <span>Postcode: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
        <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
        
        <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} 
        
        <div className="blacklist-button"onClick={() => props.remove(props.establishment.blacklists[0].id) }
          >REMOVE
        </div>

    </div>
    </div>
  ) 
}

export default BlacklistCard;
