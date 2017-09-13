import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class UserSidebar extends React.Component {
    componentDidMount() {
        $('.collapsible').collapsible();
    }

    render() {
        return (
            <div className="side col m2 l2 hide-on-small-and-down nav-pan">
                <div className="col m2 l2 grey darken-4 addPad nav-pan-child">
                    <div className="row walp">
                        <div className="">
                            <img src="./imgs/eben2.jpg" style={{ width: '100px', height:'100px', margin: '22% 0% 0% 26%', boxShadow: '2px 1px 20px #000' }} alt="" className="circle responsive-img"/>
                        </div>
                    </div>
                    <div className="row dash">
                        <span><i className="material-icons" style={{ margin: '10% 0% 10% 0%' }}>dashboard</i>Dashboard</span>
                    </div>

                    <div className="row rowcollap">
                        <ul>
                            <li><Link to="/profile">Profile</Link></li>
                            <li className="no-padding">
                                <ul className="collapsible collapsible-accordion">
                                    <li>
                                        <a className="collapsible-header">Books Shelf<i className="material-icons">arrow_drop_down</i></a>
                                        <div className="collapsible-body">
                                            <ul>
                                                <li><Link to="/user">All Books</Link></li>
                                                <li><Link to="/borrowed">Borrowed Books</Link></li>
                                                <li><Link to="/returned">Returned Books</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="no-padding">
                                <ul className="collapsible collapsible-accordion">
                                    <li>
                                        <a className="collapsible-header">Book Categories<i className="material-icons">arrow_drop_down</i></a>
                                        <div className="collapsible-body">
                                            <ul>
                                                <li><a href="#">Computer Programming</a></li>
                                                <li><a href="#">Eentertainment</a></li>
                                                <li><a href="#">History</a></li>
                                                <li><a href="#">Science</a></li>
                                                <li><a href="#">Sports</a></li>
                                                <li><a href="#">Travel</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li><Link to="/">Logout</Link></li>
                        </ul>
                    </div>

                </div>

            </div>
        );
    }
}

