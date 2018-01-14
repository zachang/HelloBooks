import React from 'react';
import { Link } from 'react-router';

/**
 * HomepageStatement class declaration
 * @class HomepageStatement
 * @extends {React.Component}
 */
export default class HomepageStatement extends React.Component {
  /**
   * Renders Homepage component
   * @return {XML} JSX
   */
  render() {
    return (

      <div className='col s12 statement'>
        <br/><br/>
        <h1 className='header center orange-text'>Welcome!</h1>
        <div className='row center'>
          <h5 className='header col s12 light'>
            Learning is never ending and Knowledge is key.
            So in light of this, we at HelloBooks aim to provide you with all the necessary
            resource needed to expand your mind. Feel free to go through our library.
          </h5>
        </div>

        <div className='row center'>
          <Link to='/register' className='btn-large waves-effect waves-light orange'>
            Join us
          </Link>
          <Link to='/login' className='btn-large waves-effect waves-light orange Login'>
            Login
          </Link>
        </div>
        <br/><br/>
      </div>
    );
  }
}