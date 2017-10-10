import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Homepage from './components/Homepage.jsx';
import RegisterPage from './components/auth/RegisterPage.jsx';
import Userdashboard from './components/User.jsx';
import Admindashboard from './components/Admin.jsx';
import UserList from './components/UserList.jsx';
import Profile from './components/Profile.jsx';
import Returned from './components/Returned.jsx';
import Borrowed from './components/Borrowed.jsx';
import BorrowList from './components/Borrowlist.jsx';
import ReturnedList from './components/ReturnedList.jsx';
import AddBook from './components/AddBook.jsx';
import AddCategory from './components/AddCategory.jsx';
import UpdateBook from './components/UpdateBook.jsx';
import auth from './components/auth';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Homepage}/>
    <Route path="/register" component={RegisterPage}/>
    <Route path="/login" component={auth.LoginPage}/>
    <Route component={auth.Authenticate}>
      <Route path="/user" component={Userdashboard}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/returned" component={Returned}/>
      <Route path="/borrowed" component={Borrowed}/>
      <Route path="/admin" component={Admindashboard}/>
      <Route path="/user" component={UserList}/>
      <Route path="/borrow" component={BorrowList}/>
      <Route path="/return" component={ReturnedList}/>
      <Route path="/books" component={AddBook}/>
      <Route path="/books/:id" component={UpdateBook}/>
      <Route path="/category" component={AddCategory}/>
    </Route>
  </Router>
);
