import React from "react";
import ReactDOM from "react-dom";
import CurrentTemperature from "../components/currentTemperature";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CurrentTemperature />, div);
  ReactDOM.unmountComponentAtNode(div);
});
