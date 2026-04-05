import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { Send, MessageCircle, ChevronDown, User, Circle } from 'lucide-react';

/**
 * MessagePanel - Collapsible chat panel for engineer-farmer communication.
 * Shows contacts list and conversation view.
 */
const MessagePanel = () => {
    const { user } = useAuth();
    const { t, isRTL } = useLanguage();
    const [contacts, setContacts] = useState([]);
    const [activeContact, setActiveContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const pollRef = useRef(null);

    // Fetch contacts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const { data } = await api.get('/collab/contacts/list');
                setContacts(data);
            } catch (err) {
                console.error('Failed to fetch contacts', err);
            }
        };
        fetchContacts();
        const interval = setInterval(fetchContacts, 15000);
        return () => clearInterval(interval);
    }, []);

    // Fetch messages when active contact changes
    useEffect(() => {
        if (!activeContact) return;
        const fetchMessages = async () => {
            try {
                const { data } = await api.get(`/collab/messages/${activeContact._id}`);
                setMessages(data);
            } catch (err) {
                console.error('Failed to fetch messages', err);
            }
        };
        fetchMessages();

        // Poll for new messages
        pollRef.current = setInterval(fetchMessages, 5000);
        return () => clearInterval(pollRef.current);
    }, [activeContact]);

    // Scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeContact) return;

        try {
            const { data } = await api.post('/collab/messages', {
                receiver: activeContact._id,
                content: newMessage.trim()
            });
            setMessages(prev => [...prev, data]);
            setNewMessage('');
        } catch (err) {
            console.error('Failed to send message', err);
        }
    };

    const totalUnread = contacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

    return (
        <div className="fixed bottom-4 right-4 z-40" style={{ width: isOpen ? '380px' : 'auto' }}>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative bg-gradient-to-r from-primary to-emerald-600 text-white p-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                    <MessageCircle size={22} />
                    {totalUnread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce-in">
                            {totalUnread}
                        </span>
                    )}
                </button>
            )}

            {/* Chat Panel */}
            {isOpen && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col animate-bounce-in" style={{ height: '480px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-emerald-600 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={18} className="text-white" />
                            <span className="text-white font-semibold text-sm">
                                {activeContact ? (activeContact.fullName || activeContact.username) : t.messages.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {activeContact && (
                                <button
                                    onClick={() => setActiveContact(null)}
                                    className="text-white/70 hover:text-white p-1 rounded transition"
                                    title={t.messages.backToContacts}
                                >
                                    <ChevronDown size={16} className="rotate-90" />
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/70 hover:text-white p-1 rounded transition"
                            >
                                <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    {!activeContact ? (
                        /* Contacts List */
                        <div className="flex-1 overflow-y-auto">
                            {contacts.length === 0 ? (
                                <div className="p-6 text-center text-gray-400 text-sm">
                                    <User size={32} className="mx-auto mb-2 opacity-30" />
                                    {t.messages.noContacts}
                                </div>
                            ) : (
                                contacts.map(contact => (
                                    <button
                                        key={contact._id}
                                        onClick={() => setActiveContact(contact)}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-b border-gray-100 dark:border-gray-700/50"
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${contact.role === 'engineer'
                                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                                            : 'bg-gradient-to-br from-green-500 to-emerald-600'
                                            }`}>
                                            {(contact.fullName || contact.username).charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 text-left min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                                                {contact.fullName || contact.username}
                                            </p>
                                            <p className="text-xs text-gray-400 capitalize">{t.roles[contact.role] || contact.role}</p>
                                        </div>
                                        {contact.unreadCount > 0 && (
                                            <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                                {contact.unreadCount}
                                            </span>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    ) : (
                        /* Messages View */
                        <>
                            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                {messages.length === 0 && (
                                    <p className="text-center text-gray-400 text-sm mt-8">
                                        {t.messages.noMessages}
                                    </p>
                                )}
                                {messages.map((msg, idx) => {
                                    const isMe = msg.sender?._id === user?.id || msg.sender === user?.id;
                                    return (
                                        <div key={msg._id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm ${isMe
                                                ? 'bg-primary text-white rounded-br-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md'
                                                }`}>
                                                <p className="break-words">{msg.content}</p>
                                                <p className={`text-[10px] mt-1 ${isMe ? 'text-white/60' : 'text-gray-400'}`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={bottomRef} />
                            </div>

                            {/* Message Input */}
                            <form onSubmit={sendMessage} className="p-2 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={t.messages.typePlaceholder}
                                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="bg-primary text-white p-2 rounded-xl disabled:opacity-40 hover:bg-primary-dark transition"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessagePanel;
