import React from 'react';
import { decodeToken } from '../utils/helpers';
import { Link } from 'react-router';

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
          {(userRoles.is_admin) ? <Link to={`admin`}><button className='back'>Home</button></Link>
              :
            <Link to={`user`}><button className='back'>Home</button></Link>
          }
        </div>
      </div>
    );
  }
}