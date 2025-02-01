import { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Camera, Edit2, Save } from 'lucide-react';

export default function ProfilePage({isAuthenticated,profile}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Alexandre',
    lastName: 'Dubois',
    email: 'alex.dubois@email.com',
    phone: '06 12 34 56 78',
    address: '123 Rue de Paris',
    city: 'Lyon',
    bio: 'À la recherche d\'une location pour mes vacances d\'été.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Logique de sauvegarde à implémenter
  };

  return (
    <>
        <Navbar isAuthenticated={true} widthLimitation={true}/>
        
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Mon Profil</h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isEditing ? (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Sauvegarder
                        </>
                        ) : (
                        <>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Modifier
                        </>
                        )}
                    </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                    {/* Photo de profil */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                        <img
                            src="/api/placeholder/128/128"
                            alt="Photo de profil"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                        />
                        {isEditing && (
                            <button
                            type="button"
                            className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            >
                            <Camera className="w-4 h-4" />
                            </button>
                        )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Colonne gauche */}
                        <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom
                            </label>
                            <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom
                            </label>
                            <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                            </label>
                            <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>
                        </div>

                        {/* Colonne droite */}
                        <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                            </label>
                            <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse
                            </label>
                            <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ville
                            </label>
                            <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>
                        </div>

                        {/* Bio - pleine largeur */}
                        <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        ></textarea>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>    

        <Footer/>
    </>

  );
};