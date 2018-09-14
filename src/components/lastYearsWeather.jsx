import React, { Component } from "react";
import "../stylesheets/weather.css";

class LastYearsWeather extends Component {
  state = {};

  render() {
    return (
      <div className="weekly-forecast">
        {this.props.historicData !== null ? (
          <React.Fragment>
            {this.props.currentData < this.props.historicData ? (
              <span className="weather-city">
                ⬇
                {(
                  ((parseFloat(this.props.historicData) -
                    parseFloat(this.props.currentData)) *
                    100) /
                  parseFloat(this.props.currentData)
                ).toPrecision(2)}
                % colder than last year ({this.props.historicData}
                &deg;C)
              </span>
            ) : (
              <span className="weather-city">
                ⬆{" "}
                {(
                  ((parseFloat(this.props.currentData) -
                    parseFloat(this.props.historicData)) *
                    100) /
                  parseFloat(this.props.currentData)
                ).toPrecision(2)}
                % warmer than the last year ({this.props.historicData}
                &deg;C)
              </span>
            )}
          </React.Fragment>
        ) : (
          <p />
        )}
      </div>
    );
  }
}

export default LastYearsWeather;
