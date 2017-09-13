import React from 'react';
import {Link, IndexLink} from 'react-router';
import AdminHeader from './common/adminheader';
import AdminSidebar from './common/adminsidebar';

export default class AddBook extends React.Component {
    render() {
        return (
            <div className="row">
                <AdminHeader/>
                <AdminSidebar/>
                <div className="container mainCon" style={{ marginLeft: '5%' }}>
                    <div className="row">
                        <div className="col s10 m8 l6 bookadd" style={{ marginLeft:'35%', marginTop:'4%' }}>

                            <div className="row">
                                <form className="col s10">
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <input id="book_name" type="text" className="validate"/>
                                                <label htmlFor="book_name">Book Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <input id="author" type="text" className="validate"/>
                                                <label htmlFor="author">Author</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <input id="publish_year" type="text" className="datepicker"/>
                                                <label htmlFor="publish_year">Publish Year</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <input id="isbn" type="text" className="validate"/>
                                                <label htmlFor="isbn">ISBN</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <input id="pages" type="number" className="validate"/>
                                                <label htmlFor="pages">Pages</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <textarea id="description" className="materialize-textarea"></textarea>
                                            <label htmlFor="description">Description</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <select>
                                                <option value="" disabled >Select</option>
                                                <option value="1">Option 1</option>
                                                <option value="2">Option 2</option>
                                                <option value="3">Option 3</option>
                                            </select>
                                            <label>Choose Category</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="count" type="number" />
                                                <label htmlFor="count">Add Count</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="file-field input-field col s10">
                                            <div className="btn">
                                                <span>Add Image</span>
                                                <input type="file" />
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="waves-effect waves-light btn col s12">Add Book</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}