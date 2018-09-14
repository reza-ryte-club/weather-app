import abiskoData from "../data/188800.json";
import stockholmData from "../data/98210.json";
import göteborgData from "../data/71420.json";
import malmöData from "../data/52350.json";
import uppsalaData from "../data/97510.json";
import visbyData from "../data/78400.json";
import lundData from "../data/53430.json";
import umeåData from "../data/140480.json";
import helsingborgData from "../data/62040.json";
import linköpingData from "../data/74080.json";
import växjöData from "../data/64510.json";
import kalmarData from "../data/66420.json";
import jönköpingData from "../data/74460.json";
import luleåData from "../data/162870.json";

/*
API call for Göteborg
https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/71420/period/corrected-archive/data.csv

Stations list URL
https://opendata.smhi.se/apidocs/metobs/demo.html
*/
class Historic {
  static getLastYearsData = city => {
    // let dataKeys = Object.keys(abisko);

    let station = Historic.getStation(city);
    if (station === null) return { hour: null, temperature: null };
    let dataKeys;
    dataKeys = Object.keys(station);

    let d = new Date();
    let y = d.setDate(d.getDate() - 365);
    let lastYearsDate = new Date(y).toISOString().substr(0, 10);
    let todaysHistoricData = [];
    let todaysWeather = [];
    let hour = new Date().toISOString().substring(11, 13);
    dataKeys.forEach(element => {
      if (station[element].Datum === lastYearsDate) {
        todaysHistoricData.push(element);
      }
    });

    todaysHistoricData.forEach(data => {
      todaysWeather.push({
        hour: station[data]["Tid (UTC)"].substr(0, 2),
        temperature: station[data].Lufttemperatur
      });
    });

    let lowestIndex = 0;
    let currentIndex = 0;
    let lowestDiff = 12;
    todaysWeather.forEach(hourlyData => {
      if (parseInt(hour, 10) > parseInt(hourlyData.hour, 10)) {
        if (parseInt(hour, 10) - parseInt(hourlyData.hour, 10) < lowestDiff) {
          lowestDiff = parseInt(hour, 10) - parseInt(hourlyData.hour, 10);
          lowestIndex = currentIndex;
        }
      } else {
        if (parseInt(hourlyData.hour, 10) - parseInt(hour, 10) < lowestDiff) {
          lowestDiff = parseInt(hourlyData.hour, 10) - parseInt(hour, 10);
          lowestIndex = currentIndex;
        }
      }

      currentIndex += 1;
    });
    return todaysWeather[lowestIndex];
  };

  static getStation = city => {
    console.log("hello");
    let station = {
      Abisko: abiskoData,
      Stockholm: stockholmData,
      Göteborg: göteborgData,
      Malmö: malmöData,
      Uppsala: uppsalaData,
      Visby: visbyData,
      Lund: lundData,
      Umeå: umeåData,
      Helsingborg: helsingborgData,
      Linköping: linköpingData,
      Växjö: växjöData,
      Kalmar: kalmarData,
      Jönköping: jönköpingData,
      Luleå: luleåData
      //   Borås: boråsData,
      //   Karlskrona: karlskronaData
      //   Västerås: västeråsData,
      //   Gävle: gävleData,
      //   Karlstad: karlstadData,
      //   Norrköping: norrköpingData,
      //   Kiruna: kirunaData,
      //   Sundsvall: sundsvallData,
      //   Örebro: örebroData,
      //   Sodertalje: sodertaljeData,
      //   Falun: falunData,
      //   Borlänge: BorlängeData,
    };
    console.log(station[city]);
    if (station[city]) return station[city];
    else return null;
  };
}

export default Historic;
