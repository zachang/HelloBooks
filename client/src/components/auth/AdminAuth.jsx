import React from 'react';
import PropTypes from 'react-proptypes';
import { browserHistory } from 'react-router';
import { decodeToken } from '../../utils/helpers';

/**
 * AuthenticateAdmin class declaration
 *
 */
class AdminAuth extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    if (!window.sessionStorage.token) {
      browserHistory.push('/');
    }
    else{
      const userDetails = decodeToken(window.sessionStorage.token);
      if(userDetails.isAdmin === false){
        browserHistory.push('/user');
      }
    }
  }
  /**
   * renders component
   * @return {XML} JSX
   */
  render() {
    return this.props.children;
  }
}

AdminAuth.propTypes = {
  children: PropTypes.element.isRequired
};

export default AdminAuth;
