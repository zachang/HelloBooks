import React from 'react';
import PropTypes from 'react-proptypes';

const UserBorrow = props => (
    <div className="col l4 s10 m6 cardsm">
      <div className="card large sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator"
               src={(props.borrow.Book.book_image !== null) ? props.borrow.Book.book_image : '../../imgs/default.jpg'}/>
        </div>
        <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          <small>{ props.borrow.Book.book_name }</small>
          <i className="material-icons right">more_vert</i>
        </span>
        </div>
        <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
         <small>{ props.borrow.Book.book_name }</small>
          <i className="material-icons right">
            close
          </i>
        </span>
          <p>Author: { props.borrow.Book.author }</p>
          <p>Category: { props.borrow.Book.Category.category_name }</p>
          <p>Published: { new Date(props.borrow.Book.publish_year).getFullYear() }</p>
          <p>Pages: { props.borrow.Book.pages }</p>
          <p>Stock: { props.borrow.Book.book_count }</p>
          <p>Description: {
            (props.borrow.Book.description)
          }
          </p>
        </div>
        <div className="card-action home-card">
          <button
            onClick={ () => (props.returnBook(props.borrow.Book.id )) }
            className="waves-effect waves-light btn red"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );

UserBorrow.propTypes = {
  borrow: PropTypes.object.isRequired,

};
export default UserBorrow;
