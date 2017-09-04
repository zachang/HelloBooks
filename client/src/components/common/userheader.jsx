import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class UserHeader extends React.Component {
    render() {
        return (
            <div className="col m10 l10 s12 right" style={{ padding: '0px' }}>
                <div className="navbar-fixed">
                    <nav className="mainNav black col m10 l10" role="navigation">
                        <div className="nav-wrapper container"><a id="logo-container" href="user.html" className="brand-logo mainLogo"><img src="./imgs/hello.png" alt="hellobooks" /></a>
                            <ul className="user hide-on-small-and-down show-on-medium-and-up">
                                <a className='dropdown-button btn black btn-prof' href='#' data-activates='dropdown1'><i className="material-icons mat-icon right" style={{ margin: '0% 0% 0% 1%' }}>arrow_drop_down</i>Zachang</a>
                            </ul>

                            <ul id='dropdown1' className='dropdown-content hide-on-small-and-down'>
                                <li><a href="userprofile.html">Profile</a></li>
                                <li className="divider"></li>
                                <li><a href="./usereturn.html">Returned Books</a></li>
                                <li className="divider"></li>
                                <li><a href="./userborrow.html">Borrowed Books</a></li>
                                <li className="divider"></li>
                                <li><a href="./userborrow.html">Change Password</a></li>
                                <li className="divider"></li>
                                <li><a href="#">Logout</a></li>
                            </ul>

                            <ul id="nav-mobile" className="side-nav grey darken-4 hide-on-med-and-up">
                                <li><div className="row walp">
                                </div></li>
                                <li><a href="userprofile.html">Profile</a></li>
                                <li className="no-padding">
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header">Books Shelf<i className="material-icons mat-icon">arrow_drop_down</i></a>
                                            <div className="collapsible-body">
                                                <ul>
                                                    <li><a href="user.html">All Books</a></li>
                                                    <li><a href="./userborrow.html">Borrowed Books</a></li>
                                                    <li><a href="./usereturn.html">Returned Books</a></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="no-padding">
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header">Book Categories<i className="material-icons mat-icon">arrow_drop_down</i></a>
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

                                <li><a href="#">Logout</a></li>
                            </ul>
                            <a href="#" data-activates="nav-mobile" className="button-collapse menu-icon-link"><i className="material-icons hide-on-med-and-up">menu</i></a>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

