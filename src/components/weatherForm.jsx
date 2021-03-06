import React, { Component } from "react";
import "../stylesheets/weather.css";
import Utils from "../lib/utils";
import axios from "axios";
import CityList from "./cityList";
import CurrentTemperature from "./currentTemperature";
import WeeklyForecast from "./weeklyForecast";
import Historic from "../lib/historic";
import LastYearsWeather from "./lastYearsWeather";

class WeatherForm extends Component {
  state = {
    city: "",
    cities: [],
    currentGeocode: null,
    currentTemperature: null,
    weeklyForcast: null,
    selectedCity: null,
    cursor: 0,
    lastYearsCurrentTemperature: null
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row" id="appSummary">
            <div className="col">
              <h1 className="col text-center app-header display-4">Weather App</h1>
              <p className="lead app-subtitle">Get latest weather condition</p>
              <label htmlFor="states-autocomplete">Choose a Swedish city</label>
              <input
                value={this.state.city}
                onChange={this.inputChange}
                onKeyDown={this.navigateMenu}
                className="search-box"
                type="text"
                placeholder="Any Swedish city"
              />

              {this.state.cities.map((city, i) => (
                <div
                  className="col "
                  key={city.abbr}
                  onClick={() => this.checkWeather(city.name)}
                >
                  <CityList
                    key={city.abbr}
                    isActive={this.state.cursor === i ? true : false}
                    cityData={city}
                  />
                </div>
              ))}

              <CurrentTemperature
                temperature={this.state.currentTemperature}
                city={this.state.selectedCity}
              />
              <LastYearsWeather
                historicData={this.state.lastYearsCurrentTemperature}
                currentData={this.state.currentTemperature}
              />

              <WeeklyForecast weeklyData={this.state.weeklyForcast} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // This method monitors keyboard movement of the user
  navigateMenu = e => {
    const { cursor, cities } = this.state;
    let currentState = this;

    // If user presses the arrow key

    if (e.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    }

    if (e.keyCode === 40 && cursor < cities.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }
    // In case of pressing return or enter
    if (e.keyCode === 13 && !!currentState.state.cities[cursor]) {
      this.checkWeather(currentState.state.cities[cursor].name);
    }
  };

  // Check weather data of the selected city
  checkWeather = city => {
    this.setState({ city: "" });
    this.setState({
      selectedCity: city
    });
    this.setState({
      cities: []
    });
    let currentState = this;

    // This promise will return the geographical coordinates of selected city.
    Utils.getGeoCode(city).then(function(geocode) {
      geocode.lat = geocode.lat.toPrecision(4);
      geocode.lng = geocode.lng.toPrecision(4);
      currentState.setState(
        {
          currentGeocode: geocode
        },
        () => {
          // This promise will return weather data of selected city.
          Utils.getWeatherData(currentState.state.currentGeocode)
            .then(function(weatherData) {
              currentState.getCurrentWeather(weatherData);
            })
            .catch(e => {
              alert(
                "Please check your internet connection and proxy settings in Package.json file."
              );
            });
        }
      );
    });
  };

  // Get weekly forecast from SMHI API and update the state
  getWeeklyForecast = weatherdata => {
    let currentState = this;
    Utils.getWeeklyData(weatherdata).then(function(weeklyData) {
      currentState.setState({ weeklyForcast: weeklyData });
      currentState.setState({
        lastYearsCurrentTemperature: Historic.getLastYearsData(
          currentState.state.selectedCity
        ).temperature
      });
      console.log(currentState);
    });
  };

  // Get current weather situation
  getCurrentWeather = weatherData => {
    let currentState = this;
    Utils.getCurrentTemperature(weatherData).then(function(currentTemperature) {
      currentState.setState({ currentTemperature: currentTemperature });
      currentState.getWeeklyForecast(weatherData);
    });
  };

  // Handle keyboard events
  inputChange = e => {
    this.setState({ city: e.target.value }, () => {
      let currentCity = this.state.city;
      let result = [];
      let currentState = this;
      axios
        .get(
          "/maps/api/place/autocomplete/json?input=" +
            currentCity +
            "&components=country:se&type=(cities)&" +
            "key=" +
            process.env.REACT_APP_GOOGLE_API_KEY
        )
        .then(function(response) {
          let predictions = response.data.predictions;
          let i = 0;

          predictions.forEach(prediction =>
            result.push({
              abbr: (i = i + 1).toString(),
              name: prediction.structured_formatting.main_text
            })
          );

          currentState.setState({ cities: result });
        })
        .catch(function(error) {
          alert(
            "Please check your internet connection and proxy settings in Package.json file."
          );
        });
    });
  };
}

export default WeatherForm;
