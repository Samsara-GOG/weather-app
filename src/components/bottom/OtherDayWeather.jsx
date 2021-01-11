import React from "react";

import "./style.css";

import Forcastday from './forcastday';

export default class OtherDayWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { forecastdays } = this.props;
    return (
      
      <div className="day2">
        {forecastdays &&
          forecastdays.map((day, idx) => {
            return <Forcastday day={day} key={idx} />
          })}
      </div>
    );
  }
}