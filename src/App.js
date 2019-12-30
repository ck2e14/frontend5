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
import BlacklistDisplay from './components/UserDash/BlacklistDisplay'
  

const App = () => {
  const [user, setUser] = useState(null);
  const history = useHistory()

  


  useEffect(() => {
    API.validate()
      .then(user => {
        setUser(user);
        // history.push('/');
        console.log('validated user')
      }).catch(() => {
        history.push(paths.LOGIN);
        console.log('user not validated')
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

        {user ? <Route exact path="/home" component={props => 
          <Home {...props} user={user} logout={logout} />} 
        /> :  <Route path="/login" component={props => 
          <Login user={user} {...props} setUser={setUser} />} 
        />
      }
        
        <Route exact path="/dashboard" component={props =>
          <UserDash {...props} user={user} logout={logout} /> }
          />

        <Route exact path="/blacklist" component={props =>
          <BlacklistDisplay user={user} logout={logout} /> }
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
    </div>
  );
}

export default App;
