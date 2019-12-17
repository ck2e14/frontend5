import React, { useState } from "react";
import API from '../../adapters/API';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory
} from "react-router-dom";
import './Login.css'
import {
   Button,
   Form,
   Grid,
   Header,
   Message,
   Segment,
 } from 'semantic-ui-react';


const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    API.login({ username, password })
      .then(user => {
        console.log(user);
        props.setUser(user);
        history.push("/home");
      })
      .catch(errors => {
        setErrors(errors);
        console.error(errors);


      });
  };
  return (
     <div className="login-container">
      <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap" rel="stylesheet"></link>
         <div className="page-login">
            <div className='login-border-box'>
               <div>
                  <div>
                     <div className="content">
                        <h1 className="title-text" align="center"> _Hygenik.com</h1> 
                           <div className="header">
                              {!errors ? 'Login failed!' : null}
                           </div>
                           <p className="text">{errors ? '' : null}</p>
                     </div>
               </div>
                  <div className="ui-card">
                     <div className="content">

                        <form onSubmit={handleSubmit} className="ui form">
                           <div className="field">
                              <p>{errors.join(', ')}</p>

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

                              <input className="submit" type="submit" value="LOG IN"/>
                           </div>
                     </form>
                     </div>
                  </div>
               </div>
            <Link className='register-link' to="/signup">REGISTER</Link>
         </div>
      </div>
</div>
  );
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