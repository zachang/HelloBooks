import React from 'react';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import Paginate from './common/Paginate-BorrowList';

export default class BorrowList extends React.Component {
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
                <tr>
                  <td>Harry Potter</td>
                  <td>Health</td>
                  <td>Kiky Martins</td>
                  <td>2017/07/08</td>
                  <td>Pending</td>
                  <td>
                    <a className='waves-effect waves-light btn btn-small green'>Accept</a>
                    <a className='waves-effect waves-light  btn btn-small red'>Reject</a>
                  </td>
                </tr>
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