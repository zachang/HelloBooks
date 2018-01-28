import React from 'react';
import PropTypes from 'react-proptypes';

/**
 * @function UserReturn
 *
 * @param {object} props
 *
 * @return {XML} JSX
 */
const UserReturn = props => (
  <div className='col l4 s10 m6 cardsm'>
    <div className='card large sticky-action'>
      <div className='card-image waves-effect waves-block waves-light'>
        <img className='activator'
          src={(props.returning.Book.bookImage !== null) ?
            props.returning.Book.bookImage : '../../imgs/default.jpg'}
        />
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>
          <small>{ props.returning.Book.bookName }</small>
          <i className='material-icons right'>more_vert</i>
        </span>
      </div>
      <div className='card-reveal'>
        <span className='card-title grey-text text-darken-4'>
          <small>{ props.returning.Book.bookName }</small>
          <i className='material-icons right'>
            close
          </i>
        </span>
        <p>Author: { props.returning.Book.author }</p>
        <p>Category: { props.returning.Book.Category.categoryName }</p>
        <p>
          Published: {
            new Date(props.returning.Book.publishYear).getFullYear()
          }
        </p>
        <p>Pages: { props.returning.Book.pages }</p>
        <p>Stock: { props.returning.Book.bookCount }</p>
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
