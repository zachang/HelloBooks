import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

/**
 * @function BookCardUser
 * @param {object} props
 * @return {XML} JSX
 */
const BookCardUser = props => (

  <div className='col l4 s10 m6 cardsm'>
    <div className='card large sticky-action'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator' src={(props.book.bookImage !== null) ? props.book.bookImage : '../../imgs/default.jpg'}/>
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>
          <small>{props.book.bookName}</small>
          <i className='material-icons right'>
            more_vert
          </i>
        </span>
      </div>
      <div className='card-reveal'
        style={{ wordWrap: 'break-word', backgroundColor: 'rgba(0,0,0,1)', color: '#FFF' }}
      >
        <span className='card-title grey-text text-darken-4'>
          <small>{ props.book.bookName }</small>
          <i className='material-icons right'>
            close
          </i>
        </span>
        <p>Author: { props.book.author }</p>
        <p>Category: { props.book.Category.categoryName }</p>
        <p>Published: { new Date(props.book.publishYear).getFullYear() }</p>
        <p>Pages: { props.book.pages }</p>
        <p>Stock: { props.book.bookCount }</p>
        <p>Description: {
          (props.book.description)
        }
        </p>
      </div>
      <div className='card-action home-card'>

        <Link
          target='blank'
          to={`read/${props.book.id}`}
          className='white tooltipped'
          data-position='bottom'
          data-delay='50'
          data-tooltip='Read book'
        >
          <i
            className='small material-icons'
            style={{ color: 'teal', cursor: 'pointer' }}
          >
            remove_red_eye
          </i>
        </Link>

        <Link
          className='white tooltipped'
          data-position='bottom'
          data-delay='50'
          data-tooltip='Borrow book'
        >
          <i
            className='small material-icons'
            onClick={() => (props.borrowBook(window.sessionStorage.token, props.book.id))}
            style={{ color: 'teal', cursor: 'pointer' }}
          >
            dlibrary_books
          </i>
        </Link>
      </div>
    </div>
  </div>
);

BookCardUser.propTypes = {
  book: PropTypes.object.isRequired,
  borrowBook: PropTypes.func
};

export default BookCardUser;
