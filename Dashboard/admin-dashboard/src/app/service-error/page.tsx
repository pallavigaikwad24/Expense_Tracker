import React from 'react';

const ServiceNotAvailable: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Service Not Available
        </h2>
        <p className="text-gray-600">
         Service is currently unavailable. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default ServiceNotAvailable;