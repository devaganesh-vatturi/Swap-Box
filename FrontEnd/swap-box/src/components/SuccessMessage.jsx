import React from 'react';

const SuccessMessage = ({ message = 'Operation completed successfully.' }) => {
  return (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
      <span className="text-base">✓</span>
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;