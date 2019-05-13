import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from './components/core/Login';
import Signup from './components/core/Signup';
import dashboard from './components/Dashboard';
import Transaction from './components/Transaction/History';
import Loadmoney from './components/Transaction/LoadMoney';
import Sendmoney from './components/Transaction/SendMoney';


function App() {
  return (
    <Router basename="/">
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={dashboard} />
        <Route path="/transaction" component={Transaction} />
        <Route path="/loadmoney" component={Loadmoney} />
        <Route path="/sendmoney" component={Sendmoney} /> 
      </Switch>
    </Router>
  );
}

export default App;
