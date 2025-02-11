import { useState, useEffect } from 'react';
import Sidebar from './SideBar';

export default function Users({ data }) {
  const users = JSON.parse(data);

  console.log(users);

  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const usersPerPage = 5;

  useEffect(() => {
    let filteredUsers = users.filter((user) => {
      if (selectedTab === 'all') return true;
      return user.role.toLowerCase() === selectedTab.toLowerCase();
    });

    filteredUsers = filteredUsers.filter((user) =>
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * usersPerPage;
    const paginated = filteredUsers.slice(startIndex, startIndex + usersPerPage);
    setPaginatedUsers(paginated);
  }, [selectedTab, searchQuery, currentPage]);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

        <div className="ms-64 mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            {/* Navbar */}
            <div className="bg-white shadow mb-4 rounded-lg p-4 flex justify-between items-center">
                {/* Role Filter Buttons */}
                <div className="flex space-x-4">
                    <button
                    onClick={() => setSelectedTab('all')}
                    className={`px-4 py-2 rounded-lg text-sm ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                    Tous
                    </button>
                    <button
                    onClick={() => setSelectedTab('admin')}
                    className={`px-4 py-2 rounded-lg text-sm ${selectedTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                    Admin
                    </button>
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rechercher par nom ou email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biens</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                    className="h-10 w-10 rounded-full"
                                    src={user.profileImages || '/uploads/profile/default-avatar.jpeg'}
                                    alt="Profile"
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                    {user.nom || 'N/A'} {user.prenom || 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                    {user.email || 'N/A'}
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.roles && user.roles[0] === 'ROLE_ADMIN'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                                >
                                {user.roles[0] || 'N/A'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="relative">
                                <button className="text-blue-600 hover:text-blue-800">
                                    <i className="fas fa-info-circle"></i>
                                    {user.property_count || 0}
                                </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                                >
                                {user.status ? 'Actif' : 'Inactif'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex gap-2">
                                <button className="text-indigo-600 hover:text-indigo-900">
                                    Modifier
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => alert('Supprimer le membre')}
                                >
                                    Supprimer
                                </button>
                                </div>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 py-4 px-6 bg-gray-50">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50">
            Précédent
          </button>
          <span className="text-sm text-gray-600">{`Page ${currentPage} sur ${totalPages}`}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
