import React from 'react';
import CapitalizedText from '../CapitalizedText';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location, temperature, conditions, weatherDescription, weatherIcon } = this.props;
    const iconDay = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    <CapitalizedText text={(weatherDescription)}/>
   return (
    <div className="block__today">
      <img className="img__today" src={ iconDay } alt="météo du jour" /> 
      <div className='block__today-text'>
        <span className='today_day'>Aujourd'hui</span>
        <h1 className='city_name' id="ville">{ location }</h1>
        <div className="hide">{conditions}</div>
        <span id="temperature">{ Math.round(temperature) }°C</span><span id="conditions"></span>
        < div className="describ">{<CapitalizedText text={weatherDescription}/>}</div>
      </div>
    </div>
    
    );
    
  }
}