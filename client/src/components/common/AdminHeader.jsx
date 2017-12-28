import React from 'react';
import {Link, browserHistory} from 'react-router';
import jwt_decode from 'jwt-decode';
import logo from '../../build/imgs/hello.png';

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
      <div className='col m10 l10 s12 right' style={{ padding: '0px'} }>
        <div className='navbar-fixed'>
          <nav className='mainNav black col m10 l10' role='navigation'>
            <div className='nav-wrapper container'>
              <Link id='logo-container' to='/admin' className='brand-logo mainLogo'>
                <img src={logo} alt='hellobooks'/>
              </Link>
              <ul className='user hide-on-small-and-down show-on-medium-and-up'>
                <Link className='dropdown-button btn black btn-prof' to='#' data-activates='dropdown1'>
                  <i className='material-icons mat-icon right' style={{ marginLeft: '1%' }}>arrow_drop_down</i>
                  {this.props.profileUsername}
                </Link>
              </ul>

              <ul id='dropdown1' className='dropdown-content hide-on-small-and-down'>
                <li><Link to={ `/profile/${userDetails.id}` }>Profile</Link></li>
                <li className='divider'></li>
                <li><Link to='/users'>View Users</Link></li>
                <li className='divider'></li>
                <li><Link to={`users/${userDetails.id}/change`}>Change Password</Link></li>
                <li className='divider'></li>
                <li><Link to='#' onClick={this.logOut}>Logout</Link></li>
              </ul>

              <ul id='nav-mobile' className='side-nav grey darken-4 hide-on-med-and-up'>
                <li>
                  <div className='row walp'>
                  </div>
                </li>
                <li><Link to={ `/profile/${userDetails.id}` }>Profile</Link></li>
                <li className='no-padding'>
                  <ul className='collapsible collapsible-accordion'>
                    <li>
                      <Link className='collapsible-header'>Books Shelf<i className='material-icons mat-icon'>arrow_drop_down</i></Link>
                      <div className='collapsible-body'>
                        <ul>
                          <li><Link to='/admin'>All Books</Link></li>
                          <li><Link to='/borrow'>Borrowed Books</Link></li>
                          <li><Link to='/return'>Returned Books</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className='no-padding'>
                  <ul className='collapsible collapsible-accordion'>
                    <li>
                      <a className='collapsible-header'>Permissions<i className='material-icons mat-icon'>arrow_drop_down</i></a>
                      <div className='collapsible-body'>
                        <ul>
                          <li><Link to='/books'>Add Books</Link></li>
                          <li><Link to='/category'>Add Categories</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
                <li><Link to={`users/${userDetails.id}/change`}>Change Password</Link></li>
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

