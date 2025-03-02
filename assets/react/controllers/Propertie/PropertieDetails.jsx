import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Heart,
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    Home,
    CirclePlus,
    Share2,
    AirVent,
    Wifi,
    CookingPot,
    WashingMachine,
    Tv,
    MonitorSmartphone,
    WavesLadder,
    Fence,
    Cookie,
    Merge,
    SquareParking,
    ServerCog,
    Dog,
    Facebook,
    Mail,
    Copy,
    Twitter,
    Linkedin
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L, { polygon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from "framer-motion";

export default function PropertyDetails({propertie, user}) {
    const [activeImage, setActiveImage] = useState(0);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const bien = JSON.parse(propertie);
    const equipements = {
        "Climatisation et Chauffage": AirVent,
        "Internet Haut Débit": Wifi,
        "Cuisine Équipée": CookingPot,
        "Machine à Laver et Sèche-Linge": WashingMachine,
        "Télévision": Tv,
        "Espace de Bureau": MonitorSmartphone,
        "Piscine": WavesLadder,
        "Jardin avec Terrasse et Mobilier de Jardin": Fence,
        "Barbecue et Cuisine Extérieure": Cookie,
        "Balcon ou Terrasse Privée": Merge,
        "Garage": SquareParking,
        "Service de Ménage": ServerCog,
        "Animaux_acceptés": Dog
    };

    // Vérifier si l'élément est déjà favori au chargement
    useEffect(() => {
        fetch(`/favori/check/${bien.id}`)
            .then((res) => res.json())
            .then((data) => setIsFavorited(data.isFavorited));
    }, []);

    // Définition de l'icône personnalisée
    const customIcon = L.icon({
        iconUrl: '/images/house-location.png',
        iconSize: [30, 30],
        iconAnchor: [20, 20],
        popupAnchor: [0, -40],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);
    
        try {
            const response = await fetch('/message', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                sender_id: user.id,
                bien_id: bien.id,
                contenu: message
                }),
          });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Une erreur est survenue');
            }
        
            setSuccess(true);
            setMessage('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
      };

    // URL du bien à partager
    const propertyUrl = `${window.location.origin}/property/${bien.id}`;

    // Copier le lien dans le presse-papiers
    const handleCopyLink = () => {
        navigator.clipboard.writeText(propertyUrl);
        setShowShareOptions(false); // Fermer le menu après l'action
    };

    // Partager sur les réseaux sociaux
    const shareOnSocialMedia = (platform) => {
        let url = '';
        switch (platform) {
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`;
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent(`Découvrez ce bien : ${bien.titre}`)}`;
            break;
        case 'linkedin':
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(propertyUrl)}`;
            break;
        default:
            break;
        }
        window.open(url, '_blank');
        setShowShareOptions(false); // Fermer le menu après l'action
    };

    // Partager par email
    const shareByEmail = () => {
        const subject = encodeURIComponent(`Découvrez ce bien : ${bien.titre}`);
        const body = encodeURIComponent(`Bonjour, je vous invite à découvrir ce bien : ${propertyUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        setShowShareOptions(false); // Fermer le menu après l'action
    };

    // Sauvegarder le bien
    const handleSauvgarder = async (id) => {
        // envoi de la requête pour sauvegarder le bien via l'API avec axios
        const response = await axios.post(`/favori/${id}`, { id });
        if (response.status === 200) {
            setIsFavorited(!isFavorited);
        }

        // en cas d'erreur
        if (response.status === 400) {
            console.log('Une erreur est survenue lors de la sauvegarde du bien');
        }
    };

  return (
    <>
        <div className="max-w-7xl mx-auto px-4 py-8 relative">
            {/* En-tête avec actions */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{bien.titre}</h1>
                <div className="flex gap-4">
                <button 
                    onClick={() => {handleSauvgarder(bien.id)}}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                     <motion.div
                        animate={{ scale: isFavorited ? 1.2 : 1, opacity: isFavorited ? 1 : 0.6 }}
                        transition={{ duration: 0.3, ease: "easeIn" }}
                    >
                        <Heart 
                            color={isFavorited ? "red" : "gray"} 
                            fill={isFavorited ? "red" : "none"} 
                            className="h-5 w-5"
                        />
                    </motion.div>
                    Sauvegarder
                </button>
                <button 
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                    Partager
                </button>
                </div>
            </div>

            {/* Galerie d'images */}
            <div className="mb-12">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 row-span-2">
                        <img 
                        src={`/uploads/${bien.images[0].url}`}
                        alt="Image principale" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <img 
                        src={`/uploads/${bien.images[1].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <img 
                        src={`/uploads/${bien.images[2].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <img 
                        src={`/uploads/${bien.images[3].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="relative">
                        <img 
                        src={`/uploads/${bien.images[4].url}`}
                        alt="Image secondaire" 
                        className="w-full h-full object-cover rounded-lg"
                        />
                        <button 
                        className="absolute bottom-4 right-4 px-2 py-2 rounded-lg shadow-lg bg-gray-50 text-black transition-colors"
                        >
                            <CirclePlus />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex md:grid md:grid-cols-3 md:gap-8">
                <div className="col-span-2">
                    {/* Informations principales */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="h-5 w-5" />
                        <span>{bien.adresse}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <BedDouble className="h-8 w-8 mb-2" />
                            <p className="font-semibold">{bien.chambres} chambres</p>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <Bath className="h-8 w-8 mb-2" />
                            <p className="font-semibold">2 salles de bain</p>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <Ruler className="h-8 w-8 mb-2" />
                            <p className="font-semibold">{bien.surface} m²</p>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center">
                            <Home className="h-8 w-8 mb-2" />
                            <p className="font-semibold">{bien.type}</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {bien.description}
                        Magnifique villa moderne située dans un quartier prisé de Nice, offrant une vue imprenable sur la mer Méditerranée. Cette propriété d'exception de 200m² dispose de 4 chambres spacieuses, 3 salles de bain luxueuses et de nombreux équipements haut de gamme. La villa bénéficie d'une exposition sud-ouest idéale et d'un jardin paysager de 800m².
                        </p>
                    </div>

                    {/* Équipements */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Équipements</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {bien.equipements.map((equipement) => {
                                const IconComponent = equipements[equipement.nom];

                                return (
                                    <div key={equipement.id} className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                                        {IconComponent ? <IconComponent className="w-8 h-8" /> : null}
                                        <span>{equipement.nom}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
                {/* Formulaire de contact */}
                <div className="relative">
                    {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                    )}
                    
                    {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        Message envoyé avec succès !
                    </div>
                    )}
                    <form onSubmit={handleSubmit} className="sticky top-8 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                        <h3 className="text-xl font-semibold mb-4">Contacter le propriétaire</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nom</label>
                                <input 
                                    type="text"
                                    placeholder="Votre nom"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors ${user ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    value={user ? `${user.nom} ${user.prenom}` : ''}
                                    disabled={!!user} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input 
                                    type="email"
                                    placeholder="Votre email"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors ${user ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    value={user ? user.email : ''}
                                    disabled={!!user} 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Téléphone</label>
                                <input 
                                    type="tel"
                                    placeholder="Votre téléphone"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors ${user ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    value={user ? user.phone : ''}
                                    disabled={!!user} 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea 
                                placeholder="Votre message"
                                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:gray-500 outline-none transition-colors resize-none"
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Où se situe le logement */}
            <div className='mt-8'>
                <h2 className="text-2xl font-semibold mb-4">Où se situe le logement</h2>
                <div className="h-[400px] rounded-lg overflow-hidden mx-auto">
                    <MapContainer 
                        center={[bien.latitude, bien.longtitude]} 
                        zoom={17} 
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                        className="shadow-lg border border-gray-200 mx-auto"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker 
                            position={[bien.latitude, bien.longtitude]}
                            icon={customIcon}
                        >
                        </Marker>
                        <Circle 
                            center={[bien.latitude, bien.longtitude]}
                            radius={50}
                            pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
                        />
                    </MapContainer>
                </div>
            </div>


            {/* Menu déroulant des options de partage */}
            {showShareOptions && (
                <div className="absolute right-0 top-[80px] mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                        <button
                            onClick={handleCopyLink}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                            <Copy className="h-5 w-5" />
                            Copier le lien
                        </button>
                        <button
                            onClick={shareByEmail}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                            <Mail className="h-5 w-5" />
                            Envoyer par email
                        </button>
                        <button
                            onClick={() => shareOnSocialMedia('facebook')}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                            <Facebook className="h-5 w-5 text-blue-600" />
                            Partager sur Facebook
                        </button>
                        <button
                            onClick={() => shareOnSocialMedia('twitter')}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                            <Twitter className="h-5 w-5 text-blue-400" />
                            Partager sur Twitter
                        </button>
                        <button
                            onClick={() => shareOnSocialMedia('linkedin')}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                            <Linkedin className="h-5 w-5 text-blue-700" />
                            Partager sur LinkedIn
                        </button>
                    </div>
                </div>
            )}

        </div>
    </>
  );
};