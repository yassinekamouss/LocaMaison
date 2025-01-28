import { CircleUserRound, LogOut, ExternalLink, LockOpen } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ isAuthenticated }) {
    const [dropdownOpen, setDropdownOpen] = useState(false); // État pour le menu déroulant

    return (
        <nav className="shadow-sm w-full bg-white">
            <div className="container mx-auto p-3 flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="text-3xl font-semibold text-gray-800 hover:text-gray-600">
                    <img src="images/Capture d'écran 2025-01-25 194736.png" alt="Logo" className="h-12 w-auto" />
                </a>

                {/* Profil */}
                <div className="space-x-6 flex items-center relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)} // Inverser l'état
                        className="text-gray-600 text-md cursor-pointer"
                    >
                        <span className="flex items-center bg-gray-100 rounded-2xl px-2 py-1">
                            <CircleUserRound className="w-7 h-7 me-1" />
                            Profil
                        </span>
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div
                            className="absolute top-12 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
                        >
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <div>Yassine Kamouss</div>
                                <div className="font-medium truncate">yassine76@gmail.com</div>
                            </div>
                            {isAuthenticated && (
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes Annonces</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                                    </li>
                                </ul>
                            )}
                            <div className="py-2">
                                {isAuthenticated ? (
                                    <a href="/logout" className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                                        <span className="flex items-center">
                                            <LogOut />
                                            Sign out
                                        </span>
                                    </a>
                                ) : (
                                    <>
                                        <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <span className="flex items-center">
                                                <ExternalLink className="w-5 h-5 me-1" />
                                                Connexion
                                            </span>
                                        </a>
                                        <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <span className="flex items-center">
                                                <LockOpen className="w-5 h-5 me-1" />
                                                S'inscrire
                                            </span>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
