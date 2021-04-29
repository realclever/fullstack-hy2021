import React from "react";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ countries }) => {
  return (
    <>
      <h2> {countries.name} </h2>
      <p> Capital: {countries.capital}</p>
      <p> Population: {countries.population}</p>
      <h3> Spoken languages</h3>
      {countries.languages.map((languages) => (
        <li key={languages.name}>{languages.name}</li>
      ))}
      <br></br>
      <img src={countries.flag} alt="flag" width="25%" length="25%" />
      <WeatherInfo location={countries.capital} />
    </>
  );
};

export default CountryInfo;
