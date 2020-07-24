import React from "react";
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
            <div className="estabs-div"> 
               {cards}
            </div>
         </div>
      )
   }
}