import React from 'react';
import PropTypes from 'react-proptypes';
import swal from 'sweetalert2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { viewAllReturnedAction, confirmReturnAction } from '../actions/bookAction';
import AdminHeader from './common/AdminHeader.jsx';
import AdminSidebar from './common/AdminSidebar.jsx';
import UserReturnedList from './returns/UserReturnedList.jsx';

/**
 * ReturnedList class declaration
 * @class ReturnedList
 * @extends {React.Component}
 */
export class ReturnedList extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      showToast: false,
      pageCount: null,
      limit: 15,
      clickedReturnedBorrowList: []
    };
    this.confirmReturn = this.confirmReturn.bind(this);
  }

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.viewAllReturnedAction(this.state.limit, 0);
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps - nextProps
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ clickedReturnedBorrowList: nextProps.bookState.clickedReturnedBorrowList });
    if (nextProps.bookState.success === false) {
      this.setState({ errors: nextProps.bookState.errors });
    }
    if (this.state.pageCount !== nextProps.bookState.pageCount) {
      this.setState({ pageCount: nextProps.bookState.pageCount });
    }
  }

  /**
   * Handles  book return confirmation
   * @method confirmReturn
   * @return {void}
   * @param {integer} borrowId - borrowId
   */
  confirmReturn(borrowId) {
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
          'Confirmed!',
          'Return has been confirmed.',
          'success'
        );
        this.props.confirmReturnAction(borrowId);
      }
    });
    this.setState({ showToast: true });
  }

  /**
   * Renders AddBook component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='row'>
        <AdminHeader/>
        <AdminSidebar/>
        <div className='container mainCon' style={{ marginLeft: '5%' }}>
          <div className='row'>
            <div className='section'>
              <h4 style={{ marginTop: '7%' }}>Returned Books</h4>
            </div>
            <div className='divider' style={{ width: '100%', marginTop: '-2.5%', marginBottom: '3.5%' }}></div>

            <div className='row'>
              <table className='bordered highlight'>
                <thead className='black white-text'>
                  <tr>
                    <th>Book Name</th>
                    <th>Borrower</th>
                    <th>Borrow_Date</th>
                    <th>Expected_Return_Date</th>
                    <th>Return_Date</th>
                    <th>Overdue</th>
                    <th>Confirm</th>
                  </tr>
                </thead>

                <tbody>
                  { this.props.bookState.returners.map((returner, i) =>
                    <UserReturnedList
                      key={i}
                      returner={returner}
                      clickedReturnedBorrowList={this.state.clickedReturnedBorrowList}
                      confirmReturn={this.confirmReturn}
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
                      this.props.viewAllReturnedAction(this.state.limit, offset);
                    }} /> : '')
              }
            </div>
          </div>
        </div>
      </div>

    );
  }
}

ReturnedList.propTypes = {
  bookState: PropTypes.object.isRequired,
  viewAllReturnedAction: PropTypes.func.isRequired,
  confirmReturnAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewAllReturnedAction, confirmReturnAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReturnedList);