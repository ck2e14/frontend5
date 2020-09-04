import React from "react";
import "./AutoCompletePlaces-style.css";
import PlacesAutocomplete, {
   geocodeByAddress,
   getLatLng,
} from 'react-places-autocomplete';

export default class AutoCompletePlaces extends React.Component {
   constructor(props) {
      super(props);
      this.state = { address: "" };
   }

   handleSelect = address => {
      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.handleSubmit(address, latLng))
      .then(latLng => this.props.fetchFromFSA(latLng))
      .catch(error => console.error("Error", error));
   };

  
   render() {
      const searchOptions = {
         componentRestrictions: { country: ['uk'] },
      }
      return (
         <PlacesAutocomplete
            value={this.props.value}
            searchOptions={searchOptions}
            // highlightFirstSuggestion={true}
            onChange={this.props.handleChange}
            onSelect={this.handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
               <div>
                  <input className="location-search-input"
                     {...getInputProps({
                        placeholder: "Search Places ...",
                     })}
                  />
                  <div className='autocomplete-dropdown-container'>
                     {loading && <div>Loading...</div>}
                     {suggestions.map(suggestion => {
                        const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";

                        const style = suggestion.active
                           ? { backgroundColor: "rgb(19, 19, 19)", cursor: "pointer", color: "white"}
                           : { backgroundColor: "rgb(19, 19, 19)", cursor: "pointer", color: "white" };
                        return (
                           <div
                              {...getSuggestionItemProps(suggestion, {
                                 className,
                                 style,
                              })}>
                              <span>{suggestion.description}</span>
                           </div>
                        );
                     })}
                  </div>
               </div>
            )}
         </PlacesAutocomplete>
      );
   }
}
