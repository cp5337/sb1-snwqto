import React from 'react';

const GraphDisplay: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-lg shadow transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4">Graph Display</h2>
      <p>This is where the graph visualization will be displayed.</p>
      {/* Add your graph visualization component here */}
    </div>
  );
};

export default GraphDisplay;