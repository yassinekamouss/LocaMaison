import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import { 
    Search, Filter, Clock, CheckCircle, XCircle, Home, TrendingUp, Users, Phone, Mail, X, ChevronLeft, ChevronRight, MapPin, Square, Bed, Bath, Calendar
} from "lucide-react";

export default function Biens({data}) {
    // Convertir la chaîne JSON en objet JavaScript
    const biensFromProps = JSON.parse(data);

    // Initialiser l'état `biens` avec les données passées en props
    const [biens, setBiens] = useState(biensFromProps);

    // Si les props changent, mettez à jour l'état `biens`
    useEffect(() => {
        setBiens(biensFromProps);
    }, [data]);

    // const [biens, setBiens] = useState([
    //     {
    //         id: 1,
    //         titre: "Maison moderne",
    //         description: "Une maison moderne avec vue sur la mer. Parfaitement située dans un quartier calme, cette propriété offre un cadre de vie exceptionnel avec des finitions haut de gamme.",
    //         images: [
    //             {"id":1, "url" : "/images/johnson-johnson-U6Q6zVDgmSs-unsplash.jpg"},
    //             {"id":2, "url" : "/images/johnson-johnson-U6Q6zVDgmSs-unsplash.jpg"},
    //             {"id":3, "url" : "/images/johnson-johnson-U6Q6zVDgmSs-unsplash.jpg"},
    //         ],
    //         created_at: "2023-10-01",
    //         status: "En attente",
    //         prix: "450,000 €",
    //         adresse: "Paris, France",
    //         surface: "180m²",
    //         chambres: 4,
    //         sallesDeBain: 2,
    //         proprietaire: {
    //             nom: "Jean",
    //             prenom: "Dupont",
    //             phone: "06 12 34 56 78",
    //             email: "jean.dupont@email.com"
    //         },
    //         equipements: [
    //             {"id": 1 , "nom": "Climatisation et Chauffage"},
    //             {"id": 2 , "nom": "Climatisation et Chauffage"},
    //             {"id": 3 , "nom": "Climatisation et Chauffage"},
    //             {"id": 4 , "nom": "Climatisation et Chauffage"},
    //         ]
    //     }
    // ]);
    const [selectedBien, setSelectedBien] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("Tous");
    const [isGridView, setIsGridView] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (bien) => {
        setSelectedBien(bien);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBien(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedBien) {
            setCurrentImageIndex((prev) => 
                prev === selectedBien.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const previousImage = () => {
        if (selectedBien) {
            setCurrentImageIndex((prev) => 
                prev === 0 ? selectedBien.images.length - 1 : prev - 1
            );
        }
    };

    const accepterBien = (id) => {
        setBiens((prev) =>
            prev.map((bien) =>
                bien.id === id ? { ...bien, status: "Approuve" } : bien
            )
        );
    };

    const rejeterBien = (id) => {
        setBiens((prev) =>
            prev.map((bien) =>
                bien.id === id ? { ...bien, status: "Rejeté" } : bien
            )
        );
    };

    const filteredBiens = biens.filter((bien) => {
        const matchSearch = bien.titre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === "Tous" || bien.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Approuvé" || "Approuve" || "disponible":
                return "bg-green-100 text-green-800";
            case "Rejeté" || "Rejete":
                return "bg-red-100 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ms-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8 bg-gradient-to-b from-white to-gray-50 rounded-lg p-4 shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion Des Biens</h1>
                    <p className="text-gray-600">Gérez Les Biens et suivez leurs statut en temps réel</p>
                </div>
                {/* Filters */}
                <div className="p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un bien..."
                                className="shadow-sm w-full pl-12 pr-4 py-3 outline-none bg-white border border-gray-200 rounded-xl focus:border-none focus:ring-2 focus:ring-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                className="bg-gray-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="Tous">Tous les statuts</option>
                                <option value="En attente">En attente</option>
                                <option value="Approuvé">Approuvé</option>
                                <option value="Rejeté">Rejeté</option>
                            </select>
                            <button
                                onClick={() => setIsGridView(!isGridView)}
                                className="p-3 bg-gray-100 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <TrendingUp className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className={`grid ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                    {filteredBiens.length > 0 && filteredBiens.map((bien) => (
                        <div 
                            key={bien.id} 
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer"
                            onClick={() => openModal(bien)}
                        >
                            <div className="relative">
                                <img
                                    src={bien.images?.[0]?.url ? `/uploads/` + bien.images[0].url : "/images/house-location.png"}
                                    alt={bien.titre}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bien.status)}`}>
                                        {bien.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">{bien.titre}</h2>
                                    <p className="text-gray-600">{bien.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center">
                                        <Home className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-600">{bien.surface} m²</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-600">{bien.adresse}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm font-semibold text-gray-800">{bien.prix} DH</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {isModalOpen && selectedBien && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] ">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <h2 className="text-2xl font-bold text-gray-800">{selectedBien.titre}</h2>
                                <button 
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                {/* Image Slider */}
                                <div className="relative mb-6">
                                    <img 
                                        src={selectedBien.images?.[currentImageIndex]?.url ? `/uploads/` + selectedBien.images[currentImageIndex].url : "/images/house-location.png"}
                                        alt={`${selectedBien.titre} - Image ${currentImageIndex + 1}`}
                                        className="w-full h-[400px] object-cover rounded-xl"
                                    />
                                    {selectedBien.images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    previousImage();
                                                }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    nextImage();
                                                }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {selectedBien.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(index);
                                                }}
                                                className={`w-2 h-2 rounded-full ${
                                                    currentImageIndex === index 
                                                        ? 'bg-white' 
                                                        : 'bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Property Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Informations générales</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                                <span>{selectedBien.adresse}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Square className="w-5 h-5 text-gray-400 mr-3" />
                                                <span>{selectedBien.surface}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Bed className="w-5 h-5 text-gray-400 mr-3" />
                                                <span>{selectedBien.chambres} chambres</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Bath className="w-5 h-5 text-gray-400 mr-3" />
                                                <span>{selectedBien.sallesDeBain} salles de bain</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                                <span>Année de construction: {selectedBien.created_at}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-semibold mt-6 mb-4">Caractéristiques</h3>
                                        <ul className="grid grid-cols-2 gap-3">
                                            {selectedBien.equipements.map((equipement) => (
                                                <li key={equipement.id} className="flex items-center">
                                                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                                    <span className="text-gray-600">{equipement.nom}  </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Right Column */}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Description</h3>
                                        <p className="text-gray-600 mb-6">{selectedBien.description}</p>

                                        <h3 className="text-xl font-semibold mb-4">Contact de l'proprietaire</h3>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="space-y-3">
                                                <div className="flex items-center">
                                                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                                                    <span>{selectedBien.proprietaire.nom + " " + selectedBien.proprietaire.prenom}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                                    <span>{selectedBien.proprietaire.phone}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                                    <span>{selectedBien.proprietaire.email}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex gap-3 justify-end">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    accepterBien(selectedBien.id);
                                                    closeModal();
                                                }}
                                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Accepter
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    rejeterBien(selectedBien.id);
                                                    closeModal();
                                                }}
                                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Rejeter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}