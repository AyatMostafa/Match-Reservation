import React from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReserveSeat from "./reserveSeat";


const serverURL = "http://localhost:5000";


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',

        ErrorMsg: ''
    }

    this.style = {
      color: 'red',
      fontSize: 15
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  };

  async handleSubmit(event){
    event.preventDefault();
    axios.post(serverURL + '/Login',{
        username: this.state.username,
        password: this.state.password
    })
    .then(response => {
      if(response.data.substr(0,7) === "Success")
      {
        this.props.setShow();
        this.props.setToken(this.state.username + '-' + response.data.charAt(response.data.length-1));
        return <ReserveSeat data={this.state}></ReserveSeat>
      }
      else
      {
        this.setState({ErrorMsg: response.data});
      }
    })
    .catch(function(error) {
        console.log(error);
    });
    
  };
  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" name="username"
                    value={this.state.username}
                    onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password"
                  value={this.state.password}
                  onChange={this.handleChange}  />
            </FormGroup>
            <FormGroup>
                {this.state.ErrorMsg.length > 0 && <span style={this.style}>{this.state.ErrorMsg}</span>}
            </FormGroup>
            <Button type="submit" value="submit" color="primary">Login</Button>
        </Form>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;