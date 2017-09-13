import React from 'react';
import {Link, IndexLink} from 'react-router';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';

export default class AddCategory extends React.Component {
    render() {
        return (
            <div className="row">
                <AdminHeader/>
                <AdminSidebar/>
                <div className="container mainCon" style={{ marginLeft: '5%' }}>
                    <div className="row">
                        <div className="col s10 m8 l6 bookcat" style={{ marginLeft:'35%', marginTop:'20%' }}>

                            <div className="row">
                                <form className="col s10">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="book_name" type="text" className="validate"/>
                                            <label htmlFor="book_name">Book Name</label>
                                        </div>
                                    </div>
                                    <a className="waves-effect waves-light btn col s12">Add Category</a>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        );
    }
}