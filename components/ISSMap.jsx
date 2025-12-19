'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Icon with a Glow Effect
const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [65, 65], // Bigger
  iconAnchor: [32, 32],
  popupAnchor: [0, -32],
  // Tailwind class won't work inside Leaflet object properties directly in all versions,
  // but we can target the leaflet-marker-icon class in CSS or accept the SVG's native look.
  // Alternatively, we use a class for the divIcon if we were using that.
  // For standard Icon, we rely on the SVG brightness.
});

const MapController = ({ center, autoCenter }) => {
  const map = useMap();
  useEffect(() => {
    if (autoCenter && center) {
      map.flyTo(center, map.getZoom(), { 
        duration: 2,
        easeLinearity: 0.5 
      });
    }
  }, [center, autoCenter, map]);
  return null;
};

const ISSMap = ({ lat, lng, pathHistory, autoCenter, setAutoCenter, visibility }) => {
  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={[lat, lng]} 
        zoom={3} 
        minZoom={2}
        scrollWheelZoom={true} 
        className="w-full h-full z-0"
        style={{ background: '#000' }} // Pure black background for loading gaps
      >
        {/* LAYER 1: Realistic Satellite View */}
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* LAYER 2: Borders and Labels Overlay (Transparent) */}
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.png"
          opacity={0.3} // Subtle borders
        />
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
          opacity={0.7} // Readable labels
        />
        
        {/* Note: If Stamen tiles (above) fail due to API changes, use Carto Dark Reference: */}
        {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" /> */}

        <Marker position={[lat, lng]} icon={issIcon}>
          <Popup className="glass-popup">
            <div className="text-center min-w-[120px]">
              <h3 className="font-bold text-gray-800 border-b pb-1 mb-1">ISS LIVE</h3>
              <div className="text-xs font-mono">
                Lat: {lat.toFixed(2)} <br/>
                Lng: {lng.toFixed(2)}
              </div>
              <span className={`block mt-2 text-xs font-bold uppercase ${visibility === 'daylight' ? 'text-green-600' : 'text-blue-800'}`}>
                {visibility}
              </span>
            </div>
          </Popup>
        </Marker>

        {/* Brighter, glowing orbit line */}
        <Polyline 
            positions={pathHistory} 
            pathOptions={{ 
                color: '#d946ef', // Fuchsia-500 (Bright Purple/Pink)
                weight: 4, 
                opacity: 0.8,
                lineCap: 'round',
                lineJoin: 'round',
                dashArray: '1, 6', // Dotted "digital" look
            }} 
        />
        
        <MapController center={[lat, lng]} autoCenter={autoCenter} />
      </MapContainer>

      {/* Floating Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <button 
            onClick={() => setAutoCenter(!autoCenter)}
            className={`
                px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 backdrop-blur-md border 
                ${autoCenter 
                    ? 'bg-green-500/80 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                    : 'bg-black/40 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/50'
                }
            `}
        >
            {autoCenter ? 'TARGET LOCKED' : 'FREE ROAM'}
        </button>
      </div>
    </div>
  );
};

export default ISSMap;