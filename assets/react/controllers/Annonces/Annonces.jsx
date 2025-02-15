import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, Grid, List, Search } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Annonces({ annonces }) {
    const [viewMode, setViewMode] = useState("list");
    const [searchTerm, setSearchTerm] = useState(""); 
    const [annoncesList, setAnnoncesList] = useState(annonces); // 🔹 Ajout de l'état pour stocker les annonces

    // 🛠️ Fonction de filtrage des annonces selon la recherche
    const filteredAnnonces = annoncesList.filter((annonce) =>
        annonce.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        annonce.adresse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        annonce.ville?.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/bien/${id}`);
            // 🔹 Mettre à jour l'état après suppression
            setAnnoncesList((prevAnnonces) => prevAnnonces.filter((annonce) => annonce.id !== id));
            toast.success("Bien supprimé avec succès !");
        } catch (error) {
            console.error("Erreur lors de la suppression :", error.response?.data || error.message);
            toast.error("Erreur lors de la suppression");
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            {/* Barre de navigation flottante */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-4 z-50">
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors" onClick={() => setViewMode("grid")}>
                    <Grid className={`w-5 h-5 ${viewMode === "grid" ? "text-blue-600" : "text-gray-600"}`} />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors" onClick={() => setViewMode("list")}>
                    <List className={`w-5 h-5 ${viewMode === "list" ? "text-blue-600" : "text-gray-600"}`} />
                </button>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <a href="/annonce/create" className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all transform">
                    <Plus className="w-5 h-5" />
                    <span>Nouvelle annonce</span>
                </a>
            </div>

            {/* En-tête avec recherche */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher dans vos annonces..."
                        className="w-full px-6 py-2 rounded-xl shadow-sm border border-gray-300 hover:ring-1 hover:ring-gray-400 outline-none transition-all bg-white pr-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Liste des annonces */}
            <div className={`max-w-7xl mx-auto ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
                {filteredAnnonces.length > 0 ? (
                    filteredAnnonces.map((annonce) => (
                        <div key={annonce.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
                            <div className={`relative ${viewMode === "grid" ? "" : "flex"}`}>
                                <div className={`relative ${viewMode === "grid" ? "h-48" : "w-1/3 flex-shrink-0"}`}>
                                    <img
                                        src={annonce.images && annonce.images.length > 0 ? `/uploads/${annonce.images[0].url}` : "/images/default.jpg"}
                                        alt={annonce.titre}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 text-center">
                                            <a href={`/bien/${annonce.id}`} className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg text-sm hover:bg-white transition-colors">
                                                <Eye className="w-4 h-4 inline mr-2" />
                                                Voir
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex-1 ${viewMode === "grid" ? "" : "p-6"}`}>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold">{annonce.titre}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm ${annonce.status === "disponible" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                                                {annonce.status === "disponible" ? "Active" : "En attente"}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-4">{annonce.adresse}</p>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <p className="text-2xl font-bold text-blue-600">
                                                    {annonce.prix} MAD<span className="text-sm text-gray-600">/mois</span>
                                                </p>
                                                <div className="text-sm text-gray-500">
                                                    <Eye className="w-4 h-4 inline mr-1" />
                                                    31 vues
                                                </div>
                                            </div>

                                            <div className="flex gap-4 text-gray-600 text-sm">
                                                <span>{annonce.surface}m²</span>
                                                <span>•</span>
                                                <span>{annonce.chambres} chambres</span>
                                                <span>•</span>
                                                <span>Créée le {new Date(annonce.createdAt).toLocaleDateString()}</span>
                                            </div>

                                            <div className="flex gap-2 pt-2">
                                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                    Modifier
                                                </button>
                                                <button 
                                                    className="flex items-center justify-center w-12 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    onClick={() => handleDelete(annonce.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Aucune annonce trouvée.</p>
                )}
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};
