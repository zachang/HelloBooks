import React from 'react';
import PropTypes from 'react-proptypes';

const UserReturn = props => (
  <div className='col l4 s10 m6 cardsm'>
    <div className='card large sticky-action'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator'
             src={(props.returning.Book.book_image !== null) ? props.returning.Book.book_image : '../../imgs/default.jpg'}/>
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>
          <small>{ props.returning.Book.book_name }</small>
          <i className='material-icons right'>more_vert</i>
        </span>
      </div>
      <div className='card-reveal'>
        <span className='card-title grey-text text-darken-4'>
          <small>{ props.returning.Book.book_name }</small>
          <i className='material-icons right'>
            close
          </i>
        </span>
        <p>Author: { props.returning.Book.author }</p>
        <p>Category: { props.returning.Book.Category.category_name }</p>
        <p>Published: { new Date(props.returning.Book.publish_year).getFullYear() }</p>
        <p>Pages: { props.returning.Book.pages }</p>
        <p>Stock: { props.returning.Book.book_count }</p>
        <p>Description: {
          (props.returning.Book.description)
        }
        </p>
      </div>
      <div className='card-action home-card'>
      </div>
    </div>
  </div>
);

UserReturn.propTypes = {
  returning: PropTypes.object.isRequired,

};
export default UserReturn;
