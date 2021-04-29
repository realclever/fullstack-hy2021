import React from "react";

const Country = ({ countries, showCountry }) => {
  return (
    <>
      <li>
        {countries.name} - {countries.capital} <span>&nbsp;</span>
        <button onClick={() => showCountry(countries.name)}>show info</button>
      </li>
    </>
  );
};

export default Country;
