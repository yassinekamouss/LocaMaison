import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Home, Bed, MapPin, Expand, ChevronLeft, ChevronRight, Eye, Trash } from "lucide-react";

export default function Favori({ data, isAuthenticated }) {
    const [savedProperties, setSavedProperties] = useState(JSON.parse(data));

    useEffect(() => {
        setSavedProperties(JSON.parse(data));
    }, [data]);

    const [imageIndexes, setImageIndexes] = useState(
        savedProperties.reduce((acc, favori) => {
            acc[favori.id] = 0;
            return acc;
        }, {})
    );

    const handleNextImage = (propertyId, imagesLength) => {
        setImageIndexes((prevIndexes) => ({
            ...prevIndexes,
            [propertyId]: (prevIndexes[propertyId] + 1) % imagesLength,
        }));
    };

    const handlePrevImage = (propertyId, imagesLength) => {
        setImageIndexes((prevIndexes) => ({
            ...prevIndexes,
            [propertyId]: (prevIndexes[propertyId] - 1 + imagesLength) % imagesLength,
        }));
    };

    const handleDeleteFavori = async (favoriId) => {
        try {
            const response = await fetch(`/favori/${favoriId}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du favori");
            }
    
            // Mise à jour de l'état après suppression
            setSavedProperties(savedProperties.filter(property => property.id !== favoriId));
        } catch (error) {
            console.error("Erreur:", error);
        }
    };
    

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar isAuthenticated={isAuthenticated} widthLimitation={true} />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Mes Biens Sauvegardés</h1>
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full">
                        {savedProperties.length} biens
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProperties.map((favori) => (
                        <div
                            key={favori.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={`/uploads/${favori.bien.images[imageIndexes[favori.id]].url}`}
                                    alt={favori.bien.titre}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="absolute inset-0 flex justify-between items-center px-2">
                                    <button
                                        onClick={() =>
                                            handlePrevImage(favori.id, favori.bien.images.length)
                                        }
                                        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleNextImage(favori.id, favori.bien.images.length)
                                        }
                                        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold mb-2">{favori.bien.titre}</h2>
                                        <button 
                                            className="p-2 bg-gray-50 rounded-full cursor-pointer shadow-md hover:bg-red-50"
                                            onClick={() => handleDeleteFavori(favori.id)}
                                        >
                                            <Trash className="w-5 h-5 text-red-500" fill="currentColor" />
                                        </button>
                                    </div>
                                    <div className="flex items-center text-gray-500 space-x-4">
                                        <Home className="w-4 h-4" />
                                        <span>{favori.bien.type}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4 overflow-hidden text-ellipsis line-clamp-2">
                                    {favori.bien.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Bed className="w-4 h-4 text-gray-400" />
                                        <span>{favori.bien.chambres} chambres</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Expand className="w-4 h-4 text-gray-400" />
                                        <span>{favori.bien.surface} m²</span>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2 mb-4">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-gray-700">{favori.bien.adresse}</p>
                                        <p className="text-gray-500">{favori.bien.ville}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-gray-600">
                                        {favori.bien.prix.toLocaleString()} <span className="text-xl">DH/mois</span>
                                    </span>
                                    <button className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:from-indigo-600 hover:to-blue-500 hover:shadow-lg">
                                        <Eye className="w-5 h-5" />
                                        Voir détails
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
