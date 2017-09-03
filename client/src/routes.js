import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Homepage from './components/homepage.jsx';
import SmallRegpage from './components/smallreg.jsx';
import SmallLoginpage from './components/smlogin.jsx';
import Userdashboard from './components/user.jsx';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Homepage}/>
    <Route path="/register" component={SmallRegpage}/>
    <Route path="/login" component={SmallLoginpage}/>
    <Route path="/user" component={Userdashboard}/>
  </Router>
);
