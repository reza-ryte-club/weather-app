import React from "react";
import ReactDOM from "react-dom";
import CityList from "../components/CityList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <CityList key="2" isActive={false} cityData="Stockholm" />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
