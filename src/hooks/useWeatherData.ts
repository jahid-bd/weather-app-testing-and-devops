import { useState, useEffect } from 'react';
import type { WeatherData } from '../types/weather';
import { mockWeatherData } from '../data/mockWeather';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add some randomness to make it feel more real
      const updatedData = mockWeatherData.map(data => ({
        ...data,
        temperature: data.temperature + Math.round((Math.random() - 0.5) * 4),
        humidity: Math.max(
          30,
          Math.min(95, data.humidity + Math.round((Math.random() - 0.5) * 10))
        ),
        windSpeed: Math.max(
          0,
          data.windSpeed + Math.round((Math.random() - 0.5) * 6)
        ),
        lastUpdated: new Date().toISOString(),
      }));

      setWeatherData(updatedData);
    } catch (err) {
      console.error('Weather data fetch error:', err);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchWeatherData();
  };

  const addCity = (cityData: Omit<WeatherData, 'id'>) => {
    const newCity: WeatherData = {
      ...cityData,
      id: Date.now(),
    };
    setWeatherData(prev => [...prev, newCity]);
  };

  const removeCity = (id: number) => {
    setWeatherData(prev => prev.filter(city => city.id !== id));
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return {
    weatherData,
    loading,
    error,
    refreshData,
    addCity,
    removeCity,
  };
};
