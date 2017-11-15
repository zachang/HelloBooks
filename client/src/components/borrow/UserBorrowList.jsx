import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

const UserBorrowList = props => (
  <tr>
    <td>{ props.borrower.Book.book_name }</td>
    <td>{ props.borrower.Book.Category.category_name }</td>
    <td>{ props.borrower.User.fullname }</td>
    <td>{ new Date(props.borrower.createdAt).toLocaleString() }</td>
    <td>{ props.borrower.returned}</td>
    <td>
      <Link className='waves-effect waves-light btn btn-small green'>Accept</Link>
      <Link className='waves-effect waves-light  btn btn-small red'>Reject</Link>
    </td>
  </tr>
);

UserBorrowList.propTypes = {
  borrower: PropTypes.object.isRequired,

};
export default UserBorrowList;
