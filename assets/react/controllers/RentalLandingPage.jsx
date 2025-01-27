import { useState, useEffect } from "react";
import SearchSection from "./SearchSection";
import RentalList from "./RentalList";

export default function RentalLandingPage() {
    const [rentals, setRentals] = useState([]); // Stocke les biens
    const [searchQuery, setSearchQuery] = useState(""); // Stocke la requête de recherche
    const [filteredRentals, setFilteredRentals] = useState([]); // Stocke les propriétés filtrées
    const [loading, setLoading] = useState(true); // Suivi du chargement des biens

    // Charger les biens au montage du composant
    useEffect(() => {
        // Appeler l'API Symfony
        fetch("/propertie")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des biens");
                }
                return response.json(); // Convertir la réponse en JSON
            })
            .then((data) => {
                setRentals(data); 
                setFilteredRentals(data); 
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
        }, []);

    // Filtrer les biens en fonction de la requête de recherche
    useEffect(() => {
        const filtered = rentals.filter((rental) =>
            rental.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRentals(filtered);
    }, [searchQuery, rentals]);

    // Fonction pour gérer la recherche
    const handleSearch = (query) => {
        setSearchQuery(query);
        const results = rentals.filter((rental) =>
            rental.location.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredRentals(results);
    };

    return (
        <>
            <SearchSection onSearch={handleSearch} />
            
            {/* Affichage du chargement tant que les biens ne sont pas récupérés */}
            {loading ? (
                <div className="container mx-auto  mt-8 grid md:grid-cols-4 gap-6">
                    {Array(4).fill().map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {/* Zone image vide avec animation */}
                        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="w-full h-full bg-gray-100 animate-pulse"></div> {/* Zone image vide */}
                        </div>
                        <div className="p-4 bg-white">
                            {/* Titre vide avec animation */}
                            <div className="h-6 bg-gray-100 mb-2 animate-pulse"></div> {/* Titre vide */}
                            <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 text-gray-600">
                                {/* Icône et location vide */}
                                <div className="w-4 h-4 bg-gray-100 animate-pulse rounded"></div>
                                <div className="w-24 bg-gray-100 animate-pulse h-4"></div> {/* Location vide */}
                            </div>
                            {/* Prix vide */}
                            <div className="w-20 bg-gray-100 animate-pulse h-4"></div>
                            </div>
                            <div className="mt-4 flex justify-between text-sm text-gray-500">
                            {/* Chambres et type vide */}
                            <div className="w-16 bg-gray-100 animate-pulse h-4"></div>
                            <div className="w-16 bg-gray-100 animate-pulse h-4"></div>
                            </div>
                        </div>
                        </div>
                    ))}            
                </div>     
            ) : (
                <RentalList rentals={filteredRentals} />
            )}
        </>
    );
}
