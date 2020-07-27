import React from "react";
import Country from "./Country.js";

const CountriesList = ({ list, handle, hidden }) => {
  const countries = list();

	// returning if the status after the handler is active or not, to show/hide the information
  const fil = (s) => {
    for (let i = 0; i < hidden.length; i++) {
      if (s === hidden[i]["name"]) {
        return hidden[i]["active"];
      }
    }
    return false;
  };

	// returning the correct country to pass the prop to the component
  const countryHandler = (name) => {
    return countries.filter((country) => country["name"] === name);
  };

  return countries.map((c, i) => (
    <div key={i}>
      <span>{c["name"]}</span>
      <button onClick={() => handle(c["name"])}> show</button>
      {fil(c["name"]) && <Country filter={() => countryHandler(c["name"])} />}
    </div>
  ));
};

export default CountriesList;
