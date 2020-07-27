import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Controllers/Country.js";
import CountriesList from "./Controllers/CountriesList.js";
import Weather from "./Controllers/Weather.js"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [hidden, setHidden] = useState([]);

  // receives the data from the rest api
  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);

      const arr = [];
      // loop that creates an object and adds it to the array, key name and active
      for (let i = 0; i < res.data.length; i++) {
        let obj = {
          name: res.data[i]["name"],
          active: false,
        };
        arr.push(obj);
      }
      setHidden(arr);
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
      let arr = [];

      for (let obj in countries) {
        if (countries[obj]["name"].toLowerCase().includes(filter)) {
          arr.push(countries[obj]);
        }
      }
      return arr;
    }
  };

  const showInfo = (c) => {
    const info = [].concat(hidden);

    for (let i = 0; i < info.length; i++) {
      if (info[i]["name"] === c) {
        info[i]["active"] = !info[i]["active"];
        console.log(info[i]);
      }
    }
    setHidden(info);
  };

  return (
    <div>
      Find countries: <input value={filter} onChange={queryHandler} />
      {countryFilter().length > 10 ? (
        <p>Too many matches, specify better the filter</p>
      ) : countryFilter().length === 1 ? (
        <section>
          <Country filter={countryFilter} />
          <Weather capital={countryFilter()[0]["capital"]} />
        </section>
      ) : (
        <CountriesList list={countryFilter} handle={showInfo} hidden={hidden} />
      )}
    </div>
  );
};

export default App;
