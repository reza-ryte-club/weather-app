This is a react based web front-end created with create-react.app released by Facebook.
It uses Google Places API to search and suggest Swedish cities. It also uses this API to get the coordinate 
of requested city.

The weather data is collected from SMHI API portal which corresponds SMHI Open Data Meteorological Forecasts.

## Table of Contents

- [Preamble](#preamble)
- [Architecture](#architecture)
- [Run](#run)
- [Test](#test)
- [Supported Browsers](#supported-browsers)



## Preamble
The purpose of this app to get weather data of Swedish cities. To simplify the objective, I just analyzed the temperature of the cities. It is possible to extend this application with other attributes of weather - such as air pressure, humidity, speed of wind etc. The SMHI has a comprehensive database regarding these aspects. The latest version of SMHI API was being used to develop this program.

## Architecture

This application is developed on top of create-react-app, which is an implementation of webpack, babel and react on top node js. As it is a front-end application, the queries to the external server(for example: Google Places API) was managed using proxy attribute to the package.json file. Doing that helped me to avoid CORS error.

The UI components are resided in the components directory. A lib directory contains non UI methods in Utils class. All the test cases were put into the classes inside of tests directory. All the promises is handled using native promise. But for retrieving API data, Axios was used.

The API key has to be in the .env file. For security reasons, it isn't included in the repository. To run the application successfully, it is required to add a .env file in the root directory. The content would be like this 

```
REACT_APP_GOOGLE_API_KEY=YOUR_API_KEY
```

## Run

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Test
If you are using macOS, please install watchman before running tests.
You can use this command to install watchman:
```
brew install watchman
```

In the project directory, you can run:
### `yarn test`

It launches the test runner in the interactive watch mode.<br>

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.
