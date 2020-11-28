import React from 'react'

export default function UserLocation(props) {

  const { city,temp,sunrise,sunset, temp_max, temp_min, wind_speed, description} = props.weather;

    return (
        <div className="user-weather">
            <div className="row">
                <div className="col-md-3 weather-temp">
            <h1>{temp}<sup>o</sup>C , {description}</h1>
                    <h4>{city}</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 weather-info">
                    <p><b>Wind Speed</b>(km/hr)</p>
                    <h2>{wind_speed}</h2>
                </div>
          
                <div className="col-md-3 weather-info">
                    <p><b>High</b></p>
                    <h2>{temp_max}<sup>o</sup>C</h2>
                </div>
          
                <div className="col-md-3 weather-info">
                    <p><b>Low</b></p>
                    <h2>{temp_min}<sup>o</sup>C</h2>
                </div>
              
                <div className="col-md-3 weather-info">
                    <p><b>Sunrise</b></p>
                    <h2>{sunrise} a.m</h2>
                </div>
          
                <div className="col-md-3 weather-info">
                    <p><b>Sunset</b></p>
                    <h2>{sunset} p.m</h2>
                </div>
          
            </div>
        </div>
    )
}