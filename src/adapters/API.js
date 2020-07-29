const API_URL = "https://mod5-api.herokuapp.com/api/v1/";
const LOGIN_URL = `${API_URL}login`;
const VALIDATE_URL = `${API_URL}validate`;
const SIGNUP_URL = `${API_URL}users`;
const ESTABS_URL = `${API_URL}establishments`;
const BLACKLISTS_URL = `${API_URL}blacklists`;
const CORS_ANYWHERE_PREFIX = 'https://sleepy-fjord-70300.herokuapp.com/'
const FSA_ENH_SEARCH = 'https://ratings.food.gov.uk/enhanced-search/en-GB/%5e/%5e/DISTANCE/0/%5e/';
const FSA_SEARCH_BY_ADDRESS_URL = 'https://ratings.food.gov.uk/search-address/';
const ADDRESS_SEARCH_SUFFIX = '/Alpha/1/1250/json';
const GEOCODING_BASE_URL = 'https://open.mapquestapi.com/geocoding/v1/address?key=yTjeWaGGiekrLYHIhbDdzcyvE9mK6Gmc&location='

const jsonify = res => {
  if (!res.ok) throw res;
  return res.json().then(data => {
    if (data.errors) throw data.errors;
    else return data;
  });
};

const signup = userDetails => {
  return fetch(SIGNUP_URL, {
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
    console.log(data.user)
    return data.user
  })
};

const removeBlacklist = (id) => {
  return fetch(`${BLACKLISTS_URL}/${id}`, {
           method: "DELETE"
          })
}

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

const newEstab = (estabDetails, userID) => {
  return fetch(ESTABS_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({ establishment: estabDetails })
          })
          .then(jsonify)
          .then(estabData => addToBlacklist(estabData, userID))
}

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
// RAW SYNTAX EXAMPLE http://open.mapquestapi.com/geocoding/v1/address?key=yTjeWaGGiekrLYHIhbDdzcyvE9mK6Gmc&location=dorking
const getLatLongFromGeocode = ( searchTerm ) => {
  const addressInput = searchTerm.split(' ').join('%20');
  return fetch(`${GEOCODING_BASE_URL}${addressInput}&maxResults=1`)
    .then(res => res.json())
    // .then(data => console.log(`${data.results[0].locations[0].latLng.lat} ${data.results[0].locations[0].latLng.lng}`))
    .then(data => {
      return {
        geocodedLatitude: data.results[0].locations[0].latLng.lat,
        geocodedLongitude: data.results[0].locations[0].latLng.lng
      }
    })
}
// RAW SYNTAX: https://ratings.food.gov.uk/search-address/{address}/{page}/{resultsPerPage}/json 
const getEstabsFromAddress = ( searchTerm ) => {
  const addressInput = searchTerm.split(' ').join('%20');
  return fetch(`${CORS_ANYWHERE_PREFIX}${FSA_SEARCH_BY_ADDRESS_URL}${addressInput}${ADDRESS_SEARCH_SUFFIX}`)
    .then(handleErrors)
    .then(jsonify)
    .then(checkJSONforValidity)
    .then(data => {
      if(data == null) return 
      if(data.FHRSEstablishment.EstablishmentCollection) {
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
      })}
    })
}

const checkJSONforValidity = response => {
  if(!response.FHRSEstablishment.EstablishmentCollection) {
    console.log(response)
    // alert('No establishments were discovered - please check spelling, or try a wider search area. \nIf you entered a postcode, try entering the first half. If you entered a street, try entering the town or borough.\nReturning to homepage...')
    return null
  }
  return response;
}

const autoGetEstabs = (position) => {
  const latLong = `${position.coords.longitude}/${position.coords.latitude}/`
  console.log(`Latitude + Longitude returned by geolocation services: ${latLong}`)
  console.log('fetching from FSA API...')
  return fetch(`${CORS_ANYWHERE_PREFIX}${FSA_ENH_SEARCH}${latLong}1/750/json`)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
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
    console.log(response)
    console.log(`FSA response status: ${response.statusText}. FSA response code: ${response.status}`)
    alert(`Apolgoies for the inconvenience - API service is unavailable owing to volume-led throttling of requests. Please refresh the page, or try again in a couple of minutes. Response status: ${response.statusText}. FSA response code: ${response.status}`)
      // throw Error(response.statusText);
  } 
  return response;
}

export default {
  login,
  signup,
  validate,
  logout,
  autoGetEstabs,
  newEstab,
  removeBlacklist,
  getEstabsFromAddress,
  getLatLongFromGeocode,
  // blacklistFetch,
  // addToBlacklist,
  // success,
  // error,
};

