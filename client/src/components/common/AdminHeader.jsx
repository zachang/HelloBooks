import React from 'react';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'react-proptypes';
import logo from '../../build/imgs/hello.png';

/**
 * AdminHeader class declaration
 * @class AdminHeader
 * @extends {React.Component}
 */
export default class AdminHeader extends React.Component {
  /**
   * class constructor
   */
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  /**
   * @method componentDidMount
   * @return {void} void
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * Handles user logout
   * @method logOut
   * @return {void} void
   */
  logOut() {
    window.sessionStorage.removeItem('token');
  }

  /**
   * Renders AdminHeader component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='col m10 l10 s12 right' style={{ padding: '0px' }}>
        <div className='navbar-fixed'>
          <nav className='mainNav black col m10 l10' role='navigation'>
            <div className='nav-wrapper container'>
              <Link id='logo-container' to='/admin' className='brand-logo mainLogo'>
                <img src={logo} alt='hellobooks'/>
              </Link>
              <ul className='user hide-on-small-and-down show-on-medium-and-up'>
                <Link
                  className='dropdown-button btn black btn-prof'
                  to='#'
                  data-activates='dropdown1'>
                  <i
                    className='material-icons mat-icon right'
                    style={{ marginLeft: '1%' }}
                  >
                    arrow_drop_down
                  </i>
                  {this.props.profileUsername}
                </Link>
              </ul>

              <ul id='dropdown1' className='dropdown-content hide-on-small-and-down'>
                <li><Link to={'/profile/'}>Profile</Link></li>
                <li className='divider'></li>
                <li><Link to='/users'>View Users</Link></li>
                <li className='divider'></li>
                <li><Link to={`users/change`}>Change Password</Link></li>
                <li className='divider'></li>
                <li><Link to='#' className='logOut' onClick={this.logOut}>Logout</Link></li>
              </ul>

              <ul id='nav-mobile' className='side-nav grey darken-4 hide-on-med-and-up'>
                <li>
                  <div className='row walp'></div>
                </li>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li className='no-padding'>
                  <ul className='collapsible collapsible-accordion'>
                    <li>
                      <Link className='collapsible-header'>
                        Books Shelf
                        <i className='material-icons mat-icon'>
                          arrow_drop_down
                        </i>
                      </Link>
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
                      <a className='collapsible-header'>
                        Permissions
                        <i className='material-icons mat-icon'>
                          arrow_drop_down
                        </i>
                      </a>
                      <div className='collapsible-body'>
                        <ul>
                          <li><Link to='/books'>Add Books</Link></li>
                          <li><Link to='/category'>Add Categories</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
                <li><Link to={`users/change`}>Change Password</Link></li>
                <li><Link to='#' onClick={this.logOut}>Logout</Link></li>
              </ul>
              <Link href='#' data-activates='nav-mobile' className='button-collapse menu-icon-link'>
                <i className='material-icons hide-on-med-and-up'>
                  menu
                </i>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

AdminHeader.propTypes = {
  profileImage: PropTypes.string,
  profileUsername: PropTypes.string
};

