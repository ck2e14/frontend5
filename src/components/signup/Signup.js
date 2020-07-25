import React, { useState } from "react";
import API from "../../adapters/API";
import { 
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
   Link,
   useHistory 
} from "react-router-dom";
import '../login/Login.css'

const Signup = props => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const history = useHistory();

   const handleSubmit = e => {
      e.preventDefault();
      API.signup({ username, password })
         .then(user => {
            console.log(user);
            props.setUser(user);
            history.push("/home");
         })
         .catch(errors => {
            setErrors(errors[errors]);
            console.error(errors);
         });
   };

   return (
      <div className="login-container">
         <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap" rel="stylesheet"></link>
         <div className="page-login">
            <div className="login-border-box">
               <div>
                  <div>
                     <div className="content">
                        <h1 className="title-text" align="center">  _Hygenik.com</h1>
                     <div className="header">
                     {!errors ? 'Sign up failed. Your password must be at least 6 characters.' : null}
                  </div>
                  <p className="text" >{errors ? 'Please choose your login credentials' : null}</p>
               </div>
               </div>
            <div className="ui-card">
               <div className="content">
               <form onSubmit={handleSubmit} className="ui form">
                  <div className="field">
                  {errors?.join(', ')}
                  <input
                     type="text"
                     placeholder="USERNAME"
                     name="username"
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                  />
               <div className="field">
                  <input
                     type="password"
                     placeholder="PASSWORD"
                     name="password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
               </div>
                  <input className="submit" type="submit" value="Sign up"/>
                  </div>
               </form>
               </div>
               <Link className="signin-link" to="/login">Signed up? Login Here.</Link>
         </div>
         </div>
         </div>
      </div>
</div>
   );
};

export default Signup;

