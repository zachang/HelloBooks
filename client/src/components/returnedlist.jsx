import React from 'react';
import { Link, IndexLink } from 'react-router';
import AdminHeader from './common/adminheader';
import AdminSidebar from './common/adminsidebar';
import Paginate from './common/paginate-returnedlist';

export default class ReturnedList extends React.Component {
    render() {
        return (
            <div className="row">
                <AdminHeader/>
                <AdminSidebar/>
                <div className="container mainCon" style= {{ marginLeft:'5%' }}>
                    <div className="row">
                        <div className="section">
                            <h4 style={{ marginTop: '7%' }}>Returned Books</h4>
                        </div>
                        <div className="divider" style={{ width: '100%', marginTop: '-2.5%', marginBottom: '3.5%' }}></div>

                        <div className="row">
                            <table className="bordered highlight">
                                <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Borrower</th>
                                    <th>Borrow_Date</th>
                                    <th>Return_Date</th>
                                    <th>Overdue</th>
                                    <th>More</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>Harry Potter</td>
                                    <td>Kiky Martins</td>
                                    <td>2017/7/1</td>
                                    <td>2017/7/4</td>
                                    <td>No</td>
                                    <td><a className="waves-effect waves-light btn btn-small teal">View</a></td>
                                </tr>
                                <tr>
                                    <td>Brave Heart</td>
                                    <td>Kony Baines</td>
                                    <td>2017/7/1</td>
                                    <td>2017/7/2</td>
                                    <td>No</td>
                                    <td><a className="waves-effect waves-light btn btn-small teal">View</a></td>
                                </tr>
                                <tr>
                                    <td>Davinci Code</td>
                                    <td>Matt Kyle</td>
                                    <td>2017/7/1</td>
                                    <td>2017/7/7</td>
                                    <td>Yes</td>
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