import React from 'react';
import {Link, IndexLink} from 'react-router';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import Paginate from './common/Paginate-UserList';

export default class UserList extends React.Component {
  render() {
    return (
      <div className="row">
        <AdminHeader/>
        <AdminSidebar/>
        <div className="container mainCon" style={{marginLeft: '5%'}}>
          <div className="row">
            <div className="section">
              <h4 style={{marginTop: '7%'}}>Borrowed Books</h4>
            </div>
            <div className="divider" style={{width: '100%', marginTop: '-2.5%', marginBottom: '3.5%'}}></div>

            <div className="row">
              <table className="bordered highlight">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>email</th>
                    <th>Blocked</th>
                    <th>Restrict_Access</th>
                    <th>borrow History</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>James Ajiboye</td>
                    <td>Jamie</td>
                    <td>08099977755</td>
                    <td>jamesajiboye@gmail.com</td>
                    <td>true</td>
                    <td>
                      <a className="waves-effect waves-light btn btn-small green">Unlock</a>
                      <a className="waves-effect waves-light btn btn-small red">Block</a>
                    </td>
                    <td><a className="waves-effect waves-light btn btn-small teal">View</a></td>
                  </tr>
                  <tr>
                    <td>James Ajiboye</td>
                    <td>Jamie</td>
                    <td>08099977755</td>
                    <td>jamesajiboye@gmail.com</td>
                    <td>true</td>
                    <td>
                      <a className="waves-effect waves-light btn btn-small green">Unlock</a>
                      <a className="waves-effect waves-light btn btn-small red">Block</a>
                    </td>
                    <td><a className="waves-effect waves-light btn btn-small teal">View</a></td>
                  </tr>
                  <tr>
                    <td>James Ajiboye</td>
                    <td>Jamie</td>
                    <td>08099977755</td>
                    <td>jamesajiboye@gmail.com</td>
                    <td>true</td>
                    <td>
                      <a className="waves-effect waves-light btn btn-small green">Unlock</a>
                      <a className="waves-effect waves-light btn btn-small red">Block</a>
                    </td>
                    <td><a className="waves-effect waves-light btn btn-small teal">View</a></td>
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