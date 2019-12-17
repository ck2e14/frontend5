const API_URL = "http://localhost:3000/api/v1/";
const LOGIN_URL = `${API_URL}login`;
const VALIDATE_URL = `${API_URL}validate`;
const SIGNUP_URL = `${API_URL}users`;


const jsonify = res => {
   if (!res.ok) throw res;
   return res.json().then(data => {
     if (data.errors) throw data.errors;
     else return data;
   });
 };

 const signup = userDetails =>
 fetch(SIGNUP_URL, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
   },
   body: JSON.stringify({ user: userDetails })
 })
   .then(jsonify)
   .then(data => {
     localStorage.setItem("token", data.token);
     return data.user  
   });


const login = userDetails =>
  fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user: userDetails })
  })
    .then(jsonify)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    });

const logout = () => {
localStorage.removeItem("token");
};

const validate = () =>
  fetch(VALIDATE_URL, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem("token")
    }
  })
    .then(jsonify)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    });





// **********************************************************************************
    function success(position) {
      console.log(position.coords.longitude.toString())
      console.log(position.coords.latitude.toString())
      console.log('made it to success function')
      return getEstabs(position)
    }
    // the above function is preliminarily desgined to offer the user feedback on when geolocation is unavailable - otherwise they are met with a blank and unresponsive white screen NOPOG
    // *****************DEVELOPMENT ONLY - NOT FINAL **************************





    const getEstabs = (position) => {
      console.log(position.coords.longitude.toString())
      console.log(position.coords.latitude.toString())
      return fetch(`https://cors-anywhere.herokuapp.com/https://ratings.food.gov.uk/enhanced-search/en-GB/%5e/%5e/DISTANCE/0/%5e/${position.coords.longitude}/${position.coords.latitude}/1/15/json`).then(res => res.json()).then(data => {
        return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.map(obj => {
          return { 
              id: obj.LocalAuthorityBusinessID,
              name: obj.BusinessName,
              type_of: obj.BusinessType,
              ratingValue: obj.RatingValue.toString(),
              ratingDate: obj.RatingDate,
              hygieneRating: obj.Scores.Hygiene,
              structuralRating: obj.Scores.Structural,
              confidenceInManagement: obj.Scores.ConfidenceInManagement,
              latitude: obj.Geocode.Latitude.toString(8),
              longitude: obj.Geocode.Longitude.toString(8),
              localAuth: obj.LocalAuthorityName,
              addressLine1: obj.AddressLine1,
              addressLine2: obj.AddressLine2,
              addressLine3: obj.AddressLine3,
              postcode: obj.PostCode,
              localAuthEmail: obj.LocalAuthorityEmailAddress,
              FSAid: obj.FHRSID,
                      }
                })
        })
  }

  //   const getEstabs = (position) => {
  //     return fetch(`https://cors-anywhere.herokuapp.com/https://ratings.food.gov.uk/enhanced-search/en-GB/%5e/%5e/DISTANCE/0/%5e/-0.268680/51.251470/1/30/json`).then(res => res.json()).then(data => {
  
  //       return data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.map(obj => {
  //         return { 
  //             id: obj.LocalAuthorityBusinessID,
  //             name: obj.BusinessName,
  //             type_of: obj.BusinessType,
  //             ratingValue: obj.RatingValue.toString(),
  //             ratingDate: obj.RatingDate,
  //             hygieneRating: obj.Scores.Hygiene,
  //             latitude: obj.Geocode.Latitude.toString(15),
  //             longitude: obj.Geocode.Longitude.toString(15),
  //             localAuth: obj.LocalAuthorityName,
  //             addressLine1: obj.AddressLine1,
  //             postcode: obj.PostCode,
  //             FSAid: obj.FHRSID,
  //                     }
  //               })
  //       })
  // }
  //  ***************************************************************************

    export default {
      login,
      signup,
      validate,
      logout,
      getEstabs,
      // success,
      // error,
    };

