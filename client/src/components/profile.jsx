import React from 'react';
import { Link, IndexLink } from 'react-router';
import UserHeader from './common/userheader';
import UserSidebar from './common/usersidebar';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="row">
        <UserHeader/>
        <UserSidebar/>
        <div className="container mainCon" style={{ marginLeft: '5%' }}>
          <div className="row">
              <div className="row">
                  <div className="col s10 m8 l6 profile_marg" style= {{ marginLeft: '23%', marginTop: '7%' }}>
                      <div className="card" style= {{ boxShadow: '2px 1px 7px #000' }}>
                          <form method="post" className="col s12">
                              <div className="card-content white-text" style={{ height:'200px', background: 'rgba(77, 182, 172, 0.9)' }}>

                                  <div className="profile-image circle">

                                  </div>

                              </div>
                              <div className="card-action" style={{ height: '235px', background: 'rgba(217,217,217,0.7)' }}>

                                  <div className="row">
                                      <div className="input-field col s6">
                                          <input value="Dawuda Ebenezer Zachang" id="full_name" type="text" className="validate"/>
                                              <label htmlFor="full_name">Full Name</label>
                                      </div>
                                      <div className="input-field col s6">
                                          <input value="zachang" id="user_name" type="text" className="validate"/>
                                              <label htmlFor="user_name">Userame</label>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="input-field col s6">
                                          <input value="zachangdawuda@gmail.com" id="email" type="email" className="validate"/>
                                              <label htmlFor="email">Email</label>
                                      </div>
                                      <div className="input-field col s6">
                                          <input value="08197989956" id="phone_no" type="text" className="validate"/>
                                              <label htmlFor="phone_no">Phone Number</label>
                                      </div>
                                  </div>

                                  <a className="waves-effect waves-light btn profile-btn" style={{ marginLeft:'35%' }}>Update</a>

                              </div>
                          </form>
                      </div>
                  </div>
              </div>

          </div>
        </div>
      </div>

    );
  }
}