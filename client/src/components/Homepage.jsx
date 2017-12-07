import React from 'react';
import HomepageHeader from './common/HomepageHeader';
import HomepageStatement from './HomepageStatement';

export default class Homepage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLoginText: false
    };
  }

  render() {
    return (
      <div className='row main-row main-div'>

        <HomepageHeader
          btnText={this.state.showLoginText}
        />

        <div className='section no-pad-bot' id='index-banner'>
          <div className='container textContent'>
            <div className='row'>

              <HomepageStatement/>

            </div>
          </div>

        </div>
      </div>
    );
  }
}
