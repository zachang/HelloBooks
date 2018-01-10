import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { getUserAction } from '../actions/userAction';
import UserRow from './user/UserRow.jsx';

/**
 * UserList class declaration
 * @class UserList
 * @extends {React.Component}
 */
export class UserList extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      pageCount: null,
      limit: 15
    };
  }

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.getUserAction(this.state.limit, 0);
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps - nextProps
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userState.success === false) {
      this.setState({ errors: nextProps.userState.errors });
    }

    if (this.state.pageCount !== nextProps.userState.pageCount) {
      this.setState({ pageCount: nextProps.userState.pageCount });
    }
  }

  /**
   * Renders UserList component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='row'>
        <div className='section'>
          <h4 style={{ marginTop: '7%' }}>Borrowed Books</h4>
        </div>
        <div className='divider' style={{ width: '100%', marginTop: '-2.5%', marginBottom: '3.5%' }}></div>

        <div className='row'>
          <table className='bordered highlight'>
            <thead className='black white-text'>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Phone</th>
                <th>email</th>
                <th>borrow History</th>
              </tr>
            </thead>

            <tbody>
              { this.props.userState.users.map((user, i) =>
                <UserRow
                  key={i}
                  user={user}
                />
              )}
            </tbody>
          </table>
        </div>

        <div className='row'>
          {
            ((this.state.pageCount) ?
              <Pagination
                items={this.state.pageCount}
                onSelect={(page) => {
                  const offset = (page - 1) * this.state.limit;
                  this.props.getUserAction(this.state.limit, offset);
                }} /> : '')
          }
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