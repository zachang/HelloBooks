import React from 'react';
import { Link, IndexLink } from 'react-router';
import AdminHeader from './common/adminheader';
import AdminSidebar from './common/adminsidebar';
import PaginateUsers from './common/paginate-users';

export default class BorrowList extends React.Component {
    render() {
        return (
            <div className="row">
                <AdminHeader/>
                <AdminSidebar/>
                <div className="container mainCon" style={{ marginLeft:'5%' }}>
                    <div className="row">
                        <div className="section">
                            <h4 style={{ marginTop:'7%' }}>Borrowed Books</h4>
                        </div>
                        <div className="divider" style={{ width: '100%', marginTop: '-2.5%', marginBottom: '3.5%' }}></div>

                        <div className="row">
                            <table className="bordered highlight">
                                <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Borrower</th>
                                    <th>Returned</th>
                                    <th>More</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>Harry Potter</td>
                                    <td>Kiky Martins</td>
                                    <td>True</td>
                                    <td><a className="waves-effect waves-light btn teal">View</a></td>
                                </tr>
                                <tr>
                                    <td>Brave Heart</td>
                                    <td>Kony Baines</td>
                                    <td>False</td>
                                    <td><a className="waves-effect waves-light btn teal">View</a></td>
                                </tr>
                                <tr>
                                    <td>Davinci Code</td>
                                    <td>Matt Kyle</td>
                                    <td>True</td>
                                    <td><a className="waves-effect waves-light btn teal">View</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <PaginateUsers/>

                    </div>
                </div>
            </div>

        );
    }
}