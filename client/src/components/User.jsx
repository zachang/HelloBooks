import React from 'react';
import PropTypes from 'react-proptypes';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { getBookAction, borrowBookAction } from '../actions/bookAction';
import BookCardUser from './book/BookCardUser.jsx';
import { decodeToken } from '../utils/helpers';
import { getCategoryAction } from '../actions/categoryAction';

/**
 * User class declaration
 * @class User
 * @extends {React.Component}
 */
export class User extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      categories: [],
      categoryId: '',
      pageCount: null,
      limit: 3,
      showToast: false,
    };
    this.borrowBook = this.borrowBook.bind(this);
    this.bookCategoryChange = this.bookCategoryChange.bind(this);
  }

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.getBookAction(this.state.limit, 0, this.state.categoryId);
    this.props.getCategoryAction();
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps - nextProps
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookState.success === false) {
      this.setState({ errors: nextProps.bookState.errors });
    }

    if (nextProps.bookState.borrows === 'Borrow completed') {
      if (this.state.showToast) {
        Materialize.toast('Book borrowed, collect within 24hrs to prevent reversal!', 10000);
        this.setState({ showToast: false });
      }
    }

    if (nextProps.bookState.fails === 'You have not returned the previous book you borrowed') {
      if (this.state.showToast) {
        Materialize.toast('Please, return the previous book you borrowed', 5000);
        this.setState({ showToast: false });
      }
    } else if (nextProps.bookState.fails === 'All books have been borrowed') {
      if (this.state.showToast) {
        Materialize.toast('All copies have been borrowed, try again later!', 5000);
        this.setState({ showToast: false });
      }
    } else if (nextProps.bookState.fails === 'Process failed') {
      if (this.state.showToast) {
        Materialize.toast('Borrow failed, try again!', 5000);
        this.setState({ showToast: false });
      }
    }

    if (this.state.categories !== nextProps.categoryState.categories) {
      this.setState({ categories: nextProps.categoryState.categories });
    }
    if (this.state.pageCount !== nextProps.bookState.pageCount) {
      this.setState({ pageCount: nextProps.bookState.pageCount });
    }
  }

  /**
   * @method componentDidUpdate
   * @return {void} void
   */
  componentDidUpdate() {
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
    $(ReactDOM.findDOMNode(this.refs.categoryId)).on('change', this.bookCategoryChange.bind(this));
  }

  /**
   * @method bookCategoryChange
   * @return {void}
   * @param {object} event - event
   */
  bookCategoryChange(event) {
    this.setState({ categoryId: event.target.value });
    this.props.getBookAction(this.state.limit, 0, event.target.value);
  }

  /**
   * Handles book borrow
   * @method borrowBook
   * @param {string} token
   * @param {int} bookId
   * @return {void} void
   */
  borrowBook(token, bookId) {
    const userId = decodeToken(token).id;
    this.props.borrowBookAction(userId, bookId);
    this.setState({ showToast: true });
  }

  /**
   * Renders User component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='row'>
        <div className='section'>
          <h4 style={{ marginTop: '7%' }}>All Books</h4>
        </div>
        <div className='divider' style={{ marginTop: '-2%', marginBottom: '3%' }}></div>

        <div className='row'>
          <div className='input-field col s6 l4  m4'>
            <select
              name = 'categoryId'
              value = {this.state.categoryId}
              ref = 'categoryId'
              onChange= {this.bookCategoryChange}
            >
              <option value=''>Select Category</option>
              { this.state.categories.map((category, i) =>
                <option key={i} value={category.id}>{category.categoryName}</option>
              )}
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='row'>
            { this.props.bookState.books.map((book, i) =>
              <BookCardUser
                key={i}
                book={book}
                borrowBook = {this.borrowBook}
              />
            )}
          </div>

          <div className='row'>
            {
              ((this.state.pageCount) ?
                <Pagination
                  items={this.state.pageCount}
                  onSelect={(page) => {
                    const offset = (page - 1) * this.state.limit;
                    this.props.getBookAction(this.state.limit, offset, this.state.categoryId);
                  }
                  } /> : '')
            }
          </div>

        </div>

      </div>
    );
  }
}

User.propTypes = {
  bookState: PropTypes.object.isRequired,
  categoryState: PropTypes.object.isRequired,
  getBookAction: PropTypes.func.isRequired,
  getCategoryAction: PropTypes.func.isRequired,
  borrowBookAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
  categoryState: state.categoryReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBookAction, getCategoryAction, borrowBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);