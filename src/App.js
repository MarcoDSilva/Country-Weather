import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ filter }) => {
  const country = filter();

  return (
    <div key={country["alpha2Code"]}>
      <h1>{country[0]["name"]}</h1>
      <p>Population: {country[0]["population"]}</p>
      <p>Capital: {country[0]["capital"]}</p>
      <h4>Languages: </h4>
      <ul>
        {country[0]["languages"].map((lang, i) => (
          <li key={i}>{lang["name"]}</li>
        ))}
      </ul>
      <p>
        {
          <img
            src={country[0]["flag"]}
            alt="Country Flag"
            width={250}
            height={250}
          />
        }
      </p>
    </div>
  );
};

const CountriesList = ({ list }) => {
  const countries = list();
  return (
      countries.map((c, i) => <p key={i}>{c["name"]}</p>)
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  // receives the data from the rest api
  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log("data obtained");
      setCountries(res.data);
      console.log("data updated");
      console.log(res.data);
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

      console.log(arr);
      return arr;
    }
  };

  return (
    <div>
      Find countries: <input value={filter} onChange={queryHandler} />
      {countryFilter().length > 10 ? (
        <p>Too many matches, specify better the filter</p>
      ) : countryFilter().length === 1 ? (
        <Country filter={countryFilter} />
      ) : (
        <CountriesList list={countryFilter} />
      )}
    </div>
  );
};

export default App;
