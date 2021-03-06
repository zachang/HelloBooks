import React from 'react';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'react-proptypes';


/**
 * AdminSidebar class declaration
 *
 * @class AdminSidebar
 *
 * @extends {React.Component}
 */
export default class AdminSidebar extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  /**
   * Handles user logout
   *
   * @method logOut
   *
   * @return {void} void
   */
  logOut() {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  }

  /**
   * Renders AdminSidebar component
   *
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='side col m2 l2 hide-on-small-and-down nav-pan'>
        <div className='col m2 l2 grey darken-4 addPad nav-pan-child'>
          <div className='row walp'>
            <div className='circle'>
              <img src={(this.props.profileImage) ? (this.props.profileImage)
                : '../../../imgs/avatar.png'
              }
              style={{
                width: '100px',
                height: '100px',
                margin: '22% 0% 0% 26%',
                boxShadow: '2px 1px 20px #000'
              }}
              alt='' className='circle responsive-img'/>
            </div>
          </div>
          <div className='row dash'>
            <span>
              <i className='material-icons' style={{ margin: '10% 0% 10% 0%' }}>
                dashboard
              </i>Dashboard
            </span>
          </div>

          <div className='row rowcollap'>
            <ul>
              <li><Link to={'/profile'}>Profile</Link></li>
              <li className='no-padding'>
                <ul className='collapsible collapsible-accordion'>
                  <li>
                    <Link className='collapsible-header'>
                      Books Shelf
                      <i className='material-icons'>
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
                      <i className='material-icons'>
                        arrow_drop_down
                      </i>
                    </a>
                    <div className='collapsible-body'>
                      <ul>
                        <li><Link to='/books'>Add Books</Link></li>
                        <li><Link to='category'>Add Categories</Link></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li><Link to={'/password/change'}>Change Password</Link></li>
              <li><Link to='' className='logOut' onClick={this.logOut}>
                Logout
              </Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

    );
  }
}

AdminSidebar.propTypes = {
  profileImage: PropTypes.string
};

