import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class SmallRegpage extends React.Component {
    render() {
        return (
            <div className="row main-row main-div">
                <div className="navbar-fixed">
                    <nav className="mainNav transparent" role="navigation">
                        <div className="nav-wrapper container"><Link id="logo-container" to="/" className="brand-logo mainLogo">
                            <img src="./imgs/hello.png" alt="hellobooks" />
                        </Link>
                            <ul className="right hide-on-small-and-down">
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Help</a></li>
                                <li><Link to="/login" className="btn-large waves-effect waves-light orange join-us">Login</Link></li>
                            </ul>

                            <ul id="nav-mobile" className="side-nav">
                                <li><a href="">Contact us</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Help</a></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register" id="join" className="btn-large waves-effect waves-light orange" style={{ margin:'0px', padding:'0px' }}>Join us</Link></li>
                            </ul>
                            <Link to="#" data-activates="nav-mobile" className="button-collapse menu-iconic-link"><i className="material-icons hide-on-med-only">menu</i></Link>
                        </div>
                    </nav>
                </div>

                <div className="section no-pad-bot" id="index-banner">
                    <div className="container textContent">
                        <div className="row">

                            <div className="col s6 offset-s3 regsmContent">
                                <br/><br/>
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="fullname" type="text" className="validate"/>
                                                    <label htmlFor="fullname">Full Name</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="username" type="text" className="validate"/>
                                                    <label htmlFor="username">Username</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="email" type="email" className="validate"/>
                                                    <label htmlFor="email">Email</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="phone" type="number" className="validate"/>
                                                    <label htmlFor="phone">Phone Number</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="pass" type="password" className="validate"/>
                                                    <label htmlFor="pass" data-error="wrong" data-success="right">Password</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="pass-confirm" type="password" className="validate"/>
                                                    <label htmlFor="confirm pass" data-error="wrong" data-success="right">Confirm Password</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col s12">
                                                <p className="right-align">
                                                    <a href="user.html"><button className="col s12 btn btn-large waves-effect waves-light orange" type="button" name="action">Sign Up</button></a>
                                                </p>
                                            </div>
                                        </div>
                                        <h6>Already have an account...<Link to="/login">?Login</Link></h6>
                                    </form>
                                    <br/><br/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}