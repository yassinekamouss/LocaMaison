import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

export default function AnnonceForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [equipementsList, setEquipementsList] = useState([]); 
  const [formDonnees, setFormDonnees] = useState({
    titre: '',
    type: '',
    prix: '',
    surface: '',
    chambres: '',
    description: '',
    address: '',
    ville: '',
    latitude: '',
    longtitude: '',
    equipements: [],
    images: []
  });
  // Récupération des équipements depuis l'API Symfony
  useEffect(() => {
    const fetchEquipements = async () => {
        try {
            const response = await axios.get('/equipements'); 
            setEquipementsList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des équipements:', error);
        }
    };

    fetchEquipements();
}, []);

  const validateStep1 = () => {
    const newErrors = {};
    const requiredFields = ['titre', 'type', 'prix', 'surface', 'chambres', 'address', 'latitude', 'longtitude', 'description'];
    
    requiredFields.forEach(field => {
      if (!formDonnees[field] || formDonnees[field].trim() === '') {
        newErrors[field] = 'Ce champ est requis';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    if (formDonnees.images.length < 4) {
      alert('Veuillez ajouter au moins 4 images');
      return false;
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(prev => prev + 1);
      }
    } else if (currentStep === 2) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 3) {
      if (validateStep3()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
      const formDataToSend = new FormData();
      // Récupération des donées de base 
      formDataToSend.append('titre', formDonnees.titre);
      formDataToSend.append('type', formDonnees.type);
      formDataToSend.append('prix', formDonnees.prix);
      formDataToSend.append('ville', 'Casablanca');
      formDataToSend.append('surface', formDonnees.surface);
      formDataToSend.append('chambres', formDonnees.chambres);
      formDataToSend.append('description', formDonnees.description);
      formDataToSend.append('address', formDonnees.address);
      formDataToSend.append('latitude', formDonnees.latitude);
      formDataToSend.append('longtitude', formDonnees.longtitude);
      
      // Ajouter les équipements
      formDonnees.equipements.forEach(equipement => {
        formDataToSend.append('equipements[]', equipement.id);
      });

      // Ajouter les images
      formDonnees.images.forEach(image => {
        formDataToSend.append('images[]', image);
      });
      
      axios.post('/bien', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Réponse :', response.data);
        // Reset form data
        setFormDonnees({
          titre: '',
          type: '',
          prix: '',
          surface: '',
          chambres: '',
          description: '',
          address: '',
          ville: '',
          latitude: '',
          longtitude: '',
          equipements: [],
          images: []
        });
        setCurrentStep(1);
      })
      .catch(error => {
        console.error('Erreur :', error.response?.data || error.message);
      });
  };

  const updateFormData = (field, value) => {
    setFormDonnees(prev => ({
      ...prev,
      [field]: value
    }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const updateEquipements = (equipement) => {
    setFormDonnees((prevFormData) => {
      const isSelected = prevFormData.equipements.some(e => e.id === equipement.id);
  
      return {
        ...prevFormData,
        equipements: isSelected
          ? prevFormData.equipements.filter(e => e.id !== equipement.id) // Supprimer si déjà sélectionné
          : [...prevFormData.equipements, equipement], // Ajouter sinon
      };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormDonnees(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormDonnees(prev => ({
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
            value={formDonnees.titre}
            onChange={(e) => updateFormData('titre', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.titre ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Ex: Appartement T3 lumineux centre-ville"
          />
          {errors.titre && (
            <p className="mt-1 text-sm text-red-500">{errors.titre}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de bien
          </label>
          <select
            value={formDonnees.type}
            onChange={(e) => updateFormData('type', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.type ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionnez un type</option>
            <option value="apartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-500">{errors.type}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix
          </label>
          <input
            type="number"
            value={formDonnees.prix}
            onChange={(e) => updateFormData('prix', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.prix ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Prix en Dirham"
          />
          {errors.prix && (
            <p className="mt-1 text-sm text-red-500">{errors.prix}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Surface (m²)
          </label>
          <input
            type="number"
            value={formDonnees.surface}
            onChange={(e) => updateFormData('surface', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.surface ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Surface en m²"
          />
          {errors.surface && (
            <p className="mt-1 text-sm text-red-500">{errors.surface}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de chambres
          </label>
          <input
            type="number"
            placeholder='Ex: 3'
            value={formDonnees.chambres}
            onChange={(e) => updateFormData('chambres', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.chambres ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.chambres && (
            <p className="mt-1 text-sm text-red-500">{errors.chambres}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <input
            type="text"
            value={formDonnees.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder='Ex: Casablanca 123, rue de la Liberté'
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input
            type="number"
            placeholder='Ex: 33.5899'
            value={formDonnees.latitude}
            onChange={(e) => updateFormData('latitude', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.latitude ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.latitude && (
            <p className="mt-1 text-sm text-red-500">{errors.latitude}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longtitude
          </label>
          <input
            type="number"
            value={formDonnees.longtitude}
            onChange={(e) => updateFormData('longtitude', e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.longtitude ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder='Ex: -7.62763'
          />
          {errors.longtitude && (
            <p className="mt-1 text-sm text-red-500">{errors.longtitude}</p>
          )}
        </div>

      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formDonnees.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          className={`w-full p-2 border rounded-md h-32 ${
            errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Décrivez votre bien..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>
    </div>
  );

  const renderequipementsStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        Équipements et caractéristiques
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {equipementsList.map((equipement) => (
          <div
            key={equipement.id}
            onClick={() => updateEquipements(equipement)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              formDonnees.equipements.some(e => e.id === equipement.id)
                ? "bg-blue-50 border-blue-500"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formDonnees.equipements.some(e => e.id === equipement.id)}
                onChange={() => updateEquipements(equipement)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-gray-700 capitalize">
                {equipement.nom}
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
            PNG, JPG jusqu'à 10MB (minimum 4 images requises)
          </p>
        </div>
      </div>

      {formDonnees.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {formDonnees.images.map((image, index) => (
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
                <X className="w-4 h-4" />
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
        <form method="post">
          <div className="mt-8">
            {currentStep === 1 && renderBasicInfoStep()}
            {currentStep === 2 && renderequipementsStep()}
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
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentStep === 3 ? 'Publier' : 'Suivant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}