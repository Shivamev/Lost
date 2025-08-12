import React, { useEffect, useRef, useState } from 'react';
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
  ChevronLeft,
  ArrowRight,
  Mail,
  Lock,
  Share2,
  Navigation,
  Calendar,
  MapIcon,
  Sliders
} from 'lucide-react';
import ProfileSection from './profile';
import WelcomeScreen from './WelcomeScreen';
import SignupScreen from './SignupScreen';
import './MainScreen.css';
import './ClaimProcess.css';
import './DetailScreen.css';
import './SearchScreen.css';


const App = () => {
  const [currentView, setCurrentView] = useState('loading'); // Start with loading
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  
  // Additional state for main screen functionality
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    location: '',
    image: '',
    date: '',
    time: '',
    status: 'have',
    notes: ''
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [postType, setPostType] = useState('lost');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showClaimForm, setShowClaimForm] = useState(false);
  const fileInputRef = useRef(null);

  // Search-specific state
  const [searchView, setSearchView] = useState('quick'); // 'quick' or 'filter'
  const [searchResults, setSearchResults] = useState([]);
  const [searchSuggestions, setSuggestions] = useState(['iPhone', 'wallet', 'keys', 'backpack']);
  const [recentSearches, setRecentSearches] = useState(['black wallet', 'iPhone 15']);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    itemType: 'both',
    dateRange: 'last30days',
    customDateStart: '',
    customDateEnd: '',
    radius: '10km',
    locationOption: 'current',
    customAddress: '',
    categories: []
  });

  const categories = ['all', 'Electronics', 'Wallet/Bag', 'Keys', 'Documents', 'Clothing', 'Other'];

  // Your existing posts data
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
      category: 'Wallet/Bag',
      location: 'Times Square, NYC',
      date: '2024-08-06',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
      user: 'Sarah Wilson',
      status: 'active',
      claims: 0
    }
  ]);

  const [allPosts, setAllPosts] = useState(posts);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = allPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.location.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleFilterSearch = () => {
    let results = [...allPosts];
    
    if (filters.itemType !== 'both') {
      results = results.filter(post => post.type === filters.itemType);
    }
    
    if (filters.categories.length > 0) {
      results = results.filter(post => filters.categories.includes(post.category));
    }
    
    setSearchResults(results);
    setShowFilters(false);
  };

  const addToRecentSearches = (query) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
  };

  // Session validation on app launch
  useEffect(() => {
    const validateSession = async () => {
      try {
        const storedUser = localStorage.getItem('lostFoundUser');
        const sessionToken = localStorage.getItem('lostFoundToken');
        
        if (storedUser && sessionToken) {
          const isValidSession = await validateTokenWithServer(sessionToken);
          
          if (isValidSession) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            setCurrentView('home');
          } else {
            localStorage.removeItem('lostFoundUser');
            localStorage.removeItem('lostFoundToken');
            setCurrentView('welcome');
          }
        } else {
          setCurrentView('welcome');
        }
      } catch (error) {
        console.error('Session validation error:', error);
        setCurrentView('welcome');
      } finally {
        setSessionChecked(true);
      }
    };

    validateSession();
  }, []);

  const validateTokenWithServer = async (token) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(token && token.length > 10);
      }, 1000);
    });
  };

  const login = async (userData, token = null) => {
    try {
      localStorage.setItem('lostFoundUser', JSON.stringify(userData));
      if (token) {
        localStorage.setItem('lostFoundToken', token);
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      setCurrentView('home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('lostFoundUser');
    localStorage.removeItem('lostFoundToken');
    
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('welcome');
  };

  const handleAddPost = () => {
    const postToAdd = {
      id: Date.now(),
      ...newPost,
      type: postType,
      user: user?.name || 'Guest User',
      status: 'active',
      date: newPost.date || new Date().toISOString().split('T')[0],
      image: newPost.image || 'https://via.placeholder.com/200',
      claims: 0,
    };
    setAllPosts([postToAdd, ...allPosts]);
    setNewPost({ 
      title: '', 
      description: '', 
      category: 'Electronics', 
      location: '', 
      image: '',
      date: '',
      time: '',
      status: 'have',
      notes: ''
    });
    setCurrentView('home');
  };

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      setNewPost({ ...newPost, image: URL.createObjectURL(file) });
    }
  };

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
          onClick={() => setCurrentView('search')}
          className={`flex flex-col items-center p-2 ${currentView === 'search' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button
          onClick={() => setCurrentView('add')}
          className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-xl scale-110"
        >
          <Plus size={32} />
        </button>
        <button
          onClick={() => setCurrentView('map')}
          className={`flex flex-col items-center p-2 ${currentView === 'map' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Map size={20} />
          <span className="text-xs mt-1">Map</span>
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

  // Loading screen while checking session
  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Search className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Lost & Found</h1>
          <div className="w-8 h-1 bg-blue-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (currentView === 'welcome') {
    return (
      <WelcomeScreen 
        onNavigateToSignup={() => setCurrentView('signup')}
        onNavigateToLogin={() => setCurrentView('login')}
        onLogin={login}
      />
    );
  }

  // Signup Screen
  if (currentView === 'signup') {
    return (
      <SignupScreen 
        onSignupSuccess={login}
        onBackToWelcome={() => setCurrentView('welcome')}
      />
    );
  }

  // Login Screen
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={() => login({ 
                name: 'John Doe', 
                email: 'john@example.com',
                isAnonymous: false 
              }, 'mock_token_12345')}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition"
            >
              Login
            </button>

            <div className="text-center">
              <span className="text-gray-500">or</span>
            </div>

            <button
              onClick={() => login({ 
                name: 'Google User', 
                email: 'google@example.com',
                isAnonymous: true 
              }, 'google_token_12345')}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition"
            >
              Continue with Google
            </button>

            <button
              onClick={() => setCurrentView('welcome')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Back to Welcome
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Home Screen
  if (currentView === 'home') {
    return (
      <div className="main-screen">
        {/* Header Section */}
        <div className="main-header">
          <div className="header-content">
            {/* User Greeting */}
            <div className="user-greeting">
              <h2 className="greeting-text">
                Hello, {user?.isAnonymous ? 'Anonymous User' : user?.name?.split(' ')[0] || 'User'}! 👋
              </h2>
              <p className="greeting-subtitle">What can we help you find today?</p>
            </div>
            
            {/* Header Actions */}
            <div className="header-actions">
              <button 
                className="notification-btn"
                onClick={() => setCurrentView('notifications')}
              >
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>
              <button 
                className="profile-btn"
                onClick={() => setCurrentView('profile')}
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Primary Actions Section */}
        <div className="primary-actions-section">
          <div className="actions-container">
            <h3 className="section-title">Report an Item</h3>
            <div className="action-buttons">
              <button 
                className="action-btn lost-btn"
                onClick={() => {
                  setPostType('lost');
                  setCurrentView('add');
                }}
              >
                <div className="btn-icon lost-icon">
                  <Search size={24} />
                </div>
                <div className="btn-content">
                  <h4>Lost Item</h4>
                  <p>Report something you've lost</p>
                </div>
                <ArrowRight className="btn-arrow" size={18} />
              </button>

              <button 
                className="action-btn found-btn"
                onClick={() => {
                  setPostType('found');
                  setCurrentView('add');
                }}
              >
                <div className="btn-icon found-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="btn-content">
                  <h4>Found Item</h4>
                  <p>Report something you've found</p>
                </div>
                <ArrowRight className="btn-arrow" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <h3 className="section-title">Find Items</h3>
            
            {/* Quick Search Bar */}
            <div className="quick-search">
              <div className="search-bar">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search for lost or found items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  onFocus={() => setCurrentView('search')}
                />
                <button 
                  className="advanced-search-btn"
                  onClick={() => setCurrentView('search')}
                >
                  <Filter size={16} />
                </button>
              </div>
            </div>

            {/* Category Filter Shortcuts */}
            <div className="category-shortcuts">
              <div className="category-chips">
                {categories.slice(0, 5).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentView('search');
                    }}
                    className={`category-chip ${
                      selectedCategory === category ? 'active' : ''
                    }`}
                  >
                    {category === 'all' ? 'All Items' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results Info */}
            <div className="search-info">
              <p className="search-results-text">
                Use the search above to find lost or found items in your area
              </p>
              <button 
                className="browse-all-btn"
                onClick={() => setCurrentView('map')}
              >
                Browse All Items on Map
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Search Screen
  if (currentView === 'search') {
    return (
      <div className="search-screen">
        {/* Header */}
        <div className="search-header">
          <div className="search-header-content">
            <button 
              onClick={() => setCurrentView('home')}
              className="back-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="search-title">Search Items</h1>
            <div className="search-tabs">
              <button 
                onClick={() => setSearchView('quick')}
                className={`search-tab ${searchView === 'quick' ? 'active' : ''}`}
              >
                Quick
              </button>
              <button 
                onClick={() => setSearchView('filter')}
                className={`search-tab ${searchView === 'filter' ? 'active' : ''}`}
              >
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search View */}
        {searchView === 'quick' && (
          <div className="quick-search-content">
            {/* Search Input */}
            <div className="search-input-container">
              <div className="search-input-wrapper">
                <Search className="search-input-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input-field"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="clear-search-btn"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Search Content */}
            {searchQuery.length === 0 ? (
              <div className="search-suggestions">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="suggestion-section">
                    <h3 className="suggestion-title">Recent Searches</h3>
                    <div className="suggestion-chips">
                      {recentSearches.map((search, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setSearchQuery(search);
                            handleSearch(search);
                          }}
                          className="suggestion-chip recent"
                        >
                          <Clock size={14} />
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div className="suggestion-section">
                  <h3 className="suggestion-title">Popular Searches</h3>
                  <div className="suggestion-chips">
                    {searchSuggestions.map((suggestion, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          handleSearch(suggestion);
                          addToRecentSearches(suggestion);
                        }}
                        className="suggestion-chip popular"
                      >
                        <Search size={14} />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : searchQuery.length < 2 ? (
              <div className="search-hint">
                <p>Type at least 2 characters to search</p>
              </div>
            ) : (
              /* Search Results */
              <div className="search-results">
                <div className="results-header">
                  <h3>Results for "{searchQuery}" ({searchResults.length})</h3>
                </div>
                
                {searchResults.length > 0 ? (
                  <div className="results-grid">
                    {searchResults.map((post, idx) => (
                      <div
                        key={post.id}
                        className="result-card"
                        onClick={() => {
                          setSelectedPost(post);
                          setCurrentView('detail');
                          addToRecentSearches(searchQuery);
                        }}
                      >
                        <div className="result-image">
                          <img src={post.image} alt={post.title} />
                          <div className={`result-type-badge ${post.type}`}>
                            {post.type}
                          </div>
                        </div>
                        <div className="result-content">
                          <h4 className="result-title">{post.title}</h4>
                          <p className="result-description">{post.description}</p>
                          <div className="result-meta">
                            <span className="result-location">
                              <MapPin size={12} />
                              {post.location}
                            </span>
                            <span className="result-date">{post.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No items found</h3>
                    <p>Try different keywords or check your spelling</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Filter Search View */}
        {searchView === 'filter' && (
          <div className="filter-search-content">
            <div className="filter-sections">
              {/* Item Type Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Item Type</h3>
                <div className="filter-options">
                  {[
                    { value: 'both', label: 'Both Lost & Found' },
                    { value: 'lost', label: 'Lost Items Only' },
                    { value: 'found', label: 'Found Items Only' }
                  ].map(option => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="radio"
                        name="itemType"
                        value={option.value}
                        checked={filters.itemType === option.value}
                        onChange={(e) => setFilters({...filters, itemType: e.target.value})}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Date Range</h3>
                <div className="filter-options">
                  {[
                    { value: 'today', label: 'Today' },
                    { value: 'yesterday', label: 'Yesterday' },
                    { value: 'last7days', label: 'Last Week' },
                    { value: 'last30days', label: 'Last Month' },
                    { value: 'custom', label: 'Custom Range' }
                  ].map(option => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="radio"
                        name="dateRange"
                        value={option.value}
                        checked={filters.dateRange === option.value}
                        onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                
                {filters.dateRange === 'custom' && (
                  <div className="custom-date-range">
                    <input
                      type="date"
                      value={filters.customDateStart}
                      onChange={(e) => setFilters({...filters, customDateStart: e.target.value})}
                      className="date-input"
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={filters.customDateEnd}
                      onChange={(e) => setFilters({...filters, customDateEnd: e.target.value})}
                      className="date-input"
                    />
                  </div>
                )}
              </div>

              {/* Location Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Location</h3>
                <div className="location-filter">
                  <select
                    value={filters.radius}
                    onChange={(e) => setFilters({...filters, radius: e.target.value})}
                    className="radius-select"
                  >
                    <option value="1km">Within 1km</option>
                    <option value="5km">Within 5km</option>
                    <option value="10km">Within 10km</option>
                    <option value="25km">Within 25km</option>
                    <option value="50km">Within 50km</option>
                    <option value="any">Any distance</option>
                  </select>
                  
                  <div className="location-options">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="locationOption"
                        value="current"
                        checked={filters.locationOption === 'current'}
                        onChange={(e) => setFilters({...filters, locationOption: e.target.value})}
                      />
                      <span>Current Location</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="locationOption"
                        value="custom"
                        checked={filters.locationOption === 'custom'}
                        onChange={(e) => setFilters({...filters, locationOption: e.target.value})}
                      />
                      <span>Custom Address</span>
                    </label>
                  </div>
                  
                  {filters.locationOption === 'custom' && (
                    <input
                      type="text"
                      placeholder="Enter address or landmark"
                      value={filters.customAddress}
                      onChange={(e) => setFilters({...filters, customAddress: e.target.value})}
                      className="address-input"
                    />
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Categories</h3>
                <div className="category-checkboxes">
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <label key={category} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, categories: [...filters.categories, category]});
                          } else {
                            setFilters({...filters, categories: filters.categories.filter(c => c !== category)});
                          }
                        }}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="filter-actions">
              <button
                onClick={() => {
                  setFilters({
                    itemType: 'both',
                    dateRange: 'last30days',
                    customDateStart: '',
                    customDateEnd: '',
                    radius: '10km',
                    locationOption: 'current',
                    customAddress: '',
                    categories: []
                  });
                }}
                className="reset-filters-btn"
              >
                Reset All
              </button>
              <button
                onClick={handleFilterSearch}
                className="apply-filters-btn"
              >
                Search ({allPosts.length} items)
              </button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    );
  }

  // Enhanced Detail Screen
  if (currentView === 'detail' && selectedPost) {
    return (
      <div className="detail-screen">
        {/* Header */}
        <div className="detail-header">
          <button
            onClick={() => setCurrentView('search')}
            className="detail-back-btn"
          >
            <ChevronLeft size={24} />
          </button>
         
        </div>

        {/* Photo Gallery */}
        <div className="photo-gallery">
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title}
            className="detail-image"
          />
          <div className={`detail-type-badge ${selectedPost.type}`}>
            {selectedPost.type.toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="detail-content">
          <div className="detail-card">
            {/* Item Info */}
            <div className="item-info">
              <div className="item-header">
                <h1 className="item-title">{selectedPost.title}</h1>
                <span className="item-category">{selectedPost.category}</span>
              </div>
              <p className="item-description">{selectedPost.description}</p>
            </div>

            {/* Meta Information */}
            <div className="detail-meta">
              <div className="meta-item">
                <Calendar className="meta-icon" size={16} />
                <div>
                  <span className="meta-label">Date Posted</span>
                  <span className="meta-value">{selectedPost.date}</span>
                </div>
              </div>
              
              <div className="meta-item">
                <MapPin className="meta-icon" size={16} />
                <div>
                  <span className="meta-label">Location</span>
                  <span className="meta-value">{selectedPost.location}</span>
                </div>
              </div>
              
              <div className="meta-item">
                <Navigation className="meta-icon" size={16} />
                <div>
                  <span className="meta-label">Distance</span>
                  <span className="meta-value">~2.5 km away</span>
                </div>
              </div>
            </div>

            {/* Map Thumbnail */}
            <div className="map-thumbnail">
              <div className="map-placeholder" onClick={() => setCurrentView('map')}>
                <MapIcon size={24} />
                <span>Tap to view on map</span>
              </div>
            </div>

            {/* Poster Info */}
            <div className="poster-info">
              <div className="poster-avatar">
                <User size={20} />
              </div>
              <div className="poster-details">
                <span className="poster-name">
                  {selectedPost.user === user?.name ? 'You' : 
                   user?.isAnonymous ? 'Anonymous User' : selectedPost.user}
                </span>
                <span className="poster-status">Posted {selectedPost.date}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-actions">
              {selectedPost.type === 'found' ? (
                <button 
                  className="primary-action-btn claim-btn"
                  onClick={() => setShowClaimForm(true)}
                >
                  <CheckCircle size={20} />
                  This might be mine
                </button>
              ) : (
                <button 
                  className="primary-action-btn button-found"
                  onClick={() => setShowClaimForm(true)}
                >
                  <Search size={20} />
                  I found this
                </button>
              )}
              
              <button 
                className="secondary-action-btn"
                onClick={() => setCurrentView('chat')}
              >
                <MessageCircle size={20} />
                Contact Poster
              </button>
            </div>
          </div>
        </div>

        {/* Claim Form Modal */}
        {showClaimForm && (
          <div className="claim-modal-overlay">
            <div className="claim-modal">
              <div className="claim-header">
                <h3>Verify Your Claim</h3>
                <button onClick={() => setShowClaimForm(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="claim-content">
                <p>Please answer these questions to verify your claim:</p>
                
                <div className="claim-questions">
                  <div className="question-group">
                    <label>What color is the item?</label>
                    <input type="text" placeholder="Your answer..." />
                  </div>
                  
                  <div className="question-group">
                    <label>What brand/model is it?</label>
                    <input type="text" placeholder="Your answer..." />
                  </div>
                  
                  <div className="question-group">
                    <label>Any unique markings or features?</label>
                    <textarea placeholder="Your answer..." rows={3}></textarea>
                  </div>
                </div>
              </div>
              
              <div className="claim-actions">
                <button 
                  onClick={() => setShowClaimForm(false)}
                  className="cancel-claim-btn"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowClaimForm(false);
                    setCurrentView('chat');
                  }}
                  className="submit-claim-btn"
                >
                  Submit Claim
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    );
  }

  // Add Post Screen
  if (currentView === 'add') {
    return (
      <div className="add-post-screen">
        {/* Header */}
        <div className="add-post-header">
          <div className="header-content">
            <button
              onClick={() => setCurrentView('home')}
              className="back-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="header-title">
              {postType === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
            </h1>
            <div className="w-8" />
          </div>
        </div>

        {/* Content */}
        <div className="add-post-content">
          <div className="form-card">
            {/* Post Type Selector */}
            <div className="post-type-selector">
              <button
                onClick={() => setPostType('lost')}
                className={`type-btn ${postType === 'lost' ? 'type-btn-active lost' : 'type-btn-inactive'}`}
              >
                <Search size={20} />
                Lost Item
              </button>
              <button
                onClick={() => setPostType('found')}
                className={`type-btn ${postType === 'found' ? 'type-btn-active found' : 'type-btn-inactive'}`}
              >
                <CheckCircle size={20} />
                Found Item
              </button>
            </div>

            {/* Form */}
            <form className="post-form" onSubmit={(e) => e.preventDefault()}>
              {/* 1. Add Photo Section */}
              <div className="form-section">
                <div className="photo-upload-area" onClick={handleChoosePhoto}>
                  {newPost.image ? (
                    <div className="photo-preview">
                      <img src={newPost.image} alt="Preview" className="preview-image" />
                      <div className="photo-overlay">
                        <Upload size={24} />
                        <span>Change Photo</span>
                      </div>
                    </div>
                  ) : (
                    <div className="photo-upload-placeholder">
                      <div className="camera-icon">
                        <Upload size={32} />
                      </div>
                      <h3>Add Photo (Recommended)</h3>
                      <p>Take photo or choose from gallery</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* 2. Item Title */}
              <div className="form-section">
                <label className="form-label required">
                  {postType === 'lost' ? 'What did you lose?' : 'What did you find?'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={postType === 'lost' ? 'e.g., Black wallet, iPhone' : 'e.g., Black wallet, iPhone'}
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
              </div>

              {/* 3. Category */}
              <div className="form-section">
                <label className="form-label required">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="form-select"
                  required
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Wallet/Bag">Wallet/Bag</option>
                  <option value="Keys">Keys</option>
                  <option value="Documents">Documents</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* 4. Description */}
              <div className="form-section">
                <label className="form-label required">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder={postType === 'lost' 
                    ? 'e.g., Black leather wallet with credit cards' 
                    : 'e.g., Black leather wallet with cards inside'
                  }
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              {/* 5. Date and Time */}
              <div className="form-section">
                <label className="form-label required">
                  {postType === 'lost' ? 'When lost?' : 'When found?'}
                </label>
                <div className="datetime-inputs">
                  <div className="datetime-group">
                    <label className="datetime-label">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newPost.date || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="datetime-group">
                    <label className="datetime-label">Time</label>
                    <input
                      type="time"
                      className="form-input"
                      value={newPost.time || ''}
                      onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 6. Location */}
              <div className="form-section">
                <label className="form-label required">
                  {postType === 'lost' ? 'Where lost?' : 'Where found?'}
                </label>
                <div className="location-input-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter address or location"
                    value={newPost.location}
                    onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                    required
                  />
                  <button 
                    type="button"
                    className="location-btn"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                          setNewPost({ 
                            ...newPost, 
                            location: `${position.coords.latitude}, ${position.coords.longitude}` 
                          });
                        });
                      }
                    }}
                  >
                    <MapPin size={16} />
                    Use Current Location
                  </button>
                </div>
              </div>

              {/* 7. Item Status (Found) or Additional Notes (Lost) */}
              {postType === 'found' ? (
                <div className="form-section">
                  <label className="form-label">Item Status</label>
                  <div className="status-options">
                    <label className="status-option">
                      <input
                        type="radio"
                        name="itemStatus"
                        value="have"
                        checked={newPost.status !== 'police'}
                        onChange={() => setNewPost({ ...newPost, status: 'have' })}
                      />
                      <div className="status-content">
                        <CheckCircle size={20} className="status-icon" />
                        <div>
                          <h4>I have the item</h4>
                          <p>Item is with me</p>
                        </div>
                      </div>
                    </label>
                    <label className="status-option">
                      <input
                        type="radio"
                        name="itemStatus"
                        value="police"
                        checked={newPost.status === 'police'}
                        onChange={() => setNewPost({ ...newPost, status: 'police' })}
                      />
                      <div className="status-content">
                        <MapPin size={20} className="status-icon" />
                        <div>
                          <h4>Dropped at police station/center</h4>
                          <p>Item submitted to authorities</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="form-section">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Any other details... e.g., Last seen in coffee shop"
                    value={newPost.notes || ''}
                    onChange={(e) => setNewPost({ ...newPost, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              )}

              {/* 8. Submit Button */}
              <div className="form-section">
                <button
                  type="button"
                  onClick={handleAddPost}
                  className={`submit-btn ${postType}`}
                  disabled={!newPost.title || !newPost.description || !newPost.location}
                >
                  {postType === 'lost' ? 'POST LOST ITEM' : 'POST FOUND ITEM'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Profile Screen
  if (currentView === 'profile') {
    return (
      <ProfileSection BottomNav={BottomNav} logout={logout} />
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

  // Chat Screen (basic implementation)
  if (currentView === 'chat') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white shadow-sm">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center">
            <button 
              onClick={() => setCurrentView('detail')}
              className="mr-3"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Chat</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          <div className="bg-white rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-600">Start a conversation about the item</p>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }
  // Add these state variables with your existing state
const [claimData, setClaimData] = useState({
  answers: {},
  photos: [],
  status: 'pending' // 'pending', 'approved', 'declined', 'more_info_requested'
});
const [claimQuestions, setClaimQuestions] = useState([]);
const [pendingClaims, setPendingClaims] = useState([]);
const [currentClaimReview, setCurrentClaimReview] = useState(null);

// Add this function to generate dynamic questions based on item type
const generateClaimQuestions = (item) => {
  const baseQuestions = [
    { id: 'color', question: 'What color is the item?', type: 'text', required: true },
    { id: 'brand', question: 'What brand is it?', type: 'text', required: true }
  ];

  const categoryQuestions = {
    'Electronics': [
      { id: 'model', question: 'What model/version is it?', type: 'text', required: true },
      { id: 'damage', question: 'Any scratches, cracks, or damage?', type: 'textarea', required: false },
      { id: 'case', question: 'Was it in a case or cover?', type: 'text', required: false }
    ],
    'Wallet/Bag': [
      { id: 'contents', question: 'What was inside?', type: 'textarea', required: true },
      { id: 'material', question: 'What material is it made of?', type: 'text', required: true },
      { id: 'compartments', question: 'How many compartments does it have?', type: 'text', required: false }
    ],
    'Keys': [
      { id: 'keychain', question: 'What keychain or accessories were attached?', type: 'text', required: true },
      { id: 'keys_count', question: 'How many keys were on it?', type: 'text', required: true },
      { id: 'key_types', question: 'What types of keys (house, car, office)?', type: 'textarea', required: false }
    ],
    'Documents': [
      { id: 'document_type', question: 'What type of document?', type: 'text', required: true },
      { id: 'name_on_doc', question: 'Name on the document?', type: 'text', required: true },
      { id: 'issue_date', question: 'When was it issued?', type: 'date', required: false }
    ],
    'Clothing': [
      { id: 'size', question: 'What size is it?', type: 'text', required: true },
      { id: 'fabric', question: 'What material/fabric?', type: 'text', required: false },
      { id: 'distinctive', question: 'Any distinctive features or stains?', type: 'textarea', required: false }
    ]
  };

  const specificQuestions = categoryQuestions[item.category] || [];
  return [...baseQuestions, ...specificQuestions];
};

// Add claim submission function
const submitClaim = () => {
  const claim = {
    id: Date.now(),
    itemId: selectedPost.id,
    claimantId: user.id,
    answers: claimData.answers,
    photos: claimData.photos,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    item: selectedPost
  };
  
  setPendingClaims([...pendingClaims, claim]);
  setClaimData({ answers: {}, photos: [], status: 'pending' });
  setCurrentView('claim_waiting');
};

// Add these new view conditions to your existing App.jsx

// Claim Verification Screen
if (currentView === 'claim_verification') {
  return (
    <div className="claim-screen">
      {/* Header */}
      <div className="claim-header">
        <div className="claim-header-content">
          <button 
            onClick={() => setCurrentView('detail')}
            className="back-btn"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="claim-title">Verify Ownership</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="claim-content">
        <div className="claim-card">
          {/* Item Summary */}
          <div className="claim-item-summary">
            <img src={selectedPost.image} alt={selectedPost.title} className="claim-item-image" />
            <div className="claim-item-info">
              <h3>{selectedPost.title}</h3>
              <p>{selectedPost.location}</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="claim-instructions">
            <div className="instruction-icon">
              <CheckCircle size={24} />
            </div>
            <h2>Answer these questions to verify ownership</h2>
            <p>Help us confirm this item belongs to you by providing specific details</p>
          </div>

          {/* Questions Form */}
          <form className="claim-form" onSubmit={(e) => e.preventDefault()}>
            {claimQuestions.map((question) => (
              <div key={question.id} className="claim-question">
                <label className={`question-label ${question.required ? 'required' : ''}`}>
                  {question.question}
                </label>
                
                {question.type === 'textarea' ? (
                  <textarea
                    className="claim-input"
                    placeholder="Your answer..."
                    value={claimData.answers[question.id] || ''}
                    onChange={(e) => setClaimData({
                      ...claimData,
                      answers: { ...claimData.answers, [question.id]: e.target.value }
                    })}
                    rows={3}
                    required={question.required}
                  />
                ) : question.type === 'date' ? (
                  <input
                    type="date"
                    className="claim-input"
                    value={claimData.answers[question.id] || ''}
                    onChange={(e) => setClaimData({
                      ...claimData,
                      answers: { ...claimData.answers, [question.id]: e.target.value }
                    })}
                    required={question.required}
                  />
                ) : (
                  <input
                    type="text"
                    className="claim-input"
                    placeholder="Your answer..."
                    value={claimData.answers[question.id] || ''}
                    onChange={(e) => setClaimData({
                      ...claimData,
                      answers: { ...claimData.answers, [question.id]: e.target.value }
                    })}
                    required={question.required}
                  />
                )}
              </div>
            ))}

            {/* Photo Evidence Upload */}
            <div className="photo-evidence-section">
              <h3 className="evidence-title">Photo Evidence (Optional)</h3>
              <p className="evidence-subtitle">Upload photos that prove ownership</p>
              
              <div className="evidence-upload-area" onClick={() => fileInputRef.current?.click()}>
                <Upload size={32} />
                <span>Add Photo Evidence</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setClaimData({
                      ...claimData,
                      photos: [...claimData.photos, ...files.map(f => URL.createObjectURL(f))]
                    });
                  }}
                  className="hidden"
                />
              </div>

              {claimData.photos.length > 0 && (
                <div className="evidence-preview">
                  {claimData.photos.map((photo, idx) => (
                    <div key={idx} className="evidence-photo">
                      <img src={photo} alt={`Evidence ${idx + 1}`} />
                      <button
                        onClick={() => setClaimData({
                          ...claimData,
                          photos: claimData.photos.filter((_, i) => i !== idx)
                        })}
                        className="remove-photo-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={submitClaim}
              className="submit-claim-btn"
              disabled={!claimQuestions.every(q => !q.required || claimData.answers[q.id])}
            >
              Submit Verification
            </button>
          </form>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// Claim Waiting Screen
if (currentView === 'claim_waiting') {
  return (
    <div className="waiting-screen">
      <div className="waiting-content">
        <div className="waiting-card">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="checkmark-circle">
              <CheckCircle size={64} />
            </div>
          </div>

          {/* Status Info */}
          <div className="waiting-info">
            <h2>Your claim has been sent!</h2>
            <p>The finder will review your answers and get back to you soon.</p>
          </div>

          {/* Timeline */}
          <div className="response-timeline">
            <div className="timeline-item completed">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Claim Submitted</h4>
                <p>Just now</p>
              </div>
            </div>
            
            <div className="timeline-item pending">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Under Review</h4>
                <p>Typically 2-24 hours</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Response</h4>
                <p>You'll get notified</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="waiting-actions">
            <button
              onClick={() => setCurrentView('home')}
              className="secondary-btn"
            >
              Back to Home
            </button>
            <button
              onClick={() => setCurrentView('notifications')}
              className="primary-btn"
            >
              View Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Claim Review Screen (For Finders)
if (currentView === 'claim_review' && currentClaimReview) {
  return (
    <div className="review-screen">
      {/* Header */}
      <div className="review-header">
        <div className="review-header-content">
          <button 
            onClick={() => setCurrentView('notifications')}
            className="back-btn"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="review-title">Review Claim</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="review-content">
        <div className="review-card">
          {/* Claim Info */}
          <div className="claim-info-header">
            <img src={currentClaimReview.item.image} alt={currentClaimReview.item.title} className="review-item-image" />
            <div className="claim-info-details">
              <h3>{currentClaimReview.item.title}</h3>
              <p className="claim-time">Claim received {new Date(currentClaimReview.submittedAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Claimant's Answers */}
          <div className="answers-section">
            <h3 className="section-title">Claimant's Answers</h3>
            <div className="answers-list">
              {Object.entries(currentClaimReview.answers).map(([questionId, answer]) => {
                const question = claimQuestions.find(q => q.id === questionId);
                return (
                  <div key={questionId} className="answer-item">
                    <div className="answer-question">{question?.question}</div>
                    <div className="answer-response">{answer}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Photo Evidence */}
          {currentClaimReview.photos.length > 0 && (
            <div className="evidence-section">
              <h3 className="section-title">Photo Evidence</h3>
              <div className="evidence-grid">
                {currentClaimReview.photos.map((photo, idx) => (
                  <img key={idx} src={photo} alt={`Evidence ${idx + 1}`} className="evidence-image" />
                ))}
              </div>
            </div>
          )}

          {/* Your Item Details (For Comparison) */}
          <div className="item-comparison">
            <h3 className="section-title">Your Item Details</h3>
            <div className="item-details">
              <p><strong>Description:</strong> {currentClaimReview.item.description}</p>
              <p><strong>Category:</strong> {currentClaimReview.item.category}</p>
              <p><strong>Found at:</strong> {currentClaimReview.item.location}</p>
            </div>
          </div>

          {/* Review Actions */}
          <div className="review-actions">
            <button
              onClick={() => {
                // Handle decline
                setCurrentView('notifications');
              }}
              className="decline-btn"
            >
              <X size={20} />
              Decline Claim
            </button>
            
            <button
              onClick={() => {
                // Handle request more info
                setCurrentView('request_info');
              }}
              className="more-info-btn"
            >
              <MessageCircle size={20} />
              Request More Info
            </button>
            
            <button
              onClick={() => {
                // Handle approve
                setCurrentView('claim_approved');
              }}
              className="approve-btn"
            >
              <CheckCircle size={20} />
              Approve Claim
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// Claim Approved Screen
if (currentView === 'claim_approved') {
  return (
    <div className="approval-screen">
      <div className="approval-content">
        <div className="approval-card">
          {/* Success Animation */}
          <div className="success-celebration">
            <div className="celebration-icon">
              <CheckCircle size={80} />
            </div>
            <h2>Great News!</h2>
            <p>The claim has been approved. You can now contact each other directly.</p>
          </div>

          {/* Contact Options */}
          <div className="contact-options">
            <h3>Contact Options</h3>
            
            <button
              onClick={() => setCurrentView('chat')}
              className="contact-option-btn"
            >
              <MessageCircle size={24} />
              <div>
                <h4>Secure Chat</h4>
                <p>Start messaging privately</p>
              </div>
            </button>

            <button
              onClick={() => {
                // Handle phone contact
              }}
              className="contact-option-btn"
            >
              <Phone size={24} />
              <div>
                <h4>Phone Contact</h4>
                <p>Exchange phone numbers</p>
              </div>
            </button>
          </div>

          {/* Meeting Tools */}
          <div className="meeting-tools">
            <h3>Meeting Arrangement</h3>
            <div className="tool-buttons">
              <button className="tool-btn">
                <MapPin size={20} />
                Suggest Meeting Spot
              </button>
              <button className="tool-btn">
                <Calendar size={20} />
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="approval-actions">
            <button
              onClick={() => setCurrentView('home')}
              className="secondary-btn"
            >
              Back to Home
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className="primary-btn"
            >
              Start Chatting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update the claim button click in detail view
// In your detail screen, update the claim button:
<button 
  className="primary-action-btn claim-btn"
  onClick={() => {
    const questions = generateClaimQuestions(selectedPost);
    setClaimQuestions(questions);
    setCurrentView('claim_verification');
  }}
>
  <CheckCircle size={20} />
  This might be mine
</button>

  // Default return
  return null;
};

export default App;
