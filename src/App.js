import React from "react";
import "./App.css";

import SearchBar from "./components/search-bar";
import CurrentWeather from "./components/current-weather";
import Forecast_hourly from "./components/forecast_hourly";
import Forecast_days from "./components/forecast_days";

import * as Api from "./api/weatherAPI";

const FARENHEIT = "farehnheit";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Jamshedpur",
      metric: FARENHEIT,
      hourlyForecast: [],
      dailyForecast:[],
      current: "",
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.updateTemperature = this.updateTemperature.bind(this);

    this.updateTemperature();
  }

  handleLocationChange(location) {
    this.setState({ location });
  }

  async updateTemperature() {
    const weatherRes = await Api.getWeatherBasedOnLocation(this.state.location);
    const forecastRes = await Api.getForecast(
      weatherRes.coord.lat,
      weatherRes.coord.lon
    );

    this.setState({
      current: forecastRes.current,
      metric: FARENHEIT,
      hourlyForecast: forecastRes.hourly,
      dailyForecast:forecastRes.daily,
    });
  }

  render() {
    const location = this.state.location;
    const hourlyForecast = this.state.hourlyForecast;
    const dailyForecast = this.state.dailyForecast;
    const current = this.state.current;

    return (
      <div className="App">
        <header className="App-header">
          <SearchBar
            searchValue={location}
            onSearchChange={this.handleLocationChange}
            onFormSubmit={this.updateTemperature}
          />

          {current && <CurrentWeather current={current} />}
          {hourlyForecast.length > 0 && <Forecast_hourly forecast={hourlyForecast} />}
          {dailyForecast.length > 0 &&<Forecast_days days={dailyForecast}/>}
        </header>
      </div>
    );
  }
}

export default App;
