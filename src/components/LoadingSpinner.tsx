interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div className='animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-center'>
      <div className='text-red-600 mb-2'>
        <span className='text-2xl'>⚠️</span>
      </div>
      <p className='text-red-800 mb-3'>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'
        >
          Try Again
        </button>
      )}
    </div>
  );
};
