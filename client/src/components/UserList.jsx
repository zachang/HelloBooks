import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { tokenValidate } from '../utils/helpers';
import getUserAction from '../actions/userAction';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import Paginate from './common/Paginate-UserList';
import UserRow from './user/UserRow.jsx';

export class UserList extends React.Component {

  componentWillMount() {
    this.props.getUserAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokenState.message != null) {
      tokenValidate(nextProps.tokenState.type);
    } else {
      this.setState({ errors: nextProps.userState.errors });
    }
  }

  render() {
    return (
      <div className="row">
        <AdminHeader/>
        <AdminSidebar/>
        <div className="container mainCon" style={{ marginLeft: '5%' }}>
          <div className="row">
            <div className="section">
              <h4 style={{marginTop: '7%'}}>Borrowed Books</h4>
            </div>
            <div className="divider" style={{width: '100%', marginTop: '-2.5%', marginBottom: '3.5%'}}></div>

            <div className="row">
              <table className="bordered highlight">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>email</th>
                    <th>Blocked</th>
                    <th>Restrict_Access</th>
                    <th>borrow History</th>
                  </tr>
                </thead>

                <tbody>
                  { this.props.userState.users.map((user, i) =>
                    <UserRow
                      key={i}
                      user={ user }
                    />
                  )}
                </tbody>
              </table>
            </div>

            <Paginate/>

          </div>
        </div>
      </div>

    );
  }
}

UserList.propTypes = {
  userState: PropTypes.object.isRequired,
  tokenState: PropTypes.object.isRequired,
  getUserAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  userState: state.userReducer,
  tokenState: state.tokenReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);