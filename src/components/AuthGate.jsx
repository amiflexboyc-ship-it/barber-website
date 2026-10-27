import React, { useState } from 'react';
import { 
  Scissors, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  ArrowRight, 
  AlertCircle,
  Clock,
  Award
} from 'lucide-react';
import { loginUser, registerUser, loginAsDemo, loginAsAdmin } from '../services/authService.js';
import { BARBERS_DATA } from './Barbers.jsx';

export default function AuthGate({ onAuthenticated }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupBarber, setSignupBarber] = useState(BARBERS_DATA[0]?.name || "Marcus 'The Architect' Sterling");
  const [signupNotes, setSignupNotes] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim()) {
      setErrorMsg('Please enter your member email address.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginUser({ email: loginEmail, password: loginPassword });
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(`Welcome back, ${res.user.name}. Unlocking parlour access...`);
        setTimeout(() => {
          onAuthenticated(res.user);
        }, 600);
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
      }
    }, 450);
  };

  // Handle Demo 1-Click Login
  const handleDemoLogin = () => {
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      const demo = loginAsDemo();
      setIsLoading(false);
      setSuccessMsg(`Welcome back, ${demo.name}. Unlocking VIP parlour access...`);
      setTimeout(() => {
        onAuthenticated(demo);
      }, 500);
    }, 350);
  };

  // Handle Admin 1-Click Login
  const handleAdminLogin = () => {
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      const admin = loginAsAdmin();
      setIsLoading(false);
      setSuccessMsg(`Welcome, Master Owner ${admin.name}. Launching Admin Console...`);
      setTimeout(() => {
        onAuthenticated(admin);
      }, 500);
    }, 350);
  };

  // Handle Sign Up submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signupName.trim()) {
      setErrorMsg('Please provide your full gentleman name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMsg('Please provide a valid email address for appointment confirmations.');
      return;
    }
    if (!signupPhone.trim()) {
      setErrorMsg('Please provide your contact phone number.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please accept the member patronage terms to continue.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = registerUser({
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
        password: signupPassword,
        preferredBarber: signupBarber,
        haircutNotes: signupNotes,
      });

      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(`Registration successful! Welcome to The Noble Blade, ${res.user.name}. Unlocking access...`);
        setTimeout(() => {
          onAuthenticated(res.user);
        }, 700);
      } else {
        setErrorMsg(res.error || 'Registration could not be completed.');
      }
    }, 550);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '2.5rem 1.25rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambience & Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(30, 64, 175, 0.22) 0%, rgba(7, 13, 30, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '600px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Brand Crest Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #15254a 0%, #0c162e 100%)',
              border: '2px solid var(--gold-primary)',
              boxShadow: '0 0 30px rgba(37, 99, 235, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-light)',
              marginBottom: '1rem',
            }}
          >
            <Scissors size={28} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(197, 160, 89, 0.12)',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--gold-light)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            <Lock size={12} /> Private Patron Access Portal
          </div>

          <h1
            className="auth-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 5vw, 2.1rem)',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '0.4rem',
            }}
          >
            ADETECH BARBING
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto' }}>
            Exclusive Gentlemen's Parlour & Grooming Salon. Member authentication is required to access the parlour, schedules & chair reservations.
          </p>
        </div>

        {/* Auth Card Box */}
        <div
          className="glass-card auth-card"
          style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.12)',
            backgroundColor: 'rgba(18, 20, 28, 0.92)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Tab Switcher */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              backgroundColor: 'rgba(10, 11, 14, 0.7)',
              padding: '0.35rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '1.75rem',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              style={{
                padding: '0.7rem 1rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: mode === 'login' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: mode === 'login' ? 'var(--gold-primary)' : 'transparent',
                color: mode === 'login' ? '#070d1e' : 'var(--text-secondary)',
                boxShadow: mode === 'login' ? '0 4px 15px rgba(197, 160, 89, 0.3)' : 'none',
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              style={{
                padding: '0.7rem 1rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: mode === 'signup' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: mode === 'signup' ? 'var(--gold-primary)' : 'transparent',
                color: mode === 'signup' ? '#070d1e' : 'var(--text-secondary)',
                boxShadow: mode === 'signup' ? '0 4px 15px rgba(197, 160, 89, 0.3)' : 'none',
              }}
            >
              Create Account
            </button>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                color: '#fca5a5',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.25rem',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                color: '#6ee7b7',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.25rem',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.45rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Member Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--gold-light)',
                    }}
                  />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. alexander@nobleblade.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.75rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Password
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('alexander@nobleblade.com');
                        setLoginPassword('password123');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--gold-light)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Fill VIP Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('admin@nobleblade.com');
                        setLoginPassword('admin');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#fbbf24',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontWeight: 700,
                      }}
                    >
                      Fill Admin
                    </button>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--gold-light)',
                    }}
                  />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter account password"
                    style={{
                      width: '100%',
                      padding: '0.85rem 2.85rem 0.85rem 2.75rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--gold-primary)' }}
                  />
                  Remember my session
                </label>
                <span style={{ color: 'var(--text-muted)' }}>Encrypted SSL</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-gold"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{isLoading ? 'Authenticating Patron...' : 'Enter The Parlour'}</span>
                <ArrowRight size={17} />
              </button>

              <div style={{ textAlign: 'center', margin: '0.25rem 0' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>— OR TEST INSTANTLY —</span>
              </div>

              {/* 1-Click Demo VIP Access Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  backgroundColor: 'rgba(197, 160, 89, 0.1)',
                  border: '1.5px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--gold-light)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'all 0.2s',
                  marginBottom: '0.65rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.2)';
                  e.currentTarget.style.borderColor = 'var(--gold-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.1)';
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                }}
              >
                <Crown size={16} />
                <span>1-Click VIP Demo Login (Alexander Vance)</span>
              </button>

              {/* 1-Click Master Admin Login Button */}
              <button
                type="button"
                onClick={handleAdminLogin}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  backgroundColor: 'rgba(217, 119, 6, 0.15)',
                  border: '1.5px solid rgba(245, 158, 11, 0.6)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fbbf24',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(217, 119, 6, 0.28)';
                  e.currentTarget.style.borderColor = '#fbbf24';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(217, 119, 6, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.6)';
                }}
              >
                <Crown size={18} />
                <span>1-Click Master Admin Console Login</span>
              </button>
            </form>
          )}

          {/* SIGN UP / REGISTRATION FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.35rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--gold-light)',
                    }}
                  />
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Lord Julian Davies"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '0.75rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.35rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '0.9rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--gold-light)',
                      }}
                    />
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="client@domain.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                        backgroundColor: 'rgba(10, 12, 17, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.35rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Phone
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '0.85rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--gold-light)',
                      }}
                    />
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 2.3rem',
                        backgroundColor: 'rgba(10, 12, 17, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="auth-password-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.35rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Password
                  </label>
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.35rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Confirm Pass
                  </label>
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Re-enter"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Preferred Barber selection */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.35rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Preferred Master Barber
                </label>
                <select
                  value={signupBarber}
                  onChange={(e) => setSignupBarber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(10, 12, 17, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                >
                  {BARBERS_DATA.map((b) => (
                    <option key={b.id} value={b.name} style={{ backgroundColor: '#0c1630' }}>
                      {b.name} — {b.role}
                    </option>
                  ))}
                  <option value="Any Available Craftsman" style={{ backgroundColor: '#0c1630' }}>
                    First Available Master Craftsman
                  </option>
                </select>
              </div>

              {/* Agreement */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ marginTop: '0.2rem', accentColor: 'var(--gold-primary)' }}
                />
                <label htmlFor="agreeTerms" style={{ cursor: 'pointer' }}>
                  I agree to The Noble Blade Membership Etiquette & receive 100 Welcome Loyalty Points upon entry.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-gold"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{isLoading ? 'Creating Client Account...' : 'Sign Up & Enter Parlour (+100 Pts)'}</span>
                <Sparkles size={17} />
              </button>
            </form>
          )}

          {/* Member perks footer banner */}
          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem' }}>100 Pts</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Welcome Bonus</div>
            </div>
            <div>
              <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem' }}>VIP Chair</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Priority Booking</div>
            </div>
            <div>
              <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem' }}>Full Access</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Gentleman's Hub</div>
            </div>
          </div>
        </div>

        {/* Security Assurance */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.78rem',
            marginTop: '1.5rem',
            textAlign: 'center',
          }}
        >
          <ShieldCheck size={14} color="var(--gold-light)" style={{ flexShrink: 0 }} />
          <span>Guaranteed Confidentiality • The Noble Blade Gentlemen's Parlour & Grooming Salon</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .auth-card {
            padding: 1.35rem 1rem !important;
          }
          .auth-password-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
