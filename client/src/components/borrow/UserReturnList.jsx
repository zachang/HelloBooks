import React from 'react';
import PropTypes from 'react-proptypes';

const UserReturnList = props => (
  <tr>
    <td>{ props.returner.Book.book_name }</td>
    <td>{ props.returner.Book.Category.category_name }</td>
    <td>{ props.returner.User.fullname }</td>
    <td>{ new Date(props.returner.createdAt).toLocaleString() }</td>
    <td>{ new Date(props.returner.updatedAt).toLocaleString() }</td>
    <td>{ props.returner.returned}</td>
    <td>No</td>
  </tr>
);

UserReturnList.propTypes = {
  returner: PropTypes.object.isRequired,

};
export default UserReturnList;
