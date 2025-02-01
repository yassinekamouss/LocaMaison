import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Grid, List, Search } from 'lucide-react';

export default function Annonces() {
    const [viewMode, setViewMode] = useState('list');
  
    const annonces = [
      {
        id: 1,
        titre: "Villa moderne avec piscine",
        adresse: "123 Avenue des Roses, Nice",
        prix: 1500,
        surface: 180,
        chambres: 4,
        image: "/images/scott-webb-1ddol8rgUH8-unsplash.jpg",
        statut: "active",
        vues: 245,
        dateCreation: "2024-01-15"
      },
      {
        id: 2,
        titre: "Appartement vue mer",
        adresse: "45 Boulevard Maritime, Cannes",
        prix: 900,
        surface: 75,
        chambres: 2,
        image: "/images/kara-eads-L7EwHkq1B2s-unsplash.jpg",
        statut: "en_attente",
        vues: 128,
        dateCreation: "2024-01-20"
      }
    ];


    return (
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Barre de navigation flottante */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-4 z-50">
          <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
            <Grid className={`w-5 h-5 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600'}`} 
                  onClick={() => setViewMode('grid')} />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
            <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setViewMode('list')} />
          </button>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <a href="/annonce/nouvelle" 
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all transform"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle annonce</span>
          </a>
        </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
                { titre: "Annonces", valeur: annonces.length, bgColor: "bg-blue-500", lightBg: "bg-blue-100" },
                { titre: "Actives", valeur: annonces.filter(a => a.statut === 'active').length, bgColor: "bg-green-500", lightBg: "bg-green-100" },
                { titre: "Vues totales", valeur: annonces.reduce((acc, curr) => acc + curr.vues, 0), bgColor: "bg-slate-500", lightBg: "bg-slate-100" }
            ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 transform">
                <div className={`w-12 h-12 rounded-xl ${stat.lightBg} flex items-center justify-center mb-4`}>
                <span className="text-xl font-bold">{stat.valeur}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700">{stat.titre}</h3>
                <div className={`w-full h-2 ${stat.lightBg} rounded-full mt-4`}>
                    <div className={`w-2/3 h-full ${stat.bgColor} rounded-full`}></div>
                </div>
            </div>
            ))}
          </div>

          {/* En-tête avec recherche */}
          <div className="max-w-7xl mx-auto mb-12">
              <div className='relative'>
                  <input
                  type="text"
                  placeholder="Rechercher dans vos annonces..."
                  className="w-full px-6 py-2 rounded-xl shadow-sm border border-gray-300 hover:ring-1 hover:ring-gray-400 outline-none transition-all bg-white pr-12"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
          </div>

          {/* Liste des annonces */}
          <div 
            className={`max-w-7xl mx-auto ${
                viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }`}>
                {annonces.map((annonce) => (
                <div key={annonce.id} 
                    className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300`}>
                    <div className={`relative ${viewMode === 'grid' ? '' : 'flex'}`}>
                        <div className={`relative ${viewMode === 'grid' ? 'h-48' : 'w-1/3  flex-shrink-0'}`}>
                            <img
                            src={annonce.image}
                            alt={annonce.titre}
                            className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                    <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg text-sm hover:bg-white transition-colors">
                                        <Eye className="w-4 h-4 inline mr-2" />
                                        Voir
                                    </button>
                                </div>
                            </div>
                        </div>
                    
                        <div className={`flex-1 ${viewMode === 'grid' ? '' : 'p-6'}`}>
                            <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold">{annonce.titre}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                annonce.statut === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                {annonce.statut === 'active' ? 'Active' : 'En attente'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mb-4">{annonce.adresse}</p>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                <p className="text-2xl font-bold text-blue-600">
                                    {annonce.prix}€<span className="text-sm text-gray-600">/mois</span>
                                </p>
                                <div className="text-sm text-gray-500">
                                    <Eye className="w-4 h-4 inline mr-1" />
                                    {annonce.vues} vues
                                </div>
                                </div>
                                
                                <div className="flex gap-4 text-gray-600 text-sm">
                                <span>{annonce.surface}m²</span>
                                <span>•</span>
                                <span>{annonce.chambres} chambres</span>
                                <span>•</span>
                                <span>Créée le {new Date(annonce.dateCreation).toLocaleDateString()}</span>
                                </div>
                                
                                <div className="flex gap-2 pt-2">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                    Modifier
                                </button>
                                <button className="flex items-center justify-center w-12 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
          </div>
      </div>
    );
};