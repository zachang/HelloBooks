import React from 'react';
import { Link } from 'react-router';
import { decodeToken } from '../utils/helpers';

/**
 * PageNotFound class declaration
 * @class PageNotFound
 * @extends {React.Component}
 */
export default class PageNotFound extends React.Component {
  /**
   * Renders PageNotFound component
   * @return {XML} JSX
   */
  render() {
    const userRoles = decodeToken(window.sessionStorage.token);

    return (
      <div>
        <div className='pageNotFound'>
          {(userRoles.isAdmin) ? <Link to={`admin`}><button className='back'>Home</button></Link>
            :
            <Link to={`user`}><button className='back'>Home</button></Link>
          }
        </div>
      </div>
    );
  }
}