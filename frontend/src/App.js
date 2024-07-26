import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../node_modules/leaflet/dist/leaflet.css';
import { getOverview } from './services/api';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOverview();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <MapContainer center={[-16.39, -71.54]} zoom={13} style={{ height: '100vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[-16.39, -71.54]}>
                        <Popup>
                            A sample marker
                        </Popup>
                    </Marker>
                </MapContainer>
                {data ? <p>{data.message}</p> : <p>Loading...</p>}
            </header>
        </div>
    );
}

export default App;
