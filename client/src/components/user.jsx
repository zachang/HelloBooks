import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Userdashboard extends React.Component {
    render() {
        return (
            <div className="row main-row main-div">

                <HomepageHeader/>

                <div className="section no-pad-bot" id="index-banner">
                    <div className="container textContent">
                        <div className="row">
                            <HomepageStatement/>

                            <HomepageLogin/>
                            <HomepageReg/>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}