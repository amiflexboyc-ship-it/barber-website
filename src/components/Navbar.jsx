import React, { useState, useEffect, useRef } from 'react';
import { Scissors, Calendar, Clock, Menu, X, PhoneCall, Award, LogOut, Crown, ChevronDown, Bell, Sparkles } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, currentUser, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Lounge' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    ...(currentUser?.role === 'admin' ? [{ id: 'admin-dashboard', label: 'Admin Console', hasCrown: true }] : []),
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(6, 11, 25, 0.96)' : 'rgba(7, 13, 30, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(197, 160, 89, 0.22)',
          boxShadow: isScrolled ? '0 10px 30px rgba(2, 6, 18, 0.7)' : 'none',
          height: '74px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            width: '100%',
          }}
        >
          {/* Left Brand: Golden Blend style logo */}
          <div
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                textShadow: '0 0 20px rgba(197, 160, 89, 0.25)',
              }}
            >
              ADETECH BARBING
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginTop: '0.2rem',
              }}
            >
              <span style={{ height: '1px', width: '22px', backgroundColor: 'var(--gold-primary)', opacity: 0.75 }} />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.3em',
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                BARBERS
              </span>
              <span style={{ height: '1px', width: '22px', backgroundColor: 'var(--gold-primary)', opacity: 0.75 }} />
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <div key={item.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isActive ? 'var(--gold-light)' : '#e2e8f0',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.94rem',
                      fontWeight: isActive ? 600 : 500,
                      letterSpacing: '0.02em',
                      cursor: 'pointer',
                      padding: '0.6rem 0.2rem',
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--gold-light)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#e2e8f0';
                    }}
                  >
                    {item.hasCrown && <Crown size={14} color="var(--gold-light)" />}
                    {item.label}
                  </button>
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-3px',
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--gold-light)',
                        borderRadius: '2px',
                        boxShadow: '0 0 10px rgba(226, 192, 121, 0.7)',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Controls: Coin Emblem, Dark Bell Dot, Gold-Outlined Dropdown Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* 1) Gold Coin Emblem Button */}
            <button
              onClick={() => handleNavClick('dashboard')}
              title={currentUser ? `Patron Circle • ${currentUser.name} (${currentUser.loyaltyPoints || 420} Pts)` : 'Patron Rewards & Lounge'}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f5d68d 0%, #c5a059 55%, #886729 100%)',
                color: '#070d1e',
                border: '1px solid rgba(245, 214, 141, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(197, 160, 89, 0.35)',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(226, 192, 121, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(197, 160, 89, 0.35)';
              }}
            >
              <Award size={16} strokeWidth={2.4} />
            </button>

            {/* 2) Dark Round Icon with Notification Indicator */}
            <a
              href="tel:+15558923472"
              title="Salon Concierge: (555) 892-3472"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(147, 197, 253, 0.15)',
                color: 'var(--gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-light)';
                e.currentTarget.style.background = 'rgba(197, 160, 89, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(147, 197, 253, 0.15)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <PhoneCall size={14} />
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                }}
              />
            </a>

            {/* 3) Gold-Outlined Rectangular Dropdown Button */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.52rem 1.1rem',
                  background: isDropdownOpen ? 'rgba(197, 160, 89, 0.18)' : 'rgba(7, 13, 30, 0.6)',
                  border: '1.2px solid var(--gold-primary)',
                  borderRadius: '3px',
                  color: 'var(--gold-light)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isDropdownOpen ? '0 0 15px rgba(197, 160, 89, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-light)';
                  e.currentTarget.style.background = 'rgba(197, 160, 89, 0.15)';
                }}
                onMouseLeave={(e) => {
                  if (!isDropdownOpen) {
                    e.currentTarget.style.borderColor = 'var(--gold-primary)';
                    e.currentTarget.style.background = 'rgba(7, 13, 30, 0.6)';
                  }
                }}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '240px',
                    backgroundColor: 'rgba(8, 14, 32, 0.98)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 15px 35px rgba(2, 6, 18, 0.8), 0 0 20px rgba(197, 160, 89, 0.15)',
                    padding: '0.6rem 0',
                    zIndex: 200,
                    animation: 'fadeIn 0.2s ease-out',
                  }}
                >
                  <div
                    style={{
                      padding: '0.4rem 1rem 0.6rem 1rem',
                      borderBottom: '1px solid rgba(147, 197, 253, 0.1)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-light)',
                      fontWeight: 700,
                    }}
                  >
                    Adetech Concierge
                  </div>
                  {[
                    { label: 'Book A Chair', action: () => handleNavClick('booking'), icon: Calendar },
                    { label: 'Explore All Services', action: () => handleNavClick('services'), icon: Scissors },
                    { label: 'Gentleman Lounge', action: () => handleNavClick('dashboard'), icon: Award },
                    { label: 'Style Gallery', action: () => handleNavClick('gallery'), icon: Sparkles },
                    { label: 'Contact & Directions', action: () => handleNavClick('contact'), icon: PhoneCall },
                    ...(currentUser?.role === 'admin'
                      ? [{ label: 'Master Admin Console', action: () => handleNavClick('admin-dashboard'), icon: Crown }]
                      : []),
                  ].map((menuItem, idx) => {
                    const IconComp = menuItem.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          menuItem.action();
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '0.65rem 1rem',
                          textAlign: 'left',
                          color: '#e2e8f0',
                          fontSize: '0.86rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.14)';
                          e.currentTarget.style.color = 'var(--gold-light)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#e2e8f0';
                        }}
                      >
                        <IconComp size={14} color="var(--gold-light)" />
                        <span>{menuItem.label}</span>
                      </button>
                    );
                  })}

                  {currentUser && (
                    <div style={{ borderTop: '1px solid rgba(147, 197, 253, 0.1)', marginTop: '0.4rem', paddingTop: '0.4rem' }}>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onLogout();
                        }}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '0.55rem 1rem',
                          textAlign: 'left',
                          color: '#f87171',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <LogOut size={14} />
                        <span>Sign Out of Parlour</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle-btn"
              style={{
                display: 'none',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                color: 'var(--gold-light)',
                padding: '0.5rem',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '74px 0 0 0',
            backgroundColor: 'rgba(7, 13, 30, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 1.5rem',
            borderTop: '1px solid var(--border-gold)',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  color: currentPage === item.id ? 'var(--gold-light)' : 'var(--text-primary)',
                  fontWeight: currentPage === item.id ? 700 : 500,
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(147, 197, 253, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  {item.hasCrown && <Crown size={18} color="var(--gold-light)" />}
                  {item.label}
                </span>
                {currentPage === item.id && (
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'var(--gold-light)',
                      boxShadow: '0 0 8px var(--gold-light)',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            <button
              onClick={() => handleNavClick('booking')}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              <Calendar size={18} /> Book Your Chair
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <LogOut size={16} /> Sign Out of Parlour
              </button>
            )}
          </div>
        </div>
      )}

      {/* Responsive Styles for Navbar */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
