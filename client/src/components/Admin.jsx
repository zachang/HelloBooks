import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import swal from 'sweetalert2';
import { getBookAction, deleteBookAction } from '../actions/bookAction';
import BookCard from './book/BookCard.jsx';
import { getCategoryAction } from '../actions/categoryAction';

/**
 * Admin class declaration
 * @class Admin
 * @extends {React.Component}
 */
export class Admin extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      categories: [],
      categoryId: '',
      pageCount: null,
      limit: 15,
      showToast: false,
    };
    this.bookCategoryChange = this.bookCategoryChange.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.readBook = this.readBook.bind(this);
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
   * @method componentDidUpdate
   *
   * @return {void} void
   */
  componentDidUpdate() {
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
    $('.tooltipped').tooltip({ delay: 50 });
    $('select').material_select();
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
    if (nextProps.bookState.success === true &&
      nextProps.bookState.fails === null) {
      if (this.state.showToast) {
        Materialize.toast('Book deleted!', 4000);
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
   * Handles book search by category
   *
   * @method bookCategoryChange
   *
   * @return {void}
   *
   * @param {object} event - event
   */
  bookCategoryChange(event) {
    this.setState({ categoryId: event.target.value });
    this.props.getBookAction(this.state.limit, 0, event.target.value);
  }

  /**
   * Handles book deletion
   *
   * @method deleteBook
   *
   * @return {void}
   *
   * @param {integer} bookId - bookId
   */
  deleteBook(bookId) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#26a69a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Book has been Deleted.',
          'success'
        );
        this.props.deleteBookAction(bookId);
      }
    });
    this.setState({ showToast: true });
    $('.tooltipped').tooltip('remove');
  }

  /**
   * Handles edit book tooltip removal when clicked
   *
   * @method editBook
   *
   * @return {void}
   */
  editBook() {
    $('.tooltipped').tooltip('remove');
  }

  /**
   * Handles read book tooltip removal when clicked
   *
   * @method readBook
   *
   * @return {void}
   */
  readBook() {
    $('.tooltipped').tooltip('remove');
  }

  /**
   * Renders AddBook component
   *
   * @return {XML} JSX
   */
  render() {
    return (
      <div>
        <div className='row'>
          <div className='section'>
            <h4 style={{ marginTop: '7%' }}>All Books</h4>
          </div>
          <div className='divider' style={{
            marginTop: '-2%',
            marginBottom: '3%' }}>
          </div>

          <div className='row'>
            <div className='col s6 l4  m4'>
              <select
                name = 'categoryId'
                value = {this.state.categoryId}
                onChange= {this.bookCategoryChange}
                className='browser-default'
              >
                <option value=''>Select Category</option>
                { this.state.categories.map((category, i) =>
                  <option key={i} value={category.id}>
                    {category.categoryName}
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className='row'>
            {(this.props.bookState.books.length > 0) ? <div className='row'>
              { this.props.bookState.books.map((book, i) =>
                <BookCard
                  key={i}
                  book={book}
                  deleteBook={this.deleteBook}
                  editBook={this.editBook}
                  readBook={this.readBook}
                />
              )}
            </div> : <div
              className='row bookCat'
            >
              No book available yet
            </div>}

            <div className='row'>
              {
                ((this.state.pageCount) ?
                  <Pagination
                    items={this.state.pageCount}
                    onSelect={(page) => {
                      const offset = (page - 1) * this.state.limit;
                      this.props.getBookAction(this.state.limit, offset,
                        this.state.categoryId);
                    }
                    } /> : '')
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}


Admin.propTypes = {
  bookState: PropTypes.object.isRequired,
  categoryState: PropTypes.object.isRequired,
  getBookAction: PropTypes.func.isRequired,
  getCategoryAction: PropTypes.func.isRequired,
  deleteBookAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
  categoryState: state.categoryReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getBookAction,
    getCategoryAction,
    deleteBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);