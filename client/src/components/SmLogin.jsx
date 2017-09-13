import React from 'react';
import {Link, IndexLink} from 'react-router';
import HomepageHeader from './common/HomepageHeader';
import LoginForm from './LoginForm';

export default class SmallLoginpage extends React.Component {
  render() {
    return (
      <div className="row main-row main-div">
        <HomepageHeader/>

        <div className="section no-pad-bot" id="index-banner">
          <div className="container textContent">
            <div className="row">

              <div className="col s8 offset-s2 sloginContent">
                <br/><br/>
                <LoginForm/>
                <br/><br/>
              </div>

            </div>
          </div>

        </div>
      </div>

    );
  }
}