import React, { useState, useEffect } from 'react';
import {
  User,
  Settings,
  Bell,
  Shield,
  Edit3,
  Camera,
  ChevronRight,
  Globe,
  Moon,
  Sun,
  HelpCircle,
  MessageSquare,
  FileText,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Award,
  Plus
} from 'lucide-react';

const ProfileSection = ({ BottomNav, logout, user, allPosts, setCurrentView, setSelectedPost }) => {
  const [activeSection, setActiveSection] = useState('main'); // 'main', 'personal', 'posts', 'claims', 'settings'
  const [isAnonymous, setIsAnonymous] = useState(user?.isAnonymous || false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    claims: true,
    updates: false
  });
  
  const [userProfile, setUserProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    photo: null,
    isVerified: false,
    joinDate: '2024-01-15'
  });

  // Fix scroll reset when section changes
  useEffect(() => {
    // Reset scroll position when section changes
    const resetScroll = () => {
      // Method 1: Reset window scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Method 2: Reset profile content scroll if it exists
      const profileContent = document.querySelector('.profile-content');
      if (profileContent) {
        profileContent.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      // Method 3: Reset any other scroll containers
      const profileScreen = document.querySelector('.profile-screen');
      if (profileScreen) {
        profileScreen.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    // Use requestAnimationFrame for smooth execution
    requestAnimationFrame(resetScroll);
  }, [activeSection]);

  // Enhanced navigation function with scroll reset
  const navigateToSection = (sectionName) => {
    setActiveSection(sectionName);
    
    // Additional immediate scroll reset
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
  };

  // Mock data for posts and claims
  const userPosts = allPosts?.filter(post => post.user === userProfile.name) || [
    {
      id: 1,
      title: 'iPhone 15 Pro',
      type: 'lost',
      status: 'active',
      claims: 2,
      date: '2024-08-07',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200'
    },
    {
      id: 2,
      title: 'Black Wallet',
      type: 'found',
      status: 'claimed',
      claims: 1,
      date: '2024-08-05',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200'
    }
  ];

  const userClaims = [
    {
      id: 1,
      itemTitle: 'AirPods Pro',
      status: 'pending',
      submittedDate: '2024-08-08',
      type: 'found'
    },
    {
      id: 2,
      itemTitle: 'House Keys',
      status: 'approved',
      submittedDate: '2024-08-03',
      type: 'lost'
    }
  ];

  // Main Profile Screen
  if (activeSection === 'main') {
    return (
      <div className="profile-screen">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <button 
              onClick={() => setCurrentView('home')}
              className="back-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="profile-title">Profile</h1>
            <button 
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-content">
          <div className="profile-card">
            {/* User Info */}
            <div className="user-info-section">
              <div className="user-avatar">
                {userProfile.photo ? (
                  <img src={userProfile.photo} alt="Profile" className="avatar-image" />
                ) : (
                  <User size={32} />
                )}
                <button className="avatar-edit-btn">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="user-details">
                <div className="user-name-section">
                  <h2>{isAnonymous ? 'Anonymous User' : userProfile.name}</h2>
                  {userProfile.isVerified ? (
                    <CheckCircle className="verified-icon" size={20} />
                  ) : (
                    <AlertCircle className="unverified-icon" size={20} />
                  )}
                </div>
                <p className="user-email">{userProfile.email}</p>
                <p className="join-date">Member since {new Date(userProfile.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">{userPosts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userClaims.length}</span>
                <span className="stat-label">Claims</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
            
            {/* Badges Section */}
            <div className="badges-section">
            <h3 className="badges-title">Achievements</h3>
            <div className="badges-grid">
                {userProfile.isVerified && (
                <div className="badge-item verified">
                    <div className="badge-icon">
                    <CheckCircle size={20} />
                    </div>
                    <div className="badge-info">
                    <span className="badge-name">Verified</span>
                    <span className="badge-description">Account verified</span>
                    </div>
                </div>
                )}
                
                {userPosts.length >= 1 && (
                <div className="badge-item active">
                    <div className="badge-icon">
                    <FileText size={20} />
                    </div>
                    <div className="badge-info">
                    <span className="badge-name">Active Poster</span>
                    <span className="badge-description">{userPosts.length}+ posts</span>
                    </div>
                </div>
                )}
                
                {userClaims.filter(c => c.status === 'approved').length >= 1 && (
                <div className="badge-item helpful">
                    <div className="badge-icon">
                    <CheckCircle size={20} />
                    </div>
                    <div className="badge-info">
                    <span className="badge-name">Helper</span>
                    <span className="badge-description">Successful claims</span>
                    </div>
                </div>
                )}
                
                <div className="badge-item community">
                <div className="badge-icon">
                    <Shield size={20} />
                </div>
                <div className="badge-info">
                    <span className="badge-name">Trusted</span>
                    <span className="badge-description">Follows guidelines</span>
                </div>
                </div>
                
                {new Date().getTime() - new Date(userProfile.joinDate).getTime() > 30 * 24 * 60 * 60 * 1000 && (
                <div className="badge-item veteran">
                    <div className="badge-icon">
                    <Award size={20} />
                    </div>
                    <div className="badge-info">
                    <span className="badge-name">Veteran</span>
                    <span className="badge-description">30+ days member</span>
                    </div>
                </div>
                )}
                
                <div className="badge-item newcomer">
                <div className="badge-icon">
                    <User size={20} />
                </div>
                <div className="badge-info">
                    <span className="badge-name">Community Member</span>
                    <span className="badge-description">Welcome to the community!</span>
                </div>
                </div>
            </div>
            
            {/* Show More Badges Button */}
            <button className="show-all-badges-btn">
                <Award size={16} />
                View All Achievements
            </button>
            </div>
     
            {/* Anonymity Toggle */}
            <div className="anonymity-section">
              <div className="toggle-header">
                <div className="toggle-info">
                  <h3>Anonymous Mode</h3>
                  <p>Hide your identity when posting items</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {/* Menu Options */}
            <div className="menu-sections">
              <div className="menu-section">
                <h3 className="section-header">Account</h3>
                
                <button 
                  className="menu-item"
                  onClick={() => navigateToSection('personal')}
                >
                  <div className="menu-item-content">
                    <div className="menu-icon">
                      <User size={20} />
                    </div>
                    <div className="menu-text">
                      <span>Personal Info</span>
                      <small>Manage your profile details</small>
                    </div>
                  </div>
                  <ChevronRight size={16} />
                </button>

                <button 
                  className="menu-item"
                  onClick={() => navigateToSection('posts')}
                >
                  <div className="menu-item-content">
                    <div className="menu-icon">
                      <FileText size={20} />
                    </div>
                    <div className="menu-text">
                      <span>My Posts</span>
                      <small>{userPosts.length} active posts</small>
                    </div>
                  </div>
                  <ChevronRight size={16} />
                </button>

                <button 
                  className="menu-item"
                  onClick={() => navigateToSection('claims')}
                >
                  <div className="menu-item-content">
                    <div className="menu-icon">
                      <CheckCircle size={20} />
                    </div>
                    <div className="menu-text">
                      <span>My Claims</span>
                      <small>{userClaims.length} claims submitted</small>
                    </div>
                  </div>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="menu-section">
                <h3 className="section-header">Preferences</h3>
                
                <button 
                  className="menu-item"
                  onClick={() => navigateToSection('settings')}
                >
                  <div className="menu-item-content">
                    <div className="menu-icon">
                      <Settings size={20} />
                    </div>
                    <div className="menu-text">
                      <span>Settings</span>
                      <small>Notifications, privacy & more</small>
                    </div>
                  </div>
                  <ChevronRight size={16} />
                </button>

                <button className="menu-item">
                  <div className="menu-item-content">
                    <div className="menu-icon">
                      <HelpCircle size={20} />
                    </div>
                    <div className="menu-text">
                      <span>Help & Support</span>
                      <small>FAQ, contact & guidelines</small>
                    </div>
                  </div>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Personal Info Screen
  if (activeSection === 'personal') {
    return (
      <div className="profile-screen">
        <div className="profile-header">
          <div className="profile-header-content">
            <button 
              onClick={() => navigateToSection('main')}
              className="back-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="profile-title">Personal Info</h1>
            <button className="save-btn">Save</button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            {/* Profile Photo */}
            <div className="photo-section">
              <div className="large-avatar">
                {userProfile.photo ? (
                  <img src={userProfile.photo} alt="Profile" className="avatar-image" />
                ) : (
                  <User size={48} />
                )}
              </div>
              <button className="change-photo-btn">
                <Camera size={16} />
                Change Photo
              </button>
            </div>

            {/* Form Fields */}
            <div className="form-sections">
              <div className="form-section">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-section">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="form-input with-icon"
                  />
                  {userProfile.isVerified ? (
                    <CheckCircle className="verification-icon verified" size={18} />
                  ) : (
                    <AlertCircle className="verification-icon unverified" size={18} />
                  )}
                </div>
              </div>

              <div className="form-section">
                <label className="form-label">Phone Number</label>
                <div className="input-with-icon">
                  <Phone className="input-icon" size={18} />
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-section">
                <label className="form-label">Location</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={18} />
                  <input
                    type="text"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                    className="form-input with-icon"
                  />
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="verification-section">
              <h3>Account Verification</h3>
              <div className="verification-status">
                {userProfile.isVerified ? (
                  <div className="verified-status">
                    <CheckCircle className="status-icon verified" size={24} />
                    <div>
                      <h4>Verified Account</h4>
                      <p>Your account has been verified</p>
                    </div>
                  </div>
                ) : (
                  <div className="unverified-status">
                    <AlertCircle className="status-icon unverified" size={24} />
                    <div>
                      <h4>Unverified Account</h4>
                      <p>Verify your email to increase trust</p>
                      <button className="verify-btn">Verify Now</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // My Posts Screen
  if (activeSection === 'posts') {
    return (
      <div className="profile-screen">
        <div className="profile-header">
          <div className="profile-header-content">
            <button 
              onClick={() => navigateToSection('main')}
              className="back-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="profile-title">My Posts</h1>
            <button 
              onClick={() => setCurrentView('add')}
              className="add-btn"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="posts-container">
            {/* Stats Summary */}
            <div className="posts-stats">
              <div className="stat-card">
                <span className="stat-number">{userPosts.filter(p => p.status === 'active').length}</span>
                <span className="stat-label">Active</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{userPosts.filter(p => p.status === 'claimed').length}</span>
                <span className="stat-label">Claimed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{userPosts.reduce((sum, p) => sum + p.claims, 0)}</span>
                <span className="stat-label">Total Claims</span>
              </div>
            </div>

            {/* Posts List */}
            <div className="posts-list">
              {userPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                    <div className={`post-type-badge ${post.type}`}>
                      {post.type}
                    </div>
                  </div>
                  
                  <div className="post-details">
                    <div className="post-header">
                      <h3>{post.title}</h3>
                      <span className={`status-badge ${post.status}`}>
                        {post.status}
                      </span>
                    </div>
                    
                    <div className="post-meta">
                      <span className="post-date">{post.date}</span>
                      <span className="post-claims">{post.claims} claims</span>
                    </div>
                    
                    <div className="post-actions">
                      <button 
                        className="post-action-btn view"
                        onClick={() => {
                          setSelectedPost && setSelectedPost(post);
                          setCurrentView('detail');
                        }}
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button className="post-action-btn edit">
                        <Edit3 size={16} />
                        Edit
                      </button>
                      <button className="post-action-btn delete">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // My Claims Screen
  if (activeSection === 'claims') {
    return (
      <div className="profile-screen">
        <div className="profile-header">
          <div className="profile-header-content">
            <button 
              onClick={() => navigateToSection('main')}
              className="back-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="profile-title">My Claims</h1>
            <div className="w-8" />
          </div>
        </div>

        <div className="profile-content">
          <div className="claims-container">
            {/* Claims Summary */}
            <div className="claims-summary">
              <div className="summary-card">
                <h3>Active Claims</h3>
                <span className="summary-number">
                  {userClaims.filter(c => c.status === 'pending').length}
                </span>
              </div>
              <div className="summary-card">
                <h3>Approved</h3>
                <span className="summary-number approved">
                  {userClaims.filter(c => c.status === 'approved').length}
                </span>
              </div>
            </div>

            {/* Claims List */}
            <div className="claims-list">
              <h3>Claim History</h3>
              {userClaims.map((claim) => (
                <div key={claim.id} className="claim-card">
                  <div className="claim-header">
                    <div className="claim-info">
                      <h4>{claim.itemTitle}</h4>
                      <p>Claim for {claim.type} item</p>
                    </div>
                    <span className={`claim-status ${claim.status}`}>
                      {claim.status === 'pending' && <Clock size={16} />}
                      {claim.status === 'approved' && <CheckCircle size={16} />}
                      {claim.status}
                    </span>
                  </div>
                  
                  <div className="claim-details">
                    <div className="claim-date">
                      <span>Submitted: {claim.submittedDate}</span>
                    </div>
                    
                    {claim.status === 'pending' && (
                      <div className="claim-actions">
                        <button className="claim-action-btn">
                          <MessageSquare size={16} />
                          Message
                        </button>
                        <button className="claim-action-btn cancel">
                          Cancel Claim
                        </button>
                      </div>
                    )}
                    
                    {claim.status === 'approved' && (
                      <div className="claim-success">
                        <p>✓ Claim approved! Contact the poster to arrange pickup.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Settings Screen
  if (activeSection === 'settings') {
    return (
      <div className="profile-screen">
        <div className="profile-header">
          <div className="profile-header-content">
            <button 
              onClick={() => navigateToSection('main')}
              className="back-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="profile-title">Settings</h1>
            <div className="w-8" />
          </div>
        </div>

        <div className="profile-content">
          <div className="settings-container">
            {/* Notifications */}
            <div className="settings-section">
              <h3>Notifications</h3>
              <div className="setting-items">
                <div className="setting-item">
                  <div className="setting-info">
                    <span>New Matches</span>
                    <small>When someone finds your lost item</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.newMatches}
                      onChange={(e) => setNotifications({...notifications, newMatches: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <span>Messages</span>
                    <small>New messages and replies</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.messages}
                      onChange={(e) => setNotifications({...notifications, messages: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <span>Claims</span>
                    <small>When someone claims your found item</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.claims}
                      onChange={(e) => setNotifications({...notifications, claims: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <span>App Updates</span>
                    <small>News and feature announcements</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.updates}
                      onChange={(e) => setNotifications({...notifications, updates: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            

            {/* Preferences */}
            <div className="settings-section">
              <h3>Preferences</h3>
              <div className="setting-items">
                <div className="setting-item">
                  <div className="setting-info">
                    <span>Language</span>
                    <small>App language</small>
                  </div>
                  <select className="setting-select">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <span>Dark Mode</span>
                    <small>Use dark theme</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="settings-section">
              <h3>Help & Support</h3>
              <div className="setting-items">
                <button className="setting-button">
                  <HelpCircle size={20} />
                  <div className="setting-info">
                    <span>FAQ</span>
                    <small>Frequently asked questions</small>
                  </div>
                  <ChevronRight size={16} />
                </button>

                <button className="setting-button">
                  <MessageSquare size={20} />
                  <div className="setting-info">
                    <span>Contact Support</span>
                    <small>Get help from our team</small>
                  </div>
                  <ChevronRight size={16} />
                </button>

                <button className="setting-button">
                  <Shield size={20} />
                  <div className="setting-info">
                    <span>Safety Guidelines</span>
                    <small>Stay safe when meeting</small>
                  </div>
                  <ChevronRight size={16} />
                </button>

                <button className="setting-button">
                  <FileText size={20} />
                  <div className="setting-info">
                    <span>Community Guidelines</span>
                    <small>Rules and best practices</small>
                  </div>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return null;
};

export default ProfileSection;
