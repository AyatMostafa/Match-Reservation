import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './HeaderComponent';
import Dropdown from 'react-dropdown';
import Customer from './CustomerComponent'
import login from './Login'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Modal } from "react-bootstrap";


const options = [
    'Cairo', 'Borj El Arab stadium', 'Alexandria Stadium'
  ];

 
export class ReserveSeat extends Component {
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
        console.log(this.state.seatNumber)
        if(window.sessionStorage.getItem('token')==null){
            this.setState({text:"Please, login first"},()=>{
                this.setState({printNum:true});
            });
        }
        else{
            //console.log(window.sessionStorage.getItem('token'))    
            axios.post('http://localhost:5000/ReserveSeat',{
                seatNo: this.state.seatNumber,
                stadiumName: this.state.stadiumName,
                creditCard: this.state.CreditCard,
                matchDate:this.state.matchDate,
                usr: window.sessionStorage.getItem('token').split('-')[0].slice(1,)
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
    }

     async handleDateRequest(event){
       //event.preventDefault();
       console.log(this.state.stadiumName)
       console.log(window.sessionStorage.getItem('token'))
       axios.get('http://localhost:5000/GetTimeDate',{
            params: {
                stadiumName:this.state.stadiumName
                }
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

    closeModal = () => {
        this.setState({ printNum: false });
    }
  

   

    render() { 


        return (
        <div class="page-container">
            <div class="page-container">
                <Header />
                    <div class="row" id="customer_content">
                        <div class="col-2" id="sidebar">
                          <div class="pa_menu_body od-pa-menu-body odf-box odf-box-primary">
                              <div class="od-pa-menu-list">
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
                                            <input type="text" class="col-7 form-control" id="inputReserve" value={this.state.seatNumber} onChange={this.handleSeatChange}></input>

                                        </div>
                                        <div class="col-6">
                                            <label for="creditCard" class="form-label">Credit Card pin number</label>
                                            <input type="text" class="form-control" id="inputReserve" value={this.state.CreditCard} onChange={this.handleCardChange}></input>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="Stadium" class="form-label lbl">Choose the Stadium</label>
                                            <Dropdown options={options} onChange={this.handlestadiumChange} value='' placeholder="Select an option" className="dropDown dr"/>
                                        </div>

                                        <div class="col-6">
                                            <label for="Date" class="form-label lbl">Choose the Date</label>
                                            <Dropdown options={this.state.dates} onChange={this.handlematchDateChange} value='' placeholder="Select an option" className="dropDown dr" disabled={this.state.showDateList} />
                                        </div>
                                    </div>
                                    <div class= "row">
                                        <button type="button" class="btn btn-primary btn-style" onClick={this.handleSubmit}>confirm</button>
                                    </div>
                                        <Modal show={this.state.printNum}>
                                            <Modal.Header>
                                                <Modal.Title>Welcome</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>{this.state.text}</Modal.Body>
                                            <Modal.Footer>
                                                <Button type="button" class="btn btn-primary btn-style" onClick={this.closeModal}>
                                                     Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
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