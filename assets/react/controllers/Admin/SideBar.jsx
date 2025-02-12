import React, { useEffect, useState } from "react";
import { Home, Users, Building, ShoppingCart, LogOut } from "lucide-react";

export default function Sidebar() {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
    { name: "Utilisateurs", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Biens", path: "/admin/biens", icon: <Building size={20} /> },
    { name: "Commandes", path: "/orders", icon: <ShoppingCart size={20} /> },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 bg-gradient-to-b from-white to-gray-50 shadow-xl w-64 flex flex-col p-6 m-4 rounded-xl border border-gray-100 transform transition-all duration-300 hover:shadow-3xl">
      {/* LOGO */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <img
          src="/images/Capture d'écran 2025-01-25 194736.png"
          alt="Logo"
          className="h-12 w-auto transform transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 mt-20 space-y-4">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg transition-all duration-300 ${
              activePath === item.path
                ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 font-semibold shadow-sm"
                : "hover:text-blue-600"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="ml-3">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={() => {
            window.location.href = "/logout";
          }}
        >
          <LogOut size={20} className="transform transition-all duration-300 hover:rotate-12" />
          <span className="ml-2">Déconnexion</span>
        </button>
      </div>
    </aside>
);
}
