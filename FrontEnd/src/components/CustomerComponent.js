import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {withRouter } from 'react-router-dom';


class Customer extends Component {
    render() {
        return (
            
            <div>
                <Header/>
                <div className="mt-10">
                    <br></br>
                </div>
                <div class="page-container">
                    <div class="page-header">
                        <div class=" od-pa-title">
                            <div>
                            Welcome to your account
                            </div>
                        </div>
                    </div>
                    <div class="row" id="customer_content">
                        <div class="col-2" id="sidebar">
                          <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary">
                              <div class="od-pa-menu-list">
                                  <div class="od-pa-menu-item">
                                    <a><span id="icon" className="fa fa-edit fa-lg"></span>Edit my info</a>
                                  </div>
                                  <div class="od-pa-menu-item">
                                     <a><span id="icon" className="fa fa-list fa-lg"></span>View Matches</a>

                                  </div>
                                 <div class="od-pa-menu-item">
                                    <a href="/reserve"><span id="icon" className="fa fa-ticket fa-lg"></span> Reserve seats</a>
                                 </div>
                                 <div class="od-pa-menu-item">
                                    <a href="/cancel"><span id="icon" className="fa fa-close fa-lg"></span>Cancel Reservation</a>
                                 </div>
                              </div>

                          </div>
                        </div>
                        <div class="col-7">
                            <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary">
                                <form id="customer-form"> 
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="Name" class="form-label">First Name</label>
                                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="First name"></input>
 
                                        </div>
                                        <div class="col-6">
                                            <label for="Name" class="form-label">Last Name</label>
                                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Last name"></input>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                            <label for="Name" class="form-label">City</label>
                                            <input type="text" class="form-control" ></input>
                                    </div>
                                    <div class="mb-3">
                                    <fieldset class="form-group">
                                        <legend>Gender</legend>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked></input>
                                                Female
                                        </label>
                                        </div>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2"></input>
                                             Male
                                        </label>
                                        </div>
                                        <div class="form-check disabled">
                                        
                                        </div>
                                    </fieldset>
                                    </div>
                            
                                    <legend>Chanage Password</legend>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">New Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1"></input>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Confirm new password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1"></input>
                                    </div>
                                   
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
                            </div>
                           
                        </div>
                    </div>
                    
                </div>
                
                <Footer/>
            </div>
        );
    }
}

export default withRouter(Customer);