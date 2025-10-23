import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CollaborationTools = ({ projectId, userId, onClose }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [whiteboardData, setWhiteboardData] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState('pen');
  const [drawingColor, setDrawingColor] = useState('#ff6b6b');
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const messagesEndRef = useRef(null);
  const lastPointRef = useRef(null);
   const [showProjectModal, setShowProjectModal] = useState(true)
  
   // 👇 Added: Function to close modal
  const handleClose = () => {
    setShowProjectModal(false);
    stopMediaStreams();
    if (onClose) onClose();
  };
  // ...existing code...

useEffect(() => {
  // Setup canvas context for drawing
  const canvas = canvasRef.current;
  if (canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : drawingColor;
    ctxRef.current = ctx;
  }
}, [selectedTool, drawingColor]);

useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  window.addEventListener('keydown', handleEsc);
  return () => window.removeEventListener('keydown', handleEsc);
}, [onClose]);

// ...existing code...

  useEffect(() => {
    connectToProject();
    fetchSharedFiles();
    return () => {
      // Cleanup media streams and whiteboard listeners
      stopMediaStreams();
    };
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToProject = () => {
    // Mock active users
    setActiveUsers([
      {
        id: '1',
        name: 'John Doe',
        avatar: null,
        role: 'Client',
        isOnline: true,
        lastSeen: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: null,
        role: 'Freelancer',
        isOnline: true,
        lastSeen: new Date().toISOString()
      }
    ]);

    // Mock messages
    setMessages([
      {
        id: '1',
        sender: { id: '1', name: 'John Doe', avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400" },
        content: 'Welcome to the project collaboration space!',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'text'
      },
      {
        id: '2',
        sender: { id: '2', name: 'Sarah Johnson', avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400" },
        content: 'Thanks! I\'m excited to work on this project.',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        type: 'text'
      },
      {
        id: '3',
        sender: { id: '1', name: 'John Doe', avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400" },
        content: 'I\'ve uploaded the design files. Please take a look.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'file',
        file: { name: 'design-mockup.fig', size: '2.4 MB', type: 'image' }
      }
    ]);
  };

  const fetchSharedFiles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${projectId}/files`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setSharedFiles(data.files || []);
    } catch (error) {
      console.error('Error fetching shared files:', error);
      // Fallback to mock data
      setSharedFiles([
        { id: '1', name: 'project-brief.pdf', size: '1.2 MB', type: 'pdf', uploadedBy: 'John Doe', uploadedAt: new Date().toISOString() },
        { id: '2', name: 'design-mockup.fig', size: '2.4 MB', type: 'image', uploadedBy: 'Sarah Johnson', uploadedAt: new Date().toISOString() },
        { id: '3', name: 'requirements.docx', size: '856 KB', type: 'document', uploadedBy: 'John Doe', uploadedAt: new Date().toISOString() }
      ]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: { id: userId, name: 'You', avatar: null },
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Send to backend
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/collaboration/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId,
          content: newMessage,
          type: 'text'
        })
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : drawingColor;
    }
  }, [drawingColor, selectedTool]);

  function getCanvasPos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function handleCanvasPointer(e, type) {
    if (!ctxRef.current) return;
    if (type === 'down') {
      setIsDrawing(true);
      lastPointRef.current = getCanvasPos(e);
      return;
    }
    if (type === 'up') {
      setIsDrawing(false);
      lastPointRef.current = null;
      return;
    }
    if (type === 'move' && isDrawing && lastPointRef.current) {
      const current = getCanvasPos(e);
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctxRef.current.lineTo(current.x, current.y);
      ctxRef.current.stroke();
      lastPointRef.current = current;
    }
  }

  function clearBoard() {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setWhiteboardData([]);
  }

  const startVideoCall = async () => {
    try {
      if (isVideoCallActive) {
        // stop
        stopLocalVideo();
        setIsVideoCallActive(false);
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(()=>{});
      }
      setIsVideoCallActive(true);
    } catch (err) {
      console.error('Error starting video:', err);
      alert('Could not start camera/microphone. Please allow permissions.');
    }
  };

  const startScreenShare = async () => {
    try {
      if (isScreenSharing) {
        stopScreenShare();
        setIsScreenSharing(false);
        return;
      }
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: 'always' }, audio: true });
      screenStreamRef.current = screenStream;
      if (screenRef.current) {
        screenRef.current.srcObject = screenStream;
        await screenRef.current.play().catch(()=>{});
      }
      // When user stops from browser UI
      const [track] = screenStream.getVideoTracks();
      if (track) {
        track.onended = () => {
          stopScreenShare();
          setIsScreenSharing(false);
        };
      }
      setIsScreenSharing(true);
    } catch (err) {
      console.error('Error starting screen share:', err);
      alert('Screen share was denied or failed.');
    }
  };

  function stopLocalVideo() {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  function stopScreenShare() {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(t => t.stop());
      screenStreamRef.current = null;
    }
    if (screenRef.current) {
      screenRef.current.srcObject = null;
    }
  }

  function stopMediaStreams() {
    stopLocalVideo();
    stopScreenShare();
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/collaboration/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const data = await response.json();
      setSharedFiles(prev => [...prev, data.file]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
 
  // ✅ Added: Download file function
  const handleFileDownload = async (fileId, fileName) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/collaboration/download/${fileId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) throw new Error('Failed to download file');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading file:', err);
      alert('Error downloading file');
    }
  };

  const handleFileDelete = async (fileId) => {
  if (!confirm("Are you sure you want to delete this file?")) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/collaboration/delete/${fileId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) throw new Error("Failed to delete file");

    setSharedFiles(prev => prev.filter(file => file.id !== fileId));
  } catch (err) {
    console.error("Error deleting file:", err);
    alert("Failed to delete file");
  }
};

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'document': return '📝';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      default: return '📁';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
 if (!showProjectModal) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-6xl h-[80vh] bg-gray-800 rounded-xl border border-gray-700 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white">Project Collaboration</h2>
            <div className="flex items-center space-x-2">
              {activeUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-1">
                
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={startVideoCall}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isVideoCallActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isVideoCallActive ? 'End Call' : 'Start Video Call'}
            </button>
            <button
              onClick={startScreenShare}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isScreenSharing 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
            </button>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Chat Panel */}
          <div className="w-1/3 border-r border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Messages</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <img
                    src={message.sender.avatar || '/default-avatar.png'}
                    alt={message.sender.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium text-sm">{message.sender.name}</span>
                      <span className="text-gray-400 text-xs">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    {message.type === 'text' ? (
                      <p className="text-gray-300 text-sm">{message.content}</p>
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg">
                        <span className="text-lg">{getFileIcon(message.file.type)}</span>
                        <div>
                          <p className="text-white text-sm font-medium">{message.file.name}</p>
                          <p className="text-gray-400 text-xs">{formatFileSize(message.file.size)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Files Panel */}
          <div className="w-1/3 border-r border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Shared Files</h3>
                <label className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg cursor-pointer transition-colors">
                  Upload
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {sharedFiles.map((file) => (
                <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <span className="text-2xl">{getFileIcon(file.type)}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{file.name}</p>
                    <p className="text-gray-400 text-xs">
                      {formatFileSize(file.size)} • {file.uploadedBy} • {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                   <button 
      className="p-2 text-gray-400 hover:text-white transition-colors"
      onClick={() => handleFileDownload(file.id, file.name)}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </button>
    <button
      className="p-2 text-red-400 hover:text-red-600 transition-colors"
      onClick={() => handleFileDelete(file.id)}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
                </div>
              ))}
            </div>
          </div>

          {/* Whiteboard + Media Panel */}
          <div className="w-1/3 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Whiteboard</h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedTool}
                    onChange={(e) => setSelectedTool(e.target.value)}
                    className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                  >
                    <option value="pen">Pen</option>
                    <option value="eraser">Eraser</option>
                    <option value="text">Text</option>
                    <option value="shape">Shape</option>
                  </select>
                  <input
                    type="color"
                    value={drawingColor}
                    onChange={(e) => setDrawingColor(e.target.value)}
                    className="w-8 h-8 rounded border border-gray-600"
                  />
                  <button
                    onClick={clearBoard}
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm"
                  >
                    Clear Board
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-rows-2 gap-4 rounded-lg m-4">
              <div className="bg-white rounded-lg relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full rounded-lg cursor-crosshair"
                  onMouseDown={(e) => handleCanvasPointer(e, 'down')}
                  onMouseUp={(e) => handleCanvasPointer(e, 'up')}
                  onMouseLeave={(e) => handleCanvasPointer(e, 'up')}
                  onMouseMove={(e) => handleCanvasPointer(e, 'move')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <video ref={videoRef} muted playsInline className="w-full h-40 bg-black rounded-lg" />
                <video ref={screenRef} muted playsInline className="w-full h-40 bg-black rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CollaborationTools;
