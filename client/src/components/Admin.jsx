import React from 'react';
import { Link, IndexLink } from 'react-router';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import Paginate from './common/Paginate';

export default class Admindashboard extends React.Component {
    render() {
        return (
            <div className="row">
                <AdminHeader/>
                <AdminSidebar/>

                <div className="container mainCon" style={{ marginLeft:'5%' }}>
                    <div className="row">
                        <div className="section">
                            <h4 style={{ marginTop:'7%'}}>All Books</h4>
                        </div>
                        <div className="divider" style={{ marginTop:'-2%', marginBottom:'3%' }}></div>

                        <div className="row">
                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book1.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Enchantment<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Enchantment<i className="material-icons right">close</i></span>
                                        <p>Author: Swagger Jay</p>
                                        <p>Type: Novel</p>
                                        <p>Published: 1992</p>
                                        <p>Pages: 506</p>
                                    </div>
                                    <div className="card-action home-card"><a href="updatebook.html" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book5.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book6.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>
                      
                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book1.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book3.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book4.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>
                            
                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book7.png"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book4.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book5.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>
                       
                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book2.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book3.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title  activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="#" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>

                            <div className="col l4 s10 m6 cardsm">
                                <div className="card large sticky-action">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" src="./imgs/book5.jpg"/>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    </div>
                                    <div className="card-action home-card"><a href="" className="waves-effect waves-light btn teal">Update</a><a href="#index-banner" className="waves-effect waves-light btn red">Delete</a></div>
                                </div>
                            </div>
                        </div>

                        <Paginate/>

                    </div>
                </div>
            </div>
        );
    }
}