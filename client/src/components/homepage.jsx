import React from 'react';
import { Link, IndexLink } from 'react-router';

class HomepageHeader extends React.Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="mainNav transparent" role="navigation">
          <div className="nav-wrapper container">
            <IndexLink to="/" id="logo-container" className="brand-logo mainLogo">
              <img src="./imgs/hello.png" alt="hellobooks"/>
            </IndexLink>
            <ul className="right hide-on-small-and-down">
              <li><Link to="/">Contact us</Link></li>
              <li><Link to="/">About us</Link></li>
              <li><Link to="/">Help</Link></li>
              <li><Link to="/" className="btn-large waves-effect waves-light orange join-us">Join us</Link></li>
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
            <Link to="#" data-activates="nav-mobile" className="button-collapse full top-nav hide-on-med-and-up menu-iconic-link">
              <i className="material-icons">menu</i>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

class HomepageStatement extends React.Component {
  render() {
    return (

      <div className="col s12 l5 m5 statement">
        <br/><br/>
        <h1 className="header center orange-text">Welcome!</h1>
        <div className="row center">
          <h5 className="header col s12 light">Learning is never ending and Knowledge is key. So in light of this, we at HelloBooks aim to provide you with all the necessary resource needed to expand your mind. Feel free to go through our library.</h5>
        </div>
        <div className="row center hide-on-small-and-down">
          <a href="#" className="btn-large waves-effect waves-light orange">More...</a>
        </div>
        <div className="row center hide-on-med-and-up">
          <Link to="/register" className="btn-large waves-effect waves-light orange">Join us</Link>
          <a href="/login" className="btn-large waves-effect waves-light orange">Login</a>
        </div>
        <br/><br/>
      </div>
    );
  }
}

class HomepageLogin extends React.Component {
  render() {
    return (
      <div className="col l5 m5 hide-on-small-and-down right loginContent">
        <br/><br/>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate"/>
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="pass" type="password" className="validate"/>
              <label htmlFor="pass" data-error="wrong" data-success="right">Password</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <p>
                <input type="checkbox" id="remember"/>
                <label htmlFor="remember">Remember me</label>
                <a href="#" className="right" style={{ color: '#FF9800' }}>Forgot password</a>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col m12">
              <p className="right-align">
                <a href="./admin.html">
                  <button className="col m12 btn btn-large waves-effect waves-light orange log-in" type="button" name="action">Login
                  </button>
                </a>
              </p>
            </div>
          </div>
        </form>
        <br/><br/>
      </div>
    );
  }
}

class HomepageReg extends React.Component {
  render() {
    return (
      <div className="col l8 m8  offset-m2 offset-l2 hide-on-small-and-down regContent">
        <br/><br/>
        <form className="col s10 offset-m2">
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
            <div className="col m12">
              <p className="right-align">
                <a href="./user.html">
                  <button className="col m12 btn btn-large waves-effect waves-light orange" type="button" name="action">
                    Sign Up
                  </button>
                </a>
              </p>
            </div>
          </div>
        </form>
        <br/><br/>
      </div>
    );
  }
}


export default class Homepage extends React.Component {
  render() {
    return (
      <div className="row main-row main-div">

        <HomepageHeader/>

        <div className="section no-pad-bot" id="index-banner">
          <div className="container textContent">
            <div className="row">
              <HomepageStatement/>

              <HomepageLogin/>
              <HomepageReg/>

            </div>
          </div>

        </div>
      </div>
    );
  }
}
