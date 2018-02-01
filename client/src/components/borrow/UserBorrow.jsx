import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

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
          <Link
            className='white tooltipped'
            data-position='bottom'
            data-delay='50'
            data-tooltip='Wait for borrow confirmation'
          >
            <i
              className='small material-icons confirmBorrow'
              style={{ color: 'grey', cursor: 'pointer' }}
            >
              undo
            </i>
          </Link> : (props.borrow.returned === 'true') ?
            <Link
              className='white tooltipped'
              data-position='bottom'
              data-delay='50'
              data-tooltip='Return confirmed'
            >
              <i
                className='small material-icons confirmedReturn'
                style={{ color: 'grey', cursor: 'pointer' }}
              >
                done
              </i>
            </Link> :
            <Link
              className='white tooltipped'
              data-position='bottom'
              data-delay='50'
              data-tooltip='Return book'
            >
              <i
                className='small material-icons returnBook'
                onClick={() => (props.returnBook(props.borrow.Book.id))}
                style={{ color: 'red', cursor: 'pointer' }}
              >
                undo
              </i>
            </Link>}

        <Link
          to={`read/${props.borrow.Book.id}`}
          className='white tooltipped'
          data-position='bottom'
          data-delay='50'
          data-tooltip='Read book'
        >
          <i
            className='small material-icons readBook'
            onClick={() => (props.readBook())}
            style={{ color: 'teal', cursor: 'pointer' }}
          >
                remove_red_eye
          </i>
        </Link>
      </div>
    </div>
  </div>
);

UserBorrow.propTypes = {
  borrow: PropTypes.object.isRequired,
  returnBook: PropTypes.func.isRequired,
  readBook: PropTypes.func.isRequired

};
export default UserBorrow;
