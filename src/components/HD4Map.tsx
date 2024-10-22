import React, { useState, useRef, useEffect } from 'react';
import Map, { Marker, Source, Layer, Popup } from 'react-map-gl';
import type { LineLayer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface HD4MapProps {
  hd4Action: 'Hunt' | 'Detect' | 'Disable' | 'Disrupt' | 'Dominate';
}

interface Location {
  name: string;
  lat: number;
  lon: number;
  color: string;
  description: string;
}

const HD4Map: React.FC<HD4MapProps> = ({ hd4Action }) => {
  const [viewState, setViewState] = useState({
    latitude: 31.9686,
    longitude: -99.9018,
    zoom: 2
  });
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-full bg-gray-800 p-2 rounded flex items-center justify-center text-white">
        <p>Mapbox token is not set. Please add VITE_MAPBOX_TOKEN to your environment variables.</p>
      </div>
    );
  }

  return (
    <div ref={mapRef} className="h-full bg-gray-800 p-2 rounded relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Add your map content here */}
      </Map>
      <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded shadow">
        <h3 className="text-sm font-bold mb-1">{hd4Action} View</h3>
        <p className="text-xs">Showing threat vectors and targets</p>
      </div>
    </div>
  );
};

export default HD4Map;