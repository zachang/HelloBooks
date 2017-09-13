import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class SmallScreenHeader extends React.Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="mainNav transparent" role="navigation">
                    <div className="nav-wrapper container">
                    <Link id="logo-container" to="/" className="brand-logo mainLogo">
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
                        <a href="#" data-activates="nav-mobile" className="button-collapse menu-iconic-link"><i className="material-icons hide-on-med-only">menu</i></a>
                    </div>
                </nav>
            </div>
        );
    }
}
