import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Search, Clock, Trash2, ShieldAlert, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

const InboxManagement = ({ isDarkMode }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Fetch messages from localStorage
      const localMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      
      // Sort newest first
      const sortedMessages = localMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMessages(sortedMessages);

    } catch (err) {
      console.error("Error loading messages from local storage.", err);
      setMessages([]);
      setError('Could not load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setIsMobileListVisible(false);
    // Mark as read locally and in storage
    if (!msg.read) {
      const updatedMessages = messages.map(m => m._id === msg._id ? { ...m, read: true } : m);
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    }
  };

  const handleDelete = (id) => {
    const remainingMessages = messages.filter((m) => m._id !== id);
    setMessages(remainingMessages);
    localStorage.setItem('contactMessages', JSON.stringify(remainingMessages));
    
    if (selectedMessage?._id === id) {
      setSelectedMessage(null);
      setIsMobileListVisible(true);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const term = searchTerm.toLowerCase();
    return (
      msg.firstName?.toLowerCase().includes(term) ||
      msg.lastName?.toLowerCase().includes(term) ||
      msg.email?.toLowerCase().includes(term) ||
      msg.inquiryType?.toLowerCase().includes(term)
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`p-4 lg:p-6 space-y-6 h-[calc(100vh-6rem)] flex flex-col ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <Mail className="text-indigo-500" size={32} />
            Support Inbox
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Manage incoming contact formulations and inquiries.</p>
        </div>
        <button 
          onClick={fetchMessages}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-200'
          }`}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-sm shrink-0">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Main Inbox Container */}
      <div className={`flex-1 flex overflow-hidden rounded-2xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200 shadow-sm'}`}>
        
        {/* Left List Pane */}
        <div className={`w-full lg:w-96 flex flex-col border-r ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'} ${!isMobileListVisible ? 'hidden lg:flex' : 'flex'}`}>
          {/* Search */}
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white'
                }`}
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loading && !messages.length ? (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                <RefreshCw size={24} className="animate-spin mb-4 text-indigo-500" />
                <p>Loading inbox...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center opacity-50">
                <Mail size={48} className="mb-4" />
                <p>No messages found.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700/50">
                {filteredMessages.map((msg) => (
                  <li 
                    key={msg._id} 
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedMessage?._id === msg._id 
                        ? (isDarkMode ? 'bg-indigo-900/30 border-l-4 border-indigo-500' : 'bg-indigo-50 border-l-4 border-indigo-500')
                        : (isDarkMode ? 'hover:bg-gray-700/50 border-l-4 border-transparent' : 'hover:bg-gray-50 border-l-4 border-transparent')
                    } ${!msg.read && !selectedMessage?._id === msg._id ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-bold truncate pr-3 ${!msg.read ? '' : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                        {msg.firstName} {msg.lastName}
                      </h4>
                      <span className={`text-xs shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        msg.inquiryType === 'Sales' 
                          ? (isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700')
                          : (isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700')
                      }`}>
                        {msg.inquiryType || 'General'}
                      </span>
                      {!msg.read && <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>}
                    </div>
                    <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {msg.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className={`flex-1 flex flex-col ${isMobileListVisible && selectedMessage === null ? 'hidden lg:flex' : 'flex'}`}>
          {selectedMessage ? (
            <>
              {/* Toolbar */}
              <div className={`p-4 border-b flex justify-between items-center shrink-0 ${isDarkMode ? 'border-gray-700/50 bg-gray-800/80' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsMobileListVisible(true)}
                    className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                      {selectedMessage.firstName?.[0]}{selectedMessage.lastName?.[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{selectedMessage.firstName} {selectedMessage.lastName}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedMessage.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`mailto:${selectedMessage.email}`}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'}`}
                  >
                    Reply
                  </a>
                  <button 
                    onClick={() => handleDelete(selectedMessage._id)}
                    className={`p-2 rounded-lg transition-all ${isDarkMode ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                    title="Delete message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8 text-sm">
                  <div className={`px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100 font-medium'}`}>
                    Query via Contact Form
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={14} />
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                </div>

                <div className={`prose max-w-none ${isDarkMode ? 'prose-invert prose-p:text-gray-300' : 'prose-p:text-gray-700'} pb-12`}>
                  <p className="whitespace-pre-wrap leading-relaxed text-lg">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-50 p-8 text-center">
              <Mail size={64} className="mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">Select a message</h3>
              <p>Choose a message from the list to view its contents.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InboxManagement;
