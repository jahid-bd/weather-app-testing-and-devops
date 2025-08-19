import type { WeatherData } from '../types/weather';
import {
  formatTemperature,
  formatTime,
  getTemperatureColor,
} from '../utils/weather';

interface WeatherCardProps {
  data: WeatherData;
  onRemove?: (id: number) => void;
  showRemoveButton?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  onRemove,
  showRemoveButton = false,
}) => {
  const temperatureColor = getTemperatureColor(data.temperature);

  return (
    <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='text-xl font-semibold text-gray-800'>{data.city}</h3>
          <p className='text-sm text-gray-600'>{data.country}</p>
        </div>
        {showRemoveButton && onRemove && (
          <button
            onClick={() => onRemove(data.id)}
            className='text-red-500 hover:text-red-700 transition-colors'
            aria-label={`Remove ${data.city}`}
          >
            ✕
          </button>
        )}
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <span className='text-4xl mr-3'>{data.icon}</span>
          <div>
            <p className={`text-3xl font-bold ${temperatureColor}`}>
              {formatTemperature(data.temperature)}
            </p>
            <p className='text-sm text-gray-600 capitalize'>
              {data.condition.replace('-', ' ')}
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Humidity:</span>
          <span className='font-medium'>{data.humidity}%</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Wind:</span>
          <span className='font-medium'>{data.windSpeed} km/h</span>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-gray-200'>
        <p className='text-xs text-gray-500'>
          Last updated: {formatTime(data.lastUpdated)}
        </p>
      </div>
    </div>
  );
};
