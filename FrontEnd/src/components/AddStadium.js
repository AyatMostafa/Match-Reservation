import React from "react";
import axios from 'axios';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import "react-datepicker/dist/react-datepicker.css";

const serverURL = "http://localhost:5000";


export class Stadium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        StadiumName: '',
        Place: '',
        rows:1,
        cols:1,
        successful:'',
        NameError: '',
        NumberError:'',
        StadiumNameError:''
    }

    
    this.NameREGEX = /^[a-zA-Z]+$/;
 
    this.style = {
      color: 'red',
      fontSize: 15
    };
    this.successfulStyle = {
      color: 'green',
      fontSize: 15
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  state = { value: 0 };

 

  handleChange(event) {
   
    const { name, value } = event.target;
    this.setState({name: event.target.value});
    this.setState({ [this.state.StadiumName] : value});
    
  };

  async handleSubmit(event){
    event.preventDefault();
  
        axios.post(serverURL + '/AddStadium',{
            params:{
              StadiumName:document.getElementById("StadiumName").value,
              Place:document.getElementById("Place").value,
              NumberOfRows:document.getElementById("row").value,
              NumberOfColumns:document.getElementById("col").value,
            }
               
        })
        .then(response => {
          if(response.data === "Success")
          {
            this.setState({StadiumNameError: ''});
            this.setState({successful: 'Stadium successfully added'});
          }
          else
          {
            this.setState({successful:''});
            this.setState({StadiumNameError: 'Stadium Name already exists'});
          }
        })
        .catch(function(error) {
      });;

  };

  render() {
    return (
      <div>
      <Header/>
        <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary" style={{width:1000}}>
            <div class="row">
              <div class="col-6">
                 <label style={{display:'block'}}>Stadium Name</label>
                 <input  style={{display:'block'}}required id="StadiumName" name="StadiumName" type="text" onChange={this.handleChange}></input>
                 {this.state.StadiumNameError.length > 0 && <span style={this.style}>{this.state.StadiumNameError}</span>}
              </div>
              <div class="col-6">
                 <label style={{display:'block'}}>Place</label>
                 <input  style={{display:'block'}}required id="Place" name="Place" type="text" onChange={this.handleChange}></input>
              </div>
            </div>
            <legend>Choose the Stadium Shape</legend>
            <div class="row">
              <div class="col-6">
                <label  style={{display:'block'}}>Rows</label>
                <input style={{display:'block'}} id="row"  type="number" min="1" value={this.state.rows} onChange={event => this.setState({rows: event.target.value.replace(/\D/,'')})}/>
              </div>
            <div class="col-6">
                <label  style={{display:'block'}}>Columns</label>
                <input style={{display:'block'}} id="col"  type="number" min="1" value={this.state.cols} onChange={event => this.setState({cols: event.target.value.replace(/\D/,'')})}/>
            </div>
            
            </div>
            
            <div>
              <button id="addBtn" class="btn btn-primary"  onClick={this.handleSubmit}>Add Stadium</button>
            </div>
            <div>
              {this.state.successful.length > 0 && <span style={this.successfulStyle}>{this.state.successful}</span>}
            </div>

        </div>
        <Footer/>
        </div>
        
    );
  }
}


export default Stadium;