import React, { Component } from "react";
import "../stylesheets/weather.css";

class CityList extends Component {
  state = {};
  render() {
    return (
      <div
        key={this.props.cityData.abbr}
        className={this.props.isActive ? "active" : "inactive"}
      >
        {this.props.cityData.name}
      </div>
    );
  }
}

export default CityList;
