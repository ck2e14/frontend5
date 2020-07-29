import React, { useState } from "react";
import API from '../../adapters/API';
import {
   Link,
   useHistory
} from "react-router-dom";
import './Login.css'

const Login = props => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const [welcomeMsg, setWelcome] = useState(true)
   const [displayShader, setDisplayShader] = useState(true)
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
         setErrors(errors[errors]);
         console.log(errors);
      });
   };

   const closeWelcomeMsgAndShader = () => {
      setWelcome(false);
      setDisplayShader(false)
   }

   return (
      <div className="login-container">

         { displayShader ? <div className="shader-layer" onClick={() => closeWelcomeMsgAndShader()}></div> : null }

         { welcomeMsg ? 
            <div className="explanation-and-welcome">
               <div className="escape-key" onClick={() => closeWelcomeMsgAndShader()}>X</div>
               <span> Welcome to  &nbsp;  _Hygenik!</span> <br/><br/>

               <span className='highlight-this'>I hope you find this app useful for exploring the FSA-assessed hygiene ratings of places to eat near you - particularly considering the current situation. <br/><br/>

               On that note - since March, the FSA have experienced a big surge in the number of requests made to their resources. At peak usage requests are being dynamically throttled. <br/><br/>Unfortunately this may mean waiting longer than usual to load, or the service may be made temporarily unavailable entirely. Please refresh / hard refresh the page after a couple of minutes if that is the case - hopefully the throttling will have been relaxed!
               <br/><br/>
               This app remains in development. Please report any bugs you encounter to <a href="mailto:chriswkennedy@icloud.com">Chris Kennedy.</a> Suggestions are also welcome! Thanks!<br/><br/>
               More information can be found <a href="https://api.ratings.food.gov.uk/Help/Status" className="fsa-link">here.</a></span> 
               <br/><br/>
               Please note: NO personal data is stored by Hygenik. Using location services improves the utility and flow of the app, but if you would prefer to search manually feel free to revoke location services in your browser. 
               {/* Please also note that Heroku unloads apps from its servers when they haven't been very recently accessed - you may have experienced longer loading times of the website itself because of this upon initial visit.  */}
            </div>  : null }

         <div className="page-login">
            <div className='login-border-box'>
               <div>
                  <div>
                     <div className="content">
                        <h1 className="title-text" align="center"> _Hygenik<span>.</span>com</h1> 
                           <div className="header">
                              {!errors ? 'Incorrect username or password - please try again.' : null}
                           </div>
                           <p className="text">{errors ? '' : null}</p>
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