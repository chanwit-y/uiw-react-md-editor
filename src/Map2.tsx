import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngBounds } from 'leaflet';

import './Map.css'

// Fix for default marker icons in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to fit map bounds to polygon
function FitBounds({ positions }: { positions: [number, number][] }) {
	const map = useMap();
	
	useEffect(() => {
		if (positions.length > 0) {
			const bounds = new LatLngBounds(positions);
			map.fitBounds(bounds, { padding: [50, 50] });
		}
	}, [map, positions]);
	
	return null;
}

export default function FertileCrescent() {
  // Coordinates outlining the Fertile Crescent polygon
  const fertileCrescentCoords: [number, number][] = [
    [37.0, 35.0],  // southeastern Turkey (start of the crescent)
    [36.6, 38.0],  // near Diyarbakır, Turkey
    [36.0, 42.0],  // northern Iraq
    [33.0, 44.0],  // Baghdad, Iraq
    [32.0, 47.0],  // southern Iraq
    [31.0, 46.0],  // Mesopotamia
    [30.0, 44.0],  // Lower Mesopotamia
    [31.0, 36.0],  // Jordan River valley
    [32.5, 35.5],  // Israel/West Bank
    [33.5, 35.5],  // Lebanon
    [35.0, 36.8],  // northwest Syria
    [36.5, 37.0],  // southern Turkey (return to starting area)
    [37.0, 35.0]
  ];

  // Calculate center point for initial map view
  const center: [number, number] = [33.5, 40.0];

  return (
    <div className="map-demo-container">
      <div className="map-header">
        <h1>The Fertile Crescent</h1>
        <p>Click on the polygon to see more information</p>
      </div>
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        zoomControl={true}
        doubleClickZoom={true}
        dragging={true}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FitBounds positions={fertileCrescentCoords} />
        <Polygon
          positions={fertileCrescentCoords}
          pathOptions={{
            color: '#2d5016',
            fillColor: '#4a7c2a',
            fillOpacity: 0.5,
            weight: 3,
            opacity: 0.8
          }}
        >
          <Popup>
            <div className="map-popup">
              <h3>The Fertile Crescent</h3>
              <p>
                The cradle of civilization, where agriculture and early human
                settlements first flourished around 10,000 BCE.
              </p>
            </div>
          </Popup>
        </Polygon>
      </MapContainer>
      <div className="map-footer">
        <p>Powered by React Leaflet & OpenStreetMap</p>
      </div>
    </div>
  );
}