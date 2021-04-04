import React from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import Select from "react-select";


import "react-datepicker/dist/react-datepicker.css";

const serverURL = "http://localhost:5000";


export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        Fname: '',
        Lname: '',
        BirthDate: new Date(),
        Gender: 1,
        City: 'Alexandria',
        Address: '',
        Email: '',
        Role: 1,

        usernameError: '',
        passwordError: '',
        FnameError: '',
        LnameError: '',
        EmailError: ''
    }

    this.options = [
      { value: 'Alexandria', label: 'Alexandria' },
      { value: 'Aswan', label: 'Aswan' },
      { value: 'Asyut', label: 'Asyut' },
      { value: 'Banha', label: 'Banha' },
      { value: 'Beni Suef', label: 'Beni Suef' },
      { value: 'Cairo', label: 'Cairo' },
      { value: 'Damanhur', label: 'Damanhur' },
      { value: 'Damietta', label: 'Damietta' },
      { value: 'El Mahalla El Kubra', label: 'El Mahalla El Kubra' },
      { value: 'Faiyum', label: 'Faiyum' },
      { value: 'Giza', label: 'Giza' },
      { value: 'Hurghada', label: 'Hurghada' },
      { value: 'Ismailia', label: 'Ismailia' },
      { value: 'Luxor', label: 'Luxor' },
      { value: 'Mansoura', label: 'Mansoura' },
      { value: 'Minya', label: 'Minya' },
      { value: 'Port Said', label: 'Port Said' },
      { value: 'Qena', label: 'Qena' },
      { value: 'Shubra El Kheima', label: 'Shubra El Kheima' },
      { value: 'Sohag', label: 'Sohag' },
      { value: 'Suez', label: 'Suez' },
      { value: 'Tanta', label: 'Tanta' },
      { value: 'Zagazig', label: 'Zagazig' }
    ];
    this.UserREGEX = /^[a-zA-Z0-9]+$/;
    this.NameREGEX = /^[a-zA-Z]+$/;
    this.EmailREGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    this.style = {
      color: 'red',
      fontSize: 15
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name] : value });

    switch(name){
      case 'username':
        if(!this.UserREGEX.test(value))
          this.setState({usernameError: 'you can use alphabets and digits only'});
        else if(value.length < 4)
          this.setState({usernameError: 'you must use at least 4 characters'});
        else
          this.setState({usernameError: ''});
        break;
      case 'password':
        if(!this.UserREGEX.test(value))
          this.setState({passwordError: 'you can use alphabets and digits only'});
        else if(value.length < 6)
          this.setState({passwordError: 'you must use at least 6 characters'});
        else
          this.setState({passwordError: ''});
        break;
      case 'Fname':
        if(!this.NameREGEX.test(value))
          this.setState({FnameError: 'you can use alphabets only'});
        else if(value.length < 2)
          this.setState({FnameError: 'you must use at least 2 characters'});
        else
          this.setState({FnameError: ''});
        break;
      case 'Lname':
        if(!this.NameREGEX.test(value))
          this.setState({LnameError: 'you can use alphabets only'});
        else if(value.length < 2)
          this.setState({LnameError: 'you must use at least 2 characters'});
        else
          this.setState({LnameError: ''});
        break;
      case 'Email':
        if(!this.EmailREGEX.test(value))
          this.setState({EmailError: 'Email is invalid'});
        else
          this.setState({EmailError: ''});
        break;
    }
  };

  async handleSubmit(event){
    event.preventDefault();

    if(this.state.usernameError === '' && 
       this.state.passwordError === '' &&
       this.state.FnameError === '' &&
       this.state.LnameError === '' &&
       this.state.EmailError === '')
    {
      axios.post(serverURL + '/SignUp',{
          username: this.state.username,
          password: this.state.password,
          Fname: this.state.Fname,
          Lname: this.state.Lname,
          BirthDate: this.state.BirthDate.toLocaleString(),
          Gender: this.state.Gender ? 'M' : 'F',
          City: this.state.City,
          Address: this.state.Address,
          Email: this.state.Email,
          Role: this.state.Role ? 'F' : 'M'
      })
      .then(response => {
        if(response.data === "Success")
        {
          this.props.setShow();
          this.props.setToken(this.state.username + '-' + this.state.Role);
        }
        else
        {
          this.setState({usernameError: 'User Name already exists'});
        }
      })
      .catch(function(error) {
          console.log(error);
      });
    }
  };

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input required type="text" name="username"
                    value={this.state.username}
                    onChange={this.handleChange} />
                {this.state.usernameError.length > 0 && <span style={this.style}>{this.state.usernameError}</span>}
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input required type="password" name="password"
                  value={this.state.password}
                  onChange={this.handleChange}  />
                {this.state.passwordError.length > 0 && <span style={this.style}>{this.state.passwordError}</span>}
            </FormGroup>
            <FormGroup>
                <Label htmlFor="Fname">First Name</Label>
                <Input required type="text" name="Fname"
                    value={this.state.Fname}
                    onChange={this.handleChange} />
                {this.state.FnameError.length > 0 && <span style={this.style}>{this.state.FnameError}</span>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="Lname">Last Name</Label>
                <Input required type="text" name="Lname"
                    value={this.state.Lname}
                    onChange={this.handleChange} />
                {this.state.LnameError.length > 0 && <span style={this.style}>{this.state.LnameError}</span>}
            </FormGroup>
            <FormGroup>
                <Label htmlFor="BDate">Birth Date</Label>
                <br></br>
                <DatePicker selected={this.state.BirthDate} onChange={date => this.setState({BirthDate: date})} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="Gender">Gender</Label><br></br>
                <div onChange={(input) => this.setState({Gender: input.target.value === "Male"})}>
                  <input type="radio" value="Male" name="gender" checked={this.state.Gender}/> Male
                  <input type="radio" value="Female" name="gender" checked={!this.state.Gender}/> Female
                </div>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="City">City</Label>
                <Select
                  placeholder={this.state.City}
                  options={this.options}
                  value={this.state.City}
                  onChange={(input) => this.setState({City: input.value})}
                />

                <Label htmlFor="Address">Address</Label>
                <Input type="text" name="Address"
                    value={this.state.Address}
                    onChange={this.handleChange} />
                
                <Label htmlFor="Email">Email</Label>
                <Input required type="text" name="Email"
                    value={this.state.Email}
                    onChange={this.handleChange} />
                {this.state.EmailError.length > 0 && <span style={this.style}>{this.state.EmailError}</span>}
            </FormGroup>
            <FormGroup>
                <Label htmlFor="Role">Role</Label><br></br>
                <div onChange={(input) => this.setState({Role: input.target.value === "Fan"})}>
                  <input type="radio" value="Fan" name="Role" checked={this.state.Role}/> Fan
                  <input type="radio" value="Manager" name="Role" checked={!this.state.Role}/> Manager
                </div>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">SignUp</Button>
        </Form>
    );
  }
}

SignUp.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default SignUp;