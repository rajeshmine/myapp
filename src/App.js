import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import login from './components/core/Login';
import dashboard from './components/Dashboard';


function App() {
  return (
    <Router basename="/">
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path="/login" component={login} />
        <Route path="/dashboard" component={dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
