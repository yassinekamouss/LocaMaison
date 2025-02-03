import { useState } from 'react';
import {
    Heart,
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    Home,
    CirclePlus,
    Share2,
    AirVent,
    Wifi,
    CookingPot,
    WashingMachine,
    Tv,
    MonitorSmartphone,
    WavesLadder,
    Fence,
    Cookie,
    Merge,
    SquareParking,
    ServerCog,
    Dog,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L, { polygon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function PropertyDetails({propertie}) {
    const [activeImage, setActiveImage] = useState(0);

    const bien = JSON.parse(propertie);
    const equipements = {
        "Climatisation et Chauffage": AirVent,
        "Internet Haut Débit": Wifi,
        "Cuisine Équipée": CookingPot,
        "Machine à Laver et Sèche-Linge": WashingMachine,
        "Télévision": Tv,
        "Espace de Bureau": MonitorSmartphone,
        "Piscine": WavesLadder,
        "Jardin avec Terrasse et Mobilier de Jardin": Fence,
        "Barbecue et Cuisine Extérieure": Cookie,
        "Balcon ou Terrasse Privée": Merge,
        "Garage": SquareParking,
        "Service de Ménage": ServerCog,
        "Animaux_acceptés": Dog
    };

    // Définition de l'icône personnalisée
    const customIcon = L.icon({
        iconUrl: '/images/house-location.png',
        iconSize: [30, 30],
        iconAnchor: [20, 20],
        popupAnchor: [0, -40],
    });

  return (
    <>
        <div className="max-w-7xl mx-auto px-4 py-8 ">
            {/* En-tête avec actions */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{bien.titre}</h1>
                <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5" />
                    Sauvegarder
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                    Partager
                </button>
                </div>
            </div>

            {/* Galerie d'images */}
            <div className="mb-12">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 row-span-2">
                        <img 
                        src={`/uploads/${bien.images[0].url}`}
                        alt="Image principale" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <img 
                        src={`/uploads/${bien.images[1].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <img 
                        src={`/uploads/${bien.images[2].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <img 
                        src={`/uploads/${bien.images[3].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="relative">
                        <img 
                        src={`/uploads/${bien.images[3].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                        <button 
                        className="absolute bottom-4 right-4 px-2 py-2 rounded-lg shadow-lg bg-gray-50 text-black transition-colors"
                        >
                            <CirclePlus />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex md:grid md:grid-cols-3 md:gap-8">
                <div className="col-span-2">
                    {/* Informations principales */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="h-5 w-5" />
                        <span>{bien.adresse}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <BedDouble className="h-8 w-8 mb-2" />
                            <p className="font-semibold">{bien.chambres} chambres</p>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <Bath className="h-8 w-8 mb-2" />
                            <p className="font-semibold">3 salles de bain</p>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <Ruler className="h-8 w-8 mb-2" />
                            <p className="font-semibold">{bien.surface} m²</p>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <Home className="h-8 w-8 mb-2" />
                            <p className="font-semibold">Moublé</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                        Magnifique villa moderne située dans un quartier prisé de Nice, offrant une vue imprenable sur la mer Méditerranée. Cette propriété d'exception de 200m² dispose de 4 chambres spacieuses, 3 salles de bain luxueuses et de nombreux équipements haut de gamme. La villa bénéficie d'une exposition sud-ouest idéale et d'un jardin paysager de 800m².
                        </p>
                    </div>

                    {/* Équipements */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Équipements</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {bien.equipements.map((equipement) => {
                                const IconComponent = equipements[equipement.nom];

                                return (
                                    <div key={equipement.id} className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                                        {IconComponent ? <IconComponent className="w-8 h-8" /> : null}
                                        <span>{equipement.nom}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
                {/* Formulaire de contact */}
                <div className="relative">
                    <div className="sticky top-8 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                        <h3 className="text-xl font-semibold mb-4">Contacter le propriétaire</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nom</label>
                                <input 
                                type="text"
                                placeholder="Votre nom"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:gray-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input 
                                type="email"
                                placeholder="Votre email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:gray-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Téléphone</label>
                                <input 
                                type="tel"
                                placeholder="Votre téléphone"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:gray-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea 
                                placeholder="Votre message"
                                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:gray-500 outline-none transition-colors resize-none"
                                />
                            </div>
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Où se situe le logement */}
            <div className='mt-8'>
                <h2 className="text-2xl font-semibold mb-4">Où se situe le logement</h2>
                <div className="h-[400px] rounded-lg overflow-hidden mx-auto">
                    <MapContainer 
                        center={[bien.latitude, bien.longtitude]} 
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
                            position={[bien.latitude, bien.longtitude]}
                            icon={customIcon}
                        >
                        </Marker>
                        <Circle 
                            center={[bien.latitude, bien.longtitude]}
                            radius={50}
                            pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
                        />
                    </MapContainer>
                </div>
            </div>

        </div>
    </>
  );
};