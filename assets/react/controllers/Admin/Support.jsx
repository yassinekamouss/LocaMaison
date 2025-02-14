import React, { useState } from 'react';
import { format } from 'date-fns';
import SideBar from './SideBar';
import { Search, Filter, Mail, MailOpen, Clock, CheckCircle, XCircle, X, Sidebar } from 'lucide-react';

export default function Support({data}) {
    const contacts = JSON.parse(data);
    
    const [messages, setMessages] = useState(contacts);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [replyFilter, setReplyFilter] = useState("all");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const filteredMessages = messages.filter(message => {
        const matchesSearch = message.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || message.status === statusFilter;
        const matchesReply = replyFilter === "all" || 
                            (replyFilter === "replied" && message.isReplied) ||
                            (replyFilter === "unreplied" && !message.isReplied);

        return matchesSearch && matchesStatus && matchesReply;
    });

    const markAsRead = async (id) => {
        try {
            const response = await fetch(`/contacts/${id}/mark-read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ status: 'read' }) // Ajout du body
            });
    
            if (!response.ok) throw new Error('Erreur lors du marquage comme lu');
    
            setMessages(messages.map(msg => 
                msg.id === id ? { ...msg, status: "read" } : msg
            ));
        } catch (err) {
            setError(err.message);
            console.error('Erreur:', err);
        }
    };
    

    const handleReplyClick = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
        setReplyContent("");
    };

    const handleSendReply = async () => {
        if (!replyContent.trim()) return;
        
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await fetch(`/contacts/${selectedMessage.id}/reply`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              content: replyContent,
              messageId: selectedMessage.id,
              recipientEmail: selectedMessage.email,
              subject: `Re: ${selectedMessage.subject}`
            })
          });
    
          if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de la réponse');
          }
    
          // Mise à jour locale du message
          setMessages(messages.map(msg => 
            msg.id === selectedMessage.id 
              ? { ...msg, isReplied: true, status: 'read' } 
              : msg
          ));
    
          // Fermer le modal et réinitialiser les états
          setShowModal(false);
          setSelectedMessage(null);
          setReplyContent("");
          
        } catch (err) {
          setError(err.message);
          alert('Erreur lors de l\'envoi de la réponse: ' + err.message);
        } finally {
          setIsLoading(false);
        }
    };

    return (
        <div>
            <SideBar />

            {/* contenu principale */}
            <div className="ms-64 min-h-screen bg-gray-50 p-8">
                {/* En-tête et filtres */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages de Contact</h1>
                    
                    <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow">
                        <div className="flex-1 min-w-[300px] relative">
                            <input
                            type="text"
                            placeholder="Rechercher par nom, email ou sujet..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        <div className="flex gap-4">
                            <select
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            >
                            <option value="all">Tous les statuts</option>
                            <option value="read">Lus</option>
                            <option value="unread">Non lus</option>
                            </select>

                            <select
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={replyFilter}
                            onChange={(e) => setReplyFilter(e.target.value)}
                            >
                            <option value="all">Toutes les réponses</option>
                            <option value="replied">Répondus</option>
                            <option value="unreplied">Non répondus</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des messages */}
                <div className="space-y-4">
                    {filteredMessages.map(message => (
                    <div
                        key={message.id}
                        className={`bg-white rounded-lg shadow p-6 transition-all ${
                        message.status === "unread" ? "border-l-4 border-blue-500" : ""
                        }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{message.nom}</h3>
                                <p className="text-sm text-gray-600">{message.email}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                {format(new Date(message.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-medium text-gray-800 mb-2">{message.sujet}</h4>
                            <p className="text-gray-600">{message.message}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {message.status === "unread" ? (
                                <Mail className="h-5 w-5 text-blue-500" />
                                ) : (
                                <MailOpen className="h-5 w-5 text-gray-400" />
                                )}
                                <span className="text-sm text-gray-600">
                                {message.status === "unread" ? "Non lu" : "Lu"}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                {message.status === "unread" && (
                                <button
                                    onClick={() => markAsRead(message.id)}
                                    className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    Marquer comme lu
                                </button>
                                )}
                                
                                {!message.isReplied && (
                                <button
                                    onClick={() => handleReplyClick(message)}
                                    className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                    Répondre
                                </button>
                                )}
                                
                                {message.isReplied && (
                                <span className="flex items-center gap-1 text-sm text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    Répondu
                                </span>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Modal de réponse */}
                {showModal && selectedMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                            Répondre à {selectedMessage.nom}
                            </h2>
                            <button
                            onClick={() => setShowModal(false)}
                            className="text-gray-500 hover:text-gray-700"
                            >
                            <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Email :</strong> {selectedMessage.email}</p>
                            <p><strong>Sujet :</strong> {selectedMessage.sujet}</p>
                            <p><strong>Message original :</strong></p>
                            <p className="bg-gray-50 p-3 rounded">{selectedMessage.message}</p>
                        </div>
                        </div>

                        <div className="p-6 flex-1 overflow-auto">
                        <textarea
                            placeholder="Écrivez votre réponse ici..."
                            className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                        />
                        </div>

                        <div className="p-6 border-t flex justify-end gap-4">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSendReply}
                            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!replyContent.trim()}
                        >
                            Envoyer
                        </button>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
}