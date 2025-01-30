import React, { useState } from 'react';

const ConversationPage = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Appartement T3 - Centre Ville",
      address: "123 rue de la Paix, 75000 Paris",
      price: "250 000 €",
      conversations: [
        {
          id: 1,
          contact: "Marie Dupont",
          email: "marie.dupont@example.com",
          phone: "06 12 34 56 78",
          unread: 2,
          messages: [
            {
              id: 1,
              sender: "Marie Dupont",
              content: "Bonjour, je suis intéressée par votre appartement. Est-il toujours disponible ?",
              timestamp: "2024-01-28T10:30:00",
              isOwner: false
            },
            {
              id: 2,
              sender: "Vous",
              content: "Bonjour Marie, oui l'appartement est toujours disponible ?",
              timestamp: "2024-01-28T11:45:00",
              isOwner: true
            }
          ],
          lastMessage: "2024-01-28T11:45:00"
        },
        {
          id: 2,
          contact: "Pierre Martin",
          email: "pierre.martin@example.com",
          phone: "06 23 45 67 89",
          unread: 1,
          messages: [
            {
              id: 1,
              sender: "Pierre Martin",
              content: "Bonjour, quel est le montant des charges mensuelles ?",
              timestamp: "2024-01-29T14:20:00",
              isOwner: false
            }
          ],
          lastMessage: "2024-01-29T14:20:00"
        }
      ]
    },
    {
      id: 2,
      name: "Villa avec Piscine - Bordeaux",
      address: "45 avenue des Pins, 33000 Bordeaux",
      price: "450 000 €",
      conversations: [
        {
          id: 3,
          contact: "Sophie Bernard",
          email: "sophie.b@example.com",
          phone: "06 34 56 78 90",
          unread: 0,
          messages: [
            {
              id: 1,
              sender: "Sophie Bernard",
              content: "La piscine est-elle chauffée ?",
              timestamp: "2024-01-27T09:15:00",
              isOwner: false
            },
            {
              id: 2,
              sender: "Vous",
              content: "Oui, la piscine est équipée d'un système de chauffage solaire.",
              timestamp: "2024-01-27T10:30:00",
              isOwner: true
            }
          ],
          lastMessage: "2024-01-27T10:30:00"
        }
      ]
    },
    {
      id: 3,
      name: "Appartement T3 - Centre Ville",
      address: "123 rue de la Paix, 75000 Paris",
      price: "250 000 €",
      conversations: [
        {
          id: 1,
          contact: "Marie Dupont",
          email: "marie.dupont@example.com",
          phone: "06 12 34 56 78",
          unread: 2,
          messages: [
            {
              id: 1,
              sender: "Marie Dupont",
              content: "Bonjour, je suis intéressée par votre appartement. Est-il toujours disponible ?",
              timestamp: "2024-01-28T10:30:00",
              isOwner: false
            },
            {
              id: 2,
              sender: "Vous",
              content: "Bonjour Marie, oui l'appartement est toujours disponible ?",
              timestamp: "2024-01-28T11:45:00",
              isOwner: true
            }
          ],
          lastMessage: "2024-01-28T11:45:00"
        },
        {
          id: 2,
          contact: "Pierre Martin",
          email: "pierre.martin@example.com",
          phone: "06 23 45 67 89",
          unread: 1,
          messages: [
            {
              id: 1,
              sender: "Pierre Martin",
              content: "Bonjour, quel est le montant des charges mensuelles ?",
              timestamp: "2024-01-29T14:20:00",
              isOwner: false
            }
          ],
          lastMessage: "2024-01-29T14:20:00"
        }
      ]
    },
    {
      id: 4,
      name: "Villa avec Piscine - Bordeaux",
      address: "45 avenue des Pins, 33000 Bordeaux",
      price: "450 000 €",
      conversations: [
        {
          id: 3,
          contact: "Sophie Bernard",
          email: "sophie.b@example.com",
          phone: "06 34 56 78 90",
          unread: 0,
          messages: [
            {
              id: 1,
              sender: "Sophie Bernard",
              content: "La piscine est-elle chauffée ?",
              timestamp: "2024-01-27T09:15:00",
              isOwner: false
            },
            {
              id: 2,
              sender: "Vous",
              content: "Oui, la piscine est équipée d'un système de chauffage solaire.",
              timestamp: "2024-01-27T10:30:00",
              isOwner: true
            }
          ],
          lastMessage: "2024-01-27T10:30:00"
        }
      ]
    }
  ]);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const updatedProperties = properties.map(property => {
      if (property.id === selectedProperty.id) {
        const updatedConversations = property.conversations.map(conv => {
          if (conv.id === selectedConversation.id) {
            return {
              ...conv,
              messages: [...conv.messages, {
                id: conv.messages.length + 1,
                sender: "Vous",
                content: newMessage,
                timestamp: new Date().toISOString(),
                isOwner: true
              }],
              lastMessage: new Date().toISOString()
            };
          }
          return conv;
        });
        return { ...property, conversations: updatedConversations };
      }
      return property;
    });

    setProperties(updatedProperties);
    setNewMessage('');
  };

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.conversations.some(conv => 
      conv.contact.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="h-[calc(100vh-72px)] bg-gray-50">
      <div className="h-full flex">
        {/* Panneau de gauche : Liste des biens et conversations */}
        <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
          {/* En-tête fixe */}
          <div className="shrink-0 p-4 border-b border-gray-200 bg-white">
            <h1 className="text-xl font-bold text-gray-900">Mes biens</h1>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Rechercher un bien ou un contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          {/* Zone de défilement des biens */}
          <div className="overflow-y-auto flex-1">
            {filteredProperties.map((property) => (
              <div key={property.id} className="border-b border-gray-200">
                {/* En-tête du bien (fixe dans son conteneur) */}
                <div 
                  className="sticky top-0 p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 z-10"
                  onClick={() => setSelectedProperty(property)}
                >
                  <h2 className="font-semibold text-gray-900">{property.name}</h2>
                  <p className="text-sm text-gray-500">{property.price}</p>
                  <p className="text-xs text-gray-500">{property.address}</p>
                </div>
                
                {/* Liste des conversations du bien (défilante) */}
                <div className="max-h-[300px] overflow-y-auto">
                  {property.conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        setSelectedProperty(property);
                        setSelectedConversation(conversation);
                      }}
                      className={`p-4 border-t border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{conversation.contact}</h3>
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.messages[conversation.messages.length - 1]?.content}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500">
                            {formatDate(conversation.lastMessage)}
                          </span>
                          {conversation.unread > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone de conversation (panneau de droite) */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* En-tête fixe de la conversation */}
            <div className="shrink-0 p-4 border-b border-gray-200 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{selectedProperty.name}</h2>
                  <p className="text-sm text-gray-600">Contact: {selectedConversation.contact}</p>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>Email: {selectedConversation.email}</p>
                    <p>Téléphone: {selectedConversation.phone}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <p>{selectedProperty.price}</p>
                  <p className="text-xs">{selectedProperty.address}</p>
                </div>
              </div>
            </div>

            {/* Zone de messages avec défilement */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwner ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isOwner
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {message.sender}
                    </div>
                    <div className="text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.isOwner ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie fixe */}
            <div className="shrink-0 p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
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
    </div>
  );
};

export default ConversationPage;