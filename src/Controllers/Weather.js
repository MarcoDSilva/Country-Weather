import React from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((res) => {
        const apiResponse = res.data;
        console.log(apiResponse);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  hook();

  return (
    <section id="weather-id">
      <h3>Weather in {capital}</h3>
      <p>Temperature: {} </p>
      <p>wind: </p>
    </section>
  );
};

export default Weather;
