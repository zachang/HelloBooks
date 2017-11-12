import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router';

const BookCard = props => (

  <div className="col l4 s10 m6 cardsm">
    <div className="card large sticky-action">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={ (props.book.book_image !== null)
          ? props.book.book_image : '../../imgs/default.jpg' }
        />
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          <small>{ props.book.book_name }</small>
          <i className="material-icons right">
            more_vert
          </i>
        </span>
      </div>
      <div className="card-reveal"
        style={{ wordWrap: 'break-word', backgroundColor: 'rgba(0,0,0,1)', color: '#FFF' }}
      >
        <span
          className="card-title grey-text text-darken-4"
        >
          <small>{ props.book.book_name }</small>
          <i className="material-icons right">
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
      <div className="card-action home-card">
        <Link
          to={`books/${ props.book.id }`}
          className="waves-effect waves-light btn teal"
        >
          Update
        </Link>
        <button
          onClick={() => (props.deleteBookAction(props.book.id))}
          className="waves-effect waves-light btn red"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
);

BookCard.propTypes = {
  book: PropTypes.object.isRequired,

};
export default BookCard;
