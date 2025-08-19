import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the useWeatherData hook
vi.mock('../hooks/useWeatherData', () => ({
  useWeatherData: () => ({
    weatherData: [
      {
        id: 1,
        city: 'New York',
        country: 'USA',
        temperature: 22,
        humidity: 65,
        windSpeed: 15,
        condition: 'partly-cloudy',
        icon: '⛅',
        lastUpdated: '2023-12-01T14:30:00.000Z',
      },
    ],
    loading: false,
    error: null,
    refreshData: vi.fn(),
    addCity: vi.fn(),
    removeCity: vi.fn(),
  }),
}));

describe('App', () => {
  it('should render the weather dashboard', () => {
    render(<App />);

    expect(screen.getByText('🌤️ Weather Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText('Track weather conditions across multiple cities')
    ).toBeInTheDocument();
  });

  it('should display weather data', () => {
    render(<App />);

    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    // Check for the specific temperature in the weather card (not in stats)
    expect(
      screen.getByRole('heading', { name: 'New York' }).closest('.bg-white')
    ).toContainHTML('22°C');
  });

  it('should show add city button', () => {
    render(<App />);

    expect(screen.getByText('+ Add City')).toBeInTheDocument();
  });

  it('should display forecast section', () => {
    render(<App />);

    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
  });

  it('should display quick stats', () => {
    render(<App />);

    expect(screen.getByText('Quick Stats')).toBeInTheDocument();
    expect(screen.getByText('Cities Tracked:')).toBeInTheDocument();
    expect(screen.getByText('Avg Temperature:')).toBeInTheDocument();
  });

  it('should show temperature unit toggle', () => {
    render(<App />);

    expect(screen.getByText('Temperature:')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
  });

  it('should display footer information', () => {
    render(<App />);

    expect(
      screen.getByText(/Weather Dashboard - Perfect for DevOps Practice/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Built with React, TypeScript, Tailwind CSS, and Vitest/)
    ).toBeInTheDocument();
  });
});
