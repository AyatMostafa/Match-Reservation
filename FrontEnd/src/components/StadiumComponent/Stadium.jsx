import React, {Component} from 'react';
import Seat from './Seat/Seat';
import axios from "axios";
import './Stadium.css';
const serverURL = "http://localhost:5000";
export default class StadiumComponent extends Component {
  constructor() {
    super();
    this.state = {
      stadium: [],
      Rows:0,
      Cols:0
    };
    this.fetchRowsCols = this.fetchRowsCols.bind(this);
  }
  async fetchRowsCols(){
    axios.get(serverURL + '/FetchStadium',{
        params: {
            StadiumName:'name'
        }
    }).then(
        result =>{ 
            this.setState({
                Rows: result.data.NumberOfRows,
                Cols: result.data.NumberOfColumns
            });
         });
}
  componentDidMount() {
    this.fetchRowsCols();
    const stadium = getInitialStadium(this.state.Rows,this.state.Cols);
    this.setState({stadium});
  }

 

  render() {
    const {stadium} = this.state;

    return (
      <>
       
        <div className="stadium">
          {stadium.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((seat, seatIdx) => {
                  const {row, col, isReserved} = seat;
                  return (
                    <Seat
                      key={seatIdx}
                      col={col}
                      isReserved={isReserved}
                      row={row}></Seat>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialStadium = (rows,cols) => {
  const stadium = [];
  for (let row = 0; row < 3; row++) {
    const currentRow = [];
    for (let col = 0; col < 3; col++) {
      currentRow.push(createSeat(col, row));
    }
    stadium.push(currentRow);
  }
  return stadium;
};


const createSeat = (col, row) => {
  return {
    col,
    row,
    isReserved: row===3 && col===0,
  };
};


