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
  componentWillReceiveProps(nextProps){
      console.log(this.props.signupState.errors, 'yyyy');
      console.log(nextProps.signupState.errors, 'zzzz');
      this.setState({ errors: nextProps.signupState.errors });
      // console.log(this.state.errors,'nowwww');
  }

    render() {
      const { regCredentials } = this.state;
        return (
            <form className="col s12" onSubmit={this.handleSubmit}>
              <p>{(this.state.errors['fullname']) ? this.state.errors['fullname'] : 'Mew'}</p>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="fullname"
                          name="fullname"
                          type="text"
                          className={ classnames( 'validate', {
                            'invalid': !!(this.state.errors['fullname'])
                          })}
                          value={regCredentials.fullname}
                          onChange={ this.handleChange }
                        />
                        <label
                          htmlFor="fullname"
                          data-error={(this.state.errors['fullname']) ? this.state.errors['fullname'] : ''}
                          className={classnames({'active':
                            (regCredentials.fullname.length > 0 || !!this.state.errors['fullname'])})}
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
                            'invalid': (this.state.errors['username'])
                          })}
                          value={regCredentials.username}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="username"
                        data-error={(this.state.errors['username']) ? this.state.errors['username'] : ''}
                        className={(regCredentials.username.length > 0 || (this.state.errors['username'])) ? 'active' : ''}
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
                          type="text"
                          className={ classnames( 'validate', {
                            'invalid': (this.state.errors['email'])
                          })}
                          value={regCredentials.email}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="email"
                        data-error={(this.state.errors['email']) ? this.state.errors['email'] : ''}
                        className={(regCredentials.email.length > 0 || (this.state.errors['email'])) ? 'active' : ''}
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
                            'invalid': (this.state.errors['phone_no'])
                          })}
                          value={regCredentials.phone_no}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="Phone Number"
                        data-error={(this.state.errors['phone_no']) ? this.state.errors['phone_no'] : ''}
                        className={(regCredentials.phone_no.length > 0 || (this.state.errors['phone_no'])) ? 'active' : ''}
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
                            'invalid': (this.state.errors['password'])
                          })}
                          value={regCredentials.password}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="password"
                        data-error={(this.state.errors['password']) ? this.state.errors['password'] : ''}
                        className={(regCredentials.password.length > 0 || (this.state.errors['password'])) ? 'active' : ''}
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
                            'invalid': (this.state.errors['password_confirmation'])
                          })}
                          value={regCredentials.password_confirmation}
                          onChange={ this.handleChange }
                        />
                      <label
                        htmlFor="password_confirmation"
                        data-error={(this.state.errors['password_confirmation'])
                          ? this.state.errors['password_confirmation'] : ''}
                        className={(regCredentials.password_confirmation.length > 0 || (this.state.errors['password_confirmation']))
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