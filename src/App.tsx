import { useState } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { AddCityForm } from './components/AddCityForm';
import { LoadingSpinner, ErrorMessage } from './components/LoadingSpinner';
import { useWeatherData } from './hooks/useWeatherData';
import { mockForecastData } from './data/mockWeather';
import type { WeatherData } from './types/weather';

function App() {
  const { weatherData, loading, error, refreshData, addCity, removeCity } =
    useWeatherData();
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  const handleAddCity = (cityData: Omit<WeatherData, 'id'>) => {
    // Check if city already exists
    const cityExists = weatherData.some(
      data => data.city.toLowerCase() === cityData.city.toLowerCase()
    );

    if (!cityExists) {
      addCity(cityData);
    } else {
      alert('This city is already in your dashboard!');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            🌤️ Weather Dashboard
          </h1>
          <p className='text-gray-600 mb-6'>
            Track weather conditions across multiple cities
          </p>

          <div className='flex justify-center items-center gap-4 mb-6'>
            <button
              onClick={refreshData}
              disabled={loading}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
            >
              {loading ? <LoadingSpinner size='sm' /> : '🔄'}
              Refresh Data
            </button>

            <div className='flex items-center gap-2'>
              <span className='text-gray-700'>Temperature:</span>
              <button
                onClick={() =>
                  setTemperatureUnit(temperatureUnit === 'C' ? 'F' : 'C')
                }
                className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors'
              >
                °{temperatureUnit}
              </button>
            </div>
          </div>
        </header>

        {/* Add City Form */}
        <AddCityForm onAddCity={handleAddCity} />

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Weather Cards */}
          <div className='lg:col-span-2'>
            {loading && weatherData.length === 0 ? (
              <div className='flex justify-center items-center h-64'>
                <div className='text-center'>
                  <LoadingSpinner size='lg' className='mx-auto mb-4' />
                  <p className='text-gray-600'>Loading weather data...</p>
                </div>
              </div>
            ) : error ? (
              <ErrorMessage message={error} onRetry={refreshData} />
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {weatherData.map(data => (
                  <WeatherCard
                    key={data.id}
                    data={data}
                    onRemove={removeCity}
                    showRemoveButton={true}
                  />
                ))}
                {weatherData.length === 0 && (
                  <div className='md:col-span-2 text-center py-12 text-gray-500'>
                    <div className='text-6xl mb-4'>🌍</div>
                    <p className='text-lg'>No cities added yet</p>
                    <p className='text-sm'>
                      Add a city to start tracking weather!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Forecast Sidebar */}
          <div className='lg:col-span-1'>
            <ForecastCard forecast={mockForecastData} />

            {/* Weather Stats */}
            <div className='mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Quick Stats
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Cities Tracked:</span>
                  <span className='font-semibold text-blue-600'>
                    {weatherData.length}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Avg Temperature:</span>
                  <span className='font-semibold text-green-600'>
                    {weatherData.length > 0
                      ? `${Math.round(weatherData.reduce((sum, data) => sum + data.temperature, 0) / weatherData.length)}°${temperatureUnit}`
                      : 'N/A'}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Last Updated:</span>
                  <span className='font-semibold text-gray-600 text-sm'>
                    {weatherData.length > 0
                      ? new Date(
                          weatherData[0].lastUpdated
                        ).toLocaleTimeString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='text-center mt-12 text-gray-500 text-sm'>
          <p>Weather Dashboard - Perfect for DevOps Practice 🚀</p>
          <p className='mt-1'>
            Built with React, TypeScript, Tailwind CSS, and Vitest
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
