import React from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import {Link, IndexLink} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import signupAction from '../../actions/signupAction';
import decodeToken from '../../utils/tokenDecode';

export class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          regCredentials:{
            fullname: '',
            username: '',
            email: '',
            phone_no: '',
            password: '',
            password_confirmation: ''
          },
          errors: {}
        };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

  componentWillMount() {
    if (window.sessionStorage.token) {
      decodeToken(window.sessionStorage.token);
    }
  }

  handleChange(e) {
    const regCredentials = this.state.regCredentials;
    regCredentials[e.target.name] = e.target.value;
    this.setState({ regCredentials });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signupAction(this.state.regCredentials);
  }

    render() {
      console.log(this.props.signupState.errors);
      const { regCredentials } = this.state;
      const { errors } = this.props.signupState;
        return (
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="fullname"
                          name="fullname"
                          type="text"
                          className={ classnames( 'validate', {
                            'invalid': (errors && errors['fullname'])
                          })}
                          value={regCredentials.fullname}
                          onChange={ this.handleChange }
                        />
                        <label
                          htmlFor="fullname"
                          data-error={(errors && errors['fullname']) ? errors['fullname'] : ''}
                          className={(regCredentials.fullname.length > 0 || (errors && errors['fullname']))
                            ? 'active' : ''}
                        >
                          Full Name
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          className={ classnames( 'validate', {
                            'invalid': (errors && errors['username'])
                          })}
                          value={regCredentials.username}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="username"
                        data-error={(errors && errors['username']) ? errors['username'] : ''}
                        className={(regCredentials.username.length > 0 || (errors && errors['username'])) ? 'active' : ''}
                      >
                        Username
                      </label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={ classnames( 'validate', {
                            'invalid': (errors && errors['email'])
                          })}
                          value={regCredentials.email}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="email"
                        data-error={(errors && errors['email']) ? errors['email'] : ''}
                        className={(regCredentials.email.length > 0 || (errors && errors['email'])) ? 'active' : ''}
                      >
                        Email
                      </label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="phone"
                          name="phone_no"
                          type="number"
                          className={ classnames( 'validate', {
                            'invalid': (errors && errors['phone_no'])
                          })}
                          value={regCredentials.phone_no}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="Phone Number"
                        data-error={(errors && errors['phone_no']) ? errors['phone_no'] : ''}
                        className={(regCredentials.phone_no.length > 0 || (errors && errors['phone_no'])) ? 'active' : ''}
                      >
                        Phone Number
                      </label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="pass"
                          name="password"
                          type="password"
                          className={ classnames( 'validate', {
                            'invalid': (errors && errors['password'])
                          })}
                          value={regCredentials.password}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="password"
                        data-error={(errors && errors['password']) ? errors['password'] : ''}
                        className={(regCredentials.password.length > 0 || (errors && errors['password'])) ? 'active' : ''}
                      >
                        Password
                      </label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          data-error="field required"
                          className={ classnames( 'validate', {
                            'invalid': (errors && errors['password_confirmation'])
                          })}
                          value={regCredentials.password_confirmation}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="password_confirmation"
                        data-error={(errors && errors['password_confirmation'] && errors['password_confirmation'])
                          ? errors.password_confirmation[0] : ''}
                        className={(regCredentials.password_confirmation.length > 0 || (errors && errors['password_confirmation']))
                          ? 'active' : ''}
                      >
                        Confirmation Password
                      </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <p className="right-align">
                            <a href="user.html">
                                <button
                                  className="col s12 btn btn-large waves-effect waves-light orange"
                                  type="submit"
                                  name="action">Sign Up
                                </button>
                            </a>
                        </p>
                    </div>
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