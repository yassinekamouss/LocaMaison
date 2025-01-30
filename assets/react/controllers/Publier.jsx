import React, { useState } from 'react';

const Publier = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations de base
    title: '',
    type: '',
    price: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Caractéristiques
    amenities: {
      garage: false,
      parking: false,
      garden: false,
      pool: false,
      balcony: false,
      elevator: false,
      airConditioning: false,
      heating: false,
      securitySystem: false,
      internet: false
    },
    
    // Images
    images: []
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity]
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {['Informations', 'Caractéristiques', 'Photos'].map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep > index + 1 ? 'bg-green-500' :
                currentStep === index + 1 ? 'bg-blue-600' : 'bg-gray-300'
              } text-white font-bold`}>
                {index + 1}
              </div>
              <span className="mt-2 text-sm text-gray-600">{step}</span>
            </div>
            {index < 2 && (
              <div className={`flex-1 h-1 mx-4 ${
                currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre de l'annonce
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ex: Appartement T3 lumineux centre-ville"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de bien
          </label>
          <select
            value={formData.type}
            onChange={(e) => updateFormData('type', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionnez un type</option>
            <option value="apartment">Appartement</option>
            <option value="house">Maison</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => updateFormData('price', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Prix en euros"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Surface (m²)
          </label>
          <input
            type="number"
            value={formData.surface}
            onChange={(e) => updateFormData('surface', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Surface en m²"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de pièces
          </label>
          <input
            type="number"
            value={formData.rooms}
            onChange={(e) => updateFormData('rooms', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chambres
          </label>
          <input
            type="number"
            value={formData.bedrooms}
            onChange={(e) => updateFormData('bedrooms', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md h-32"
          placeholder="Décrivez votre bien..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code postal
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => updateFormData('postalCode', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );

  const renderAmenitiesStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        Équipements et caractéristiques
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(formData.amenities).map(([key, value]) => (
          <div
            key={key}
            onClick={() => updateAmenity(key)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              value ? 'bg-blue-50 border-blue-500' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={value}
                onChange={() => {}}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderImagesStep = () => (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <div className="mt-4">
            <label className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Ajouter des photos
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            PNG, JPG jusqu'à 10MB
          </p>
        </div>
      </div>

      {formData.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="h-40 w-full object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Publier votre bien
        </h1>

        {renderStepIndicator()}

        <div className="mt-8">
          {currentStep === 1 && renderBasicInfoStep()}
          {currentStep === 2 && renderAmenitiesStep()}
          {currentStep === 3 && renderImagesStep()}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className={`px-6 py-2 border border-gray-300 rounded-md ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            Précédent
          </button>
          <button
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep(prev => prev + 1);
              } else {
                // Soumission du formulaire
                console.log('Formulaire soumis:', formData);
              }
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {currentStep === 3 ? 'Publier' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publier;