import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

const Messaging = ({ userId, projectId, onClose }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isStartingNew, setIsStartingNew] = useState(false);
  const [newReceiverEmail, setNewReceiverEmail] = useState('');
  const [newInitialMessage, setNewInitialMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    // connect socket
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', { withCredentials: true });
    socketRef.current = socket;
    if (userId) socket.emit('register', String(userId));
    socket.on('message:new', (m) => {
      // If message belongs to current open conversation, append; else refresh conversations
      if (selectedConversation && (m.sender._id === selectedConversation.user._id || m.sender === selectedConversation.user._id)) {
        setMessages((prev) => [...prev, m]);
      }
      fetchConversations();
    });
    socket.on('typing', ({ from }) => {
      if (selectedConversation && from === selectedConversation.user._id) {
        setIsTyping(true);
        const t = setTimeout(() => setIsTyping(false), 800);
        return () => clearTimeout(t);
      }
    });
    return () => socket.disconnect();
  }, [userId]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.user._id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/messages/conversations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      // Fallback to mock data
      setConversations([
        {
          _id: '1',
          user: {
            _id: 'user1',
            name: 'John Doe',
            avatarUrl: null,
            title: 'Full Stack Developer',
            isOnline: true
          },
          lastMessage: {
            content: 'Thanks for the great work on the project!',
            createdAt: new Date().toISOString(),
            isRead: false
          },
          unreadCount: 2
        },
        {
          _id: '2',
          user: {
            _id: 'user2',
            name: 'Jane Smith',
            avatarUrl: null,
            title: 'UI/UX Designer',
            isOnline: false
          },
          lastMessage: {
            content: 'When can we schedule the next meeting?',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            isRead: true
          },
          unreadCount: 0
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (receiverId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/messages/conversation/${receiverId}?projectId=${projectId || ''}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Fallback to mock data
      setMessages([
        {
          _id: '1',
          content: 'Hi! I saw your project and I\'m very interested in working on it.',
          sender: { _id: receiverId, name: 'John Doe', avatarUrl: null },
          receiver: { _id: userId, name: 'Demo User', avatarUrl: null },
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          isRead: true
        },
        {
          _id: '2',
          content: 'Great! I\'d love to discuss the project details with you.',
          sender: { _id: userId, name: 'Demo User', avatarUrl: null },
          receiver: { _id: receiverId, name: 'John Doe', avatarUrl: null },
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          isRead: true
        },
        {
          _id: '3',
          content: 'When would be a good time for a call?',
          sender: { _id: receiverId, name: 'John Doe', avatarUrl: null },
          receiver: { _id: userId, name: 'Demo User', avatarUrl: null },
          createdAt: new Date().toISOString(),
          isRead: false
        }
      ]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receiverId: selectedConversation.user._id,
          content: newMessage,
          projectId: projectId
        })
      });

      if (response.ok) {
        setNewMessage('');
        // Refresh messages
        fetchMessages(selectedConversation.user._id);
        // emit typing false
        socketRef.current?.emit('typing', { to: selectedConversation.user._id, from: userId });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter(c =>
    c.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastMessage?.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startNewConversation = async (e) => {
    e.preventDefault();
    if (!newReceiverEmail.trim() || !newInitialMessage.trim()) return;
    setSending(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receiverEmail: newReceiverEmail, content: newInitialMessage, projectId })
      });
      
      if (response.ok) {
        const newMessage = await response.json();
        console.log('New conversation started:', newMessage);
        
        // Close the modal
        setIsStartingNew(false);
        setNewReceiverEmail('');
        setNewInitialMessage('');
        
        // Refresh conversations to include the new one
        await fetchConversations();
        
        // Wait a bit for state to update, then find and select the new conversation
        setTimeout(() => {
          const newConversation = conversations.find(c => 
            c.user?.email === newReceiverEmail || 
            c.user?._id === newMessage.receiver
          );
          
          if (newConversation) {
            setSelectedConversation(newConversation);
            fetchMessages(newConversation.user._id);
          } else {
            // If not found in current conversations, create a temporary conversation object
            const tempConversation = {
              user: {
                _id: newMessage.receiver,
                name: newMessage.receiver.name || newReceiverEmail.split('@')[0],
                email: newReceiverEmail,
                avatarUrl: null
              },
              lastMessage: {
                content: newMessage.content,
                createdAt: newMessage.createdAt,
                isRead: true
              },
              unreadCount: 0
            };
            setSelectedConversation(tempConversation);
            fetchMessages(newMessage.receiver);
          }
        }, 100);
      } else {
        const errorData = await response.json();
        console.error('Error starting conversation:', errorData);
        alert('Error starting conversation: ' + (errorData.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      alert('Error starting conversation: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  const onAttachClick = () => fileInputRef.current?.click();

  const onFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedConversation) return;
    // Optimistic local append
    const temp = {
      _id: `temp-${Date.now()}`,
      content: `Shared file: ${file.name}`,
      sender: { _id: userId },
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, temp]);
    // TODO: Implement upload endpoint; for now just reset input
    e.target.value = '';
  };

  useEffect(() => {
    if (!newMessage) return;
    setIsTyping(true);
    const t = setTimeout(() => setIsTyping(false), 800);
    if (selectedConversation) {
      socketRef.current?.emit('typing', { to: selectedConversation.user._id, from: userId });
    }
    return () => clearTimeout(t);
  }, [newMessage]);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);
    const diffTime = today - messageDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return messageDate.toLocaleDateString();
    return messageDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <>
    <div className="flex h-[600px] bg-gray-800 rounded-xl overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-700 bg-gray-900">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Messages</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              placeholder="Search"
              className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
            />
            <button onClick={()=>setIsStartingNew(true)} className="px-3 py-2 rounded bg-pink-500 text-white text-sm">New</button>
          </div>
        </div>

        <div className="overflow-y-auto">
          {(filteredConversations.length === 0) ? (
            <div className="p-4 text-center text-gray-400">
              No conversations yet
            </div>
          ) : (
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation._id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedConversation?._id === conversation._id
                      ? 'bg-pink-500/20 border-r-2 border-pink-500'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.user.avatarUrl || '/default-avatar.png'}
                        alt={conversation.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {conversation.user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium truncate">
                          {conversation.user.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatTime(conversation.lastMessage.createdAt)}
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm truncate">
                        {conversation.lastMessage.content}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-pink-400 text-xs font-medium">
                            {conversation.unreadCount} unread
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-900">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedConversation.user.avatarUrl || '/default-avatar.png'}
                  alt={selectedConversation.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-medium">{selectedConversation.user.name}</h4>
                  <p className="text-gray-400 text-sm">{selectedConversation.user.title}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isTyping && (
                <div className="text-gray-500 text-xs">Typing...</div>
              )}
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((message, index) => {
                  const isOwn = message.sender._id === userId;
                  const showDate = index === 0 || 
                    formatDate(message.createdAt) !== formatDate(messages[index - 1].createdAt);

                  return (
                    <div key={message._id}>
                      {showDate && (
                        <div className="text-center text-gray-500 text-sm py-2">
                          {formatDate(message.createdAt)}
                        </div>
                      )}
                      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwn
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            isOwn ? 'text-pink-100' : 'text-gray-400'
                          }`}>
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <input ref={fileInputRef} onChange={onFileSelected} type="file" className="hidden" />
                <button type="button" onClick={onAttachClick} className="px-3 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600" title="Attach file">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828a4 4 0 10-5.656-5.656L6.343 10.172" /></svg>
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {sending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
    {/* Start New Conversation Modal */}
    {isStartingNew && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={()=>setIsStartingNew(false)}>
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-4" onClick={(e)=>e.stopPropagation()}>
          <h3 className="text-white font-semibold mb-3">Start New Conversation</h3>
          <form onSubmit={startNewConversation} className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Receiver Email</label>
              <input type="email" value={newReceiverEmail} onChange={(e)=>setNewReceiverEmail(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" required />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Initial Message</label>
              <textarea value={newInitialMessage} onChange={(e)=>setNewInitialMessage(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" rows={3} required />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={()=>setIsStartingNew(false)} className="px-3 py-2 rounded bg-gray-800 border border-gray-700">Cancel</button>
              <button type="submit" disabled={sending} className="px-3 py-2 rounded bg-pink-500 text-white">Start</button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default Messaging;
