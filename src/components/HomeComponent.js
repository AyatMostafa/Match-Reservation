import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';


const mapStateToProps = (state) => {
    return {
        isLogged: false
    }
}

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mt-10">
                    <br></br>
                </div>
                
                <Footer />
            </div>
        );
    }
}

export default withRouter(Home);