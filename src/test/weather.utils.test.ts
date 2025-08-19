import { describe, it, expect } from 'vitest';
import {
  formatTemperature,
  formatTime,
  formatDate,
  getWeatherIcon,
  calculateWindDirection,
  getTemperatureColor,
  isExtremeWeather,
} from '../utils/weather';
import type { WeatherData } from '../types/weather';

describe('Weather Utils', () => {
  describe('formatTemperature', () => {
    it('should format temperature in Celsius by default', () => {
      expect(formatTemperature(25)).toBe('25°C');
      expect(formatTemperature(0)).toBe('0°C');
      expect(formatTemperature(-5)).toBe('-5°C');
    });

    it('should format temperature in Fahrenheit when specified', () => {
      expect(formatTemperature(0, 'F')).toBe('32°F');
      expect(formatTemperature(25, 'F')).toBe('77°F');
      expect(formatTemperature(-10, 'F')).toBe('14°F');
    });

    it('should round temperatures to nearest integer', () => {
      expect(formatTemperature(25.7)).toBe('26°C');
      expect(formatTemperature(25.3)).toBe('25°C');
    });
  });

  describe('formatTime', () => {
    it('should format time in 12-hour format', () => {
      const dateString = '2023-12-01T14:30:00.000Z';
      const result = formatTime(dateString);
      expect(result).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });
  });

  describe('formatDate', () => {
    it('should format date with weekday, month and day', () => {
      const dateString = '2023-12-01T14:30:00.000Z';
      const result = formatDate(dateString);
      expect(result).toMatch(/\w{3}, \w{3} \d{1,2}/);
    });
  });

  describe('getWeatherIcon', () => {
    it('should return correct icons for weather conditions', () => {
      expect(getWeatherIcon('sunny')).toBe('☀️');
      expect(getWeatherIcon('cloudy')).toBe('☁️');
      expect(getWeatherIcon('rainy')).toBe('🌧️');
      expect(getWeatherIcon('snowy')).toBe('❄️');
      expect(getWeatherIcon('partly-cloudy')).toBe('⛅');
    });

    it('should return default icon for unknown conditions', () => {
      expect(getWeatherIcon('unknown')).toBe('🌤️');
      expect(getWeatherIcon('')).toBe('🌤️');
    });

    it('should be case insensitive', () => {
      expect(getWeatherIcon('SUNNY')).toBe('☀️');
      expect(getWeatherIcon('Cloudy')).toBe('☁️');
    });
  });

  describe('calculateWindDirection', () => {
    it('should return correct wind directions', () => {
      expect(calculateWindDirection(0)).toBe('N');
      expect(calculateWindDirection(45)).toBe('NE');
      expect(calculateWindDirection(90)).toBe('E');
      expect(calculateWindDirection(180)).toBe('S');
      expect(calculateWindDirection(270)).toBe('W');
      expect(calculateWindDirection(360)).toBe('N');
    });

    it('should handle degrees outside 0-360 range', () => {
      expect(calculateWindDirection(405)).toBe('NE'); // 405 % 360 = 45
      expect(calculateWindDirection(-45)).toBe('NW'); // Handles negative
    });
  });

  describe('getTemperatureColor', () => {
    it('should return correct color classes for different temperatures', () => {
      expect(getTemperatureColor(-15)).toBe('text-blue-600');
      expect(getTemperatureColor(5)).toBe('text-blue-400');
      expect(getTemperatureColor(15)).toBe('text-green-500');
      expect(getTemperatureColor(25)).toBe('text-yellow-500');
      expect(getTemperatureColor(32)).toBe('text-orange-500');
      expect(getTemperatureColor(40)).toBe('text-red-500');
    });
  });

  describe('isExtremeWeather', () => {
    it('should detect extreme high temperature', () => {
      const extremeHot: WeatherData = {
        id: 1,
        city: 'Test',
        country: 'Test',
        temperature: 40,
        humidity: 50,
        windSpeed: 10,
        condition: 'sunny',
        icon: '☀️',
        lastUpdated: '2023-12-01T14:30:00.000Z',
      };
      expect(isExtremeWeather(extremeHot)).toBe(true);
    });

    it('should detect extreme low temperature', () => {
      const extremeCold: WeatherData = {
        id: 1,
        city: 'Test',
        country: 'Test',
        temperature: -15,
        humidity: 50,
        windSpeed: 10,
        condition: 'snowy',
        icon: '❄️',
        lastUpdated: '2023-12-01T14:30:00.000Z',
      };
      expect(isExtremeWeather(extremeCold)).toBe(true);
    });

    it('should detect extreme wind speed', () => {
      const extremeWind: WeatherData = {
        id: 1,
        city: 'Test',
        country: 'Test',
        temperature: 20,
        humidity: 50,
        windSpeed: 60,
        condition: 'windy',
        icon: '💨',
        lastUpdated: '2023-12-01T14:30:00.000Z',
      };
      expect(isExtremeWeather(extremeWind)).toBe(true);
    });

    it('should detect extreme humidity', () => {
      const extremeHumidity: WeatherData = {
        id: 1,
        city: 'Test',
        country: 'Test',
        temperature: 20,
        humidity: 95,
        windSpeed: 10,
        condition: 'foggy',
        icon: '🌫️',
        lastUpdated: '2023-12-01T14:30:00.000Z',
      };
      expect(isExtremeWeather(extremeHumidity)).toBe(true);
    });

    it('should return false for normal weather conditions', () => {
      const normalWeather: WeatherData = {
        id: 1,
        city: 'Test',
        country: 'Test',
        temperature: 22,
        humidity: 65,
        windSpeed: 15,
        condition: 'partly-cloudy',
        icon: '⛅',
        lastUpdated: '2023-12-01T14:30:00.000Z',
      };
      expect(isExtremeWeather(normalWeather)).toBe(false);
    });
  });
});
