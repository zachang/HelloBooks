import React from 'react';
import PropTypes from 'react-proptypes';
import { browserHistory } from 'react-router';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

/**
 * AuthenticateUser class declaration
 */
class Authenticate extends React.Component {

  componentDidMount() {
    if (!window.sessionStorage.token) {
      browserHistory.push('/login');
    }
  }
  render() {
    return this.props.children;
  }
}
Authenticate.propTypes = {
  children: PropTypes.element.isRequired
};

export default Authenticate;
