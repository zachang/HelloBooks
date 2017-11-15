import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewAllReturnAction }from '../actions/bookAction';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import Paginate from './common/Paginate-ReturnedList';
import UserReturnList from './borrow/UserReturnList.jsx';

export class ReturnedList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: null
    }
  }

  componentWillMount() {
    this.props.viewAllReturnAction();
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
              <h4 style={{ marginTop: '7%' }}>Returned Books</h4>
            </div>
            <div className='divider' style={{ width: '100%', marginTop: '-2.5%', marginBottom: '3.5%' }}></div>

            <div className='row'>
              <table className='bordered highlight'>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>Username</th>
                    <th>Borrow_Date</th>
                    <th>Return_Date</th>
                    <th>Return_status</th>
                    <th>Overdue</th>
                  </tr>
                </thead>

                <tbody>
                { this.props.bookState.returners.map((returner, i) =>
                  <UserReturnList
                    key={i}
                    returner={ returner }
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

ReturnedList.propTypes = {
  viewAllReturnAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewAllReturnAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReturnedList);