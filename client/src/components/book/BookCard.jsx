import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

/**
 * @function BookCard
 * @param {object} props
 * @return {XML} JSX
 */
const BookCard = props => (

  <div className='col l4 s10 m6 cardsm'>
    <div className='card large sticky-action'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator' src={(props.book.bookImage !== null)
          ? props.book.bookImage : '../../imgs/default.jpg'}
        />
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>
          <small>{ props.book.bookName }</small>
          <i className='material-icons right'>
            more_vert
          </i>
        </span>
      </div>
      <div className='card-reveal'
        style={{
          wordWrap: 'break-word',
          backgroundColor: 'rgba(0,0,0,1)',
          color: '#FFF'
        }}
      >
        <span
          className='card-title grey-text text-darken-4'
        >
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
        <p>Description: { props.book.description }</p>
      </div>
      <div className='card-action home-card'>

        <Link
          to={`read/${props.book.id}`}
          className='white tooltipped hidetooltip'
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

        <Link
          to={`books/${props.book.id}`}
          className='white tooltipped hidetooltip'
          data-position='bottom'
          data-delay='50'
          data-tooltip='Edit book'
        >
          <i
            className='small material-icons editBook'
            style={{ color: 'teal' }}
            onClick={() => (props.editBook())}
          >
            edit
          </i>
        </Link>

        <Link
          className='white tooltipped hidetooltip'
          data-position='bottom'
          data-delay='50'
          data-tooltip='Delete book'
        >
          <i
            className='small material-icons deleteBook'
            onClick={() => (props.deleteBook(props.book.id))}
            style={{ color: 'red', cursor: 'pointer' }}
          >
            delete
          </i>
        </Link>
      </div>

    </div>
  </div>
);

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  editBook: PropTypes.func,
  deleteBook: PropTypes.func,
  readBook: PropTypes.func

};
export default BookCard;
