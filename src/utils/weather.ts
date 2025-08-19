import type { WeatherData } from '../types/weather';

export const formatTemperature = (
  temp: number,
  unit: 'C' | 'F' = 'C'
): string => {
  if (unit === 'F') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getWeatherIcon = (condition: string): string => {
  const iconMap: Record<string, string> = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    stormy: '⛈️',
    foggy: '🌫️',
    windy: '💨',
    'partly-cloudy': '⛅',
  };
  return iconMap[condition.toLowerCase()] || '🌤️';
};

export const calculateWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  // Normalize degrees to 0-360 range
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalizedDegrees / 45) % 8;
  return directions[index];
};

export const getTemperatureColor = (temp: number): string => {
  if (temp < 0) return 'text-blue-600';
  if (temp < 10) return 'text-blue-400';
  if (temp < 20) return 'text-green-500';
  if (temp < 30) return 'text-yellow-500';
  if (temp < 35) return 'text-orange-500';
  return 'text-red-500';
};

export const isExtremeWeather = (data: WeatherData): boolean => {
  return (
    data.temperature > 35 ||
    data.temperature < -10 ||
    data.windSpeed > 50 ||
    data.humidity > 90
  );
};
