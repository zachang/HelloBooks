import React from 'react';
import { Link } from 'react-router';
import HomepageHeader from '../common/HomepageHeader.jsx';
import RegForm from './RegForm.jsx';

/**
 * RegisterPage class declaration
 *
 * @class RegisterPage
 *
 * @extends {React.Component}
 */
export default class RegisterPage extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showLoginText: true
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
   * Renders RegisterPage component
   *
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='row main-row main-div'>
        <HomepageHeader btnText={this.state.showLoginText}/>

        <div className='section no-pad-bot' id='index-banner'>
          <div className='container textContent'>
            <div className='row'>
              <div className='col s8 offset-s2 regsmContent'>
                <RegForm/>
                <h6 className='infoText'>
                  Already have an account...?
                  <Link to='/login'>
                    Login
                  </Link>
                </h6>
                <br/><br/>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}