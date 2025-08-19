export interface WeatherData {
  id: number;
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  lastUpdated: string;
}

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
}

export interface WeatherForecast {
  city: string;
  forecast: ForecastDay[];
}

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  isActive: boolean;
}
