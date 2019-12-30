import React from 'react'
import API from '../../adapters/API'
import estabCard from '../establishments/estabCard'

export default class BlacklistDisplay extends React.Component {

   constructor(){
      super()
      this.state = {
         userInfo: '',
         readyToRender: false,
      }
   }


   // abstract the below function into the API file. 
componentDidMount(){
   fetch('http://localhost:3000/api/v1/users/7', {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
          Accept: "application/json"
      }
   })
   .then(res => res.json())
   .then(data => this.setState({
      userInfo: data,
      readyToRender: true
   })
   )
}

// make a rebuild-establishments method that makes fetches for all the establishment_id's in the blacklist array within this components state, as fetched above. You will need to make a fetch to the establishments endpoint, interpolating the ids from each into the fetch string, and then setState in this component into a new key 'rebuiltBlacklistedEstabs'. Can then pass into the presentational component in the same way that you passed intot he estabcontainer card.


   render(){
      return(
         <div>
            {this.state.readyToRender ? this.state.userInfo.blacklists.map(estab => {
            return(<p>{estab.id}</p>)}) : null }

         </div>
      )
   }
}