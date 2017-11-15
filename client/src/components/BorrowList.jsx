import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewAllBorrowAction }from '../actions/bookAction';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import Paginate from './common/Paginate-BorrowList';
import UserBorrowList from './borrow/UserBorrowList.jsx';

export class BorrowList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: null
    }
  }


  componentWillMount() {
    this.props.viewAllBorrowAction();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookState.success === false){
      this.setState({ errors: nextProps.bookState.errors });
    }
  }

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
                  <th>Confirm</th>
                </tr>
                </thead>

                <tbody>
                { this.props.bookState.borrowers.map((borrower, i) =>
                    <UserBorrowList
                      key={i}
                      borrower={ borrower }
                    />
                )}
                </tbody>
              </table>
            </div>

            <Paginate/>

          </div>
        </div>
      </div>

    );
  }
}


BorrowList.propTypes = {
  viewAllBorrowAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewAllBorrowAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BorrowList);