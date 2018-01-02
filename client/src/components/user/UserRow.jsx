import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

/**
 * @function UserRow
 * @param {object} props
 * @return {XML} JSX
 */
const UserRow = props => (
  <tr>
    <td>{ props.user.fullname }</td>
    <td>{ props.user.username }</td>
    <td>{ props.user.phoneNo }</td>
    <td>{ props.user.email }</td>
    <td><Link className='waves-effect waves-light btn btn-small teal'>View</Link ></td>
  </tr>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired,

};
export default UserRow;
