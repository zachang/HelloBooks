import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

/**
 * @function UserReturnedList
 * @param {object} props
 * @return {XML} JSX
 */
const UserReturnedList = props => (
  <tr>
    <td>{ props.returner.Book.bookName }</td>
    <td>{ props.returner.User.fullname}</td>
    <td>{ new Date(props.returner.borrowDate).toLocaleString()}</td>
    <td>{ (props.returner.expectedReturn === null) ? 'None' : new Date(props.returner.expectedReturn).toLocaleString() }</td>
    <td>{ new Date(props.returner.actualReturn).toLocaleString() }</td>
    <td>No</td>
    <td>
      { (props.returner.returned === 'true' || (props.clickedReturnedBorrowList.indexOf(props.returner.id) > -1)) ? 'Confirmed' :
        <Link
          className='waves-effect waves-light btn btn-small'
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