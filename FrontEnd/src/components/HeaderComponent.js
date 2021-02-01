import React, { Component, useState} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import Login from './Login'
import SignUp from './SignUp'

const serverURL = "http://localhost:5000";

class Header extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
            isLoginOpen: false,
            isSignUpOpen: false,
            token: this.getToken()
        };

        this.setToken = this.setToken.bind(this);
        this.getToken = this.getToken.bind(this);
        this.destroyToken = this.destroyToken.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
    }
    setToken(t){
        this.setState({token: t});
        sessionStorage.setItem('token', JSON.stringify(t));
    }
    getToken(){
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken ? userToken : '';
    }
    destroyToken(){
        delete sessionStorage.removeItem('token');
        this.setState({token: this.getToken()});
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
    });
    }
    toggleLogin() {
        this.setState({
            isLoginOpen: !this.state.isLoginOpen
        });
    }
    toggleSignUp(){
        this.setState({
            isSignUpOpen: !this.state.isSignUpOpen
        });
    }
    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    {/* <div className="container ml-4"> */}
                        <NavbarToggler onClick={this.toggleNav} />
                        {/* <img src='images/log.jpg' height="70" width="70" /> */}
                        <NavbarBrand  href="/"> Egyptian Premier League</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="m-auto" navbar>
                                <NavItem className="ml-4">
                                    <NavLink className="nav-link "  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem  className="ml-5">
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem  className="ml-5">
                                    <NavLink className="nav-link"  to='/matches'><span className="fa fa-list fa-lg"></span> Matches</NavLink>
                                </NavItem>
                                <NavItem  className="ml-5 ">
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                                <NavItem  className="ml-5 ">
                                    <NavLink className="nav-link" to='/profile'><span className="fa fa-user fa-lg"></span>My Account</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar>
                                {   !this.state.token ? 
                                    <NavItem>
                                        <Button outline className="btn btn-light" onClick={this.toggleLogin}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                    </NavItem>
                                    : null
                                }
                            </Nav>
                            <Nav className="ml-4" navbar>
                                {   !this.state.token ? 
                                    <NavItem>
                                        <Button outline className="btn btn-light" onClick={this.toggleSignUp}><span className="fa fa-sign-in fa-lg"></span> Sign UP</Button>
                                    </NavItem>
                                    : null  //this null would be updated
                                }
                            </Nav>
                            <Nav className="ml-4" navbar>
                                {   this.state.token ? 
                                    <NavItem>
                                        <Button outline className="btn btn-light" onClick={this.destroyToken}><span className="fa fa-sign-in fa-lg"></span> Logout</Button>
                                    </NavItem>
                                    : null  //this null would be updated
                                }
                            </Nav>
                        </Collapse>
                    {/* </div> */}
                </Navbar>
                <Jumbotron>
                    <div className="container mb-5">
                        <div className="row row-header">
                            <div className="col-12 col-m-6">
                                <h1>Egyptian Premier League Match Reservation System</h1>
                                <p className="ml-4 mt-4">An online automated ticket reservation system for football matches in the Egyptian Premier League</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                <Modal isOpen={this.state.isLoginOpen} toggle={this.toggleLogin}>
                    <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>
                    <ModalBody>
                        <Login setToken={this.setToken} setShow={this.toggleLogin}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isSignUpOpen} toggle={this.toggleSignUp}>
                    <ModalHeader toggle={this.toggleSignUp}>Sign Up</ModalHeader>
                    <ModalBody>
                        <SignUp setToken={this.setToken} setShow={this.toggleSignUp} />
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }
}
export default Header;