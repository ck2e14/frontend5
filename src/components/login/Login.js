import React, { useState, useEffect } from "react";
import {
   BrowserView,
   MobileView,
   isBrowser,
   isMobile,
} from "react-device-detect";
import API from "../../adapters/API";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const [welcomeMsg, setWelcome] = useState(true);
   const [displayShader, setDisplayShader] = useState(true);

   const history = useHistory();

   // useEffect(() => {
   //    clearStorage()
   // }, [])

   const onUsernameChange = (e) => {
      setUsername(e.target.value);
      setErrors([]);
   };

   const onPasswordChange = (e) => {
      setPassword(e.target.value);
      setErrors([]);
   };

   const handleLogInSubmit = (e) => {
      e.preventDefault();
      if (!username || !password) {
         return setErrors(["Please fill-out both fields."]);
      }
      API.login({ username, password })
         .then((user) => {
            console.log(user);
            props.setUser(user);
            history.push("/home");
         })
         .catch((errors) => {
            setErrors([errors]);
            console.log(errors);
         });
   };

   const handleRegisterSubmit = (e) => {
      e.preventDefault();
      if (!username || !password) {
         return setErrors(["Please fill-out both fields."]);
      }
      if (username.length < 6) {
         return setErrors(["Your username must be at least 6 characters."]);
      }
      if (password.length < 6) {
         return setErrors(["Your password must be at least 6 characters."]);
      }
      API.signup({ username, password })
         .then((user) => {
            console.log(user);
            props.setUser(user);
            history.push("/home");
         })
         .catch((errors) => {
            setErrors([errors]);
            // console.error(errors);
            console.log(errors);
         });
   };

   // const clearStorage = () => {
   //    localStorage.alreadyVisited = false
   // }

   return (
      <>
         <div className='title-text'>
            <span>_</span>Hygenik<span>.</span>com
         </div>
         <div className='login-container'>
            <div className='errors'>{errors?.join(", ")}</div>

            <div className='login-content-inputs-container-flex'>
               <form onSubmit={handleLogInSubmit} className='login-form'>
                  <div className='username-input-container'>
                     <input
                        type='text'
                        placeholder='USERNAME'
                        name='username'
                        value={username}
                        onChange={(e) => onUsernameChange(e)}
                     />
                  </div>

                  <div className='password-input-container'>
                     <input
                        type='password'
                        placeholder='PASSWORD'
                        name='password'
                        value={password}
                        onChange={(e) => onPasswordChange(e)}
                     />
                  </div>

                  <input
                     className='login-submit'
                     type='submit'
                     value='LOG IN'
                  />
                  <br />
                  <br />

                  {/* <Link className='registration-link' to="/signup">REGISTER</Link> */}
               </form>

               <div className='submit-btn' onClick={handleLogInSubmit}>
                  LOG IN
               </div>
               <div
                  className='submit-btn register'
                  onClick={handleRegisterSubmit}>
                  REGISTER
               </div>
               <br />
               <br />
            </div>
         </div>
      </>
   );

   //    return (
   //       <div className="login-container">

   //          <div className="page-login">
   //             <div className='login-border-box'>
   //                <div>
   //                   <div>
   //                      <div className="content">
   //                         <h1 className="title-text" align="center"> _Hygenik<span>.</span>com</h1>
   //                            <div className="header">
   //                               {!errors ? 'Incorrect username or password - please try again.' : null}
   //                            </div>
   //                            <p className="text">{errors ? '' : null}</p>
   //                      </div>
   //                </div>
   //                   <div className="ui-card">
   //                      <div className="content">
   //    <form onSubmit={handleSubmit} className="ui form">
   //       <div className="field">
   //       {errors?.join(', ')}
   //          <input
   //             type="text"
   //             placeholder="USERNAME"
   //             name="username"
   //             value={username}
   //             onChange={e => setUsername(e.target.value)}
   //          />
   //          <div className="field">
   //             <input
   //                type="password"
   //                placeholder="PASSWORD"
   //                name="password"
   //                value={password}
   //                onChange={e => setPassword(e.target.value)}
   //             />
   //          </div>
   //          <input className="submit" type="submit" value="LOG IN"/>
   //          <Link className='register-link' to="/signup">REGISTER</Link>
   //       </div>
   // </form>
   //                      </div>
   //                   </div>
   //                </div>
   //          </div>
   //       </div>
   // </div>
   //    );
};

export default Login;

// return (
//    <div className="login-container">
//       <link href="https://fonts.googleapis.com/css?family=Audiowide&display=swap" rel="stylesheet"></link>
//        <div className="page-login">
//           <div className="ui centered grid container">
//              <div className="nine wide column">
//                 <div className="ui icon warning message">
//                     <i className="lock icon"></i>
//                       <div className="content">
//                          <h1 className="title-text" align="center">  Welcome to Hygenik!</h1>
//                             <div className="header">
//                                {!errors ? 'Login failed!' : null}
//                             </div>
//                          <p className="text">{errors ? 'ENTER YOUR USERNAME AND PASSWORD' : null}</p>
//                       </div>
//                 </div>
//              <div className="ui fluid card">
//                 <div className="content">
//                  <form onSubmit={handleSubmit} className="ui form">
//                    <div className="field">
//                       <p>{errors.join()}</p>
//                       <input
//                          type="text"
//                          placeholder="USERNAME"
//                          name="username"
//                          value={username}
//                          onChange={e => setUsername(e.target.value)}
//                       />
//                    <div className="field">
//                       <input
//                          type="password"
//                          placeholder="PASSWORD"
//                          name="password"
//                          value={password}
//                          onChange={e => setPassword(e.target.value)}
//                       />
//                    </div>
//                      <input className="submit" type="submit" value="Log In"/>
//                     </div>
//                 </form>
//              </div>
//           <Link className='register-link' to="/signup">Register</Link>

//           </div>
//           </div>
//        </div>
//     </div>
// </div>
// );
