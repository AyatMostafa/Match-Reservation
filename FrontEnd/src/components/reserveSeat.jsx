import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './HeaderComponent';
import Dropdown from 'react-dropdown';
import Customer from './CustomerComponent'
import login from './Login'

const options = [
    'Cairo', 'Borj El Arab stadium', 'Alexandria Stadium'
  ];


class ReserveSeat extends Component {
    constructor(props) {
        super(props);
        this.state = {
                printNum:false,
                text:"0",
                showDateList:false,
                dates:[],      
            }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        //event.preventDefault();        
        axios.post('http://localhost:5000/api/ReserveSeat',{
            seatNo: this.state.seatNumber,
            stadiumName: this.state.stadiumName,
            creditCard: this.state.CreditCard,
            matchDate:this.state.matchDate,
            //usr:this.props.username
            usr:'ahmed'
        })
        .then(response => {
            this.setState({text: response.data},()=>{
                    this.setState({printNum:true});
            });
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    async handleDateRequest(event){
       // event.preventDefault();
       console.log(this.state.stadiumName)
        axios.post('http://localhost:5000/api/ReserveSeat/GetTimeDate',{
            stadiumName: this.state.stadiumName,
        })
        .then(response => {
            console.log(response.data)
            this.setState({dates: response.data});
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    handleSeatChange=(e)=>{
        console.log(this.props.username)
        this.setState({seatNumber:e.target.value});
    }

    handleCardChange=(e)=>{
        this.setState({CreditCard:e.target.value});
    }

    handlestadiumChange=(e)=>{
        this.setState({stadiumName:e.value}, function() {
            this.handleDateRequest();
            //this.setState({showDateList:true});
        });
    }

    handlematchDateChange=(e)=>{
        this.setState({matchDate:e.value});
    }


   // HandleSubmit=()=>{
     //   console.log(this.state.seatNumber);
       // console.log(this.state.CreditCard);
        //this.state.generatedId=1;
        //this.setState({printNum:true});
        //this.setState({text:"Ticket Id= 1"});
    //}


    render() { 


        return (
        <div class="page-container">
            <div className="mt-10">
                    <br></br>
            </div>
            <div class="page-container">
                <Header />

                    <div class="row" id="customer_content">
                        <div class="col-2" id="sidebar">
                          <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary">
                              <div class="od-pa-menu-list">
                              <a href="/profile">
                                  <div class="od-pa-menu-item">
                                    <span id="icon" className="fa fa-edit fa-lg"></span>Edit my info
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
                              </div>

                          </div>
                        </div>
                        <div class="col-7">
                            <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary">
                                <form id="Reserve_Form"> 
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="seatNumber" class="form-label">Seat number</label>
                                            <input type="text" class="form-control" id="inputReserve" value={this.state.seatNumber} onChange={this.handleSeatChange}></input>

                                        </div>
                                        <div class="col-6">
                                            <label for="creditCard" class="form-label">Credit Card pin number</label>
                                            <input type="text" class="form-control" id="inputReserve" value={this.state.CreditCard} onChange={this.handleCardChange}></input>
                                        </div>

                                        <div class="col-6">
                                            <label for="Stadium" class="form-label lbl">Choose the Stadium</label>
                                            <Dropdown options={options} onChange={this.handlestadiumChange} value='' placeholder="Select an option" className="dropDown dr"/>
                                        </div>

                                        <div class="col-6">
                                            <label for="Date" class="form-label lbl">Choose the Date</label>
                                            {/*<input type="select" onChange={this.handlematchDateChange} label="Multiple Select" multiple>
                                                {this.handleDateRequest()}*
                                               </input>*/}
                                            <Dropdown options={this.state.dates} onChange={this.handlematchDateChange} value='' placeholder="Select an option" className="dropDown dr" disabled={this.state.showDateList} />
                                        </div>
                                    </div>
                                    <div>
                                        <a href="/showseats"><span id="icon1" className="fa fa-list fa-lg"></span>show seats graphically</a>
                                        </div>
                                    <button type="button" class="btn btn-primary btn-style" onClick={this.handleSubmit}>confirm</button>
                                    <p>{ this.state.printNum==true?this.state.text:<p/>}</p>
                                    </form>
                            </div>
                           
                        </div>
                    </div>

            </div>
        </div>
        );
            }
}
 
export default ReserveSeat;