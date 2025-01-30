import { MapPin } from 'lucide-react';

export default function ListBiens({ rentals }){

    return (
      <>
        <div className="container mx-auto  mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 -z-30">
          {rentals.length > 0 ? (
            rentals.map((rental) => (
              <div
                  key={rental.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
                >
                <div className="relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <a href={`/propertie/${rental.id}`}>  
                    <img
                      src="/images/phil-hearing-IYfp2Ixe9nM-unsplash.jpg"
                      alt="House Image"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </a>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{rental.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{rental.location}</span>
                    </div>
                    <span className="font-semibold text-lg text-gray-600">{rental.price} MAD/mois</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{rental.bedrooms}</span>
                      <span>chambres</span>
                    </div>
                    <span className="bg-gray-400 text-white text-xs font-medium px-3 py-1 rounded-full shadow">{rental.type}</span>
                  </div>
                </div>
              </div>
          
            ))
          ) : (
            <p className="text-gray-500 col-span-full mx-auto">Aucune propriété trouvée.</p>
          )}

        </div>
      </>
    );
};