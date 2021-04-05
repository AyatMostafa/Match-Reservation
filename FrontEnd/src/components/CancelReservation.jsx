import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './HeaderComponent';
import Customer from './CustomerComponent'
import Footer from './FooterComponent';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Modal } from "react-bootstrap";


class CancelReservation extends Component {
    state = {
           done:false,
           text:""
        }

    handleTicketIdChange= (e)=>{
        this.setState({TicketId:e.target.value})
    }
    HandleSubmit=()=>{
        axios.delete('http://localhost:5000/cancelReservation',{
           data : { 
            ticketNo: this.state.TicketId,
            usr: window.sessionStorage.getItem('token').split('-')[0].slice(1,)
        }
        })
        .then(response => {
            this.setState({text: response.data},()=>{
                    this.setState({done:true});
            });
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    closeModal = () => {
        this.setState({ done: false });
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
                                            <label for="TicketId" class="form-label">Ticket Id</label>
                                            <input type="text" class="form-control" id="inputReserve" value={this.state.TicketId} onChange={this.handleTicketIdChange}></input>

                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary btn-cancel-style" onClick={this.HandleSubmit}>confirm</button>
                                    <Modal show={this.state.done}>
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
 
export default CancelReservation;