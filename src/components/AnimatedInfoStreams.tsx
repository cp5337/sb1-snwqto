import React, { useState, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import { AlertCircle, Globe, Shield, Zap } from 'lucide-react';

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

interface VRavenInstance {
  id: string;
  name: string;
  location: GeoCoordinate;
}

const AnimatedInfoStreams: React.FC = () => {
  const [streams, setStreams] = useState<InfoStream[]>([]);
  const [vRavenInstances] = useState<VRavenInstance[]>([
    { id: 'vr1', name: 'vRaven-Energy-1', location: { lat: 31.9686, lon: -99.9018 } },
    { id: 'vr2', name: 'vRaven-TexasGrid-1', location: { lat: 30.2672, lon: -97.7431 } },
    { id: 'vr3', name: 'vRaven-NYPD-1', location: { lat: 40.7128, lon: -74.0060 } },
    { id: 'vr4', name: 'vRaven-LAPD-ECrimes-1', location: { lat: 34.0522, lon: -118.2437 } },
  ]);

  useEffect(() => {
    const mockStreams: InfoStream[] = [
      {
        id: '1',
        type: 'alert',
        title: 'Potential Cyber Attack on Texas Power Grid',
        description: 'Suspicious activity detected targeting power infrastructure in Texas.',
        timestamp: '2023-06-15T10:30:00Z',
        origin: { lat: 35.6892, lon: 51.3890 },
        target: { lat: 31.9686, lon: -99.9018 },
      },
      {
        id: '2',
        type: 'global',
        title: 'DDoS Campaign Against New York Financial District',
        description: 'Large-scale DDoS attack originating from Russia, targeting NY financial institutions.',
        timestamp: '2023-06-15T09:45:00Z',
        origin: { lat: 55.7558, lon: 37.6173 },
        target: { lat: 40.7128, lon: -74.0060 },
      },
      {
        id: '3',
        type: 'vulnerability',
        title: 'Critical Infrastructure Exploit Attempt in Miami',
        description: 'Exploit targeting water treatment facilities in Miami area detected.',
        timestamp: '2023-06-15T08:15:00Z',
        origin: { lat: 39.9042, lon: 116.4074 },
        target: { lat: 25.7617, lon: -80.1918 },
      },
    ];
    setStreams(mockStreams);
  }, []);

  const getStreamIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertCircle size={16} />;
      case 'global': return <Globe size={16} />;
      case 'vulnerability': return <Shield size={16} />;
      case 'threat': return <Zap size={16} />;
      default: return null;
    }
  };

  return (
    <>
      {streams.map((stream) => (
        <Marker key={stream.id} longitude={stream.origin.lon} latitude={stream.origin.lat} anchor="bottom">
          <div className="text-red-500">
            {getStreamIcon(stream.type)}
          </div>
        </Marker>
      ))}
      {vRavenInstances.map((vRaven) => (
        <Marker 
          key={vRaven.id} 
          longitude={vRaven.location.lon} 
          latitude={vRaven.location.lat}
          anchor="bottom"
        >
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center transform -translate-y-1">
            <span className="text-white text-xxs font-bold">v</span>
          </div>
        </Marker>
      ))}
    </>
  );
};

export default AnimatedInfoStreams;