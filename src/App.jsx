import React, { useEffect, useState } from 'react';
import {
  Search,
  MapPin,
  MessageCircle,
  Bell,
  User,
  Plus,
  Filter,
  Map,
  Eye,
  CheckCircle,
  Clock,
  Phone,
  Home,
  List,
  Award,
  Settings,
  Send,
  Upload,
  X,
  ChevronLeft
} from 'lucide-react';
import ProfileSection from './profile';

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [posts] = useState([
    {
      id: 1,
      type: 'lost',
      title: 'iPhone 15 Pro',
      description: 'Lost my blue iPhone 15 Pro near Central Park',
      category: 'Electronics',
      location: 'Central Park, NYC',
      date: '2024-08-07',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
      user: 'John Doe',
      status: 'active',
      claims: 2
    },
    {
      id: 2,
      type: 'found',
      title: 'Black Wallet',
      description: 'Found a black leather wallet with cards',
      category: 'Personal Items',
      location: 'Times Square, NYC',
      date: '2024-08-06',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
      user: 'Sarah Wilson',
      status: 'active',
      claims: 0
    }
  ]);

  const [selectedChatUser, setSelectedChatUser] = useState(null);

  // Temporary static users (replace later with real users)
  const mockUsers = [
    { id: 1, name: 'Sarah Wilson' },
    { id: 2, name: 'Alex Smith' },
    { id: 3, name: 'Jane Doe' },
  ];



  const [showFilterModal, setShowFilterModal] = useState(false);


  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    location: '',
    image: '', // We'll simulate image upload
  });
  const [allPosts, setAllPosts] = useState(posts); // Use this as the actual post list

  const handleAddPost = () => {
    const postToAdd = {
      id: Date.now(),
      ...newPost,
      type: postType,
      user: user?.name || 'Guest User',
      status: 'active',
      date: new Date().toISOString().split('T')[0],
      image: newPost.image || 'https://via.placeholder.com/200', // fallback image
      claims: 0,
    };
    setAllPosts([postToAdd, ...allPosts]);
    setNewPost({ title: '', description: '', category: 'Electronics', location: '', image: '' });
    setCurrentView('home');
  };


  const [selectedPost, setSelectedPost] = useState(null);
  const [postType, setPostType] = useState('lost');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showClaimForm, setShowClaimForm] = useState(false);

  const categories = ['all', 'Electronics', 'Personal Items', 'Pets', 'Documents'];

  const login = (userData) => {
    setUser(userData);
    setCurrentView('home');
  };

  const logout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: Date.now(),
        text: newMessage,
        sender: user?.name || 'You',
        timestamp: new Date().toLocaleTimeString()
      }]);
      setNewMessage('');
    }
  };

  // Bottom Navigation Component
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center p-2 ${currentView === 'home' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => setCurrentView('map')}
          className={`flex flex-col items-center p-2 ${currentView === 'map' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Map size={20} />
          <span className="text-xs mt-1">Map</span>
        </button>
        <button
          onClick={() => setCurrentView('add')}
          className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-xl scale-110"
        >
          <Plus size={32} />
          {/* <span className="text-xs mt-1">Post</span> */}
        </button>
        <button
          onClick={() => setCurrentView('notifications')}
          className={`flex flex-col items-center p-2 ${currentView === 'notifications' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Bell size={20} />
          <span className="text-xs mt-1">Alerts</span>
        </button>
        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center p-2 ${currentView === 'profile' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );

  // Login Screen
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-500 ease-out hover:shadow-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Search className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Lost & Found</h1>
            <p className="text-gray-600">Find what's lost, return what's found</p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => login({ name: 'John Doe', email: 'john@example.com' })}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 hover:shadow-md active:scale-95 transition-all duration-200"
            >
              Login with Phone/OTP
            </button>
            <button
              onClick={() => login({ name: 'Anonymous User' })}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 hover:shadow-sm active:scale-95 transition-all duration-200"
            >
              Continue as Guest
            </button>
            <button
              onClick={() => login({ name: 'Google User', email: 'google@example.com' })}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 hover:shadow-md active:scale-95 transition-all duration-200"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Home Screen
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24 font-fancy">

        {/* Header */}
        <div className="bg-white shadow-md sticky top-0 z-10 animate-slideUp transition-all duration-300">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">

              {/* Logo & Branding */}
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full shadow-sm hover:scale-105 transition-transform duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 tracking-tight hover:text-blue-600 transition-colors duration-300">
                    Lost & Found
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Welcome back, <span className="font-medium text-gray-700">{user?.name || "Guest"} 👋</span>
                  </p>
                </div>
              </div>

              {/* Notification Button */}
              <button
                onClick={() => setCurrentView('messaging')}
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm group"
              >
                <Bell size={20} className="text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
              </button>

            </div>
          </div>
        </div>




        {/* Search Bar */}
        <div className="max-w-md mx-auto px-4 mt-4 animate-fadeIn">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search lost or found items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all duration-300 focus:shadow-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-md mx-auto px-4 mt-4 overflow-x-auto scrollbar-hide animate-fadeIn">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md animate-bounceIn'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="max-w-md mx-auto px-4 mt-6 animate-slideUp">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Posts</h2>
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center text-blue-600 text-sm hover:underline transition duration-300"
            >
              <Filter size={16} className="mr-1" />
              Filter
            </button>



            {showFilterModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Filter Items</h2>
                    <button onClick={() => setShowFilterModal(false)}><X size={20} /></button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1 font-medium text-gray-700">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-1 font-medium text-gray-700">Search</label>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Search by title..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setShowFilterModal(false);
                        }}
                        className="text-gray-700 border px-4 py-2 rounded-lg"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setShowFilterModal(false)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {allPosts
            .filter((post) =>
              (selectedCategory === 'all' || post.category === selectedCategory) &&
              post.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((post, idx) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-card hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer mb-5 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: 'both' }}
                onClick={() => {
                  setSelectedPost(post);
                  setCurrentView('detail');
                }}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-xl transition duration-300 hover:brightness-95"
                  />
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${post.type === 'lost' ? 'bg-red-500' : 'bg-green-500'
                      } text-white shadow`}
                  >
                    {post.type.toUpperCase()}
                  </div>
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${post.status === 'active' ? 'bg-blue-600' : 'bg-gray-500'
                      } text-white shadow`}
                  >
                    {post.status.toUpperCase()}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-2">{post.description}</p>

                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {post.location}
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.date}
                    </span>
                    {post.claims > 0 && (
                      <span className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        {post.claims} claim{post.claims > 1 && 's'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <BottomNav />
      </div>
    );
  }

  if (currentView === 'messaging') {
    return (
      <div className="min-h-screen bg-white pt-4 pb-20 px-4 max-w-md mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <button onClick={() => {
            if(!selectedChatUser){
              setCurrentView('home');
            } else {
              setSelectedChatUser(null);
            }
         
          }} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronLeft />
          </button>
          <h2 className="text-lg font-bold">Messages</h2>
        </div>

        {/* Chat view if user is selected */}
        {selectedChatUser ? (
          <div className="flex flex-col h-[80vh]">
            {/* Chat header */}
            <div className="border-b pb-2 mb-2">
              <h3 className="text-md font-semibold">Chat with {selectedChatUser.name}</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`mb-2 ${msg.sender === user?.name ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-3 py-2 rounded-lg ${msg.sender === user?.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-60 block">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center border-t pt-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg mr-2"
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                <Send size={16} />
              </button>
            </div>
          </div>
        ) : (
          // User list view
          <div className="space-y-4">
            {mockUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedChatUser(u)}
                className="flex items-center justify-between p-4 border rounded-lg shadow hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-500">Tap to chat</p>
                </div>
                <MessageCircle size={20} className="text-blue-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }


  // Add Post Screen
  if (currentView === 'add') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentView('home')}
                className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Create Post</h1>
              <div className="w-8" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-md p-6 transition-all">
            {/* Post Type Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setPostType('lost')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 transform ${postType === 'lost'
                    ? 'bg-red-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                  }`}
              >
                Lost Item
              </button>
              <button
                onClick={() => setPostType('found')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 transform ${postType === 'found'
                    ? 'bg-green-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                  }`}
              >
                Found Item
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="..."
                  placeholder={`What did you ${postType}?`}
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="..."
                  placeholder="Provide details..."
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="..."
                >
                  <option>Electronics</option>
                  <option>Personal Items</option>
                  <option>Pets</option>
                  <option>Documents</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="..."
                  placeholder="Where was it lost/found?"
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition duration-200 cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm">Upload photo for better identification</p>
                <button type="button" className="mt-2 text-blue-500 text-sm hover:underline transition">
                  Choose Photo
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleAddPost(); // Add the post
                  setCurrentView('home'); // Then go to home
                }}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 active:scale-95 transition-all"
              >
                Post {postType === 'lost' ? 'Lost' : 'Found'} Item
              </button>


            </form>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Detail Screen
  if (currentView === 'detail' && selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 animate-fadeIn">
        {/* Header */}
        <div className="bg-white shadow-md sticky top-0 z-20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setCurrentView('home')}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">Item Details</h1>
              <div className="w-8" />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="max-w-md mx-auto">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-64 object-cover rounded-b-xl animate-slideUp"
          />

          {/* Card */}
          <div className="bg-white mx-4 -mt-6 rounded-xl shadow-lg z-10 p-6 relative animate-slideUp">
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-2 transition ${selectedPost.type === 'lost'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                  }`}
              >
                {selectedPost.type.toUpperCase()}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedPost.title}</h2>
              <p className="text-gray-600 text-sm">{selectedPost.description}</p>
            </div>

            <div className="space-y-3 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin size={16} className="mr-3 text-blue-400" />
                {selectedPost.location}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-3 text-blue-400" />
                {selectedPost.date}
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-3 text-blue-400" />
                Posted by {selectedPost.user}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowClaimForm(true)}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 shadow hover:shadow-md"
              >
                {selectedPost.type === 'lost' ? 'I Found This' : 'This is Mine'}
              </button>
              <button
                onClick={() => setCurrentView('chat')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <MessageCircle size={16} className="mr-2" />
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Claim Form */}
        {showClaimForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Verify Your Claim</h2>
                <button onClick={() => setShowClaimForm(false)} className="hover:text-red-500 transition">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <p className="text-gray-600">Please answer these questions to verify your claim:</p>

                {['What color is the item?', 'What brand/model is it?', 'Any unique markings or features?'].map(
                  (question, idx) => (
                    <div key={idx}>
                      <label className="block font-medium text-gray-700 mb-1">{question}</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Your answer..."
                      />
                    </div>
                  )
                )}

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowClaimForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowClaimForm(false);
                      setCurrentView('chat');
                    }}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition"
                  >
                    Submit Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>

    );
  }

  // Chat Screen
  if (currentView === 'chat') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
        <div className="bg-white shadow-sm">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentView('detail')} className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">{selectedPost?.user}</h1>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Phone size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-auto w-full p-4 overflow-y-auto">
          <div className="bg-blue-100 rounded-lg p-3 mb-4 text-center text-sm text-blue-800">
            🔒 This is a secure chat. Personal details are protected until both parties agree to share.
          </div>

          {chatMessages.map(msg => (
            <div key={msg.id} className={`mb-3 ${msg.sender === user?.name ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-2xl max-w-xs ${msg.sender === user?.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
                }`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}

          {chatMessages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Start a conversation to coordinate the return!</p>
            </div>
          )}
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto flex items-center space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Notifications Screen
  if (currentView === 'notifications') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white shadow-sm">
          <div className="max-w-md mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-4">
          <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-800 text-sm">New item found near your location</p>
            <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
          </div>
          <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <p className="text-gray-800 text-sm">Your lost item has been claimed</p>
            <p className="text-gray-500 text-xs mt-1">1 day ago</p>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Profile Screen
  if (currentView === 'profile') {
    return (
      <ProfileSection BottomNav={BottomNav} />
      // <div className="min-h-screen bg-gray-50 pb-20">
      //   <div className="bg-white shadow-sm">
      //     <div className="max-w-md mx-auto px-4 py-6">
      //       <div className="text-center">
      //         <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
      //           <User size={32} className="text-white" />
      //         </div>
      //         <h1 className="text-xl font-bold text-gray-800">{user?.name}</h1>
      //         <p className="text-gray-600">{user?.email || 'No email'}</p>
      //         <div className="flex justify-center space-x-4 mt-4">
      //           <div className="text-center">
      //             <div className="text-lg font-bold text-gray-800">12</div>
      //             <div className="text-xs text-gray-600">Posts</div>
      //           </div>
      //           <div className="text-center">
      //             <div className="text-lg font-bold text-gray-800">8</div>
      //             <div className="text-xs text-gray-600">Helped</div>
      //           </div>
      //           <div className="text-center">
      //             <div className="text-lg font-bold text-gray-800">4.8</div>
      //             <div className="text-xs text-gray-600">Rating</div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>

      //   <div className="max-w-md mx-auto px-4 py-4">
      //     <div className="bg-white rounded-xl shadow-sm">
      //       <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
      //         <List size={20} className="text-gray-600 mr-3" />
      //         <span className="text-gray-800">My Posts</span>
      //       </button>
      //       <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
      //         <Award size={20} className="text-gray-600 mr-3" />
      //         <span className="text-gray-800">Badges & Rewards</span>
      //       </button>
      //       <button className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
      //         <Settings size={20} className="text-gray-600 mr-3" />
      //         <span className="text-gray-800">Settings</span>
      //       </button>
      //       <button 
      //         onClick={logout}
      //         className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
      //       >
      //         <User size={20} className="text-gray-600 mr-3" />
      //         <span className="text-gray-800">Logout</span>
      //       </button>
      //     </div>
      //   </div>

      //   <BottomNav />
      // </div>
    );
  }

  // Map Screen
  if (currentView === 'map') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white shadow-sm">
          <div className="max-w-md mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-800">Map View</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto h-96 bg-gray-200 mx-4 my-4 rounded-xl flex items-center justify-center">
          <div className="text-center text-gray-600">
            <Map size={48} className="mx-auto mb-2" />
            <p>Interactive Map View</p>
            <p className="text-sm">Shows lost & found items by location</p>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Default return
  return null;
};

export default App;