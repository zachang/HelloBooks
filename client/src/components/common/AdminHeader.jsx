import React from 'react';
import {Link, browserHistory} from 'react-router';
import jwt_decode from 'jwt-decode';

export default class AdminHeader extends React.Component {
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
    $('.dropdown-button').dropdown();
  }

  render() {
    const userDetails = jwt_decode(window.sessionStorage.token);
    return (
      <div className="col m10 l10 s12 right" style={{ padding: '0px'} }>
        <div className="navbar-fixed">
          <nav className="mainNav black col m10 l10" role="navigation">
            <div className="nav-wrapper container">
              <Link id="logo-container" to="/admin" className="brand-logo mainLogo">
                <img src="./imgs/hello.png" alt="hellobooks"/>
              </Link>
              <ul className="user hide-on-small-and-down show-on-medium-and-up">
                <a className='dropdown-button btn black btn-prof' href='#' data-activates='dropdown1'>
                  <i className="material-icons mat-icon right" style={{ marginLeft: "1%" }}>arrow_drop_down</i>
                  {userDetails.username}
                </a>
              </ul>

              <ul id='dropdown1' className='dropdown-content hide-on-small-and-down'>
                <li><a href="profile.html">Profile</a></li>
                <li className="divider"></li>
                <li><a href="#!">View Users</a></li>
                <li className="divider"></li>
                <li><a href="#!">Remove Admin</a></li>
                <li className="divider"></li>
                <li><Link to="#" onClick={this.logOut}>Logout</Link></li>
              </ul>

              <ul id="nav-mobile" className="side-nav grey darken-4 hide-on-med-and-up">
                <li>
                  <div className="row walp">
                  </div>
                </li>
                <li><a href="profile.html">Profile</a></li>
                <li className="no-padding">
                  <ul className="collapsible collapsible-accordion">
                    <li>
                      <a className="collapsible-header">Books Shelf<i className="material-icons mat-icon">arrow_drop_down</i></a>
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
                      <a className="collapsible-header">Permissions<i className="material-icons mat-icon">arrow_drop_down</i></a>
                      <div className="collapsible-body">
                        <ul>
                          <li><Link to="/addbook">Add Books</Link></li>
                          <li><a href="addcategories.html">Add Categories</a></li>
                          <li><a href="#">Add Admin</a></li>
                          <li><a href="#">Remove Admin</a></li>
                          <li><a href="#">Upgrade User</a></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
                <li><Link to="#" onClick={this.logOut}>Logout</Link></li>
              </ul>
              <a href="#" data-activates="nav-mobile" className="button-collapse menu-icon-link"><i
                className="material-icons hide-on-med-and-up">menu</i></a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

