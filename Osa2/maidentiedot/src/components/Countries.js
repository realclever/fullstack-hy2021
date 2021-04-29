import React from "react";
import Country from "./Country";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries, newFilter, showAllCountries, showCountry }) => {
  const countriesToShowFilter = showAllCountries
    ? countries
    : countries.filter(
        (countries) =>
          countries.name.toLowerCase().indexOf(newFilter.toLowerCase()) >= 0
      );

  if (countriesToShowFilter.length > 10 && countriesToShowFilter.length < 250) {
    return <p> Too many matches, specify another filter</p>;
  }

  if (countriesToShowFilter.length <= 10 && countriesToShowFilter.length > 1) {
    return (
      <>
        <ul className="no-bullets">
          {countriesToShowFilter.map((countries) => (
            <Country
              key={countries.name}
              countries={countries}
              showCountry={showCountry}
            />
            //using Country component
          ))}
        </ul>
      </>
    );
  }

  if (countriesToShowFilter.length === 1) {
    return <CountryInfo countries={countriesToShowFilter[0]} />;
  } else {
    return null;
  }
};

export default Countries;
