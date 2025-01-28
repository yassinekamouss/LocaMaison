import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({rental}){
    // Définition de l'icône personnalisée
    const customIcon = L.icon({
        iconUrl: '/images/house-location.png',
        iconSize: [30, 30],
        iconAnchor: [20, 20],
        popupAnchor: [0, -40],
    });

    return (
        <div className="h-[400px] rounded-lg overflow-hidden mx-auto">
            <MapContainer 
                center={[rental.latitude, rental.longitude]} 
                zoom={17} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                className="shadow-lg border border-gray-200 mx-auto"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker 
                    position={[rental.latitude, rental.longitude]}
                    icon={customIcon}
                >
                </Marker>
                <Circle 
                    center={[rental.latitude, rental.longitude]}
                    radius={50}
                    pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
                />
            </MapContainer>
        </div>
    );
}