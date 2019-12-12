import './App.css';
import "./App";
import Login from './components/login/Login';
import Signup from './components/signup/Signup'
import { Route, Redirect, Switch, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import paths from './paths';
import API from './adapters/API'



function App() {
  const [user, setUser] = useState(null);
  const history = useHistory()

  useEffect(() => {
    API.validate()
      .then(user => {
        setUser(user);
        history.push('/');
        console.log('yes')
      })
      .catch(() => {
        history.push(paths.LOGIN);
        console.log('no')
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
        <Route exact path='/' component={props => <Login {...props} setUser={setUser}/>} />
        <Route path="/login" component={props => <Login {...props} setUser={setUser} />} />
        <Route path="/signup" component={props => <Signup {...props} setUser={setUser}/>} />



      </Switch>
    </div>
  );
}

export default App;
