import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

export default function MapGlobal({ rentals }) {
    const [isMapLoaded, setIsMapLoaded] = useState(false); // État pour l'animation de chargement

    // Icône personnalisée pour les marqueurs
    const customIcon = L.icon({
        iconUrl: "/images/marker-icon.png", // Remplacez par le chemin de votre icône
        iconSize: [30, 30], // Taille agrandie
        iconAnchor: [20, 40], // Point d'ancrage au centre de la base
        popupAnchor: [0, -40], // Position du popup par rapport au marqueur
    });

    // Animation de chargement
    useEffect(() => {
        setIsMapLoaded(true);
    }, []);

    return (
        <div className="p-4">
            <div
                className={`transition-opacity duration-1000 ${
                    isMapLoaded ? "opacity-100" : "opacity-0"
                }`}
            >
                <MapContainer
                    center={[31.7917, -7.0926]} // Centre du Maroc
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ height: "800px", width: "70%", margin:"0 auto", borderRadius:"15px",zIndex:"20"}}
                    className=""
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {rentals.map((rental) => (
                        <Marker
                            key={rental.id}
                            position={[rental.latitude, rental.longtitude]} // Coordonnées du bien
                            icon={customIcon}
                            eventHandlers={{
                                click: (e) => {
                                    e.target.openPopup(); // Ouvrir le popup au clic
                                },
                            }}
                        >
                            <Popup className="rounded-md">
                                <div className=" w-[100] h-[100]">
                                    {/* Titre */}
                                    <strong className="text-lg font-semibold text-gray-800">
                                        {rental.titre}
                                    </strong>{" "}
                                    <br />

                                    {/* Image cliquable */}
                                    <a
                                        href={`/bien/${rental.id}`} // Lien vers la page du bien
                                        target="_blank" // Ouvrir dans un nouvel onglet
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={rental.images && rental.images.length > 0 ? `/uploads/${rental.images[0].url}` : '/images/kara-eads-L7EwHkq1B2s-unsplash.jpg'}
                                            alt={rental.titre} // Texte alternatif pour l'accessibilité
                                            className="w-full h-32 object-cover rounded-sm shadow-sm mb-4 cursor-pointer hover:opacity-90 transition-opacity" // Styles modernes
                                        />
                                    </a>

                                    {/* Localisation */}
                                    <span className="text-gray-600">{rental.ville}</span> <br />

                                    {/* Prix */}
                                    <span className="text-blue-600 font-bold">
                                        Prix : {rental.prix} MAD
                                    </span>

                                    {/* Bouton pour fermer le popup */}
                                    <button
                                        onClick={() => {
                                            const marker = document.querySelector(
                                                `.leaflet-popup-close-button`
                                            );
                                            if (marker) marker.click(); // Fermer le popup
                                        }}
                                        className="mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}