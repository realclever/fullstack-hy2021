import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = ({ location }) => {
  const [weather, setWeather] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  //key fd9a47bbc1caa681bed281f7d52f8f5a
  //REACT_APP_API_KEY=fd9a47bbc1caa681bed281f7d52f8f5a npm start

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`
      )
      .then((response) => {
        setWeather(response.data.current);
        setAnalytics(response.data.location);
        console.log("fetched all the data:", response.data);
      });
  }, [api_key, location]); //removes the warning

  //api doc https://weatherstack.com/documentation

  return (
    <>
      <h2>
        <b>Current weather in {analytics.name}</b>
      </h2>
      <p>
        <b>Local date/time: {analytics.localtime} </b>
      </p>
      <p>
        <b>
          Timezone: GTM({analytics.utc_offset}) {analytics.timezone_id}
        </b>
      </p>
      <p>
        <b>Local temperature: {weather.temperature} °C</b>
      </p>
      <p>
        <b> Last updated: {weather.observation_time}</b>
      </p>
      <img
        src={weather.weather_icons}
        alt="can't render the icon"
        width="10%"
        length="10%"
      />
      <p>
        <b>
          Wind: {weather.wind_speed} mph direction {weather.wind_dir}
          <br></br>
          {weather.weather_descriptions}
        </b>
      </p>
    </>
  );
};

export default WeatherInfo;
