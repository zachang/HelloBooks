import React from 'react';
import HomepageHeader from './common/HomepageHeader.jsx';
import HomepageStatement from './HomepageStatement.jsx';

/**
 * Homepage class declaration
 *
 * @class Homepage
 *
 * @extends {React.Component}
 */
export default class Homepage extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showLoginText: false
    };
  }

  /**
   * @method componentDidUpdate
   *
   * @return {void} void
   */
  componentDidMount() {
    $('.dropdown-button').dropdown();
  }
  /**
   * Renders Homepage component
   *
   * @return {XML} JSX
   */
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
