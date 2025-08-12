import React, { useState } from 'react';
import { Search, Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onNavigateToSignup, onNavigateToLogin, onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSocialLogin = (provider) => {
    onLogin({ 
      name: `${provider} User`, 
      email: `${provider.toLowerCase()}@example.com`,
      isAnonymous: true,
      provider 
    }, `${provider.toLowerCase()}_token_12345`);
  };

  const handleEmailLogin = () => {
    if (loginData.email && loginData.password) {
      onLogin({
        name: 'User',
        email: loginData.email,
        isAnonymous: false
      }, 'email_login_token');
    }
  };

  return (
    <div className="welcome-container">
      {/* Header Section */}
      <div className="welcome-header">
        <div className="app-brand">
          <div className="app-logo">
            <Search className="logo-icon" size={28} />
          </div>
          <h1 className="app-name">Lost & Found</h1>
          <p className="app-tagline">Find what's lost, return what's found</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="welcome-content">
        {/* Welcome Message */}
        <div className="welcome-message">
          <h2 className="welcome-title">Welcome!</h2>
          <p className="welcome-description">
            If you're new here, please create an account to get started.<br/>
            Existing users can sign in below.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="login-section">
          <div className="login-card">
            <h3 className="login-title">Sign In to Your Account</h3>
            
            <div className="login-form">
              {/* Email Input */}
              <div className="input-group">
                <div className="input-with-icon">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="login-input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="input-group">
                <div className="input-with-icon">
                  <Lock className="input-icon" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="login-input password-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button 
                className="login-submit-btn"
                onClick={handleEmailLogin}
                disabled={!loginData.email || !loginData.password}
              >
                Sign In
                <ArrowRight className="btn-arrow" size={18} />
              </button>

              {/* Divider */}
              <div className="form-divider">
                <span className="divider-text">or continue with</span>
              </div>

              {/* Social Login Buttons */}
              <div className="social-login-section">
                <button 
                  className="social-btn google-btn"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>

                <button 
                  className="social-btn facebook-btn"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New User Section */}
        <div className="new-user-section">
          <div className="new-user-card">
            <div className="new-user-content">
              <h3 className="new-user-title">New to Lost & Found?</h3>
              <p className="new-user-text">
                Join thousands of users helping each other find lost items in their community.
              </p>
              <button 
                className="create-account-btn"
                onClick={onNavigateToSignup}
              >
                Create Your Account
                <ArrowRight className="btn-arrow" size={18} />
              </button>
            </div>
            <div className="features-preview">
              <div className="feature-item">
                <div className="feature-icon">📍</div>
                <span>Location-Based</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔐</div>
                <span>Secure & Private</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <span>Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
