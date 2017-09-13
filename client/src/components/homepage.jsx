import React from 'react';
import {Link, IndexLink} from 'react-router';
import RegForm from './RegForm';
import LoginForm from './LoginForm';
import HomepageHeader from './common/homepageheader';
import HomepageStatement from './homepagestatement';

export default class Homepage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      regLoginToggle: true
    };
    this.regLoginToggle = this.regLoginToggle.bind(this);
  }

  regLoginToggle(showLogin = true) {
    console.log(showLogin, 'Toggle made>>>>>>>>');
    if(!showLogin){
      this.setState({regLoginToggle: !this.state.regLoginToggle});
    } else {
      this.setState({regLoginToggle: true});
    }
  }
  render() {
    console.log(this.state, 'State>>>>>>>>');
    return (
      <div className="row main-row main-div">

        <HomepageHeader btnText={this.state.regLoginToggle} regLoginToggle={this.regLoginToggle}/>

        <div className="section no-pad-bot" id="index-banner">
          <div className="container textContent">
            <div className="row">

              {
                (
                  (this.state.regLoginToggle === true) ?
                <div>
                  <HomepageStatement/>
                  <div className="col l5 m5 hide-on-small-and-down right loginContent">
                    <br/><br/>
                    <LoginForm/>
                    <br/><br/>
                  </div>
                </div> : ''
                )
              }

              {
                (
                (this.state.regLoginToggle === false) ?
                <div className="col l8 m8 col s6 offset-s3 offset-m2 offset-l2 hide-on-small-and-down regContent">
                  <br/><br/>
                  <RegForm/>
                  <br/><br/>
                </div> : ''
               )
              }

            </div>
          </div>

        </div>
      </div>
    );
  }
}
