import axios from "axios";
import Historic from "./historic";
class Utils {
  // Get longitude and latitude of a city
  static getGeoCode = cityName => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?&address=" +
            cityName +
            "&key=" +
            process.env.REACT_APP_GOOGLE_API_KEY
        )
        .then(response => {
          //debugger;

          resolve(response.data.results[0].geometry.location);
        })
        .catch(err => {
          let errorMessage = {
            status: "check internet connection",
            errorMessage: "Query limit exceeded",
            error: err
          };
          reject(errorMessage);
        });
    });
  };

  // Get weather forecast from SMHI database
  static getWeatherData = coordinate => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" +
            coordinate.lng +
            "/lat/" +
            coordinate.lat +
            "/data.json"
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          let errorMessage = { status: "error", error: error };
          reject(errorMessage);
        });
    });
  };

  static getLastYearsData = city => {
    console.log(Historic.getLastYearsData());
  };
  // Retrieve the current temperature
  static getCurrentTemperature = weatherData => {
    return new Promise((resolve, reject) => {
      let currentDate = new Date().toISOString();
      let today = currentDate.substr(0, 10);
      let currentTemperature;
      let todaysData = [];
      weatherData.timeSeries.forEach(timelyData => {
        if (timelyData.validTime.substr(0, 10) === today) {
          todaysData.push(timelyData);
        }
      });

      // In case there is no data available fot today,
      // Work on tomorrow's data which is the closest available one
      if (todaysData.length === 0) {
        today = new Date();
        today.setDate(today.getDate() + 1);
        today = today.toISOString().substr(0, 10);
        weatherData.timeSeries.forEach(timelyData => {
          if (timelyData.validTime.substr(0, 10) === today) {
            todaysData.push(timelyData);
          }
        });
      }

      todaysData[0].parameters.forEach(parameter => {
        if (parameter.name === "t") {
          currentTemperature = parameter.values[0];
          resolve(currentTemperature);
        }
      });
    });
  };

  // Get weekly forecast
  static getWeeklyData = weatherData => {
    return new Promise((resolve, reject) => {
      let weeklyData = [];
      let weeklyInformation = [];

      weatherData.timeSeries.forEach(timelyData => {
        // If temperature for that day already exists
        if (!!weeklyData[timelyData.validTime.substr(0, 10)]) {
          timelyData.parameters.forEach(parameter => {
            // check for temperature parameter
            if (parameter.name === "t") {
              // Update highest and lowest temperature
              if (
                weeklyData[timelyData.validTime.substr(0, 10)].high <
                parameter.values[0]
              ) {
                weeklyData[timelyData.validTime.substr(0, 10)].high =
                  parameter.values[0];
              }
              if (
                weeklyData[timelyData.validTime.substr(0, 10)].low >
                parameter.values[0]
              ) {
                weeklyData[timelyData.validTime.substr(0, 10)].low =
                  parameter.values[0];
              }
            }
          });
        } else {
          // In case there was no prior data for that day
          timelyData.parameters.forEach(parameter => {
            if (parameter.name === "t") {
              weeklyData[timelyData.validTime.substr(0, 10)] = {
                high: parameter.values[0],
                low: parameter.values[0]
              };
            }
          });
        }
      });

      // Get the keys of weeklyData hash.
      let dates = Object.keys(weeklyData);

      // Traverse the hash and update weeklyInformation array.
      dates.forEach(date => {
        weeklyInformation.push({
          date: date,
          high: weeklyData[date].high,
          low: weeklyData[date].low
        });
      });

      resolve(weeklyInformation.splice(0, 7));
    });
  };
}

export default Utils;
