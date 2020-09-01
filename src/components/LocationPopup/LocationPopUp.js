import React from "react";
import "./LocationPopUp.css";

const LocationPopUp = () => {
   return (
      <div className='pop-up-wrapper'>
         Unfortunately, the JavaScript methods used to ascertain geolocation
         have been deprecated for insecure origins. This means paying for a SSL
         cetificate (circa £200+ per year) which is not currently a viable
         option. More information can be found
      </div>
   );
};

export default LocationPopUp;
