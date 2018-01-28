import React from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { SocialIcon } from 'react-social-icons';
import { signinAction, googleSigninAction } from '../../actions/signinAction';
import loginValidate from '../../utils/loginValidate';
import { redirectIfLoggedIn } from '../../utils/helpers';

/**
 * LoginForm class declaration
 *
 * @class LoginForm
 *
 * @extends {React.Component}
 */
export class LoginForm extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loginCredentials: {
        username: '',
        password: ''
      },
      googleCredentials: {
        fullname: '',
        email: ''
      },
      errors: {},
      fails: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
   * @method componentWillMount
   *
   * @return {void} void
   */
  componentWillMount() {
    if (window.sessionStorage.token) {
      redirectIfLoggedIn(window.sessionStorage.token);
    }
  }

  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps - nextProps
   *
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.signinState.success) {
      this.setState({
        fails: nextProps.signinState.fails
      });
    }
  }

  /**
   * Handles user login details
   *
   * @method handleChange
   *
   * @return {void} void
   *
   * @param {object} event - event
   */
  handleChange(event) {
    const loginCredentials = this.state.loginCredentials;
    loginCredentials[event.target.name] = event.target.value;
    this.setState({
      errors: {},
      fails: null,
      loginCredentials
    });
  }

  /**
   * @method responseGoogle
   *
   * @param {object} response - response
   *
   * @return {void}
   */
  responseGoogle(response) {
    const { email, familyName, givenName } = response.profileObj;
    this.setState({
      googleCredentials: {
        fullname: `${familyName} ${givenName}`,
        email
      }
    });
    this.props.googleSigninAction(this.state.googleCredentials);
    if (!window.sessionStorage.token) {
      return;
    }
    redirectIfLoggedIn(window.sessionStorage.token);
  }

  /**
   * @method isValid
   *
   * @return {boolean} isValid
   */
  isValid() {
    const { errors, isValid } = loginValidate(this.state.loginCredentials);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Handles login
   *
   * @method handleSubmit
   *
   * @return {void}
   *
   * @param {object} event - event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.signinAction(this.state.loginCredentials);
  }

  /**
   * Renders LoginForm component
   *
   * @return {XML} JSX
   */
  render() {
    const { loginCredentials, fails } = this.state;
    return (
      <form className='col s12' onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='username'
              name='username'
              type='text'
              className={classnames({
                invalid: !!this.state.errors.username
              })}
              value={loginCredentials.username}
              onChange={this.handleChange}
            />
            <label
              htmlFor='username'
              className={
                (!!(this.state.errors.username) ||
                  (loginCredentials.username.length > 0)) ?
                  'custom-active custom-validate' : 'custom-validate'}
              data-error={this.state.errors.username ?
                this.state.errors.username : ''}
            >
              Username
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='password'
              name='password'
              type='password'
              className={classnames({
                invalid: !!this.state.errors.password
              })}
              value={loginCredentials.password}
              onChange={this.handleChange}
            />
            <label
              htmlFor='password'
              className={classnames('custom-validate', {
                'custom-active': (!!this.state.errors.password ||
                  (loginCredentials.password.length > 0))
              })}
              data-error={this.state.errors.password ?
                this.state.errors.password : ''}
            >
              Password
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='col s12'>
            <p>
              <input type='checkbox' id='remember'/>
              <label htmlFor='remember'>Remember me</label>
            </p>
          </div>
        </div>

        <div className='row'>
          <div className='col m12 s12'>
            <div className='row'>
              <button
                className='col m12 s12 btn btn-large waves-effect waves-light
                 orange log-in'
                type='submit' name='action'>
              Login
              </button>
            </div>

            <div className='row'>
              <GoogleLogin
                className='col m12 s12 btn btn-large waves-effect
                waves-light log-in'
                clientId={process.env.CLIENT_ID}
                buttonText='Google'
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
              >
                <SocialIcon network='google' className='google' color='white'/>
                <span> Login</span>
              </GoogleLogin>
            </div>

            <div style={{ color: 'red', float: 'right' }}>{fails}</div>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  signinState: PropTypes.object.isRequired,
  signinAction: PropTypes.func.isRequired,
  googleSigninAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  signinState: state.signinReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signinAction, googleSigninAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);