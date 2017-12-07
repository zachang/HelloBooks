import React from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import signinAction from '../../actions/signinAction.js';
import loginValidate from '../../utils/loginValidate.js';
import { redirectIfLoggedIn } from '../../utils/helpers';

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
      redirectIfLoggedIn(window.sessionStorage.token);
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
    const { loginCredentials } = this.state;
    return (
      <form className='col s12' onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='username'
              name='username'
              type='text'
              className={ classnames({
                'invalid': !!this.state.errors.username
              })}
              value={loginCredentials.username}
              onChange={ this.handleChange }
            />
            <label
              htmlFor='username'
              className={(!!(this.state.errors['username']) || (loginCredentials.username.length > 0)) ?
                'custom-active custom-validate' : 'custom-validate'}
              data-error={ !!(this.state.errors['username']) ? this.state.errors['username'] : '' }
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
              className={ classnames( {
                'invalid': !!this.state.errors.password
              })}
              value={loginCredentials.password}
              onChange={ this.handleChange }
            />
            <label
              htmlFor='password'
              className={ classnames( 'custom-validate', {
                'custom-active': (!!this.state.errors.password || (loginCredentials.password.length > 0))
              })}
              data-error={ !!(this.state.errors['password']) ? this.state.errors['password'] : '' }
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
            <button className='col m12 s12 btn btn-large waves-effect waves-light orange log-in'
              type='submit' name='action'>Login
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