import { useState } from 'react';
import { Search, MapPin, Sliders, List, Map } from 'lucide-react';
import FilterPropertie from './FilterPropertie';

export default function SearchSection({ onSearch, onToggleView, onFilterChange }) {
    const [inputValue, setInputValue] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };

    const handleCloseModal = () => {
        setShowFilterModal(false);
    };

    const toggleView = (isMapView) => {
        setShowMap(isMapView);
        onToggleView(isMapView);
    };

    return (
        <>
            <div className="shadow-sm mb-4 w-full mx-auto sticky top-16 z-40 bg-white">
                <div className="rounded-lg mx-auto p-6 max-w-7xl">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowFilterModal(!showFilterModal)}
                            className="bg-blue-50 text-blue-600 p-2 rounded-md hover:bg-blue-100"
                        >
                            <Sliders className="w-6 h-6" />
                        </button>

                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Ville, quartier..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-gray-600"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onSearch(inputValue); // Appel à onSearch lorsque "Enter" est pressé
                                    }
                                }}
                            />
                            <MapPin className="absolute left-3 top-3 text-gray-400" />
                        </div>

                        <div className="bg-white rounded-xl flex fixed bottom-8 left-1/2 transform -translate-x-1/2 shadow-xl px-3 py-2 items-center gap-4 z-50">
                            <button
                                onClick={() => toggleView(false)}
                                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                    !showMap ? "bg-blue-50 shadow-sm text-blue-600" : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <List className="w-5 h-5 mr-2" />
                                Liste
                            </button>
                            <button
                                onClick={() => toggleView(true)}
                                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                    showMap ? "bg-blue-50 shadow-sm text-blue-600" : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <Map className="w-5 h-5 mr-2" />
                                Carte
                            </button>
                        </div>

                        <button
                            onClick={() => onSearch(inputValue)}
                            className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center"
                        >
                            <Search className="mr-2" />
                            <span className='hidden md:block'>
                                Rechercher
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {showFilterModal && (
                <FilterPropertie onClose={handleCloseModal} onFilterApply={onFilterChange} />
            )}
        </>
    );
}