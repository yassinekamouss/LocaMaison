import { useState, useEffect } from "react";
import Map from "./Map";
import ListBiens from "./ListBiens";
import SearchSection from "./SearchSection";

export default function AccueilLocations() {
    const [rentals, setRentals] = useState([]); // Stocke les biens
    const [searchQuery, setSearchQuery] = useState(""); // Stocke la requête de recherche
    const [filteredRentals, setFilteredRentals] = useState([]); // Stocke les biens filtrés
    const [loading, setLoading] = useState(true); // Suivi du chargement des biens
    const [showMap, setShowMap] = useState(false); // État pour afficher la carte
    const [filterCriteria, setFilterCriteria] = useState({ // Critères de filtrage
        propertyType: [],
        maxPrice: 100000,
        roomCount: [],
        amenities: []
    });

    // Charger les biens au montage du composant
    useEffect(() => {
        fetch("/biens")
        .then((response) => {
            if (!response.ok) {
            throw new Error("Erreur lors du chargement des biens");
            }
            return response.json();
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

    // Appliquer le filtrage (recherche + filtres)
    useEffect(() => {
        let filtered = rentals.filter(
            (rental) =>
                rental.titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                rental.ville?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        // Appliquer les filtres
        filtered = filtered.filter((rental) => {
            const matchesType = filterCriteria.propertyType.length === 0 || 
                (rental.type || filterCriteria.propertyType.includes(rental.type.toLowerCase()));
    
            const matchesPrice = rental.prix !== undefined && rental.prix <= filterCriteria.maxPrice;
    
            const matchesRooms = filterCriteria.roomCount.length === 0 || 
                (rental.chambres !== undefined && filterCriteria.roomCount.includes(rental.chambres));
    
            const matchesAmenities = filterCriteria.amenities.length === 0 || 
                (Array.isArray(rental.equipements) && filterCriteria.amenities.every(amenity => rental.equipements.includes(amenity)));
    
            return matchesType && matchesPrice && matchesRooms && matchesAmenities;
        });
    
        setFilteredRentals(filtered);
    }, [searchQuery, filterCriteria, rentals]);

    // Fonction pour gérer la recherche
    const handleSearch = (query) => {
        console.log("Recherche:", query);
        setSearchQuery(query);
    };

     // Fonction pour mettre à jour les filtres
     const handleFilterChange = (filters) => {
        setFilterCriteria(filters);
    };

    // Fonction pour basculer entre la liste et la carte
    const handleToggleView = (isMapView) => {
        setShowMap(isMapView);
    };

    return (
        <>
        <SearchSection onSearch={handleSearch} onFilterChange={handleFilterChange} onToggleView={handleToggleView} />

        {/* Affichage du chargement tant que les biens ne sont pas récupérés */}
        {loading ? (
            <div className="container mx-auto mt-8 grid md:grid-cols-4 gap-6">
            {Array(8)
                .fill()
                .map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-48 bg-white flex items-center justify-center overflow-hidden transform transition duration-300 hover:scale-105">
                    <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="p-4 bg-white">
                    <div className="h-6 bg-white mb-2 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-gray-600">
                        <div className="w-4 h-4 bg-gray-100 animate-pulse rounded"></div>
                        <div className="w-24 bg-gray-100 animate-pulse h-4"></div>
                        </div>
                        <div className="w-20 bg-gray-100 animate-pulse h-4"></div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                        <div className="w-16 bg-gray-100 animate-pulse h-4"></div>
                        <div className="w-16 bg-gray-100 animate-pulse h-4"></div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        ) : (
            <div className="">
            {showMap ? (
                <Map rentals={filteredRentals} />
            ) : (
                <ListBiens rentals={filteredRentals} />
            )}
            </div>
        )}
        </>
    );
}