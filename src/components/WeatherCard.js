import React from 'react';

const WeatherCard = ({ data }) => {
  return (
    <div>
      <h2>{data.name}, {data.sys.country}</h2>
      <p>🌡 Temp: {data.main.temp}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>🌬 Wind: {data.wind.speed} m/s</p>
      <p>🌥 Weather: {data.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
