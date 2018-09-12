import React from "react";
import ReactDOM from "react-dom";
import WeeklyForecast from "../components/weeklyForecast";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const weeklyData = [
    { date: "2018-09-12", high: 0, low: 0 },
    { date: "2018-09-13", high: 18.2, low: 0 },
    { date: "2018-09-14", high: 16.5, low: 10.6 },
    { date: "2018-09-15", high: 14.6, low: 11.8 },
    { date: "2018-09-16", high: 16, low: 10.3 },
    { date: "2018-09-17", high: 15.8, low: 10.6 },
    { date: "2018-09-18", high: 16.9, low: 11.2 }
  ];
  ReactDOM.render(<WeeklyForecast weeklyData={weeklyData} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
