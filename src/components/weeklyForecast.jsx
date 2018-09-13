import React, { Component } from "react";
import "../stylesheets/weather.css";

class WeeklyForecast extends Component {
  state = {};

  render() {
    return (
      <div className="weekly-forecast">
        {this.props.weeklyData ? (
          <div>
            <h3>Weekly Forecast</h3>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Date
                  </th>
                  <th scope="col" className="text-center">
                    Highest (&deg;C)
                  </th>
                  <th scope="col" className="text-center">
                    Lowest (&deg;C)
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.weeklyData.map(day => (
                  <tr key={day.date}>
                    <td className="text-center">{this.getTheDay(day.date)}</td>
                    <td className="text-center">{day.high}</td>
                    <td className="text-center">{day.low}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p />
        )}
      </div>
    );
  }

  getTheDay = dateString => {
    let days = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    };
    return days[new Date(dateString).getDay()];
  };
}

export default WeeklyForecast;
