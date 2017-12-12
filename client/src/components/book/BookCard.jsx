import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

const BookCard = props => (

  <div className='col l4 s10 m6 cardsm'>
    <div className='card large sticky-action'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator' src={(props.book.book_image !== null)
          ? props.book.book_image : '../../imgs/default.jpg'}
        />
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>
          <small>{ props.book.book_name }</small>
          <i className='material-icons right'>
            more_vert
          </i>
        </span>
      </div>
      <div className='card-reveal'
        style={{ wordWrap: 'break-word', backgroundColor: 'rgba(0,0,0,1)', color: '#FFF' }}
      >
        <span
          className='card-title grey-text text-darken-4'
        >
          <small>{ props.book.book_name }</small>
          <i className='material-icons right'>
            close
          </i>
        </span>
        <p>Author: { props.book.author }</p>
        <p>Category: { props.book.Category.category_name }</p>
        <p>Published: { new Date(props.book.publish_year).getFullYear() }</p>
        <p>Pages: { props.book.pages }</p>
        <p>Stock: { props.book.book_count }</p>
        <p>Description: { props.book.description }</p>
      </div>
      <div className='card-action home-card'>

        <Link
          target='blank'
          to={ props.book.book_content }
          className='white tooltipped hidetooltip'
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
          to={`books/${props.book.id}`}
          className='white tooltipped hidetooltip'
          data-position='bottom'
          data-delay='50'
          data-tooltip='Edit book'
        >
          <i
            className='small material-icons'
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
            className='small material-icons'
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

};
export default BookCard;
