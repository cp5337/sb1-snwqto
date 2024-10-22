/**
 * GeospatialDataManager.tsx
 * Component for managing and visualizing geospatial data using GeoJSON
 * Author: Charlie Payne
 * Date: June 15, 2023
 * 
 * This component provides an interface for managing geospatial data in CTAS,
 * including data import, export, and visualization capabilities using GeoJSON format.
 * 
 * MVP:
 * - Basic GeoJSON data visualization
 * - Simple data import/export functionality
 * 
 * IOC:
 * - Integration with PostgreSQL/PostGIS for efficient geospatial queries
 * - Basic spatial analysis tools
 * 
 * Production:
 * - Advanced geospatial analytics and machine learning integration
 * - Real-time geospatial data processing and visualization
 * - Integration with external GIS services and data sources
 */

import React, { useState, useEffect } from 'react';
import { Globe, Upload, Download, Search } from 'lucide-react';
import { queryGeospatialData } from '../utils/postgresDriver';
import MapGL, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
  properties: {
    [key: string]: any;
  };
}

interface GeoJSONData {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

const GeospatialDataManager: React.FC = () => {
  const [geoJSONData, setGeoJSONData] = useState<GeoJSONData | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1
  });

  useEffect(() => {
    fetchGeospatialData();
  }, []);

  const fetchGeospatialData = async () => {
    try {
      const data = await queryGeospatialData('SELECT ST_AsGeoJSON(geom) as geojson FROM geospatial_data LIMIT 10');
      const features = data.map(row => JSON.parse(row.geojson));
      setGeoJSONData({
        type: 'FeatureCollection',
        features: features
      });
    } catch (error) {
      console.error('Error fetching geospatial data:', error);
    }
  };

  const importData = () => {
    // Implement GeoJSON data import functionality
    console.log('Importing GeoJSON data...');
  };

  const exportData = () => {
    // Implement GeoJSON data export functionality
    console.log('Exporting GeoJSON data...');
    if (geoJSONData) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoJSONData));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "geospatial_data.geojson");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Globe className="mr-2" size={24} />
        Geospatial Data Manager
      </h2>

      <div className="flex space-x-4 mb-4">
        <button onClick={importData} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Upload size={16} className="mr-2" />
          Import GeoJSON
        </button>
        <button onClick={exportData} className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <Download size={16} className="mr-2" />
          Export GeoJSON
        </button>
      </div>

      <div className="mb-4 h-96">
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {geoJSONData && (
            <Source type="geojson" data={geoJSONData}>
              <Layer
                id="data"
                type="fill"
                paint={{
                  'fill-color': '#088',
                  'fill-opacity': 0.8
                }}
              />
            </Source>
          )}
        </MapGL>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">GeoJSON Data Preview</h3>
        <pre className="bg-gray-800 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(geoJSONData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default GeospatialDataManager;