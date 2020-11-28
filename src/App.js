import { Component } from 'react';
import UserLocation from './components/UserLocation.js';
import Navbar from './components/Navbar.js'
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    userPosition: {
      latitude: 35,
      longitude: 139
    },
    weather: {},
    regionInput: ""
  }
  
  // convert to celsius
  calCelsius(temp) {
    let cel = Math.floor(temp - 273.15)
    return cel
  }

  // cnvert time

  calTimeStamp(sec) {
    let unix_timestamp = sec
    var date = new Date(unix_timestamp * 1000)
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
  }
    

  // currentLocation Api call
  getCurrentLocation = async () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.userPosition.latitude}&lon=${this.state.userPosition.longitude}&appid=a6adae971d0eac8ba295fd8a768037a1
    `).then((res) => {
      const response = res.data;
      console.log(response)
      let userWeather = {
        city: `${response.name}, ${response.sys.country}`,
        main: response.weather[0].main,
        sunrise: this.calTimeStamp(response.sys.sunrise),
        sunset: this.calTimeStamp(response.sys.sunset),
        temp: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        wind_speed: response.wind.speed,
        description: response.weather[0].description
      }
      this.setState({ weather: userWeather })
    })
  }

 
  //get device location
  componentDidMount() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        //get the lat and long 
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({ userPosition: pos })

        this.getCurrentLocation()

      })
    }
    else {
      console("not supported")
    }
  }

  //update the value of the the input field with state
  changeRegion = (value) => {
    this.setState({ regionInput: value })
  }

  //update the weather depending upon the value user entered
  changeLocation = (e) => {

    e.preventDefault()
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.regionInput}&appid=a6adae971d0eac8ba295fd8a768037a1
    `).then((res) => {
      const response = res.data;
      let userWeather = {
        city: `${response.name}, ${response.sys.country}`,
        sunrise: this.calTimeStamp(response.sys.sunrise),
        sunset: this.calTimeStamp(response.sys.sunset),
        temp: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        wind_speed: response.wind.speed,
        description: response.weather[0].description
      }
      this.setState({ weather: userWeather })
    })
    
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar changeRegion={this.changeRegion} changeLocation={this.changeLocation} />
          <UserLocation weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default App;
