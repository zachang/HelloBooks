import React from 'react';
import { Link } from 'react-router';
import HomepageHeader from '../common/HomepageHeader';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLoginText: false
    };
  }

  render() {
    return (
      <div className="row main-row main-div">
        <HomepageHeader btnText={this.state.showLoginText}/>

        <div className="section no-pad-bot" id="index-banner">
          <div className="container textContent">
            <div className="row">

              <div className="col s8 offset-s2 sloginContent">
                <br/><br/>
                <LoginForm/>
                <h6 className="infoText">No account yet...?<Link to="/Register">Register</Link></h6>
                <br/><br/>
              </div>

            </div>
          </div>

        </div>
      </div>

    );
  }
}