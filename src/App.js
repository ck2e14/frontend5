import "./App.css";
import "./App";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { Route, Switch, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import paths from "./paths";
import API from "./adapters/API";
import Home from "./components/home/Home";
import BlacklistDisplay from "./components/UserDash/BlacklistDisplay";
// import "bootstrap/dist/css/bootstrap.min.css";
import { isBrowser, isMobile } from "react-device-detect";
// import helpIcon from './Assets/helpIcon.png'
// import UserDash from './components/UserDash/UserDash';

const App = () => {
   const [user, setUser] = useState(null);
   const history = useHistory();
   const [userID, setUserID] = useState(null);

   useEffect(() => {
      API.validate()
         .then(user => {
            setUser(user);
            setUserID(user.id);
            history.push("/home");
            console.log("validated user");
         })
         .catch(() => {
            history.push(paths.LOGIN);
            console.log("user not validated");
         });
   }, [history]);

   const logout = () => {
      API.logout();
      setUser(null);
      history.push(paths.LOGIN);
   };

   if (isMobile) {
      return (
         <div className='mobile-message'>
            Welcome to Hygenik. This app is currently in development for mobiles - please visit the website on
            a desktop browser.
            <br />
            <br /> Apologies for any inconvenience! <br />
            <br />I am working hard to bring a responsive version to mobile in the close future.
            <br />
            <br />
            <a href='https://chriskennedy.live' className='portfolio-link'>
               PORTFOLIO
            </a>{" "}
            |{" "}
            <a href='https://github.com/ck2e14' className='portfolio-link'>
               GITHUB
            </a>
         </div>
      );
   }

   if (isBrowser) {
      return (
         <div className='App'>
            <Switch>
               {user ? (
                  <Route
                     path='/home'
                     component={props => (
                        <Home {...props} userID={userID} user={user} logout={logout} displayShader={true} />
                     )}
                  />
               ) : (
                  <Route
                     path='/login'
                     component={props => <Login user={user} {...props} setUser={setUser} />}
                  />
               )}

               {user && (
                  <Route
                     path='/find-premises'
                     component={props => (
                        <Home {...props} userID={userID} user={user} logout={logout} displayShader={false} />
                     )}
                  />
               )}

               <Route
                  path='/blacklist'
                  component={props => (
                     <BlacklistDisplay {...props} userID={userID} user={user} logout={logout} />
                  )}
               />

               <Route
                  exact
                  path='/'
                  component={props => <Login user={user} {...props} setUser={setUser} />}
               />

               <Route path='/login' component={props => <Login user={user} {...props} setUser={setUser} />} />

               <Route
                  path='/signup'
                  component={props => <Signup user={user} {...props} setUser={setUser} />}
               />
            </Switch>

            <link
               href='https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
               rel='stylesheet'></link>
            <link
               href='https://fonts.googleapis.com/css2?family=Cairo:wght@300&family=Rubik:wght@700&display=swap'
               rel='stylesheet'></link>
            <link
               href='https://fonts.googleapis.com/css2?family=Advent+Pro&display=swap'
               rel='stylesheet'></link>
         </div>
      );
   }
};

export default App;
