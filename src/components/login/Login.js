import React, { useState, useEffect } from "react";
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

   // useEffect(() => {
   //    clearStorage()
   // }, [])

   const handleSubmit = e => {
      e.preventDefault();
      if(!username || !password) {
         return setErrors(['Please fill-out both fields.'])
      }
      API.login({ username, password })
      .then(user => {
         console.log(user);
         props.setUser(user);
         history.push("/home");
      })
      .catch(errors => {
         setErrors(errors);
         console.log(errors);
      });
   };

   // const clearStorage = () => {
   //    localStorage.alreadyVisited = false
   // }

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

                     <input className="login-submit" type="submit" value="LOG IN"/><br/><br/>

                     <Link className='registration-link' to="/signup">REGISTER</Link>

               </form>

            </div>

         </div>

      </div>
   )

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