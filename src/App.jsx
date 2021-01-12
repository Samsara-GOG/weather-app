import React, { Component} from 'react';
import './App.css';

import TodayWeather from './components/top/TodayWeather';
import OtherDayWeather from './components/bottom/OtherDayWeather';

import axios from 'axios';

const WEATHER_KEY = '8c3a54c385c9c9d874d88f2cd6b3dda8';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Harnes",
      isloading: true,
    };
  }

  updateWeather() {
    const { cityName } = this.state;
    const URL1 = `https://nominatim.openstreetmap.org/search/${cityName}?format=json&limit=1`;
    axios
    .get(URL1)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
     
      const URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric&lang=fr&exclude=minutely,hourly,alerts`
      axios
      .get(URL2)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.setState({ 
          isLoading: false,
          temperature: data.current.temp, 
          conditions: data.current.weather[0].main,
          weatherDescription: data.current.weather[0].description,
          weatherIcon: data.current.weather[0].icon,
          forecastdays: data.daily
        });
        document.body.className = `${this.state.conditions.toLocaleLowerCase()}`;
      })

      .catch((err) => {
        if(err) console.error("Ne parviens pas à récupérer les données météo à partir de l'API, ", err);
      });
    
    }) 
  }

  componentDidMount() {
    const { eventEmitter } = this.props;
    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }
  
  render() {

    const { 
      isLoading, 
      cityName, 
      temperature, 
      conditions,
      weatherDescription, 
      weatherIcon,
      forecastdays
    } = this.state;

    return (
      
    <div className="App">
        {isLoading && <h3>Chargement de la Météo...</h3>}
        {!isLoading && 
        <div className="top-section">
          <TodayWeather 
          location={cityName} 
          temperature={Math.round(temperature)} 
          conditions={conditions}
          weatherDescription={weatherDescription} 
          weatherIcon={weatherIcon}
          eventEmitter={this.props.eventEmitter}
          />
        </div>}
        <div className='day'>
          <OtherDayWeather forecastdays={forecastdays}/>
        </div>
      </div>

    );
  }
}

export default App;
