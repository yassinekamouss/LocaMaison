import React, { useState } from 'react';
import Navbar from './Navbar';

const ConversationPage = ({ data, userId }) => {
  const conversations = JSON.parse(data);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
  
    const messageData = {
      sender_id: userId,
      receiver_id: selectedConversation.user.id,
      bien_id: selectedConversation.bien.id,
      contenu: newMessage,
    };
  
    try {
      const response = await fetch('/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });
  
      if (response.ok) {
        const savedMessage = await response.json();
  
        const updatedConversation = {
          ...selectedConversation,
          messages: [
            ...selectedConversation.messages,
            {
              id: savedMessage.id,
              sender: { id: userId, nom: "Moi", prenom: "Moi" },
              contenu: newMessage,
              created_at: savedMessage.created_at
            }
          ]
        };
  
        // Trier les messages par date
        const updatedMessages = [...updatedConversation.messages].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
  
        setSelectedConversation({ ...updatedConversation, messages: updatedMessages });
        setNewMessage('');
      } else {
        console.error("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };
  
  

  return (
    <>
      <Navbar isAuthenticated={true} widthLimitation={false} />
      <div className="h-[calc(100vh-72px)] bg-gray-50 flex">
        {/* Panneau de gauche : Liste des conversations */}
        <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h1 className="text-xl font-bold text-gray-900">📩 Mes Conversations</h1>
          </div>

          <div className="overflow-y-auto flex-1">
            {conversations.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">Aucune conversation.</p>
            ) : (
              conversations.map((conv, index) => (
                <div
                  key={index}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                    selectedConversation?.bien.id === conv.bien.id &&
                    selectedConversation?.user.id === conv.user.id
                      ? "bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <h3 className="font-medium text-gray-900">
                    {conv.user.nom} {conv.user.prenom}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{conv.messages.at(-1).contenu}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(conv.messages.at(-1).created_at)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Panneau de droite : Affichage des messages */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* En-tête de la conversation */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-4">
              {/* Icône dynamique selon le type de bien */}
              <span className="text-3xl">
                {(() => {
                  const type = selectedConversation.bien.type.toLowerCase();
                  if (type.includes("appartement")) return "🏢";
                  if (type.includes("maison")) return "🏠";
                  if (type.includes("villa")) return "🏡";
                  if (type.includes("studio")) return "🏬";
                  if (type.includes("terrain")) return "🌿";
                  return "🏗️"; // Icône par défaut pour un type inconnu
                })()}
              </span>

              <div>
                {/* Nom de l'interlocuteur */}
                <h2 className="text-lg font-medium text-gray-900">
                  {selectedConversation.user.nom} {selectedConversation.user.prenom}
                </h2>

                {/* Titre du bien */}
                <p className="text-sm font-semibold text-blue-600">
                  {selectedConversation.bien.titre}
                </p>

                {/* Informations supplémentaires */}
                <p className="text-xs text-gray-500">
                  📍 {selectedConversation.bien.adresse}, {selectedConversation.bien.ville} | 💰{" "}
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "MAD",
                  }).format(selectedConversation.bien.prix)}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {selectedConversation.messages
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-2 ${
                    message.sender.id === userId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 max-w-xs rounded-lg ${
                      message.sender.id === userId
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.contenu}</p>
                    <span className="text-xs opacity-75">
                      {formatDate(message.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez un message..."
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ConversationPage;
