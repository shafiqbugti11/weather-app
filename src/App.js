import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      alert('Failed to fetch data');
    }
    setLoading(false);
  };

  const handleSearch = (cityName) => {
    fetchWeather(cityName);
  };

  const handleAddFavorite = () => {
    if (!weatherData || favorites.includes(weatherData.name)) return;
    const updated = [...favorites, weatherData.name];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleDeleteFavorite = (city) => {
    const updated = favorites.filter((fav) => fav !== city);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setWeatherData(null);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <h2>🌤 Weather Dashboard</h2>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <SearchBar onSearch={handleSearch} onClear={handleClearAll} />
      
      <button className="fav-btn" onClick={handleAddFavorite}>⭐ Save to Favorites</button>
      {loading && <p>Loading...</p>}
      {weatherData && <WeatherCard data={weatherData} />}
      <h3>🌆 Favorite Cities</h3>
      <ul className="favorites-list">
        {favorites.map((fav, idx) => (
          <li key={idx}>
            {fav}
            <button onClick={() => fetchWeather(fav)}>Check</button>
            <button onClick={() => handleDeleteFavorite(fav)} className="delete-btn">🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
