import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Calendar, 
  Clock, 
  User, 
  Award, 
  Sparkles, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  CalendarPlus, 
  X, 
  Edit3, 
  ShieldCheck, 
  Coffee, 
  Wine, 
  ChevronRight, 
  Star, 
  Gift, 
  QrCode, 
  KeyRound, 
  RefreshCw 
} from 'lucide-react';
import { 
  getUserBookings, 
  cancelUserBooking, 
  rescheduleUserBooking, 
  setStoredUser 
} from '../services/authService.js';
import { BARBERS_DATA } from '../components/Barbers.jsx';

export default function DashboardPage({ currentUser, onNavigate, onLogout, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'profile' | 'perks' | 'security'
  const [bookings, setBookings] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    preferredBarber: currentUser?.preferredBarber || "Marcus 'The Architect' Sterling",
    beveragePreference: currentUser?.beveragePreference || 'Single-Malt Highland Scotch',
    haircutNotes: currentUser?.haircutNotes || 'Low skin fade #0.5 into natural scissor crop on top, matte texture finish',
    beardNotes: currentUser?.beardNotes || 'Crisp cheek razor lines, rounded chin, sandalwood conditioning balm',
    skinSensitivity: currentUser?.skinSensitivity || 'Sensitive neck — warm lather & cold towel finish',
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Reschedule Modal state
  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // Cancel Confirmation Modal state
  const [cancellingBooking, setCancellingBooking] = useState(null);

  // Redeem Voucher state
  const [redeemedVoucher, setRedeemedVoucher] = useState(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Refresh bookings on mount and when currentUser changes
  useEffect(() => {
    if (currentUser?.email) {
      loadBookings();
    }
  }, [currentUser]);

  const loadBookings = () => {
    const list = getUserBookings(currentUser.email);
    setBookings(list);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Upcoming vs Past Bookings
  const upcomingBookings = bookings.filter(b => b.status !== 'Cancelled' && b.status !== 'Completed');
  const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  // Cancel appointment handler
  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    cancelUserBooking(cancellingBooking.id);
    loadBookings();
    setCancellingBooking(null);
    showToast(`Appointment ${cancellingBooking.id} has been cancelled.`, 'info');
  };

  // Reschedule appointment handler
  const handleConfirmReschedule = () => {
    if (!reschedulingBooking || !newDate || !newTime) {
      showToast('Please select both a date and time slot.', 'error');
      return;
    }
    rescheduleUserBooking(reschedulingBooking.id, newDate, newTime);
    loadBookings();
    setReschedulingBooking(null);
    showToast(`Appointment successfully moved to ${newDate} at ${newTime}.`);
  };

  // Profile save handler
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      ...userProfile,
    };
    setStoredUser(updated);
    if (onUpdateUser) onUpdateUser(updated);
    showToast('Grooming profile & chair preferences updated successfully!');
  };

  // Password change handler
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (currentUser.password && currentPassword !== currentUser.password) {
      showToast('Current password does not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    const updated = {
      ...currentUser,
      password: newPassword,
    };
    setStoredUser(updated);
    if (onUpdateUser) onUpdateUser(updated);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    showToast('Security password updated successfully!');
  };

  // Redeem perks handler
  const handleRedeemPerk = (perkName, cost) => {
    const currentPoints = currentUser.loyaltyPoints || 0;
    if (currentPoints < cost) {
      showToast(`Insufficient loyalty points. You need ${cost} points for this perk.`, 'error');
      return;
    }

    const updatedPoints = currentPoints - cost;
    const updated = {
      ...currentUser,
      loyaltyPoints: updatedPoints,
    };
    setStoredUser(updated);
    if (onUpdateUser) onUpdateUser(updated);

    const voucherCode = `NOBLE-${Math.floor(1000 + Math.random() * 9000)}-${cost}`;
    setRedeemedVoucher({ perkName, cost, code: voucherCode });
    showToast(`Reward redeemed! Present voucher at your next chair session.`);
  };

  const timeOptions = [
    '09:30 AM', '10:30 AM', '11:45 AM', '01:15 PM', '02:30 PM', '03:45 PM', '05:00 PM', '06:15 PM', '07:00 PM'
  ];

  // Helper for member initials
  const initials = (currentUser?.name || 'Alexander Vance')
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="page-wrapper" style={{ padding: '2.5rem 0 6rem 0', minHeight: '85vh' }}>
      <div className="container">
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              right: '25px',
              zIndex: 9999,
              backgroundColor: toastType === 'error' ? 'rgba(239, 68, 68, 0.95)' : toastType === 'info' ? 'rgba(59, 130, 246, 0.95)' : 'rgba(197, 160, 89, 0.95)',
              color: toastType === 'error' || toastType === 'info' ? '#ffffff' : '#0a0b0e',
              padding: '0.85rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            {toastType === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Member Header Card */}
        <div
          className="glass-card"
          style={{
            padding: '2rem 2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--border-gold)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
            marginBottom: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle gold decorative banner */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '100%',
              background: 'radial-gradient(circle at top right, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            {/* User Identity Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #18284e 0%, #0c162e 100%)',
                  border: '2px solid var(--gold-light)',
                  boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--gold-light)',
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <h1
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.1,
                    }}
                  >
                    {currentUser?.name || 'Alexander Vance'}
                  </h1>
                  <span
                    style={{
                      backgroundColor: 'rgba(197, 160, 89, 0.15)',
                      border: '1px solid var(--border-gold)',
                      color: 'var(--gold-light)',
                      padding: '0.2rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <Award size={13} /> {currentUser?.tier || 'Gentleman Patron (VIP)'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                  <span>
                    Member ID: <strong style={{ color: 'var(--gold-light)' }}>{currentUser?.memberId || 'NB-8821'}</strong>
                  </span>
                  <span>•</span>
                  <span>Joined {currentUser?.joinedDate || 'September 2024'}</span>
                  <span>•</span>
                  <span>{currentUser?.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  onNavigate('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-gold"
                style={{ padding: '0.75rem 1.3rem', fontSize: '0.88rem' }}
              >
                <Calendar size={16} />
                <span>Book New Chair</span>
              </button>

              <button
                onClick={onLogout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem',
              marginTop: '2rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                }}
              >
                <Calendar size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                  {upcomingBookings.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Upcoming Visits
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                }}
              >
                <Scissors size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                  {pastBookings.length + upcomingBookings.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Sessions
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-light)', lineHeight: 1.1 }}>
                  {currentUser?.loyaltyPoints || 420} pts
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Loyalty Balance
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                }}
              >
                <User size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
                  {currentUser?.preferredBarber?.split("'")[0] || 'Marcus Sterling'}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Preferred Craftsman
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.2rem',
          }}
        >
          {[
            { id: 'appointments', label: 'My Appointments & Bookings', icon: Calendar, badge: upcomingBookings.length },
            { id: 'profile', label: 'Grooming Profile & Notes', icon: Edit3 },
            { id: 'perks', label: 'VIP Perks & Rewards Club', icon: Award },
            { id: 'security', label: 'Account & Security', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 1.4rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--gold-light)' : '2px solid transparent',
                  color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={17} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: 'var(--gold-primary)',
                      color: '#0a0b0e',
                      padding: '0.1rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
                  Upcoming Chair Reservations ({upcomingBookings.length})
                </h2>
                <button
                  onClick={() => {
                    onNavigate('booking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-outline-gold"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                >
                  <CalendarPlus size={14} />
                  <span>Reserve Another Date</span>
                </button>
              </div>

              {upcomingBookings.length === 0 ? (
                <div
                  className="glass-card"
                  style={{
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Calendar size={48} color="var(--gold-light)" style={{ margin: '0 auto 1rem auto', opacity: 0.8 }} />
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
                    No Active Chair Reservations
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                    You currently have no scheduled appointments. Select your treatment and master barber to book your next session.
                  </p>
                  <button
                    onClick={() => {
                      onNavigate('booking');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn btn-gold"
                  >
                    Book Your Appointment Now
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {upcomingBookings.map((b) => (
                    <div
                      key={b.id}
                      className="glass-card"
                      style={{
                        padding: '1.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(197, 160, 89, 0.3)',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: '1.5rem',
                        alignItems: 'center',
                      }}
                    >
                      {/* Barber Avatar */}
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          backgroundImage: `url(${b.barber?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: '2px solid var(--gold-light)',
                          flexShrink: 0,
                        }}
                      />

                      {/* Booking Details */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              backgroundColor: 'rgba(16, 185, 129, 0.15)',
                              color: '#10b981',
                              padding: '0.2rem 0.6rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981' }} />
                            {b.status || 'Confirmed'}
                          </span>
                          <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            Ref: {b.id}
                          </span>
                          <span style={{ color: 'var(--gold-light)', fontSize: '0.8rem', fontWeight: 600 }}>
                            {b.chairNumber || 'Chair 01'}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, marginBottom: '0.3rem' }}>
                          {b.service?.title || 'Gentleman Bespoke Cut'}
                        </h3>

                        <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)' }}>
                            <Calendar size={14} /> {b.date}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#fff' }}>
                            <Clock size={14} /> {b.time} ({b.service?.duration || '45 mins'})
                          </span>
                          <span>
                            Craftsman: <strong style={{ color: '#fff' }}>{b.barber?.name || 'Marcus Sterling'}</strong>
                          </span>
                          <span>
                            Fee: <strong style={{ color: 'var(--gold-light)' }}>₦{(b.service?.price || 7000).toLocaleString()}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
                        <button
                          onClick={() => {
                            setReschedulingBooking(b);
                            setNewDate(b.date);
                            setNewTime(b.time);
                          }}
                          style={{
                            padding: '0.55rem 0.9rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#fff',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--gold-light)';
                            e.currentTarget.style.color = 'var(--gold-light)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.color = '#fff';
                          }}
                        >
                          <RefreshCw size={13} /> Reschedule
                        </button>

                        <button
                          onClick={() => setCancellingBooking(b)}
                          style={{
                            padding: '0.55rem 0.9rem',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Cancel Chair
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past History */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Completed & Past Sessions ({pastBookings.length})
              </h2>

              {pastBookings.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No past session records found.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {pastBookings.map((b) => (
                    <div
                      key={b.id}
                      className="glass-card"
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        opacity: b.status === 'Cancelled' ? 0.65 : 1,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: b.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(100, 116, 139, 0.2)',
                            color: b.status === 'Cancelled' ? '#f87171' : 'var(--text-secondary)',
                          }}
                        >
                          {b.status}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.date}</span>
                      </div>

                      <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.35rem' }}>
                        {b.service?.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                        With {b.barber?.name} • ₦{(b.service?.price || 7000).toLocaleString()}
                      </p>

                      {b.status === 'Completed' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--gold-light)', fontSize: '0.85rem' }}>
                          <Star size={14} fill="var(--gold-light)" />
                          <Star size={14} fill="var(--gold-light)" />
                          <Star size={14} fill="var(--gold-light)" />
                          <Star size={14} fill="var(--gold-light)" />
                          <Star size={14} fill="var(--gold-light)" />
                          <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem', fontSize: '0.75rem' }}>5.0 Master Cut</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: GROOMING PROFILE & PREFERENCES */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '800px' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>
                Bespoke <span className="gradient-gold-text">Grooming & Chair Preferences</span>
              </h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Our master barbers review your preferences prior to every chair reservation to tailor your hot towel treatment, straight razor finish, and complimentary drinks.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Email (Notifications)
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Preferred Master Barber
                  </label>
                  <select
                    value={userProfile.preferredBarber}
                    onChange={(e) => setUserProfile({ ...userProfile, preferredBarber: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  >
                    {BARBERS_DATA.map((b) => (
                      <option key={b.id} value={b.name} style={{ backgroundColor: '#0c1630' }}>
                        {b.name} ({b.role})
                      </option>
                    ))}
                    <option value="Any Available Craftsman" style={{ backgroundColor: '#0c1630' }}>
                      Any Available Craftsman
                    </option>
                  </select>
                </div>
              </div>

              {/* Arrival Beverage */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Complimentary Parlour Refreshment on Arrival
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem' }}>
                  {[
                    'Single-Malt Highland Scotch',
                    'Double Italian Espresso',
                    'Artisanal Cold Brew',
                    'San Pellegrino Mineral Water',
                    'Small-Batch Bourbon',
                  ].map((bev) => (
                    <div
                      key={bev}
                      onClick={() => setUserProfile({ ...userProfile, beveragePreference: bev })}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: userProfile.beveragePreference === bev ? 'rgba(197, 160, 89, 0.18)' : 'rgba(10, 12, 17, 0.6)',
                        border: userProfile.beveragePreference === bev ? '1px solid var(--gold-light)' : '1px solid rgba(255,255,255,0.08)',
                        color: userProfile.beveragePreference === bev ? 'var(--gold-light)' : 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        fontWeight: userProfile.beveragePreference === bev ? 700 : 500,
                      }}
                    >
                      {bev}
                    </div>
                  ))}
                </div>
              </div>

              {/* Haircut & Beard Notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Haircut & Fade Specification Notes
                  </label>
                  <textarea
                    rows={2}
                    value={userProfile.haircutNotes}
                    onChange={(e) => setUserProfile({ ...userProfile, haircutNotes: e.target.value })}
                    placeholder="e.g. Skin fade taper, low drop fade, textured scissor crop..."
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Beard Sculpting & Skin Sensitivity Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={userProfile.beardNotes}
                    onChange={(e) => setUserProfile({ ...userProfile, beardNotes: e.target.value })}
                    placeholder="e.g. Crisp razor cheek line, sensitive neck area, cold towel finish..."
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-gold" style={{ padding: '0.85rem 1.75rem' }}>
                <CheckCircle2 size={16} /> Save Grooming Specifications
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: VIP PERKS & REWARDS CLUB */}
        {activeTab === 'perks' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              {/* Luxury Digital Membership Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #132247 0%, #091126 50%, #1a2f60 100%)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--gold-light)',
                  boxShadow: '0 15px 35px rgba(2, 6, 18, 0.8), 0 0 25px rgba(37, 99, 235, 0.3)',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '230px',
                }}
              >
                {/* Gold Crest background */}
                <div style={{ position: 'absolute', right: '-15px', bottom: '-20px', opacity: 0.08, pointerEvents: 'none' }}>
                  <Scissors size={200} color="var(--gold-light)" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>
                      THE NOBLE BLADE
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold-light)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      VIP GENTLEMAN PATRON
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'rgba(197, 160, 89, 0.2)',
                      border: '1px solid var(--gold-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.2rem 0.7rem',
                      color: 'var(--gold-light)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}
                  >
                    ACTIVE PATRON
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Patron Cardholder
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em' }}>
                    {currentUser?.name || 'Alexander Vance'}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(197,160,89,0.3)', paddingTop: '0.85rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MEMBER NUMBER</span>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.95rem' }}>
                      {currentUser?.memberId || 'NB-8821'}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>BALANCE</span>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                      {currentUser?.loyaltyPoints || 420} PTS
                    </div>
                  </div>
                  <QrCode size={36} color="var(--gold-light)" />
                </div>
              </div>

              {/* Tier Progress Info */}
              <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} color="var(--gold-light)" /> Patron Tier Status
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Every haircut and straight razor shave earns <strong>10 Blade Points per dollar</strong>. Redeem for complimentary grooming services, styling products, or parlour spirits.
                </p>

                {/* Progress bar */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>VIP Patron (Current)</span>
                    <span style={{ color: 'var(--text-muted)' }}>Diamond Blade at 600 pts</span>
                  </div>
                  <div style={{ width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.min(100, ((currentUser?.loyaltyPoints || 420) / 600) * 100)}%`,
                        height: '100%',
                        backgroundColor: 'var(--gold-light)',
                        borderRadius: 4,
                        boxShadow: '0 0 10px var(--gold-light)',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="var(--gold-light)" /> Priority chair reservation window (7 days in advance)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="var(--gold-light)" /> Complimentary single malt scotch or craft espresso
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="var(--gold-light)" /> Free 7-day hairline edge touch-up
                  </div>
                </div>
              </div>
            </div>

            {/* Redeemable Rewards Catalogue */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '1.25rem' }}>
                Redeem Patron Rewards
              </h2>

              {redeemedVoucher && (
                <div
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    border: '1.5px dashed var(--gold-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase' }}>
                      Active Voucher Redeemed
                    </span>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{redeemedVoucher.perkName}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Show this code to your barber upon arrival: <strong style={{ color: 'var(--gold-light)', fontFamily: 'monospace', fontSize: '1rem' }}>{redeemedVoucher.code}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setRedeemedVoucher(null)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'var(--text-secondary)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    Dismiss Voucher
                  </button>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: 'Eucalyptus Hot Scalp Massage', cost: 150, desc: '15-minute invigorating essential oil scalp treatment during shampoo.' },
                  { title: '20% Off Artisanal Beard Oil', cost: 250, desc: 'Organic cedarwood & sandalwood conditioning elixir bottle.' },
                  { title: 'Beard Sculpt & Straight Razor Line', cost: 400, desc: 'Complete precision cheek and neckline shave with warm lather.' },
                  { title: 'Signature Gentleman Haircut', cost: 600, desc: 'Complimentary full bespoke cut with head massage and styling.' },
                ].map((perk, i) => {
                  const canAfford = (currentUser?.loyaltyPoints || 420) >= perk.cost;
                  return (
                    <div
                      key={i}
                      className="glass-card"
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--gold-light)', fontSize: '1.1rem' }}>
                            {perk.cost} PTS
                          </span>
                          <Gift size={16} color="var(--gold-light)" />
                        </div>
                        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>{perk.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                          {perk.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRedeemPerk(perk.title, perk.cost)}
                        disabled={!canAfford}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          backgroundColor: canAfford ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.05)',
                          color: canAfford ? '#0a0b0e' : 'var(--text-muted)',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: canAfford ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                        }}
                      >
                        {canAfford ? 'Redeem Voucher' : `Need ${perk.cost - (currentUser?.loyaltyPoints || 0)} More Pts`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACCOUNT SECURITY */}
        {activeTab === 'security' && (
          <div style={{ maxWidth: '640px' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>
                Account <span className="gradient-gold-text">Security & Privacy</span>
              </h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Manage your credentials and authentication session. All client records at The Noble Blade are held under strict confidentiality.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <KeyRound size={18} color="var(--gold-light)" /> Change Account Password
              </h3>

              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter existing password"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        backgroundColor: 'rgba(10, 12, 17, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Confirm New Pass
                    </label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Re-type password"
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        backgroundColor: 'rgba(10, 12, 17, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-gold" style={{ padding: '0.8rem 1.5rem', alignSelf: 'flex-start' }}>
                  Update Password
                </button>
              </form>
            </div>

            {/* Logout section */}
            <div
              className="glass-card"
              style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                border: '1px solid rgba(239, 68, 68, 0.25)',
              }}
            >
              <div>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>
                  Sign Out of The Noble Blade
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                  Locks the parlour website and requires sign-in upon return.
                </p>
              </div>

              <button
                onClick={onLogout}
                className="btn btn-outline-gold"
                style={{
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  padding: '0.65rem 1.25rem',
                }}
              >
                <LogOut size={16} /> Sign Out Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RESCHEDULE MODAL */}
      {reschedulingBooking && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '460px',
              width: '100%',
              padding: '2rem',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-gold)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#fff' }}>
                Reschedule Chair Reservation
              </h3>
              <button
                onClick={() => setReschedulingBooking(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Service: <strong style={{ color: '#fff' }}>{reschedulingBooking.service?.title}</strong> with{' '}
              <strong style={{ color: 'var(--gold-light)' }}>{reschedulingBooking.barber?.name}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Select New Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setNewDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(10, 12, 17, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Select Time Slot
                </label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(10, 12, 17, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    outline: 'none',
                  }}
                >
                  {timeOptions.map((t) => (
                    <option key={t} value={t} style={{ backgroundColor: '#0c1630' }}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setReschedulingBooking(null)}
                style={{
                  padding: '0.65rem 1.2rem',
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button onClick={handleConfirmReschedule} className="btn btn-gold" style={{ padding: '0.65rem 1.3rem' }}>
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL APPOINTMENT CONFIRMATION MODAL */}
      {cancellingBooking && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '420px',
              width: '100%',
              padding: '2rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              textAlign: 'center',
            }}
          >
            <AlertCircle size={44} color="#f87171" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
              Cancel Chair Reservation?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Are you sure you wish to release your chair for {cancellingBooking.service?.title} on {cancellingBooking.date} at {cancellingBooking.time}?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setCancellingBooking(null)}
                style={{
                  padding: '0.65rem 1.25rem',
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                }}
              >
                Keep Chair
              </button>
              <button
                onClick={handleConfirmCancel}
                style={{
                  padding: '0.65rem 1.25rem',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Yes, Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
