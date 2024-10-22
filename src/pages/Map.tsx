import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-lg shadow transition-colors duration-200 h-full flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Map</h1>
        <p className="text-lg">
          This is the Map page. Here you can view geographical representations of threats, assets, and other relevant data.
        </p>
        {/* Add your map component or visualization here */}
      </div>
    </div>
  );
};

export default Map;