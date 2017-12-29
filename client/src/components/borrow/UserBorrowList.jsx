import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

const userBorrowList = props => (
  <tr>
    <td>{ props.borrower.Book.bookName }</td>
    <td>{ props.borrower.Book.Category.categoryName }</td>
    <td>{ props.borrower.User.fullname }</td>
    <td>{ new Date(props.borrower.createdAt).toLocaleString() }</td>
    <td>{ props.borrower.returned}</td>
    <td>
      { ((props.borrower.borrowStatus === 'true') || (props.clickedBorrowList.indexOf(props.borrower.id) > -1)) ? 'Confirmed' :
        <Link
          className='waves-effect waves-light btn btn-small'
          onClick={() => (props.confirmBorrow(props.borrower.id))}
        >
          Confirm
        </Link>
      }
    </td>
  </tr>
);

userBorrowList.propTypes = {
  borrower: PropTypes.object.isRequired,

};
export default userBorrowList;
