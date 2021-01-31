import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './HeaderComponent';
import Customer from './CustomerComponent'

class CancelReservation extends Component {
    state = {
           done:false,
           text:""
        }

    handleTicketIdChange= (e)=>{
        this.setState({TicketId:e.target.value})
    }
    HandleSubmit=()=>{
       // do the cancel logic
       this.setState({done:true})
    //    if()
        this.setState({text:"done successfully"})
    //    else
        //  this.setState({text:"this ticket id may be wrong or didn't assigned to this username"})
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
                                            <label for="TicketId" class="form-label">Ticket Id</label>
                                            <input type="text" class="form-control" id="inputReserve" value={this.state.TicketId} onChange={this.handleTicketIdChange}></input>

                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary btn-style" onClick={this.HandleSubmit}>confirm</button>
                                    { this.state.done==true ? <p>{this.state.text}</p> :<p></p> }
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