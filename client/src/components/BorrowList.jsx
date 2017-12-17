import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { viewAllBorrowAction, confirmBorrowAction }from '../actions/bookAction';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import { Pagination } from 'react-materialize';
import UserBorrowList from './borrow/UserBorrowList.jsx';

/**
 * BorrowList class declaration
 * @class BorrowList
 * @extends {React.Component}
 */
export class BorrowList extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props){
    super(props);
    this.state = {
      errors: null,
      pageCount: null,
      limit: 15,
      clickedBorrowList: []
    };
    this.confirmBorrow = this.confirmBorrow.bind(this);
  }

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.viewAllBorrowAction(this.state.limit, 0);
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps - nextProps
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ clickedBorrowList: nextProps.bookState.clickedBorrowList });
    if(nextProps.bookState.success === false){
      this.setState({ errors: nextProps.bookState.errors });
    }
    if (this.state.pageCount !== nextProps.bookState.pageCount) {
      this.setState({ pageCount: nextProps.bookState.pageCount });
    }
  }

  /**
   * Handles  book borrow confirmation
   * @method confirmBorrow
   * @return {void}
   * @param {integer} borrowId - borrowId
   */
  confirmBorrow(borrowId) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      successButtonColor: '#26a69a',
      showCancelButton: true,
      confirmButtonColor: '#26a69a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Confirmed!',
          'Borrow has been confirmed',
          'success'
        );
        this.props.confirmBorrowAction(borrowId);
      }
    });
    this.setState({ showToast: true });
  }

  /**
   * Renders BorrowList component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='row'>
        <AdminHeader/>
        <AdminSidebar/>
        <div className='container mainCon' style={{marginLeft: '5%'}}>
          <div className='row'>
            <div className='section'>
              <h4 style={{ marginTop: '7%' }}>Borrowed Books</h4>
            </div>
            <div className='divider' style={{width: '100%', marginTop: '-2.5%', marginBottom: '3.5%'}}></div>

            <div className='row'>
              <table className='bordered highlight'>
                <thead className='black white-text'>
                <tr>
                  <th>Book Name</th>
                  <th>Category</th>
                  <th>Borrower</th>
                  <th>Date</th>
                  <th>Return_status</th>
                  <th>Confirm_Borrow</th>
                </tr>
                </thead>

                <tbody>
                { this.props.bookState.borrowers.map((borrower, i) =>
                    <UserBorrowList
                      key={i}
                      borrower={ borrower }
                      clickedBorrowList={this.state.clickedBorrowList}
                      confirmBorrow={this.confirmBorrow}
                    />
                )}
                </tbody>
              </table>
            </div>
            <div className='row'>
              {
                ((this.state.pageCount) ?
                  <Pagination
                    items={this.state.pageCount}
                    onSelect={(page) => {
                      const offset = (page - 1) * this.state.limit;
                      this.props.viewAllBorrowAction(this.state.limit, offset);
                    }} /> : '')
              }
            </div>

          </div>
        </div>
      </div>

    );
  }
}


BorrowList.propTypes = {
  bookState: PropTypes.object.isRequired,
  viewAllBorrowAction: PropTypes.func.isRequired,
  confirmBorrowAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewAllBorrowAction, confirmBorrowAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BorrowList);