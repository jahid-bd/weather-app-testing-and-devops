import type { WeatherData, ForecastDay, WeatherAlert } from '../types/weather';

export const mockWeatherData: WeatherData[] = [
  {
    id: 1,
    city: 'New York',
    country: 'USA',
    temperature: 22,
    humidity: 65,
    windSpeed: 15,
    condition: 'partly-cloudy',
    icon: '⛅',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 2,
    city: 'London',
    country: 'UK',
    temperature: 18,
    humidity: 78,
    windSpeed: 12,
    condition: 'cloudy',
    icon: '☁️',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 3,
    city: 'Tokyo',
    country: 'Japan',
    temperature: 28,
    humidity: 55,
    windSpeed: 8,
    condition: 'sunny',
    icon: '☀️',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 4,
    city: 'Sydney',
    country: 'Australia',
    temperature: 25,
    humidity: 60,
    windSpeed: 20,
    condition: 'windy',
    icon: '💨',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 5,
    city: 'Dubai',
    country: 'UAE',
    temperature: 38,
    humidity: 45,
    windSpeed: 10,
    condition: 'sunny',
    icon: '☀️',
    lastUpdated: new Date().toISOString(),
  },
];

export const mockForecastData: ForecastDay[] = [
  {
    date: new Date().toISOString(),
    high: 25,
    low: 18,
    condition: 'sunny',
    icon: '☀️',
    precipitation: 0,
  },
  {
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    high: 23,
    low: 16,
    condition: 'partly-cloudy',
    icon: '⛅',
    precipitation: 10,
  },
  {
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    high: 20,
    low: 14,
    condition: 'rainy',
    icon: '🌧️',
    precipitation: 75,
  },
  {
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    high: 22,
    low: 15,
    condition: 'cloudy',
    icon: '☁️',
    precipitation: 20,
  },
  {
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    high: 26,
    low: 19,
    condition: 'sunny',
    icon: '☀️',
    precipitation: 5,
  },
];

export const mockWeatherAlerts: WeatherAlert[] = [
  {
    id: 'alert-1',
    type: 'warning',
    title: 'Heat Wave Warning',
    description:
      'Extremely high temperatures expected. Stay hydrated and avoid prolonged sun exposure.',
    severity: 'high',
    isActive: true,
  },
  {
    id: 'alert-2',
    type: 'watch',
    title: 'Storm Watch',
    description:
      'Severe thunderstorms possible this evening. Monitor weather conditions.',
    severity: 'medium',
    isActive: false,
  },
];
