import Utils from "../lib/utils";
import axios from "axios";

// This test will check whether the existing API for retrieving latitude
// is working
test("google place API get geo code :: latitude test", () => {
  const coordinateStockholm = { lat: 59.32932349999999, lng: 18.0685808 };
  return axios
    .get("https://maps.googleapis.com/maps/api/geocode/json?&address=Stockholm")
    .then(data => {
      const result = data.data.results[0].geometry.location.lat.toString();
      expect(result).toMatch(coordinateStockholm.lat.toString());
    });
});

// This test will check whether the existing API for retrieving longitude
// is working
test("google place API get geo code :: longitude test", () => {
  const coordinateStockholm = { lat: 59.32932349999999, lng: 18.0685808 };
  return axios
    .get("https://maps.googleapis.com/maps/api/geocode/json?&address=Stockholm")
    .then(data => {
      const result = data.data.results[0].geometry.location.lng.toString();
      expect(result).toMatch(coordinateStockholm.lng.toString());
    });
});

// Check whether the .env file has a Google API key
test("check availability of Google API Key", () => {
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);
  expect(googleKey).not.toBeUndefined();
});
