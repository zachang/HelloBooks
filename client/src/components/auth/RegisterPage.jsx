import React from 'react';
import { Link, IndexLink } from 'react-router';
import HomepageHeader from '../common/HomepageHeader';
import RegForm from './RegForm';

export default class RegisterPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showLoginText: true
        };
    }

    render() {
        return (
            <div className='row main-row main-div'>
              <HomepageHeader  btnText={this.state.showLoginText}/>

                <div className='section no-pad-bot' id='index-banner'>
                    <div className='container textContent'>
                        <div className='row'>
                            <div className='col s8 offset-s2 regsmContent'>
                                <RegForm/>
                                <h6 className='infoText'>Already have an account...?<Link to='/login'>Login</Link></h6>
                                <br/><br/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}