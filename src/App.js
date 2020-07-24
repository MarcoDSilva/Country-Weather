import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  // receives the data from the rest api
  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log("data obtained");
      setCountries(res.data.map(a => a.name));
      console.log("data updated");
    });
  };

  useEffect(hook, []); // applies the api data 

  // handles the filter input box
  const queryHandler = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  //filter the data by the names
  const countryFilter = () => {
    if (filter === "") {      
      return countries;
    } else {
      console.log(countries.filter((c) => c.toLowerCase().includes(filter)));
      return countries.filter((c) => c.toLowerCase().includes(filter));
    }
	};

  return (
    <div>
      Find countries: <input value={filter} onChange={queryHandler} />
      <ul>
        {countryFilter().length > 10
          ? "Too many matches, specify better the filter"
          : countryFilter().map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  );
};

export default App;
