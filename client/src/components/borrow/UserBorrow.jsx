import React from 'react';
import PropTypes from 'react-proptypes';

/**
 * @function UserBorrow
 *
 * @param {object} props
 *
 * @return {XML} JSX
 */
const UserBorrow = props => (
  <div className='col l4 s10 m6 cardsm'>
    <div className='card large sticky-action'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator'
          src={(props.borrow.Book.bookImage !== null) ?
            props.borrow.Book.bookImage : '../../imgs/default.jpg'}/>
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>
          <small>{props.borrow.Book.bookName}</small>
          <i className='material-icons right'>more_vert</i>
        </span>
      </div>
      <div className='card-reveal'>
        <span className='card-title grey-text text-darken-4'>
          <small>{props.borrow.Book.bookName}</small>
          <i className='material-icons right'>
            close
          </i>
        </span>
        <p>Author: {props.borrow.Book.author}</p>
        <p>Category: {props.borrow.Book.Category.categoryName}</p>
        <p>Published:
          {new Date(props.borrow.Book.publishYear).getFullYear()}
        </p>
        <p>Pages: {props.borrow.Book.pages}</p>
        <p>Stock: {props.borrow.Book.bookCount}</p>
        <p>Description: {(props.borrow.Book.description)}
        </p>
      </div>
      <div className='card-action home-card'>
        {(props.borrow.borrowStatus === 'pending') ?
          <button
            className='waves-effect waves-light btn grey tooltipped'
            data-position='bottom'
            data-delay='50'
            data-tooltip='Wait for borrow confirmation'
          >
            Return
          </button> : (props.borrow.returned === 'true') ?
            <button
              className='waves-effect waves-light btn grey tooltipped'
              data-position='bottom'
              data-delay='50'
              data-tooltip='Book return confirmed'
            >
              Confirmed
            </button> :
            <button
              onClick={() => (props.returnBook(props.borrow.Book.id))}
              className='waves-effect waves-light btn red'
            >
              Return
            </button>}
      </div>
    </div>
  </div>
);

UserBorrow.propTypes = {
  borrow: PropTypes.object.isRequired,
  returnBook: PropTypes.func.isRequired

};
export default UserBorrow;
