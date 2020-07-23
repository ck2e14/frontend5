const API_URL = "https://mod5-api.herokuapp.com/api/v1/";
const LOGIN_URL = `${API_URL}login`;
const VALIDATE_URL = `${API_URL}validate`;
const SIGNUP_URL = `${API_URL}users`;
const ESTABS_URL = `${API_URL}establishments`;
const BLACKLISTS_URL = `${API_URL}blacklists`

const jsonify = res => {
  if (!res.ok) throw res;
  return res.json().then(data => {
    if (data.errors) throw data.errors;
    else return data;
  });
};

const signup = userDetails => {
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
  })
};

const removeBlacklist = (id) => 
  fetch(`${BLACKLISTS_URL}/${id}`, {
    method: "DELETE"
})

const login = userDetails => {
  return fetch(LOGIN_URL, {
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
  }

const logout = () => {
  localStorage.removeItem("token");
};

const validate = () => {
  return fetch(VALIDATE_URL, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem("token")
    }
  })
    .then(jsonify)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    })
  };

const newEstab = (estabDetails, userID) =>
  fetch(ESTABS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ establishment: estabDetails })
  }).then(jsonify)
  .then(estabData => addToBlacklist(estabData, userID))
  // .then(estabData => console.log(estabData, userID))

const addToBlacklist = (estabData, userID) => {
    fetch(BLACKLISTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
      blacklist: {
      user_id: userID, 
      establishment_id: estabData.establishment.id 
      }
    })
    }).then(jsonify)
    .then(data => console.log(data))
  }

const getEstabs = (position) => {
  console.log(position.coords.longitude.toString())
  console.log(position.coords.latitude.toString())
  console.log('fetching from FSA API...')
  return fetch(`https://cors-anywhere.herokuapp.com/https://ratings.food.gov.uk/enhanced-search/en-GB/%5e/%5e/DISTANCE/0/%5e/${position.coords.longitude}/${position.coords.latitude}/1/150/json`).then(handleErrors).then(res => res.json()).then(data => {
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


const handleErrors = response => {
  if (!response.ok) {
    console.log('reached')
    alert('We apologise for the inconvenience - the FSA API service is unavailable owing to high volume-led throttling of requests. Please try again in a couple of minutes.')
      // throw Error(response.statusText);
      
  }
  return response;
}
    // const blacklistFetch = (userID) => {
    //   return fetch(`${BLACKLISTS_URL}, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     }
    //   }).then(jsonify)
    //   .then(data => console.log(data))
    // }
  
// **********************************************************
    // function success(position) {
    //   console.log(position.coords.longitude.toString())
    //   console.log(position.coords.latitude.toString())
    //   console.log('made it to success function')
    //   return getEstabs(position)
    // }
    // the above function is preliminarily desgined to offer the user feedback on when geolocation is unavailable - otherwise they are met with a blank and unresponsive white screen NOPOG. Currently the fetch isn't first routed through this function - meaning there is no error catching if geolocation fails or is unavailable
// **********************************************************
    export default {
      login,
      signup,
      validate,
      logout,
      getEstabs,
      newEstab,
      removeBlacklist,
      // blacklistFetch,
      // addToBlacklist,
      // success,
      // error,
    };

