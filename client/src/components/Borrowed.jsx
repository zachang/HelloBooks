import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { viewUserBorrowAction, returnBookAction } from '../actions/bookAction';
import UserBorrow from './borrow/UserBorrow.jsx';
import { decodeToken } from '../utils/helpers';

/**
 * Borrowed class declaration
 *
 * @class Borrowed
 *
 * @extends {React.Component}
 */
export class Borrowed extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      books: [],
      pageCount: null,
      limit: 15,
      showToast: false,
    };
    this.returnBook = this.returnBook.bind(this);
  }

  /**
   * @method componentWillMount
   *
   * @return {void} void
   */
  componentWillMount() {
    const userDetails = decodeToken(window.sessionStorage.getItem('token'));
    this.props.viewUserBorrowAction(userDetails.id, this.state.limit, 0);
  }

  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps - nextProps
   *
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookState.success === false) {
      this.setState({ errors: nextProps.bookState.errors });
    }
    if (this.state.pageCount !== nextProps.bookState.pageCount) {
      this.setState({ pageCount: nextProps.bookState.pageCount });
    }
    if (nextProps.bookState.success === true &&
      nextProps.bookState.returned === 'return completed') {
      if (this.state.showToast) {
        Materialize.toast('Book returned successfully,' +
          ' visit library for confirmation!', 4000);
        this.setState({ showToast: false });
      }
    }
    if (nextProps.bookState.fails === 'Error returning book') {
      if (this.state.showToast) {
        Materialize.toast('Return failed, try again!', 5000);
        this.setState({ showToast: false });
      }
    } else if (nextProps.bookState.fails === 'Process failed') {
      if (this.state.showToast) {
        Materialize.toast('Return failed, try again!', 5000);
        this.setState({ showToast: false });
      }
    } else if (nextProps.bookState.fails === 'Book already returned') {
      if (this.state.showToast) {
        Materialize.toast('Book returned already!', 5000);
        this.setState({ showToast: false });
      }
    }
  }

  /**
   * @method componentDidUpdate
   *
   * @return {void} void
   */
  componentDidUpdate() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /**
   * Handles book return
   *
   * @method returnBook
   *
   * @return {void}
   *
   * @param {integer} bookId - bookId
   */
  returnBook(bookId) {
    const userDetails = decodeToken(window.sessionStorage.getItem('token'));
    this.props.returnBookAction(userDetails.id, bookId);
    this.setState({ showToast: true });
  }

  /**
   * Renders Borrowed component
   *
   * @return {XML} JSX
   */
  render() {
    const userId = decodeToken(window.sessionStorage.getItem('token'));
    return (
      <div className='row'>
        <div className='section'>
          <h4 style={{ marginTop: '7%' }}>Borrowed Books</h4>
        </div>
        <div className='divider'
          style={{
            marginTop: '-2%',
            marginBottom: '3%'
          }}>
        </div>

        <div className='row'>
          { (this.props.bookState.allBorrows &&
            Object.keys(this.props.bookState.allBorrows).length > 0) ?
            this.props.bookState.allBorrows.map((borrow, i) =>
              <UserBorrow
                key={i}
                borrow={borrow}
                returnBook ={this.returnBook}
              />
            ) :
            <h6 className='no-display'>
              Not borrowed books!
            </h6>
          }

        </div>

        <div className='row'>
          {
            ((this.state.pageCount) ?
              <Pagination
                items={this.state.pageCount}
                onSelect={(page) => {
                  const offset = (page - 1) * this.state.limit;
                  this.props.viewUserBorrowAction(userId.id,
                    this.state.limit, offset);
                }} /> : '')
          }
        </div>
      </div>
    );
  }
}

Borrowed.propTypes = {
  bookState: PropTypes.object.isRequired,
  viewUserBorrowAction: PropTypes.func.isRequired,
  returnBookAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewUserBorrowAction, returnBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Borrowed);