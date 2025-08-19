import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WeatherCard } from '../components/WeatherCard';
import type { WeatherData } from '../types/weather';

const mockWeatherData: WeatherData = {
  id: 1,
  city: 'New York',
  country: 'USA',
  temperature: 22,
  humidity: 65,
  windSpeed: 15,
  condition: 'partly-cloudy',
  icon: '⛅',
  lastUpdated: '2023-12-01T14:30:00.000Z',
};

describe('WeatherCard', () => {
  it('should render weather data correctly', () => {
    render(<WeatherCard data={mockWeatherData} />);

    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('15 km/h')).toBeInTheDocument();
    expect(screen.getByText('partly cloudy')).toBeInTheDocument();
    expect(screen.getByText('⛅')).toBeInTheDocument();
  });

  it('should show remove button when showRemoveButton is true', () => {
    const onRemove = vi.fn();
    render(
      <WeatherCard
        data={mockWeatherData}
        onRemove={onRemove}
        showRemoveButton={true}
      />
    );

    const removeButton = screen.getByRole('button', {
      name: /remove new york/i,
    });
    expect(removeButton).toBeInTheDocument();
  });

  it('should not show remove button when showRemoveButton is false', () => {
    const onRemove = vi.fn();
    render(
      <WeatherCard
        data={mockWeatherData}
        onRemove={onRemove}
        showRemoveButton={false}
      />
    );

    const removeButton = screen.queryByRole('button', {
      name: /remove new york/i,
    });
    expect(removeButton).not.toBeInTheDocument();
  });

  it('should call onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    render(
      <WeatherCard
        data={mockWeatherData}
        onRemove={onRemove}
        showRemoveButton={true}
      />
    );

    const removeButton = screen.getByRole('button', {
      name: /remove new york/i,
    });
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it('should apply correct temperature color class', () => {
    const hotWeatherData = { ...mockWeatherData, temperature: 32 };
    render(<WeatherCard data={hotWeatherData} />);

    const temperatureElement = screen.getByText('32°C');
    expect(temperatureElement).toHaveClass('text-orange-500');
  });

  it('should format condition text properly', () => {
    const weatherWithHyphenatedCondition = {
      ...mockWeatherData,
      condition: 'partly-cloudy',
    };
    render(<WeatherCard data={weatherWithHyphenatedCondition} />);

    expect(screen.getByText('partly cloudy')).toBeInTheDocument();
  });

  it('should display last updated time', () => {
    render(<WeatherCard data={mockWeatherData} />);

    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const onRemove = vi.fn();
    render(
      <WeatherCard
        data={mockWeatherData}
        onRemove={onRemove}
        showRemoveButton={true}
      />
    );

    const removeButton = screen.getByRole('button', {
      name: /remove new york/i,
    });
    expect(removeButton).toHaveAttribute('aria-label', 'Remove New York');
  });
});
