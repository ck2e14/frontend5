import React from "react";
import EstabCard from './EstabCard'
import './EstabContainer.css'

export default class EstabContainer extends React.Component {
   
   buildCards = () => {
      if(!this.props.establishments) return null
      return this.props.establishments.map(estab => {
      return <EstabCard handleEstabCardClick={this.props.handleEstabClick} handleBlacklistClick={this.props.handleBlacklistClick} establishment={estab} user={this.props.user} />
   })}

   render(){   
      
      const cards = this.buildCards()

      // below is conditional rendering to display error message (no results) inside a single estab card.
      if(!this.props.establishments) return (
         <div className="estabs-div">
            <EstabCard establishment={{name: 'No Results Were Found :('}} displayInfoPane={false} user={this.props.user} />
         </div>
      )

      return( 
         <div>
            <div className="estabs-div"> 
               {cards}
            </div>
         </div>
      )
   }
}