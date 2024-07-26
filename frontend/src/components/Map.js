import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const position = [-16.39, -71.54]; // Coordenadas iniciales del mapa

  return (
    <MapContainer center={position} zoom={13} style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Un marcador en el mapa.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
