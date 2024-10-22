import React, { useState, useEffect } from 'react';
import { AlertCircle, Globe, Shield, Zap, RefreshCw } from 'lucide-react';

interface GeoCoordinate {
  lat: number;
  lon: number;
}

interface InfoStream {
  id: string;
  type: 'alert' | 'global' | 'vulnerability' | 'threat';
  title: string;
  description: string;
  timestamp: string;
  origin: GeoCoordinate;
  target: GeoCoordinate;
}

const InfoStreams: React.FC = () => {
  const [streams, setStreams] = useState<InfoStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = () => {
    setLoading(true);
    // Simulating an API call with setTimeout
    setTimeout(() => {
      const mockStreams: InfoStream[] = [
        {
          id: '1',
          type: 'alert',
          title: 'Potential Cyber Attack on Texas Power Grid',
          description: 'Suspicious activity detected targeting power infrastructure in Texas.',
          timestamp: '2023-06-15T10:30:00Z',
          origin: { lat: 35.6892, lon: 51.3890 }, // Tehran, Iran
          target: { lat: 31.9686, lon: -99.9018 }, // Texas, USA
        },
        {
          id: '2',
          type: 'global',
          title: 'DDoS Campaign Against New York Financial District',
          description: 'Large-scale DDoS attack originating from Russia, targeting NY financial institutions.',
          timestamp: '2023-06-15T09:45:00Z',
          origin: { lat: 55.7558, lon: 37.6173 }, // Moscow, Russia
          target: { lat: 40.7128, lon: -74.0060 }, // New York, USA
        },
        {
          id: '3',
          type: 'vulnerability',
          title: 'Critical Infrastructure Exploit Attempt in Miami',
          description: 'Exploit targeting water treatment facilities in Miami area detected.',
          timestamp: '2023-06-15T08:15:00Z',
          origin: { lat: 39.9042, lon: 116.4074 }, // Beijing, China
          target: { lat: 25.7617, lon: -80.1918 }, // Miami, USA
        },
        {
          id: '4',
          type: 'threat',
          title: 'Phishing Campaign Targeting Washington DC Government',
          description: 'Sophisticated phishing emails targeting DC government employees observed.',
          timestamp: '2023-06-14T23:50:00Z',
          origin: { lat: 55.7558, lon: 37.6173 }, // Moscow, Russia
          target: { lat: 38.9072, lon: -77.0369 }, // Washington DC, USA
        },
        {
          id: '5',
          type: 'alert',
          title: 'Potential Data Exfiltration from NY Power Company',
          description: 'Unusual outbound traffic detected from NY power company servers.',
          timestamp: '2023-06-14T22:30:00Z',
          origin: { lat: 39.9042, lon: 116.4074 }, // Beijing, China
          target: { lat: 40.7128, lon: -74.0060 }, // New York, USA
        }
      ];
      setStreams(mockStreams);
      setLoading(false);
    }, 1000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'global':
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'vulnerability':
        return <Shield className="w-4 h-4 text-yellow-500" />;
      case 'threat':
        return <Zap className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Information Streams</h1>
          <button 
            onClick={fetchStreams} 
            className="flex items-center px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors duration-200"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Refresh
          </button>
        </div>
        
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">Loading streams...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {streams.map((stream) => (
              <div key={stream.id} className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
                <div className="flex items-center mb-1">
                  {getIcon(stream.type)}
                  <h2 className="ml-2 text-sm font-semibold text-gray-800 dark:text-white">{stream.title}</h2>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{stream.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(stream.timestamp).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Origin: {stream.origin.lat.toFixed(2)}, {stream.origin.lon.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Target: {stream.target.lat.toFixed(2)}, {stream.target.lon.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoStreams;