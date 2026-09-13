import React from 'react';

const LoadingSpinner = ({ fullScreen = false, message = 'Loading...' }) => {
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-10 h-10 border-4 border-theme-primary-light border-t-theme-primary rounded-full animate-spin"></div>
      {message && <p className="mt-3 text-sm font-medium text-gray-600">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-theme-app/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;