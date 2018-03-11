import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'react-proptypes';
import logo from '../../build/imgs/hello.png';

/**
 * HomepageHeader class declaration
 *
 * @class HomepageHeader
 *
 * @extends {React.Component}
 */
export default class HomepageHeader extends React.Component {
  /**
   * Renders HomepageHeader component
   *
   * @return {XML} JSX
   */
  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <nav className='mainNav transparent' role='navigation'>
            <div className='nav-wrapper container'>
              <Link to='/' id='logo-container'
                className='brand-logo mainLogo brand'
              >
                <img src={logo} alt='hellobooks'/>
              </Link>

              <ul className='right hide-on-small-and-down'>
                <li><Link to='/'>Contact us</Link></li>
                <li><Link to='/'>About us</Link></li>
                <li><Link to='/'>Help</Link></li>
                <li>
                  {(
                    (this.props.btnText === false) ?
                      <Link to='/register'
                        className='btn-large waves-effect
                        waves-light orange join-us'
                      >
                        Join Us
                      </Link>
                      :
                      <Link
                        to='/login'
                        className='btn-large waves-effect
                        waves-light orange join-us'>
                        Login
                      </Link>
                  )}
                </li>
              </ul>

              <div className='row'>
                <ul className='left hide-on-med-and-up homedrop'>
                  <Link
                    className='dropdown-button btn transparent homedrop-2'
                    to='#'
                    data-activates='dropdown1'>
                    <i
                      className='material-icons mat-icon'
                    >
                    menu
                    </i>
                  </Link>
                </ul>

                <ul id='dropdown1'
                  className='dropdown-content black drop-content'
                >
                  <li><Link to='/login'>Login</Link></li>
                  <li className='divider'></li>
                  <li><Link to='/register'>Register</Link></li>
                </ul>
              </div>

            </div>
          </nav>
        </div>
      </div>
    );
  }
}

HomepageHeader.propTypes = {
  btnText: PropTypes.bool
};