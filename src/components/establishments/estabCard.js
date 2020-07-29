import React from 'react';
import  './estabCard.css'

const EstabCard = props => {

  const noResultsMoreInfo = <div className="no-results info-pane"> 
  <br/>Please check your search terms for spelling, or try a slightly wider search area. If you searched a full postcode, try searching the first part. If you searched a street name, try searching its town or borough. Results can be filtered by name once they've been returned. </div>
  const ratingAsInteger = parseInt(props.establishment.ratingValue)
  const name = props.establishment.name
  const address1 = props.establishment.addressLine1
  const address2 = props.establishment.addressLine2

  if(ratingAsInteger === 5){
    return (    
      <div className="card-wrapper r-5" onClick={() => props.handleEstabCardClick(props.establishment)}>

          <div className="name">{name}</div>
          
          <div className="info-pane" style={{color: '#010101'}} >

            <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 

            <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
            
            <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
            
            <span>Address: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
            <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
            
            <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} ({props.establishment.localAuthEmail})
            
            <div className="blacklist-button"
              onClick={() => props.handleBlacklistClick(props.establishment)} 
              >BLACKLIST
            </div>

        </div>
            
      </div> 
    )
  } 
  
  if(ratingAsInteger === 4 || ratingAsInteger === 3) {
    return (
      <div className="card-wrapper r4-3" onClick={() => props.handleEstabCardClick(props.establishment)}>

          <div className="name">{name}</div>
          
          <div className="info-pane" style={{color: '#010101'}} >

            <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 

            <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
            
            <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
            
            <span>Address: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
            <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
            
            <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} ({props.establishment.localAuthEmail})
            
            <div className="blacklist-button"
              onClick={() => props.handleBlacklistClick(props.establishment)} 
              >BLACKLIST
            </div>

        </div>
            
      </div>
    ) 
  }

  if(props.establishment.ratingValue === 'AwaitingInspection' || props.establishment.ratingValue === 'Exempt' || props.establishment.ratingValue === 'AwaitingPublication') {
    return (
      <div className="card-wrapper r-other" onClick={() => props.handleEstabCardClick(props.establishment)}>
  
          <div className="name" style={{color: 'white'}}>{name}</div>
          
          <div className="info-pane">
  
            <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 
  
            <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
            
            <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
            
            <span>Address: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
            <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
            
            <span>Responsible Authority: </span> <br/>{props.establishment.localAuth} ({props.establishment.localAuthEmail})
            
            <div className="blacklist-button"
              onClick={() => props.handleBlacklistClick(props.establishment)} 
              >BLACKLIST
            </div>
  
        </div>
            
      </div>
    ) 
  }

  if(props.displayInfoPane === false) {
    return (
    <div className="card-wrapper r1-2" >

      <div className="name">{name}</div>
        {noResultsMoreInfo} 
    </div>
    )
  }

  return (
    <div className="card-wrapper r1-2" onClick={() => props.handleEstabCardClick(props.establishment)}>

        <div className="name">{name}</div>
                
        <div className="info-pane" style={{color: '#010101'}} >

        <span>FSA Hygiene Rating: </span> {props.establishment.ratingValue}/5 &nbsp; 

        <span>Last Assessed: </span> {props.establishment.ratingDate}<br/><br/>
        
        <span>Type: </span> <br/>{props.establishment.type_of}<br/><br/>
        
        <span>Address: </span>{address1 ? <br/> : null } {address1 ? address1 : null } {address2 ?
        <br/> : null }{address2 ? address2 : null }<br/>{props.establishment.postcode}<br/><br/>
        
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