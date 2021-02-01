import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

let rows=[]
const options = [
  'one', 'two', 'three'
];
const defaultOption1 = "stadiums";

const options2 = [
  'Date1', 'Date2', 'Date3'
];
const defaultOption2 = "Date";


class Square extends Component {
  state = {
    loading: false,
    stadium:"",
    date:"",
    showGraph:false,
  }

  createRows= (row, seats) =>{

    // bona2an 3la el stadium, date
    rows=[]
    for(var i=0;i<row;++i){
        let newSeats=[]
        for(var j=0;j<seats;++j){
            newSeats.push({ id: i*seats+j, number: i*seats+j})
        }
        rows.push(newSeats)
    }
  }

  _onSelectStadium=(e)=>{
    this.setState({stadium:e.value});
  }

  _onSelectDate=(e)=>{
    this.setState({Date:e.value});
  }

  HandleSubmit=()=>{
    console.log(this.showGraph);
    this.setState({showGraph:true});
  }

  render() {
    const { loading } = this.state;
    return (
      <div class="horizontal-scroll-wrapper squares">
        <h1>Stadium Seats</h1>
        <div class="row">
          <div>
            <Dropdown options={options} onChange={this._onSelectStadium} value={defaultOption1} placeholder="Select an option" className="dropDown"/>
          </div>  
          <div>
            <Dropdown options={options2} onChange={this._onSelectDate} value={defaultOption2} placeholder="Select an option" className="dropDown2"/>
          </div>
          <div>
            <button type="button" class="btn btn-primary btn-drop" onClick={this.HandleSubmit}>confirm</button>
          </div>
        </div>
          {this.createRows(100,100)}{console.log(rows)}
        <div style={{ marginTop: "100px" }}>
          { this.state.showGraph && 
            <SeatPicker
              rows={rows}
              maxReservableSeats={1000}
              selectedByDefault={true}
            />
          }
       
        </div>
      </div>
      
    );
  }
}

export default Square;
