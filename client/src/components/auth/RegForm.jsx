import React from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import signupAction from '../../actions/signupAction';
import { redirectIfLoggedIn } from '../../utils/helpers';

/**
 * RegForm class declaration
 *
 * @class RegForm
 *
 * @extends {React.Component}
 */
export class RegForm extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      regCredentials: {
        fullname: '',
        username: '',
        email: '',
        phoneNo: '',
        password: '',
        password_confirmation: ''
      },
      errors: {},
      fails: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    if (nextProps.signupState.success) {
      browserHistory.push('/user');
    }

    if (!nextProps.signupState.success &&
      nextProps.signupState.fails !== 'Email already exist') {
      this.setState({
        errors: nextProps.signupState.errors
      });
    } else if (nextProps.signupState.fails === 'Email already exist') {
      this.setState({
        fails: nextProps.signupState.fails
      });
    }
  }

  /**
   * Handles user registration details
   *
   * @method handleChange
   *
   * @return {void} void
   *
   * @param {object} event - event
   */
  handleChange(event) {
    const regCredentials = this.state.regCredentials;
    regCredentials[event.target.name] = event.target.value;
    this.setState({
      regCredentials,
      errors: {},
      fails: null
    });
  }

  /**
   * Handles registration
   *
   * @method handleSubmit
   *
   * @return {void}
   *
   * @param {object} event - event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.signupAction(this.state.regCredentials);
  }

  /**
   * Renders RegForm component
   *
   * @return {XML} JSX
   */
  render() {
    const { regCredentials, fails } = this.state;
    return (
      <form className='col s12' onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='fullname'
              name='fullname'
              type='text'
              className={classnames({
                invalid: !!(this.state.errors.fullname)
              })}
              value={regCredentials.fullname}
              onChange={this.handleChange}
            />

            <label
              htmlFor='fullname'
              className={this.state.errors.fullname ||
              regCredentials.fullname.length > 0 ?
                'custom-active custom-validate' : 'custom-validate'}
              data-error={this.state.errors.fullname ?
                this.state.errors.fullname : ''}
            >
              Full Name
            </label>

          </div>
        </div>

        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='username'
              name='username'
              type='text'
              className={classnames({
                invalid: !!(this.state.errors.username)
              })}
              value={regCredentials.username}
              onChange={this.handleChange}
            />
            <label
              htmlFor='username'
              className={this.state.errors.username ||
              regCredentials.username.length > 0 ?
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
              id='email'
              name='email'
              type='text'
              className={classnames({
                invalid: !!(this.state.errors.email)
              })}
              value={regCredentials.email}
              onChange={this.handleChange}
            />
            <label
              htmlFor='email'
              className={this.state.errors.email ||
              regCredentials.email.length > 0 ?
                'custom-active custom-validate' : 'custom-validate'}
              data-error={this.state.errors.email ?
                this.state.errors.email : ''}
            >
              Email
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='phone'
              name='phoneNo'
              type='number'
              className={classnames({
                invalid: !!(this.state.errors.phoneNo)
              })}
              value={regCredentials.phoneNo}
              onChange={this.handleChange}
            />
            <label
              htmlFor='phoneNo'
              className={this.state.errors.phoneNo ||
              regCredentials.phoneNo.length > 0 ?
                'custom-active custom-validate' : 'custom-validate'}
              data-error={this.state.errors.phoneNo ?
                this.state.errors.phoneNo : ''}
            >
              Phone Number
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='pass'
              name='password'
              type='password'
              className={classnames({
                invalid: !!(this.state.errors.password)
              })}
              value={regCredentials.password}
              onChange={this.handleChange}
            />
            <label
              htmlFor='password'
              className={this.state.errors.password ||
              regCredentials.password.length > 0 ?
                'custom-active custom-validate' : 'custom-validate'}
              data-error={this.state.errors.password ?
                this.state.errors.password : ''}
            >
              Password
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='password_confirmation'
              name='password_confirmation'
              type='password'
              data-error='field required'
              className={classnames({
                invalid: !!(this.state.errors.password_confirmation)
              })}
              value={regCredentials.password_confirmation}
              onChange={this.handleChange}
            />
            <label
              htmlFor='password_confirmation'
              className={this.state.errors.password_confirmation ||
              regCredentials.password_confirmation.length > 0 ?
                'custom-active custom-validate' : 'custom-validate'}
              data-error={this.state.errors.password_confirmation ?
                this.state.errors.password_confirmation : ''}
            >
              Confirmation Password
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='col s12'>
            <p className='right-align'>
              <a href='#'>
                <button
                  className='col s12 btn btn-large waves-effect
                  waves-light orange'
                  type='submit'
                  name='action'>Sign Up
                </button>
              </a>
            </p>
          </div>

          <div style={{ color: 'red', float: 'right' }}>{fails}</div>
        </div>
      </form>
    );
  }
}

RegForm.propTypes = {
  signupState: PropTypes.object.isRequired,
  signupAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  signupState: state.signupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signupAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);