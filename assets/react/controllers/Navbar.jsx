import { CircleUserRound, LogOut, ExternalLink, LockOpen } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ isAuthenticated, widthLimitation }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="shadow-sm w-full bg-white sticky top-0 left-0 z-50">
            <div className={`mx-auto p-3 flex justify-between items-center ${widthLimitation ? "max-w-7xl" : "px-20"}`}>
                {/* Logo */}
                <a href="/" className="text-3xl font-semibold text-gray-800 hover:text-gray-600">
                    <img src="/images/Capture d'écran 2025-01-25 194736.png" alt="Logo" className="h-12 w-auto" />
                </a>

                {/* Profil */}
                <div className="space-x-6 flex items-center relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-gray-600 text-md cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <span className="flex items-center">
                        <CircleUserRound className="w-10 h-10" />
                    </span>
                </button>


                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div
                            className="absolute top-12 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44"
                        >
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <div>LocaMaison</div>
                                <div className="font-medium truncate">Louez. Vivez. Profitez.</div>
                            </div>
                            {isAuthenticated && (
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <a href="/annonces" className="block px-4 py-2 hover:bg-gray-100">Mes Annonces</a>
                                    </li>
                                    <li>
                                        <a href="/messages" className="block px-4 py-2 hover:bg-gray-100">Mes Conversations</a>
                                    </li>
                                    <li>
                                        <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
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
