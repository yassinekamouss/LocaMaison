import React from 'react';
import { MapPin } from 'lucide-react';

export default function RentalList({ rentals }){

    return (
        <div className="container mx-auto  mt-8 grid md:grid-cols-4 gap-6 -z-30">
          {rentals.length > 0 ? (
            rentals.map((rental) => (
              <div key={rental.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden transform transition duration-300 hover:scale-105">
                  <img
                    src="/images/house.jpg"
                    alt="House Image"
                    className="h-full w-auto object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold mb-2">{rental.title}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{rental.location}</span>
                    </div>
                    <span className="font-bold text-blue-600">{rental.price} MAD/mois</span>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>{rental.bedrooms} chambres</span>
                    <span>{rental.type}</span>
                  </div>
                </div>
              </div>            
            ))
          ) : (
            <p className="text-gray-500 col-span-full">Aucune propriété trouvée.</p>
          )}
        </div>
    );
};