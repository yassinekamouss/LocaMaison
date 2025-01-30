import { useState } from 'react';
import { 
  Wifi, 
  Coffee, 
  Laptop,  
  Bath, 
  BedDouble, 
  Home, 
  Building, 
  Tent, 
  X, 
  Check,
  WashingMachine 
} from 'lucide-react';

export default function RentalFilter({ onClose }) {
    const [filters, setFilters] = useState({
      propertyType: [],
      maxPrice: 5000,
      roomCount: [],
      amenities: []
    });

    const propertyTypes = [
      { value: 'apartment', label: 'Appartement', icon: Building },
      { value: 'house', label: 'Maison', icon: Home },
      { value: 'villa', label: 'Villa', icon: Tent },
      { value: 'studio', label: 'Studio', icon: BedDouble }
    ];

    const amenitiesList = [
      { value: 'wifi', label: 'Wifi', icon: Wifi },
      { value: 'kitchen', label: 'Cuisine', icon: Coffee },
      { value: 'workspace', label: 'Espace travail', icon: Laptop },
      { value: 'washer', label: 'Machine à laver', icon: WashingMachine },
      { value: 'bathroom', label: 'Salle de bain privée', icon: Bath }
    ];

    const roomOptions = [
      { value: 1, label: '1 chambre' },
      { value: 2, label: '2 chambres' },
      { value: 3, label: '3 chambres' },
      { value: 4, label: '4+ chambres' }
    ];

    const toggleFilter = (category, value) => {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }));
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center">
        <div className="bg-white w-[500px] rounded-2xl shadow-2xl p-6 relative">
          {/* Bouton de fermeture */}
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Home className="mr-3 text-blue-600" />
            Filtres Détaillés
          </h2>

          {/* Type de Propriété */}
          <section className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Type de Propriété</h3>
            <div className="flex space-x-3">
              {propertyTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => toggleFilter('propertyType', type.value)}
                  className={`
                    flex flex-col items-center p-3 rounded-xl border-2 transition-all
                    ${filters.propertyType.includes(type.value) 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'bg-gray-50 border-gray-200'}
                  `}
                >
                  <type.icon className={`w-6 h-6 mb-2 ${filters.propertyType.includes(type.value) ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Prix Maximum */}
          <section className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Prix Maximum</h3>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0DH</span>
              <span>{filters.maxPrice}DH</span>
            </div>
          </section>

          {/* Nombre de Chambres */}
          <section className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Chambres</h3>
            <div className="flex space-x-3">
              {roomOptions.map(room => (
                <button
                  key={room.value}
                  onClick={() => toggleFilter('roomCount', room.value)}
                  className={`
                    px-4 py-2 rounded-xl border-2 transition-all
                    ${filters.roomCount.includes(room.value) 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'}
                  `}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </section>

          {/* Équipements */}
          <section className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Équipements</h3>
            <div className="grid grid-cols-3 gap-3">
              {amenitiesList.map(amenity => (
                <button
                  key={amenity.value}
                  onClick={() => toggleFilter('amenities', amenity.value)}
                  className={`
                    flex items-center justify-center p-3 rounded-xl border-2 transition-all
                    ${filters.amenities.includes(amenity.value) 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'bg-gray-50 border-gray-200'}
                  `}
                >
                  <amenity.icon className={`w-6 h-6 mr-2 ${filters.amenities.includes(amenity.value) ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-sm">{amenity.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Boutons d'action */}
          <div className="flex justify-between space-x-4">
            <button 
              onClick={() => setFilters({ propertyType: [], maxPrice: 5000, roomCount: [], amenities: [] })}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Réinitialiser
            </button>
            <button 
              onClick={() => console.log(filters)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    );
}