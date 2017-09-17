import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class HomepageHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            regLoginToggle: true
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        $('.button-collapse').sideNav();
    }

    handleToggle(e) {
        const value = (e.currentTarget.getAttribute('data-toggle') === 'login');
        this.props.regLoginToggle(value);
    }

    render() {
        return (
            <div className="navbar-fixed">
                <nav className="mainNav transparent" role="navigation">
                    <div className="nav-wrapper container">
                        <a href="#" onClick={this.handleToggle} data-toggle="login" id="logo-container" className="brand-logo mainLogo brand">
                            <img src="./imgs/hello.png" alt="hellobooks"/>
                        </a>
                        <ul className="right hide-on-small-and-down">
                            <li><Link to="/">Contact us</Link></li>
                            <li><Link to="/">About us</Link></li>
                            <li><Link to="/">Help</Link></li>
                            <li>
                                <a href="#" onClick={this.handleToggle} data-toggle="toggle" className="btn-large waves-effect waves-light orange join-us">
                                    {(
                                      (this.props.btnText === true) ?
                                        'Join Us': 'Login'
                                    )}
                                </a>
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