import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
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
              <a href="#" className="right" style={{color: '#FF9800'}}>Forgot password</a>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col m12 s12">
            <button className="col m12 s12 btn btn-large waves-effect waves-light orange log-in"
                    type="button" name="action">Login
            </button>
          </div>
        </div>
      </form>
    );
  }
}
