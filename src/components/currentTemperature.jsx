import React, { Component } from "react";
import "../stylesheets/weather.css";

// This component renders the name of the selected city
// and the current weather of the city.
// The props city and temperature corresponds them.
class currentTemperature extends Component {
  state = {
    cel: null,
    f: null
  };

  render() {
    return (
      <div className="current-temperature">
        {this.props.temperature ? (
          <div>
            <h3>{this.props.city}</h3>
            <span className="weather-city">Current Temperature</span>
            <span className="weather-title">
              {this.props.temperature}
              &deg;C
            </span>
          </div>
        ) : (
          <p />
        )}
      </div>
    );
  }
}

export default currentTemperature;
