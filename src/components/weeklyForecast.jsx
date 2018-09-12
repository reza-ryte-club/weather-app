import React, { Component } from "react";
import "./weather.css";

class WeeklyForecast extends Component {
  state = {};

  showProps() {
    console.log("prop is here");
  }
  render() {
    return (
      <div className="weekly-forecast">
        {this.props.weeklyData ? (
          <div>
            <h3>Weekly Forecast</h3>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Highest (&deg;C)</th>
                  <th scope="col">Lowest (&deg;C)</th>
                </tr>
              </thead>
              <tbody>
                {this.props.weeklyData.map(day => (
                  <tr key={day.date}>
                    <td>{day.date}</td>
                    <td>{day.high}</td>
                    <td>{day.low}</td>
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
}

export default WeeklyForecast;

<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>;
