import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import '../node_modules/leaflet/dist/leaflet.css';
import { getOverview } from './services/api';
import trafficLightIconUrl from './icons/semaforo.png';
import trafficLightRedIconUrl from './icons/semaforo_rojo.png';
import trafficLightAmberIconUrl from './icons/semaforo_ambar.png';
import trafficLightGreenIconUrl from './icons/semaforo_verde.png';
import trafficLightVideoUrl from './icons/avenida.mp4';
import './App.css';

const trafficLightIcons = {
    base: L.icon({
        iconUrl: trafficLightIconUrl,
        iconSize: [45, 45],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    red: L.icon({
        iconUrl: trafficLightRedIconUrl,
        iconSize: [45, 45],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    amber: L.icon({
        iconUrl: trafficLightAmberIconUrl,
        iconSize: [45, 45],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    green: L.icon({
        iconUrl: trafficLightGreenIconUrl,
        iconSize: [45, 45],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
};

function App() {
    const [data, setData] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isPlacing, setIsPlacing] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markerColors, setMarkerColors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOverview();
            setData(result);
        };

        fetchData();
    }, []);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                if (isPlacing) {
                    setMarkers([...markers, e.latlng]);
                    setMarkerColors([...markerColors, 'base']);
                    setIsPlacing(false);
                } else if (selectedMarker !== null) {
                    const updatedMarkers = markers.map((marker, idx) => 
                        idx === selectedMarker ? e.latlng : marker
                    );
                    setMarkers(updatedMarkers);
                    setSelectedMarker(null);
                }
            }
        });
        return null;
    };

    const handleDeleteMarker = (idx) => {
        setMarkers(markers.filter((_, index) => index !== idx));
        setMarkerColors(markerColors.filter((_, index) => index !== idx));
    };

    const handleChangeColor = (idx, color) => {
        setMarkerColors(markerColors.map((c, i) => (i === idx ? 'amber' : c)));
        setTimeout(() => {
            setMarkerColors(markerColors.map((c, i) => (i === idx ? color : c)));
        }, 3000);
    };    

    return (
        <div className="App">
            <header className="App-header">
                <MapContainer center={[-16.39, -71.54]} zoom={13} style={{ height: '100vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapEvents />
                    {markers.map((position, idx) => (
                        <Marker key={idx} position={position} icon={trafficLightIcons[markerColors[idx]]}>
                            <Popup>
                                <button className="popup-button" onClick={() => setSelectedMarker(idx)}>Mover</button>
                                <button className="popup-button" onClick={() => handleDeleteMarker(idx)}>Eliminar</button>
                                <div className="color-options">
                                    <div 
                                        className={`color-box ${markerColors[idx] === 'red' ? 'selected-red' : ''}`} 
                                        onClick={() => handleChangeColor(idx, 'red')}
                                    >
                                        Rojo
                                    </div>
                                    <div 
                                        className={`color-box ${markerColors[idx] === 'amber' ? 'selected-amber' : ''}`}
                                    >
                                        Ambar
                                    </div>
                                    <div 
                                        className={`color-box ${markerColors[idx] === 'green' ? 'selected-green' : ''}`} 
                                        onClick={() => handleChangeColor(idx, 'green')}
                                    >
                                        Verde
                                    </div>
                                </div>
                                <video className="traffic-light-video" src={trafficLightVideoUrl} autoPlay loop muted />
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                <button
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '10px',
                        zIndex: 1000,
                        padding: '10px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        cursor: 'pointer'
                    }}
                    onClick={() => setIsPlacing(true)}
                >
                    🚦
                </button>
                {data ? <p>{data.message}</p> : <p>Loading...</p>}
            </header>
        </div>
    );
}

export default App;
