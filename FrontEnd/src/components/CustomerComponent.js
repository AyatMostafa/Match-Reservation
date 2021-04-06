import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Select from "react-select";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
const serverURL = "http://localhost:5000";


class Customer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            password: null,
            Fname: null,
            Lname: null,
            BirthDate: null,
            Gender: null,
            City: 'Giza',
            Address: null,
            Role: null,
            fields: {},
            errors: {},
            isManager: false,
            usernameError: '',
            passwordError: '',
            FnameError: '',
            LnameError: '',
    
        };
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
        this.fetchCustomerInfo = this.fetchCustomerInfo.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.fetchCustomerInfo();
        this.UserREGEX = /^[a-zA-Z0-9]+$/;
        this.NameREGEX = /^[a-zA-Z]+$/;
     
        this.style = {
          color: 'red',
          fontSize: 15
        };
        this.handleChange = this.handleChange.bind(this);
        this.setInputs = this.setInputs.bind(this);
      }
     
      async fetchCustomerInfo(){
        var myUserName='';
          if(window.sessionStorage.getItem('token')!=null)
              myUserName = window.sessionStorage.getItem('token').split('-')[0].slice(1,);
            axios.get(serverURL + '/CustomerInfo',{
                params: {
                    username:myUserName
                }
            }).then(
                result =>{  
                    this.setState({
                        Fname: result.data.FName,
                        Lname: result.data.LName,
                        password: result.data.Pass,
                        BirthDate: result.data.BirthDate,
                        Gender: result.data.Gender,
                        City: result.data.City,
                        Address: result.data.UserAddress,
                        Role: result.data.UserRole
                    });
                  
                 }    
                           
            )
           
      }
     
      async handleClick(){
        var Gender = null;
        var Role = null;
        if(document.getElementById("Female").checked){
            Gender='F';
        }
        else if(document.getElementById("Male").checked){
            Gender='M';
        }
        if( document.getElementById("Fan").checked){
            Role='F';
        }
        else if(document.getElementById("Manager").checked){
            Role='M';
        }
        axios.post(serverURL + '/EditInfo',{
            params:{
                FName:document.getElementById("FirstName").value,
                LName:document.getElementById("LastName").value,
                City:this.state.City,
                Address:document.getElementById("Address").value,
                Gender:Gender,
                Role:Role,
                username:window.sessionStorage.getItem('token').split('-')[0].slice(1,),
                password:document.getElementById("Password").value
            }
               
        })
        .then(result => {
        
        });
      };
   
  
      handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name] : value });
    
        switch(name){
          
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
         
        }
      };
      componentDidUpdate(){
        
        this.setInputs();  
      }
      componentDidMount()
      {
          if(window.sessionStorage.getItem('token') === '' || window.sessionStorage.getItem('token') === null)
              this.setState({ isManager: false});
          else if(window.sessionStorage.getItem('token').slice(-2,-1) === "M")
              this.setState({ isManager: true });
          
      }
      setInputs(){
        document.getElementById("FirstName").defaultValue = this.state.Fname;
        document.getElementById("LastName").defaultValue = this.state.Lname;
        document.getElementById("Address").defaultValue = this.state.Address;
        document.getElementById("Password").defaultValue = this.state.password;
      

        if(this.state.Gender=='F'){
            document.getElementById("Female").checked = true;
        }
        else if(this.state.Gender=='M'){
            document.getElementById("Male").checked = true;
        }
        if(this.state.Role=="F"){
            document.getElementById("Fan").checked = true;
        }
        else if(this.state.Role=="M"){
            document.getElementById("Manager").checked = true;
        }
       
      }
     
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
                            Welcome to your account {this.state.Fname}
                            </div>
                        </div>
                    </div>
                    <div class="row" id="customer_content">
                        <div class="col-2" id="sidebar">
                          <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary">
                              <div class="od-pa-menu-list">
                               <a href="/profile">
                                  <div class="od-pa-menu-item">
                                  <span  id="icon" className="fa fa-edit fa-lg"></span>Edit my info
                                  </div>
                                </a>
                                <a href="/matches">
                                  <div class="od-pa-menu-item">
                                     <span id="icon" className="fa fa-list fa-lg"></span>View Matches
                                  </div>
                                  </a>
                                  <a href="/reserve">
                                 <div class="od-pa-menu-item">
                                    <span id="icon" className="fa fa-ticket fa-lg"></span> Reserve seats
                                 </div>
                                 </a>
                                 <a href="/cancel">
                                 <div class="od-pa-menu-item">
                                    <span id="icon" className="fa fa-close fa-lg"></span>Cancel Reservation
                                 </div>
                                 </a>
                  
                                 {
                                  this.state.isManager ? 
                                 <a href="/AddStadium">
                                 <div class="od-pa-menu-item">
                                    <span id="icon" className="fa fa-plus fa-lg"></span>Add Stadium
                                 </div>
                                 </a>
                                     : null    
                                    }
                              </div>
                            

                          </div>
                         
                        </div>
                      
                        <div class="col-7">
                            <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary">
                                <form id="customer-form"> 
                                    <div class="row">
                                        <div class="col-6">
                                            <Label htmlFor="Fname" >First Name</Label>
                                            <Input required type="text" name="Fname" id="FirstName" onChange={this.handleChange}></Input>
                                            {this.state.FnameError.length > 0 && <span style={this.style}>{this.state.FnameError}</span>}
                      
                                        </div>
                                        <div class="col-6">
                                            <Label htmlFor="Lname"  >Last Name</Label>
                                            <Input required type="text" name="Lname" id="LastName" onChange={this.handleChange}></Input>
                                            {this.state.LnameError.length > 0 && <span style={this.style}>{this.state.LnameError}</span>}

                                        </div>
                                  
                                            
                                    </div>

                                    <div class="mb-3">
                                      <Label htmlFor="City">City</Label>
                                        <Select
                                          placeholder={this.state.City}
                                          options={this.options}
                                          value={this.state.City}
                                          onChange={(input) => this.setState({City: input.value})}
                                        />
                                            {/* <label for="Name" class="form-label" >City</label> */}
                                            {/* <input required type="text" class="form-control" id="City" onChange={this.handleChange}></input> */}
                                    </div>
                                    <div class="mb-3">
                                            <label for="Name" class="form-label">Address</label>
                                            <input type="text" class="form-control" id="Address" onChange={this.handleChange}></input>
                                    </div>
                                    <div class="mb-3">
                                    <fieldset class="form-group">
                                        <legend>Gender</legend>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="Gender" id="Female" value="Female"></input>
                                                Female
                                        </label>
                                        </div>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="Gender" id="Male" value="Male"></input>
                                             Male
                                        </label>
                                        </div>
                                        
                                    </fieldset>
                                    </div>
                            
                                    <legend>Chanage Password</legend>
                                    <div class="mb-3">
                                        <Label htmlFor="password">New Password</Label>
                                        <Input required type="password" name="password" id="Password" onChange={this.handleChange}></Input>
                                        {this.state.passwordError.length > 0 && <span style={this.style}>{this.state.passwordError}</span>}

                                    </div>
                                    
                                    <div class="mb-3">
                                    <fieldset class="form-group">
                                        <legend>Role</legend>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="Role" id="Fan" value="Fan"></input>
                                                Fan
                                        </label>
                                        </div>
                                        <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" name="Role" id="Manager" value="Manager"></input>
                                             Manager
                                        </label>
                                        </div>
                                        
                                    </fieldset>
                                    </div>
                                    <button type="submit" class="btn btn-primary" onClick={this.handleClick}>Save</button>
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