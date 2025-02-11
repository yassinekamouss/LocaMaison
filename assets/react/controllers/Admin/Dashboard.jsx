import React, { useState, useEffect } from 'react';
import { Home, CheckCircle, Users, Eye } from 'lucide-react';
import StatsCard from './StatsCard';
import DashboardCharts from './DashboardCharts';
import Sidebar from './SideBar';

export default function Dashboard ({data}) {
  const dashboardData = JSON.parse(data);

return (
    <div className='min-h-screen bg-gray-50'>
        <Sidebar />
        <div className='ml-64 p-8'>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                          <Home className="w-6 h-6" />
                      </div>
                      <div className="ml-4">
                          <h2 className="text-gray-600 text-sm">Total Biens</h2>
                          <p className="text-2xl font-semibold text-gray-800">{dashboardData.stats.totalProperties}</p>
                      </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-500">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Biens Actifs</h2>
                            <p className="text-2xl font-semibold text-gray-800">{dashboardData.stats.activeProperties}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Utilisateurs</h2>
                            <p className="text-2xl font-semibold text-gray-800">{dashboardData.stats.totalUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                            <Eye className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-gray-600 text-sm">Visites aujourd'hui</h2>
                            <p className="text-2xl font-semibold text-gray-800">{dashboardData.stats.dailyVisits}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            {dashboardData.cityData && dashboardData.propertyData ? (
              <DashboardCharts
                propertyData={dashboardData.propertyData}
                cityData={dashboardData.cityData}
              />
            ) : (
              <p>Chargement des données...</p>
            )}

            {/* <!-- Recent Activities --> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* <!-- Recent Users --> */}
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Derniers utilisateurs inscrits</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {dashboardData.recentUsers && dashboardData.recentUsers.map((user, index) => (
                        <div className='flex justify-between items-center'>
                          <div className="flex items-center" key={user.id}>
                            <img
                              src={user.profile_image || "/uploads/profile/default-avatar.jpeg"} 
                              className="w-10 h-10 rounded-full"
                              alt="User"
                            />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">{user.nom} {user.prenom}</p>
                              <p className="text-sm text-gray-500">{user.createdAt}</p>  {/* Assure-toi que `timeAgo` est dans le bon format */}
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              className="ml-auto text-black p-2 flex items-center justify-center transform bg-gray-100 rounded-xl hover:bg-gray-300 overflow-hidden"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                                <Eye className="mr-2" size={20} />
                              <span className="font-semibold text-sm">Voir Plus</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>


                {/* <!-- Recent Properties --> */}
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Derniers biens ajoutés</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Affichage dynamique des propriétés récentes */}
                      {dashboardData.recentProperties &&  (
                        dashboardData.recentProperties.map((property, index) => (
                          <div className='flex justify-between items-center'>
                            <div key={property.id} className="flex items-center">
                              <img
                                src={property.imageUrl || "/images/house-location.png"}
                                className="w-10 h-10 rounded object-cover"
                                alt="Property"
                              />
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{property.titre}</p>
                                <p className="text-sm text-gray-500">
                                  {property.createdAt || 'Ajouté récemment'}
                                </p>
                              </div>
                            </div>
                            <div className="relative">
                              <button
                                className="ml-auto text-black p-2 flex items-center justify-center transform bg-gray-100 rounded-xl hover:bg-gray-300 overflow-hidden"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                                  <Eye className="mr-2" size={20} />
                                <span className="font-semibold text-sm">Voir Plus</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

            </div>
        </div>
    </div>
  );
};