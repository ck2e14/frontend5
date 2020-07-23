import './App.css';
import "./App";
import Login from './components/login/Login';
import Signup from './components/signup/Signup'
import { Route, Redirect, Switch, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import paths from './paths';
import API from './adapters/API'
import Home from './components/home/Home'
import UserDash from './components/UserDash/UserDash';
import BlacklistDisplay from './components/UserDash/BlacklistDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [user2, setUser2] = useState(null); 
  // user2 is solely to be able to use the user object to conditionally render below - 
  //  user is already used for this purpose and can't be re-used in that way
  const history = useHistory();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    API.validate()
      .then(user => {
        setUser(user);
        setUser2(true);
        setUserID(user.id);
        // history.push('/');
        console.log('validated user');
      }).catch(() => {
        history.push(paths.LOGIN);
        console.log('user not validated');
      });
  }, []);

  const logout = () => {
    API.logout();
    setUser(null);
    history.push(paths.LOGIN);
  };

  return (
    <div className="App">
      
      <Switch>

        { user ? 
          <Route exact path="/home" component={props => 
            <Home {...props} userID={userID} user={user} logout={logout} displayShader={true} displayWelcome={true} />} 
          /> 
        :  
          <Route path="/login" component={props => 
            <Login user={user} {...props} setUser={setUser} />} 
          />
        }
        
        {/* <Route exact path="/blacklist" component={props =>
          <UserDash {...props} user={user} logout={logout} /> }
          /> */}

        { user2 ? 
        // user2 is indicative of the presence of the normal user object, duplicated for conditional rendering reasons
            <Route exact path="/find-premises" component={props => 
              <Home {...props} userID={userID} user={user} logout={logout} displayShader={false} displayWelcome={false}/>} 
            /> 
        : null }

        <Route exact path="/blacklist" component={props =>
          <BlacklistDisplay {...props} userID={userID} user={user} logout={logout} /> }
        />  
        
        <Route exact path='/' component={props => 
          <Login user={user}{...props} setUser={setUser}/>} 
        />

        <Route path="/login" component={props => 
          <Login user={user} {...props} setUser={setUser} />} 
        />

        <Route path="/signup" component={props => 
          <Signup user={user} {...props} setUser={setUser}
        />} />

      </Switch>

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"></link>

    </div>
  );
}

export default App;
