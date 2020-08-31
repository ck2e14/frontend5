import React, { useState } from "react";
import API from "../../adapters/API";
import { 
   Link,
   useHistory 
} from "react-router-dom";
import '../login/Login.css'

const Signup = props => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const history = useHistory();
   // TODO: Frontend validation on password length done. MUST implement in backend, and for types of characters not just length.

   const handleSubmit = e => {
      e.preventDefault();
      if(!username || !password) {
         return setErrors(['Please fill-out both fields.'])
      }
      if(username.length < 6) {
         return setErrors(['Your username must be at least 6 characters.'])
      }
      if(password.length < 6) {
         return setErrors(['Your password must be at least 6 characters.'])
      }
      API.signup({ username, password })
         .then(user => {
            console.log(user);
            props.setUser(user);
            history.push("/home");
         })
         .catch(errors => {
            setErrors([errors]);
            // console.error(errors);
            console.log(errors)
         });
   };

   return(
      <div className="login-container">

         <div className="login-content-container">

            <h1 className="title-text" align="center"> _Hygenik<span>.</span>com</h1>

            <div className="errors">{errors?.join(', ')}</div>

            <div className="login-content-inputs-container-flex">
               
               <form onSubmit={handleSubmit} className="login-form">

                  <div className="username-input-container">
                        <input
                           type="text"
                           placeholder="USERNAME"
                           name="username"
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                        />
                  </div>

                  <div className="password-input-container">
                     <input
                        type="password"
                        placeholder="PASSWORD"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                     />
                  </div>

                  <input className="login-submit" type="submit" value="SIGN UP"/><br/><br/>

                  <Link className='registration-link' to="/login">HAVE AN ACCOUNT?</Link>

               </form>

            </div>

         </div>

      </div>
   )
}

export default Signup;

