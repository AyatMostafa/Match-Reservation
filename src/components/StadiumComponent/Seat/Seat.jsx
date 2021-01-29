import React, {Component} from 'react';

import './Seat.css';

export default class Seat extends Component {
  render() {
    const {
      col,
      isReserved,
      row,
    } = this.props;
    const extraClassName = isReserved
      ? 'seat-reserved'
      : '';

    return (
      <div
        id={`seat-${row}-${col}`}
        className={`seat ${extraClassName}`}
     ></div>
    );
  }
}
