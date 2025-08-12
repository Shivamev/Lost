import React, { useState } from 'react';
import { Search, ChevronLeft, Eye, EyeOff, ArrowRight, Mail, Lock, User } from 'lucide-react';
import './SignupScreen.css';

const SignupScreen = ({ onSignupSuccess, onBackToWelcome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const userData = {
          name: formData.name,
          email: formData.email,
          isAnonymous: isAnonymous,
          createdAt: new Date().toISOString()
        };
        onSignupSuccess(userData, 'new_user_token_12345');
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ general: 'Signup failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialSignup = (provider) => {
    const userData = {
      name: `${provider} User`,
      email: `${provider.toLowerCase()}@example.com`,
      isAnonymous: true,
      provider: provider,
      createdAt: new Date().toISOString()
    };
    onSignupSuccess(userData, `${provider.toLowerCase()}_token_12345`);
  };

  return (
    <div className="signup-container">
      {/* Header Section */}
      <div className="signup-header">
        <div className="header-nav">
          <button 
            onClick={onBackToWelcome}
            className="back-btn"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="header-title">Create Account</h1>
        </div>

        <div className="signup-intro">
          <div className="signup-logo">
            <Search className="signup-logo-icon" size={28} />
          </div>
          <h2 className="signup-title">Join Lost & Found</h2>
          <p className="signup-subtitle">Start helping your community today</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="signup-form-section">
        <div className="signup-form-card">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}
          
          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="input-group">
              <div className={`input-with-icon ${errors.name ? 'has-error' : ''}`}>
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="signup-input"
                />
              </div>
              {errors.name && (
                <div className="error-message">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="input-group">
              <div className={`input-with-icon ${errors.email ? 'has-error' : ''}`}>
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="signup-input"
                />
              </div>
              {errors.email && (
                <div className="error-message">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="input-group">
              <div className={`input-with-icon ${errors.password ? 'has-error' : ''}`}>
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="signup-input password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <div className="error-message">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <div className={`input-with-icon ${errors.confirmPassword ? 'has-error' : ''}`}>
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="signup-input password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Anonymous Mode Toggle */}
            <div className="anonymous-toggle-section">
              <div className="anonymous-toggle-content">
                <div className="anonymous-toggle-info">
                  <h3>🔒 Anonymous Mode</h3>
                  <p>Hide your personal details by default for privacy</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`toggle-switch ${isAnonymous ? 'active' : 'inactive'}`}
                >
                  <div className="toggle-switch-knob" />
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="button"
              onClick={handleSignup}
              className={`signup-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {!isLoading && (
                <>
                  Create Account
                  <ArrowRight className="btn-arrow" size={18} />
                </>
              )}
            </button>

            {/* Social Signup */}
            <div className="social-signup-section">
              <div className="social-divider">
                <span className="social-divider-text">or sign up with</span>
              </div>
              
              <div className="social-signup-buttons">
                <button
                  type="button"
                  onClick={() => handleSocialSignup('Google')}
                  className="social-signup-btn google-signup-btn"
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
                  type="button"
                  onClick={() => handleSocialSignup('Facebook')}
                  className="social-signup-btn facebook-signup-btn"
                >
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
