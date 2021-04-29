import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import "./index.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
      console.log("fetched all the data:", response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const handleshowCountry = (event) => {
    //console.log(event.target.value);
    setNewFilter(event);
  };

  return (
    <>
      <h2>Show countries</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        newFilter={newFilter}
        showCountry={handleshowCountry}
      />
    </>
  );
};

export default App;
