import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface ShodanProps {
  selectedSectors?: string[];
}

const Shodan: React.FC<ShodanProps> = ({ selectedSectors = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    // Generate a search query based on selected sectors
    const sectorQueries = selectedSectors.map(sector => {
      switch (sector) {
        case 'energy':
          return 'port:502 country:US';
        case 'financial':
          return 'ssl:bank country:US';
        case 'healthcare':
          return 'ssl:hospital country:US';
        // Add more sector-specific queries here
        default:
          return '';
      }
    });

    setSearchQuery(sectorQueries.join(' OR '));
  }, [selectedSectors]);

  const handleSearch = () => {
    // In a real application, you would make an API call to Shodan here
    console.log('Searching Shodan for:', searchQuery);
    // For now, we'll just set some dummy results
    setResults([
      { ip: '192.168.1.1', port: 80, org: 'Example Org 1' },
      { ip: '10.0.0.1', port: 443, org: 'Example Org 2' },
    ]);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Shodan Search</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border rounded-l dark:bg-gray-700 dark:text-white"
          placeholder="Enter Shodan search query"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors duration-200"
        >
          <Search size={20} />
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Selected Sectors:</h2>
        <div className="flex flex-wrap gap-2">
          {selectedSectors.map(sector => (
            <span key={sector} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {sector}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Results:</h2>
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <p className="text-gray-800 dark:text-white">IP: {result.ip}</p>
              <p className="text-gray-600 dark:text-gray-300">Port: {result.port}</p>
              <p className="text-gray-600 dark:text-gray-300">Organization: {result.org}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shodan;