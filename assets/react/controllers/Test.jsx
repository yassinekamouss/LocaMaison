import React, { useState } from "react";

export default function Messages({ isAuthenticated, data }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const conversations = JSON.parse(data);

  if (!isAuthenticated) {
    return (
      <p className="text-center text-gray-500">
        Vous devez être connecté pour voir vos messages.
      </p>
    );
  }

  return (
    <div className="h-[calc(100vh-72px)] bg-gray-50 flex">
      {/* Panneau de gauche */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold text-gray-900">Mes conversations</h1>
        </div>

        <div className="overflow-y-auto flex-1">
          {conversations.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              Aucune conversation.
            </p>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  selectedConversation?.id === conv.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedConversation(conv)}>
                <h3 className="font-medium text-gray-900">{conv.sender.nom}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {conv.dernierMessage}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(conv.dateMessage).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Panneau de droite */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-medium text-gray-900">
              {selectedConversation.sender.nom}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedConversation.bien.titre}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <p className="text-center text-gray-500">
              Affichage des messages à venir...
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">
            Sélectionnez une conversation pour commencer
          </p>
        </div>
      )}
    </div>
  );
}
