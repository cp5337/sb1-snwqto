import React, { useState, useEffect } from 'react';
import Map, { NavigationControl, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AnimatedInfoStreams from './AnimatedInfoStreams';
import TopAPTs from './TopAPTs';
import { Layers } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapViewProps {
  selectedSectors: string[];
}

const MapView: React.FC<MapViewProps> = ({ selectedSectors }) => {
  const [viewState, setViewState] = useState({
    latitude: 30,
    longitude: 0,
    zoom: 1.5,
    bearing: 0,
    pitch: 0
  });
  const [isSatellite, setIsSatellite] = useState(false);

  useEffect(() => {
    setViewState({
      latitude: 30,
      longitude: 0,
      zoom: 1.5,
      bearing: 0,
      pitch: 0
    });
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-full w-full bg-gray-800 flex items-center justify-center text-white">
        <p>Mapbox token is not set. Please add VITE_MAPBOX_TOKEN to your environment variables.</p>
      </div>
    );
  }

  const toggleSatellite = () => {
    setIsSatellite(!isSatellite);
  };

  return (
    <div className="h-full w-full bg-gray-800 relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100%'}}
        mapStyle={isSatellite ? "mapbox://styles/mapbox/satellite-v9" : "mapbox://styles/mapbox/dark-v10"}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />
        <AnimatedInfoStreams />
        <TopAPTs />
      </Map>
      <div className="absolute bottom-8 left-8 bg-gray-800 bg-opacity-75 p-2 rounded-lg">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full border border-white mr-2"></div>
          <span className="text-white text-xs">Virtual Ravens</span>
        </div>
        <div className="flex items-center mt-1">
          <div className="w-3 h-3 bg-red-500 rounded-full border border-white mr-2"></div>
          <span className="text-white text-xs">Top APTs</span>
        </div>
      </div>
      <button
        onClick={toggleSatellite}
        className="absolute top-2 left-2 bg-white bg-opacity-75 p-1 rounded-md shadow-md"
        style={{ zIndex: 1000 }}
      >
        <Layers size={16} className={isSatellite ? "text-blue-500" : "text-gray-500"} />
      </button>
    </div>
  );
};

export default MapView;