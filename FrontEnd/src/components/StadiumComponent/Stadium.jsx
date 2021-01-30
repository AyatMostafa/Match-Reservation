import React, {Component} from 'react';
import Seat from './Seat/Seat';

import './Stadium.css';

export default class StadiumComponent extends Component {
  constructor() {
    super();
    this.state = {
      stadium: [],
    };
  }

  componentDidMount() {
    const stadium = getInitialStadium();
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

const getInitialStadium = () => {
  const stadium = [];
  for (let row = 0; row < 10; row++) {
    const currentRow = [];
    for (let col = 0; col < 20; col++) {
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


