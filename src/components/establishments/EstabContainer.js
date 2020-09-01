import React from "react";
import EstabCard from "./estabCard";
import "./EstabContainer.css";

export default class EstabContainer extends React.Component {
   buildCards = () => {
      return this.props.establishments.map((estab) => {
         return (
            <EstabCard
               handleEstabCardClick={this.props.handleEstabClick}
               handleBlacklistClick={this.props.handleBlacklistClick}
               establishment={estab}
               user={this.props.user}
            />
         );
      });
   };

   render() {
      const cards = this.buildCards();

      if (!this.props.establishments || this.props.establishments.length < 1) {
         return (
            <div className='estabs-div'>
               <EstabCard
                  establishment={{ name: "No Results Were Found :(" }}
                  displayInfoPane={false}
                  user={this.props.user}
               />
            </div>
         );
      }

      return (
         <div>
            <div className='estabs-div'>{cards}</div>
         </div>
      );
   }
}
