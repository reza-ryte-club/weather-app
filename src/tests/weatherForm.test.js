import React from "react";
import ReactDOM from "react-dom";
import WeatherForm from "../components/weatherForm";
import Utils from "../lib/utils";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WeatherForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
