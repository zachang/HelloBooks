import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Homepage from './components/homepage.jsx';
import SmallRegpage from './components/smallreg.jsx';
import SmallLoginpage from './components/smlogin.jsx';
import Userdashboard from './components/user.jsx';
import Admindashboard from './components/admin.jsx';
import Profile from './components/profile.jsx';
import Returned from './components/returned.jsx';
import Borrowed from './components/borrowed.jsx';
import Borrowlist from './components/borrowlist.jsx';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Homepage}/>
    <Route path="/register" component={SmallRegpage}/>
    <Route path="/login" component={SmallLoginpage}/>
    <Route path="/user" component={Userdashboard}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/returned" component={Returned}/>
    <Route path="/borrowed" component={Borrowed}/>
    <Route path="/admin" component={Admindashboard}/>
    <Route path="/borrowlist" component={Borrowlist}/>
  </Router>
);
