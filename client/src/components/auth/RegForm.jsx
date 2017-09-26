import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class RegForm extends React.Component {
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
          }
        };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }


  handleChange(e) {
    const regCredentials = this.state.regCredentials;
    regCredentials[e.target.name] = e.target.value;
    this.setState({ regCredentials });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.regCredentials);
  }

    render() {
        return (
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="fullname"
                          name="fullname"
                          type="text"
                          className="validate"
                          data-error="field required"
                          onChange={ this.handleChange }
                          required
                        />
                        <label htmlFor="fullname">Full Name</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          className="validate"
                          data-error="field required"
                          onChange={ this.handleChange }
                          required
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          data-error="field required"
                          className="validate"
                          onChange={ this.handleChange }
                          required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="phone"
                          name="phone_no"
                          type="number"
                          data-error="field required"
                          className="validate"
                          onChange={ this.handleChange }
                          required
                        />
                        <label htmlFor="phone">Phone Number</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="pass"
                          name="password"
                          type="password"
                          data-error="field required"
                          className="validate"
                          onChange={ this.handleChange }
                          required
                        />
                        <label htmlFor="pass" data-error="wrong">Password</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          data-error="field required"
                          className="validate"
                          onChange={ this.handleChange }
                          required
                        />
                        <label htmlFor="confirm pass" data-error="wrong">Confirm Password</label>
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
