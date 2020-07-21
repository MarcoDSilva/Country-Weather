import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log("data obtained");
      setCountries(res.data.map((country) => country.name));
      console.log("data updated");
    });
  };

  useEffect(hook, []);

  const queryHandler = (e) => {
    const val = e.target.value.toLowerCase();
    console.log(val);
    setFilter(val);
    countryFilter();
  };

  const countryFilter = () => {
    if (filter === "") {
      return;
    } else {
      const search = countries.filter((c) => c.toLowerCase().includes(filter));
      console.log(search);
    }
	};

	const renderer = () => {
		if(countries.length > 10) {
			return ""
		} else {
			return countries.map((c, key) => <li key={key}>c</li>)
		}
	}

  return (
    <div>
      Find countries: <input value={filter} onChange={queryHandler} />
      <ul>
				 {renderer() == "" ? "Too many matches" : renderer().map((c,i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  );
};

export default App;
