import React from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';


import "react-datepicker/dist/react-datepicker.css";

const serverURL = "http://localhost:5000";


export class Stadium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        StadiumName: '',
        Place: '',
        rows:0,
        cols:0,

        NameError: '',
    }

    
    this.NameREGEX = /^[a-zA-Z]+$/;
 
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
      case 'Fname':
        if(!this.NameREGEX.test(value))
          this.setState({FnameError: 'you can use alphabets only'});
        else if(value.length < 2)
          this.setState({FnameError: 'you must use at least 2 characters'});
        else
          this.setState({FnameError: ''});
        break;
         
    }
  };

  async handleSubmit(event){
    event.preventDefault();

    if(this.state.NameError === '')
    {
        axios.post(serverURL + '/AddStadium',{
            params:{
              StadiumName:this.StadiumName,
              Place:this.Place,
              NumberOfRows:this.rows,
              NumberOfColumns:this.cols,
            }
               
        })
        .then(result => {
        
        });
    }
  };

  render() {
    return (
        <div>
            <div>
                <label>Stadium Name</label>
                <input value={this.state.StadiumName} onChange={event => this.setState({StadiumName: event.target.value.replace(/\D/,'')})}></input>
            </div>
            <legend>Choose the Stadium Shape</legend>

            <label>Number of Rows</label>
            <input value={this.state.rows} onChange={event => this.setState({rows: event.target.value.replace(/\D/,'')})}/>
            <label>Number of Column</label>
            <input value={this.state.cols} onChange={event => this.setState({cols: event.target.value.replace(/\D/,'')})}/>
            <button class="btn btn-primary"  onClick={this.handleSubmit}>Add Stadium</button>
        </div>
       
        
    );
  }
}


export default Stadium;