
import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, onClear }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('/cities.json')
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setInput('');
    setSuggestions([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={onClear}>Clear All</button>
      </form>
      {suggestions.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(city)}
              style={{
                cursor: 'pointer',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                padding: '5px',
                marginTop: '2px'
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
