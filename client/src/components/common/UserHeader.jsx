import React from 'react';
import {Link, browserHistory} from 'react-router';
import jwt_decode from 'jwt-decode';

export default class UserHeader extends React.Component {
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
      <div className='col m10 l10 s12 right' style={{padding: '0px'}}>
        <div className='navbar-fixed'>
          <nav className='mainNav black col m10 l10' role='navigation'>
            <div className='nav-wrapper container'><Link id='logo-container' to='/user' className='brand-logo mainLogo'><img
              src='./imgs/hello.png' alt='hellobooks'/></Link>
              <ul className='user hide-on-small-and-down show-on-medium-and-up'>
                <Link className='dropdown-button btn black btn-prof' to='' data-activates='dropdown1'>
                  <i className='material-icons mat-icon right' style={{margin: '0% 0% 0% 1%'}}>arrow_drop_down</i>
                  {userDetails.username}
                </Link>
              </ul>

              <ul id='dropdown1' className='dropdown-content hide-on-small-and-down'>
                <li><Link to='/profile'>Profile</Link></li>
                <li className='divider'></li>
                <li><Link to='/returned'>Returned Books</Link></li>
                <li className='divider'></li>
                <li><Link to='/borrowed'>Borrowed Books</Link></li>
                <li className='divider'></li>
                <li><Link to=''>Change Password</Link></li>
                <li className='divider'></li>
                <li><Link to='#' onClick={this.logOut}>Logout</Link></li>
              </ul>

              <ul id='nav-mobile' className='side-nav grey darken-4 hide-on-med-and-up'>
                <li>
                  <div className='row walp'>
                  </div>
                </li>
                <li><Link to='/profile'>Profile</Link></li>
                <li className='no-padding'>
                  <ul className='collapsible collapsible-accordion'>
                    <li>
                      <Link className='collapsible-header'>Books Shelf<i className='material-icons mat-icon'>arrow_drop_down</i></Link>
                      <div className='collapsible-body'>
                        <ul>
                          <li><Link to='/user'>All Books</Link></li>
                          <li><Link to='/borrowed'>Borrowed Books</Link></li>
                          <li><Link to='/returned'>Returned Books</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
                <li><Link to='#'>Change Password</Link></li>
                <li><Link to='#' onClick={this.logOut}>Logout</Link></li>
              </ul>
              <Link href='#' data-activates='nav-mobile' className='button-collapse menu-icon-link'><i
                className='material-icons hide-on-med-and-up'>menu</i></Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

