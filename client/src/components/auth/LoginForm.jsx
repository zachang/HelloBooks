import React from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import signinAction from '../../actions/signinAction';
import loginValidate from '../../utils/loginValidate.js';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginCredentials: {
        username: '',
        password: ''
      },
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (window.sessionStorage.token) {
      browserHistory.push('/admin');
    }
  }


  handleChange(e) {
    const loginCredentials = this.state.loginCredentials;
    loginCredentials[e.target.name] = e.target.value;
    this.setState({ loginCredentials })
  }

  isValid() {
    const { errors, isValid } = loginValidate(this.state.loginCredentials);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ errors: {} });
      this.props.signinAction(this.state.loginCredentials);
    }
  }

  render() {
    const { loginCredentials, errors } = this.state;
    return (
      <form className="col s12" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="username"
              name="username"
              type="text"
              className={ classnames( 'validate', {
                'invalid': !!errors.username
              })}
              value={loginCredentials.username}
              onChange={ this.handleChange }
            />
            <label
              htmlFor="username"
              data-error={(errors.username) ? errors.username : ''}
              className={(loginCredentials.username.length > 0 || (errors.username)) ? 'active' : ''}
            >
              Username
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              name="password"
              type="password"
              className={ classnames( 'validate', {
                'invalid': !!errors.password
              })}
              value={loginCredentials.password}
              onChange={ this.handleChange }
            />
            <label
              htmlFor="password"
              data-error={(errors.password) ? errors.password : ''}
              className={(loginCredentials.password.length > 0 || errors.password) ? 'active' : ''}
            >
              Password
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <p>
              <input type="checkbox" id="remember"/>
              <label htmlFor="remember">Remember me</label>
              {/*<a href="#" className="right" style={{color: '#FF9800'}}>Forgot password</a>*/}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col m12 s12">
            <button className="col m12 s12 btn btn-large waves-effect waves-light orange log-in"
                    type="submit" name="action">Login
            </button>

            <div style={{ color:'red', float:'right' }}>{this.props.signinState.fails}</div>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  signinState: PropTypes.object.isRequired,
  signinAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  signinState: state.signinReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signinAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);