import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './HeaderComponent';
import Customer from './CustomerComponent'


class ReserveSeat extends Component {
    state = {
             printNum:false,
            text:"0",
        }

    handleSeatChange=(e)=>{
        this.setState({seatNumber:e.target.value});
    }

    handleCardChange=(e)=>{
        this.setState({CreditCard:e.target.value});
    }

    HandleSubmit=()=>{
        console.log(this.state.seatNumber);
        console.log(this.state.CreditCard);
        this.state.generatedId=1;
        this.setState({printNum:true});
        this.setState({text:"Ticket Id= 1"});
    }


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
                                  <div class="od-pa-menu-item">
                                    <a><span id="icon" className="fa fa-edit fa-lg"></span>Edit my info</a>
                                  </div>
                                  <div class="od-pa-menu-item">
                                     <a><span id="icon" className="fa fa-list fa-lg"></span>View Matches</a>

                                  </div>
                                 <div class="od-pa-menu-item">
                                    <a href="/reserve"><span id="icon" className="fa fa-ticket fa-lg"></span> Reserve seats</a>
                                 </div>
                                 <div class="od-pa-menu-item">
                                    <a href="/cancel"><span id="icon" className="fa fa-close fa-lg"></span>Cancel Reservation</a>
                                 </div>
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
                                    </div>
                                    <div>
                                        <a href="/showseats"><span id="icon" className="fa fa-list fa-lg"></span>show seats graphically</a>
                                        </div>
                                    <button type="button" class="btn btn-primary btn-style" onClick={this.HandleSubmit}>confirm</button>
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