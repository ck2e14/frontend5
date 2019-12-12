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

    export default {
      login,
      signup,
      validate,
      logout
    };