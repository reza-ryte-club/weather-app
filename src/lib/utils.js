import axios from "axios";
class Utils {
  static sum(a, b) {
    return a + b;
  }
  static getGeoCode = cityName => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?&address=" +
            cityName
        )
        .then(function(response) {
          resolve(response.data.results[0].geometry.location);
        })
        .catch(function(error) {
          let errorMessage = { status: "error", error: error };
          reject(errorMessage);
        });
    });
  };

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
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          let errorMessage = { status: "error", error: error };
          reject(errorMessage);
        });
    });
  };

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

      // Gotta test later
      // let hour = currentDate.substr(11, 2);
      // todaysData.forEach(dailyData => {
      //   if (hour === dailyData.validTime.substr(11, 2)) {
      //     currentTemperature = dailyData.parameters[1].values[0];
      //     resolve(currentTemperature);
      //   }
      // });
      todaysData[0].parameters.forEach(parameter => {
        if (parameter.name == "t") {
          currentTemperature = parameter.values[0];
          resolve(currentTemperature);
        }
      });
    });
  };

  static getWeeklyData = weatherData => {
    return new Promise((resolve, reject) => {
      let weeklyData = [];
      let weeklyInformation = [];

      console.log(weatherData);
      weatherData.timeSeries.forEach(timelyData => {
        if (!!weeklyData[timelyData.validTime.substr(0, 10)]) {
          timelyData.parameters.forEach(parameter => {
            if (parameter.name === "t") {
              //     weeklyData[timelyData.validTime.substr(0, 10)] = { high: parameter.values[0], low: parameter.values[0] };
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
      console.log("weeklyData");
      console.log(weeklyData);
      let dates = Object.keys(weeklyData);

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
