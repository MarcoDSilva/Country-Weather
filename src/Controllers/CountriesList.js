import React from "react";

const CountriesList = ({ list }) => {
  const countries = list();
  return countries.map((c, i) => <p key={i}>{c["name"]}</p>);
};

export default CountriesList;
