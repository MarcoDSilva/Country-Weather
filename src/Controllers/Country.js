import React from "react";

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

export default Country;
