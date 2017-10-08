import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

const UserRow = props => (
  <tr>
    <td>James Ajiboye</td>
    <td>Jamie</td>
    <td>08099977755</td>
    <td>jamesajiboye@gmail.com</td>
    <td>true</td>
    <td>
      <Link className="waves-effect waves-light btn btn-small green">Unlock</Link >
      <Link className="waves-effect waves-light btn btn-small red">Block</Link >
    </td>
    <td><Link className="waves-effect waves-light btn btn-small teal">View</Link ></td>
  </tr>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired,

};
export default UserRow;
