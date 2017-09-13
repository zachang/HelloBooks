import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <form className="col s12">
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
                    <div className="col s12">
                        <p className="right-align">
                            <a href="user.html">
                                <button className="col s12 btn btn-large waves-effect waves-light orange" type="button"
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
