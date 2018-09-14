import abiskoData from "../data/188800.json";
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

    if (hour <= 12) return todaysWeather[0];
    else return todaysWeather[1];
  };

  static getStation = city => {
    console.log("hello");
    let station = {
      Abisko: abiskoData
    };
    console.log(station[city]);
    if (station[city]) return station[city];
    else return null;
  };
}

export default Historic;
