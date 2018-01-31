import React from 'react';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'react-proptypes';
import logo from '../../build/imgs/hello.png';

/**
 * UserHeader class declaration
 *
 * @class UserHeader
 *
 * @extends {React.Component}
 */
export default class UserHeader extends React.Component {
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
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown();
  }


  /**
   * Handles user logout
   * @method logOut
   * @return {void} void
   */
  logOut() {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  }

  /**
   * Renders AdminHeader component
   *
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='col m10 l10 s12 right' style={{ padding: '0px' }}>
        <div className='navbar-fixed'>
          <nav className='mainNav black col m10 l10' role='navigation'>
            <div className='nav-wrapper container'>
              <Link id='logo-container' to='/user'
                className='brand-logo mainLogo'
              >
                <img src={logo} alt='hellobooks'/></Link>
              <ul className='user hide-on-small-and-down show-on-medium-and-up'>
                <Link
                  className='dropdown-button btn black btn-prof'
                  to='' data-activates='dropdown1'>
                  <i
                    className='material-icons mat-icon right'
                    style={{ margin: '0% 0% 0% 1%' }}
                  >
                    arrow_drop_down
                  </i>
                  {this.props.profileUsername}
                </Link>
              </ul>

              <ul id='dropdown1'
                className='dropdown-content hide-on-small-and-down'
              >
                <li><Link to={'/profile'}>Profile</Link></li>
                <li className='divider'></li>
                <li><Link to='/returned'>Returned Books</Link></li>
                <li className='divider'></li>
                <li><Link to='/borrowed'>Borrowed Books</Link></li>
                <li className='divider'></li>
                <li><Link to={'/password/change'}>Change Password</Link></li>
                <li className='divider'></li>
                <li>
                  <Link to='' className='logOut'
                    onClick={this.logOut} id='logout'
                  >
                    Logout
                  </Link>
                </li>
              </ul>

              <div className='row'>
                <ul className='left hide-on-med-and-up homedrop'>
                  <Link
                    className='dropdown-button btn transparent homedrop-2'
                    to=''
                    data-activates='dropdown2'>
                    <i
                      className='material-icons mat-icon'
                    >
                      menu
                    </i>
                  </Link>
                </ul>

                <ul id='dropdown2'
                  className='dropdown-content black drop-content'
                >
                  <li>
                    <Link to={'/profile'}>Profile</Link>
                  </li>
                  <li className='divider'></li>
                  <li className='lists'>
                    <Link to='/user'>All Books</Link>
                  </li>
                  <li className='divider'></li>
                  <li><Link to='/returned'>Returned Books</Link></li>
                  <li className='divider'></li>
                  <li>
                    <Link to='/borrowed'>Borrowed Books</Link>
                  </li>
                  <li className='divider'></li>
                  <li>
                    <Link to={'/password/change'}>
                        Change Password
                    </Link>
                  </li>
                  <li className='divider'></li>
                  <li>
                    <Link to='' className='logOut'
                      onClick={this.logOut} id='logout'
                    >
                     Logout 
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

UserHeader.propTypes = {
  profileImage: PropTypes.string,
  profileUsername: PropTypes.string
};