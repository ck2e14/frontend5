import React from 'react';
import paths from '../../paths';
import BlacklistStyle from './BlacklistStyle.css'

const estabCard = props => {

  return (
    <div className="wrapperBL" id=''>
    <div className="container">
      <div className="top">
      <h5 className="title-h5">{props.establishment.name}</h5>
      
      <div className="tooltip"  className="blacklist">
      {/* <img         onClick={() => props.remove(props.establishment.blacklists[0].id)}

className="blacklist-iconBL" src="https://img.icons8.com/cotton/2x/checkmark.png"/>  */}
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
      <div className="icon"><i className="material-icons">More Info</i></div>
      <div className="contents">
      <img         onClick={() => props.remove(props.establishment.blacklists[0].id)}

className="blacklist-iconBL" src="https://img.icons8.com/cotton/2x/checkmark.png"/>
        <table>
          <tr>
            <th><strong>Overall Rating</strong></th>
            <th><strong>When?</strong></th>
          </tr>
          <tr>
            <td>{props.establishment.ratingValue}</td> 
            <td>{props.establishment.ratingDate}</td>
          </tr>
          <tr>
            <th>Premises Type</th>
            <th>Authority</th>
          </tr>
          <tr>
            <td>{props.establishment.type_of}</td>
            <td>{props.establishment.localAuth}</td>
          </tr>
          <tr>
            <th>Authority Contact</th>
            <th></th>
          </tr>
          <tr>
            <td>{props.establishment.localAuthEmail}</td>
            <td>{props.establishment.addressLine1}</td>
          </tr>
          <tr>
            <th>Address </th>
            <td>{props.establishment.addressLine2}</td>
          </tr> 
          <tr>
            {/* <td>palceholder</td> */}
            <td>{props.establishment.postcode}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  )
}

export default estabCard;
