import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

const UserReturnedList = props => (
  <tr>
    <td>{ props.returner.Book.book_name }</td>
    <td>{ props.returner.User.fullname}</td>
    <td>{ new Date(props.returner.borrow_date).toLocaleString()}</td>
    <td>{ (props.returner.expected_return === null) ? 'None' : new Date(props.returner.expected_return).toLocaleString() }</td>
    <td>{ new Date(props.returner.actual_return).toLocaleString() }</td>
    <td>No</td>
    <td>
      { (props.returner.returned === 'true' || (props.clickedReturnedBorrowList.indexOf(props.returner.id) > -1)) ? 'Confirmed' :
        <Link
          className='waves-effect waves-light btn btn-small green'
          onClick={() => (props.confirmReturn(props.returner.id))}
        >
          Confirm
        </Link>
      }
    </td>
  </tr>
);

UserReturnedList.propTypes = {
  returner: PropTypes.object.isRequired,
  clickedReturnedBorrowList: PropTypes.array.isRequired,
  confirmReturn: PropTypes.func.isRequired,
};
export default UserReturnedList;