import { useState } from 'react';
import type { WeatherData } from '../types/weather';

interface AddCityFormProps {
  onAddCity: (cityData: Omit<WeatherData, 'id'>) => void;
}

const predefinedCities = [
  { name: 'Paris', country: 'France' },
  { name: 'Berlin', country: 'Germany' },
  { name: 'Rome', country: 'Italy' },
  { name: 'Madrid', country: 'Spain' },
  { name: 'Amsterdam', country: 'Netherlands' },
  { name: 'Barcelona', country: 'Spain' },
  { name: 'Vienna', country: 'Austria' },
  { name: 'Prague', country: 'Czech Republic' },
];

export const AddCityForm: React.FC<AddCityFormProps> = ({ onAddCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const handleAddCity = () => {
    const city = predefinedCities.find(
      c => `${c.name}, ${c.country}` === selectedCity
    );

    if (city) {
      const newCityData: Omit<WeatherData, 'id'> = {
        city: city.name,
        country: city.country,
        temperature: Math.round(Math.random() * 30 + 5), // Random temp 5-35°C
        humidity: Math.round(Math.random() * 40 + 40), // Random humidity 40-80%
        windSpeed: Math.round(Math.random() * 25 + 5), // Random wind 5-30 km/h
        condition: ['sunny', 'cloudy', 'partly-cloudy', 'rainy'][
          Math.floor(Math.random() * 4)
        ],
        icon: ['☀️', '☁️', '⛅', '🌧️'][Math.floor(Math.random() * 4)],
        lastUpdated: new Date().toISOString(),
      };

      onAddCity(newCityData);
      setSelectedCity('');
      setIsOpen(false);
    }
  };

  return (
    <div className='mb-6'>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium'
        >
          + Add City
        </button>
      ) : (
        <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Add New City
          </h3>
          <div className='flex flex-col sm:flex-row gap-3'>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>Select a city...</option>
              {predefinedCities.map(city => (
                <option
                  key={`${city.name}-${city.country}`}
                  value={`${city.name}, ${city.country}`}
                >
                  {city.name}, {city.country}
                </option>
              ))}
            </select>
            <div className='flex gap-2'>
              <button
                onClick={handleAddCity}
                disabled={!selectedCity}
                className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedCity('');
                }}
                className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
