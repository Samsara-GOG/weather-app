import React from "react";
import CapitalizedText from '../CapitalizedText';

export default class Forcastday extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { day } = this.props;
    const dayName = new Date(day.dt * 1000).toLocaleString("fr-FR", {weekday:"long"});
    const iconDay = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const temp = day.temp.day;
    const desc = day.weather[0].description;

    if (!day) return null;
    return (
            <div className="other-day">
              <h2 className="day-name">{ dayName }</h2>
              <img src={ iconDay } className="img" alt="météo du jour"/>
              <p className="other__temp">{ Math.round(temp) }°C</p>
              <p className="other__descrip">{ <CapitalizedText text={desc}/>}</p>
            </div>
    );
  }
}
