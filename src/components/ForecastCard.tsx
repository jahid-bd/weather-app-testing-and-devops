import type { ForecastDay } from '../types/weather';
import { formatTemperature, formatDate } from '../utils/weather';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4'>
        5-Day Forecast
      </h3>
      <div className='space-y-3'>
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className={`flex items-center justify-between p-3 rounded-md ${
              index === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className='flex items-center'>
              <span className='text-2xl mr-3'>{day.icon}</span>
              <div>
                <p className='font-medium text-gray-800'>
                  {index === 0 ? 'Today' : formatDate(day.date)}
                </p>
                <p className='text-sm text-gray-600 capitalize'>
                  {day.condition.replace('-', ' ')}
                </p>
              </div>
            </div>
            <div className='text-right'>
              <div className='flex items-center space-x-2'>
                <span className='font-semibold text-gray-800'>
                  {formatTemperature(day.high)}
                </span>
                <span className='text-gray-500'>
                  {formatTemperature(day.low)}
                </span>
              </div>
              {day.precipitation > 0 && (
                <p className='text-xs text-blue-600'>💧 {day.precipitation}%</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
