import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class HomepageHeader extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        $('.button-collapse').sideNav();
    }

    render() {
        return (
            <div className="navbar-fixed">
                <nav className="mainNav transparent" role="navigation">
                    <div className="nav-wrapper container">

                        <Link to="/" id="logo-container" className="brand-logo mainLogo brand">
                            <img src="./imgs/hello.png" alt="hellobooks"/>
                        </Link>
                        <ul className="right hide-on-small-and-down">
                            <li><Link to="/">Contact us</Link></li>
                            <li><Link to="/">About us</Link></li>
                            <li><Link to="/">Help</Link></li>
                            <li>
                                  {(
                                      (this.props.btnText === false) ?
                                        <Link to="/register"  className="btn-large waves-effect waves-light orange join-us">
                                          Join Us
                                        </Link>
                                        :
                                        <Link to="/login" className="btn-large waves-effect waves-light orange join-us">
                                          Login
                                        </Link>
                                    )}
                            </li>
                        </ul>

                        <ul id="nav-mobile" className="side-nav hide-on-med-and-up">
                            <li><Link to="/">Contact us</Link></li>
                            <li><Link to="/">Contact us</Link></li>
                            <li><Link to="/">Contact us</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li>
                                <Link to="/register" id="join" className="btn-large waves-effect waves-light orange" style={{ margin: '0px', padding: '0px' }}>Join us</Link>
                            </li>
                        </ul>
                        <a href="#" data-activates="nav-mobile" className="button-collapse full top-nav hide-on-med-and-up menu-iconic-link">
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                </nav>
            </div>
        );
    }
}