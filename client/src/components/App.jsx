import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOneUserAction } from '../actions/userAction';
import AdminHeader from './common/AdminHeader.jsx';
import AdminSidebar from './common/AdminSidebar.jsx';
import UserHeader from './common/UserHeader.jsx';
import UserSidebar from './common/UserSidebar.jsx';
import { decodeToken } from '../utils/helpers';

/**
 * App class declaration
 * @class App
 * @extends {React.Component}
 */
export  class App extends React.Component {

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    const userId = decodeToken(window.sessionStorage.token);
    this.props.getOneUserAction(userId.id);
  }

  render() {
    const userRoles = decodeToken(window.sessionStorage.token);

    return (
      <div className='row'>
        {(userRoles.is_admin) ?
          <AdminHeader profileUsername={this.props.userState.user.username}/>
            :
          <UserHeader profileUsername={this.props.userState.user.username}/>}
        {(userRoles.is_admin) ?
          <AdminSidebar profileImage={this.props.userState.user.user_image}/>
            :
          <UserSidebar profileImage={this.props.userState.user.user_image}/>}
        <div className='container mainCon' style={{ marginLeft: '5%' }}>
          {this.props.children}
        </div>>
      </div>
    )
  }
}

App.propTypes = {
  userState: PropTypes.object.isRequired,
  getOneUserAction: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  userState: state.userReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOneUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);