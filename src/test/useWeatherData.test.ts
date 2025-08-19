import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWeatherData } from '../hooks/useWeatherData';
import type { WeatherData } from '../types/weather';

// Mock the mockWeatherData
vi.mock('../data/mockWeather', () => ({
  mockWeatherData: [
    {
      id: 1,
      city: 'Test City',
      country: 'Test Country',
      temperature: 20,
      humidity: 60,
      windSpeed: 10,
      condition: 'sunny',
      icon: '☀️',
      lastUpdated: '2023-12-01T14:30:00.000Z',
    },
  ],
}));

describe('useWeatherData', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useWeatherData());

    expect(result.current.loading).toBe(true);
    expect(result.current.weatherData).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('should add a new city', () => {
    const { result } = renderHook(() => useWeatherData());

    const newCity: Omit<WeatherData, 'id'> = {
      city: 'New City',
      country: 'New Country',
      temperature: 25,
      humidity: 70,
      windSpeed: 12,
      condition: 'cloudy',
      icon: '☁️',
      lastUpdated: new Date().toISOString(),
    };

    act(() => {
      result.current.addCity(newCity);
    });

    expect(
      result.current.weatherData.some(city => city.city === 'New City')
    ).toBe(true);
    expect(
      result.current.weatherData.find(city => city.city === 'New City')?.id
    ).toBeDefined();
  });

  it('should remove a city', () => {
    const { result } = renderHook(() => useWeatherData());

    const newCity: Omit<WeatherData, 'id'> = {
      city: 'Test City',
      country: 'Test Country',
      temperature: 25,
      humidity: 70,
      windSpeed: 12,
      condition: 'cloudy',
      icon: '☁️',
      lastUpdated: new Date().toISOString(),
    };

    act(() => {
      result.current.addCity(newCity);
    });

    const addedCity = result.current.weatherData.find(
      city => city.city === 'Test City'
    );
    expect(addedCity).toBeDefined();

    act(() => {
      result.current.removeCity(addedCity!.id);
    });

    expect(
      result.current.weatherData.find(city => city.id === addedCity!.id)
    ).toBeUndefined();
  });

  it('should assign unique IDs to new cities', () => {
    const { result } = renderHook(() => useWeatherData());

    const newCity1: Omit<WeatherData, 'id'> = {
      city: 'City 1',
      country: 'Country 1',
      temperature: 25,
      humidity: 70,
      windSpeed: 12,
      condition: 'cloudy',
      icon: '☁️',
      lastUpdated: new Date().toISOString(),
    };

    const newCity2: Omit<WeatherData, 'id'> = {
      city: 'City 2',
      country: 'Country 2',
      temperature: 30,
      humidity: 65,
      windSpeed: 15,
      condition: 'sunny',
      icon: '☀️',
      lastUpdated: new Date().toISOString(),
    };

    act(() => {
      result.current.addCity(newCity1);
    });

    // Small delay to ensure different timestamps
    vi.advanceTimersByTime(1);

    act(() => {
      result.current.addCity(newCity2);
    });

    const cities = result.current.weatherData.filter(
      city => city.city === 'City 1' || city.city === 'City 2'
    );

    expect(cities).toHaveLength(2);
    expect(cities[0].id).not.toBe(cities[1].id);
  });
});
