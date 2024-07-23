// src/App.js
import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay.js ';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=243b4042491a8094e9d4dae5ce1474a1`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('Weather data could not be retrieved');
    }
  };

  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=243b4042491a8094e9d4dae5ce1474a1`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        fetchWeather(lat, lon);
      } else {
        setWeather(null);
        setError('City not found');
      }
    } catch (err) {
      setWeather(null);
      setError('City not found');
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchCoordinates();
    } else {
      setError('Please enter a city name');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city name" />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
};

export default App;
