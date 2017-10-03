import React from 'react';
import PropTypes from 'react-proptypes';
import { browserHistory } from 'react-router';

/**
 * AuthenticateUser class declaration
 *
 */
class Authenticate extends React.Component {
  /**
   * @return {void} void
   */
  componentDidMount() {
    if (!window.sessionStorage.token) {
      browserHistory.push('/');
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
Authenticate.propTypes = {
  children: PropTypes.element.isRequired
};

export default Authenticate;
