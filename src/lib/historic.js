import abiskoData from "../data/188800.json";
import stockholmData from "../data/98210.json";
import göteborgData from "../data/71420.json";

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

    todaysWeather.length;

    let lowestIndex = 0;
    let currentIndex = 0;
    let lowestDiff = 12;
    todaysWeather.forEach(hourlyData => {
      if (parseInt(hour) > parseInt(hourlyData.hour)) {
        if (parseInt(hour) - parseInt(hourlyData.hour) < lowestDiff) {
          lowestDiff = parseInt(hour) - parseInt(hourlyData.hour);
          lowestIndex = currentIndex;
        }
      } else {
        if (parseInt(hourlyData.hour) - parseInt(hour) < lowestDiff) {
          lowestDiff = parseInt(hourlyData.hour) - parseInt(hour);
          lowestIndex = currentIndex;
        }
      }

      currentIndex += 1;
    });
    todaysWeather[lowestIndex];
    // debugger;
    return todaysWeather[lowestIndex];
  };

  static getStation = city => {
    console.log("hello");
    let station = {
      Abisko: abiskoData,
      Stockholm: stockholmData,
      Göteborg: göteborgData
      //   Malmö: malmöData,
      //   Visby: visbyData,
      //   Lund: lundData,
      //   Umeå: umeåData,
      //   Helsingborg: helsingborgData,
      //   Linkoping: linkopingData,
      //   Växjö: växjöData,
      //   Kalmar: kalmarData,
      //   Jönköping: jönköpingData,
      //   Luleå: luleåData,
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
