import React from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';

export default class AdminSidebar extends React.Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }

  render() {
    return (
      <div className="side col m2 l2 hide-on-small-and-down nav-pan">
        <div className="col m2 l2 grey darken-4 addPad nav-pan-child">
          <div className="row walp">
            <div className="">
              <img src="./imgs/eben2.jpg"
                   style={{width: '100px', height: '100px', margin: '22% 0% 0% 26%', boxShadow: '2px 1px 20px #000'}}
                   alt="" className="circle responsive-img"/>
            </div>
          </div>
          <div className="row dash">
            <span><i className="material-icons" style={{margin: '10% 0% 10% 0%'}}>dashboard</i>Dashboard</span>
          </div>

          <div className="row rowcollap">
            <ul>
              <li><a href="profile.html">Profile</a></li>
              <li className="no-padding">
                <ul className="collapsible collapsible-accordion">
                  <li>
                    <a className="collapsible-header">Books Shelf<i className="material-icons">arrow_drop_down</i></a>
                    <div className="collapsible-body">
                      <ul>
                        <li><a href="admin.html">All Books</a></li>
                        <li><a href="./borrowedbooks.html">Borrowed Books</a></li>
                        <li><a href="./returnedbook.html">Returned Books</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="no-padding">
                <ul className="collapsible collapsible-accordion">
                  <li>
                    <a className="collapsible-header">Book Categories<i
                      className="material-icons">arrow_drop_down</i></a>
                    <div className="collapsible-body">
                      <ul>
                        <li><a href="#">Computer Programming</a></li>
                        <li><a href="#">Eentertainment</a></li>
                        <li><a href="#">History</a></li>
                        <li><a href="#">Science</a></li>
                        <li><a href="#">Sports</a></li>
                        <li><a href="#">Travel</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="no-padding">
                <ul className="collapsible collapsible-accordion">
                  <li>
                    <a className="collapsible-header">Permissions<i className="material-icons">arrow_drop_down</i></a>
                    <div className="collapsible-body">
                      <ul>
                        <li><Link to="/addbook">Add Books</Link></li>
                        <li><a href="addcategories.html">Add Categories</a></li>
                        <li><a href="#">Add Admin</a></li>
                        <li><a href="#">Remove Admin</a></li>
                        <li><a href="#">Block User</a></li>
                        <li><a href="#">Unblock User</a></li>
                        <li><a href="#">Upgrade User</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li><Link to="#" onClick={this.logOut}>Logout</Link></li>
            </ul>
          </div>

        </div>

      </div>

    );
  }
}
