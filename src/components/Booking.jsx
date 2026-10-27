import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Scissors, User, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Sparkles, AlertCircle, Star } from 'lucide-react';
import { SERVICES_DATA } from './Services.jsx';
import { BARBERS_DATA } from './Barbers.jsx';

export default function Booking({ initialService = null, initialBarber = null, onFinished, currentUser = null, onViewDashboard = null }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService || SERVICES_DATA[0]);
  const [selectedBarber, setSelectedBarber] = useState(initialBarber || BARBERS_DATA[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    notes: currentUser?.haircutNotes ? `Preferred style: ${currentUser.haircutNotes}` : '',
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setClientInfo((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || '',
        phone: prev.phone || currentUser.phone || '',
        email: prev.email || currentUser.email || '',
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (initialService) setSelectedService(initialService);
  }, [initialService]);

  useEffect(() => {
    if (initialBarber) setSelectedBarber(initialBarber);
  }, [initialBarber]);

  // Generate the next 7 days for quick booking
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  useEffect(() => {
    if (!selectedDate && dates.length > 0) {
      setSelectedDate(dates[0].iso);
    }
  }, []);

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:45 AM',
    '01:15 PM',
    '02:30 PM',
    '03:45 PM',
    '05:00 PM',
    '06:15 PM',
    '07:00 PM',
  ];

  const validateStep4 = () => {
    const newErrors = {};
    if (!clientInfo.name.trim()) newErrors.name = 'Please enter your full name';
    if (!clientInfo.phone.trim()) newErrors.phone = 'Please enter your phone number';
    if (!clientInfo.email.trim() || !clientInfo.email.includes('@')) newErrors.email = 'Valid email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!validateStep4()) return;

    const bookingId = 'NB-' + Math.floor(100000 + Math.random() * 900000);
    const bookingSummary = {
      id: bookingId,
      userEmail: currentUser?.email || clientInfo.email,
      service: selectedService,
      barber: selectedBarber,
      date: selectedDate,
      time: selectedTime || '11:45 AM',
      status: 'Confirmed',
      chairNumber: 'Chair 01 (Executive)',
      client: clientInfo,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage for client history simulation
    try {
      const existing = JSON.parse(localStorage.getItem('noble_blade_bookings') || '[]');
      localStorage.setItem('noble_blade_bookings', JSON.stringify([bookingSummary, ...existing]));

      // Award 50 bonus loyalty points to user for booking
      if (currentUser) {
        const stored = JSON.parse(localStorage.getItem('noble_blade_auth_user') || '{}');
        stored.loyaltyPoints = (stored.loyaltyPoints || 100) + 50;
        localStorage.setItem('noble_blade_auth_user', JSON.stringify(stored));
      }
    } catch {
      // fallback
    }

    setConfirmedBooking(bookingSummary);
    setStep(5);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setStep(1);
    setSelectedTime('');
    setClientInfo({ name: '', phone: '', email: '', notes: '' });
  };

  return (
    <section
      id="booking-section"
      style={{
        padding: '5rem 0 6rem 0',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <CalendarIcon size={14} /> Guaranteed Chair Reservation
          </div>
          <h2 className="section-title">
            Reserve Your <span className="gradient-gold-text">Gentlemen's Session</span>
          </h2>
          <p className="section-desc">
            Select your preferred treatment, master craftsman, and desired time slot.
            Walk-ins are welcomed, but reservations receive priority chair seating.
          </p>
        </div>

        {/* Multi-step Container */}
        <div
          className="glass-card booking-card"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '2.5rem',
            border: '1px solid var(--border-gold)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Step Progress Bar (steps 1 to 4) */}
          {step <= 4 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                {[
                  { num: 1, label: 'Service' },
                  { num: 2, label: 'Barber' },
                  { num: 3, label: 'Date & Time' },
                  { num: 4, label: 'Your Details' },
                ].map((s) => (
                  <div
                    key={s.num}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem',
                      flex: 1,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: step >= s.num ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.08)',
                        color: step >= s.num ? '#070d1e' : 'var(--text-muted)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        border: step === s.num ? '2px solid #ffffff' : 'none',
                        boxShadow: step >= s.num ? '0 0 15px rgba(197, 160, 89, 0.4)' : 'none',
                        flexShrink: 0,
                      }}
                    >
                      {step > s.num ? <CheckCircle2 size={18} /> : s.num}
                    </div>
                    <span
                      className="step-indicator-text"
                      style={{
                        fontSize: '0.8rem',
                        color: step >= s.num ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: step === s.num ? 700 : 500,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Line */}
              <div style={{ width: '100%', height: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    backgroundColor: 'var(--gold-light)',
                    width: `${((step - 1) / 3) * 100}%`,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>
                Step 1: Choose Your Grooming Treatment
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {SERVICES_DATA.map((srv) => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '1.5px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: isSelected ? 'var(--gold-light)' : '#fff' }}>
                          {srv.title}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--gold-light)' }}>
                          ₦{srv.price.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={12} /> {srv.duration}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {srv.description.slice(0, 85)}...
                      </p>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setStep(2)}
                  className="btn btn-gold"
                  disabled={!selectedService}
                >
                  <span>Select Barber</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT BARBER */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>
                Step 2: Choose Your Craftsman
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {/* Any Available Option */}
                <div
                  onClick={() => setSelectedBarber({ id: 'any', name: 'First Available Master Barber', role: 'Next Open Chair' })}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: selectedBarber?.id === 'any' ? 'rgba(197, 160, 89, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: selectedBarber?.id === 'any' ? '1.5px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: '140px',
                  }}
                >
                  <Sparkles size={28} color="var(--gold-light)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>First Available Barber</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Optimal for quickest booking</div>
                </div>

                {BARBERS_DATA.map((barber) => {
                  const isSelected = selectedBarber?.id === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '1.5px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={barber.image}
                        alt={barber.name}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: isSelected ? '2px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: isSelected ? 'var(--gold-light)' : '#fff' }}>
                          {barber.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{barber.role}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Star size={12} fill="var(--gold-light)" color="var(--gold-light)" />
                          <span>{barber.rating} Rating</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="booking-step-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} className="btn btn-ghost">
                  <ChevronLeft size={18} /> Back
                </button>
                <button onClick={() => setStep(3)} className="btn btn-gold">
                  <span>Pick Date & Time</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PICK DATE & TIME */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>
                Step 3: Choose Appointment Date & Time
              </h3>

              {/* Day Selector */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Select Day
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {dates.map((d) => {
                    const isSelected = selectedDate === d.iso;
                    return (
                      <div
                        key={d.iso}
                        onClick={() => setSelectedDate(d.iso)}
                        style={{
                          minWidth: '78px',
                          padding: '0.85rem 0.5rem',
                          textAlign: 'center',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSelected ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.04)',
                          color: isSelected ? '#070d1e' : '#fff',
                          border: isSelected ? '1px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                          {d.dayName}
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0.2rem 0' }}>
                          {d.dayNumber}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                          {d.month}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Available Time Slots
                </div>
                <div className="time-slots-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.75rem' }}>
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        style={{
                          padding: '0.7rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSelected ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.04)',
                          color: isSelected ? '#070d1e' : 'var(--text-primary)',
                          border: isSelected ? '1px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          transition: 'all 0.2s',
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="booking-step-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} className="btn btn-ghost">
                  <ChevronLeft size={18} /> Back
                </button>
                <button
                  onClick={() => {
                    if (!selectedTime) setSelectedTime(timeSlots[0]);
                    setStep(4);
                  }}
                  className="btn btn-gold"
                >
                  <span>Enter Details</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT CONTACT DETAILS & SUMMARY */}
          {step === 4 && (
            <form onSubmit={handleConfirmBooking}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>
                Step 4: Contact Information & Reservation Summary
              </h3>

              {/* Booking Summary Pill */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(197, 160, 89, 0.08)',
                  border: '1px solid var(--border-gold)',
                  marginBottom: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                    Selected Reservation
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                    {selectedService?.title} (₦{selectedService?.price?.toLocaleString()})
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    With {selectedBarber?.name} • {selectedDate} at {selectedTime || '11:45 AM'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Duration</div>
                  <div style={{ fontWeight: 700, color: 'var(--gold-light)' }}>{selectedService?.duration}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hayes"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: errors.name ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                  {errors.name && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: errors.phone ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                  {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.phone}</div>}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@example.com"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.email ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Special Requests / Preferred Style Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Skin fade with textured top, sensitive skin on neck..."
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <div className="booking-step-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => setStep(3)} className="btn btn-ghost">
                  <ChevronLeft size={18} /> Back
                </button>
                <button type="submit" className="btn btn-gold">
                  <CheckCircle2 size={18} /> Confirm Chair Reservation
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: SUCCESS / CONFIRMATION MODAL & RECEIPT */}
          {step === 5 && confirmedBooking && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10b981',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                Reservation Confirmed
              </div>

              <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontFamily: 'var(--font-serif)', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>
                Your Chair Awaits, {confirmedBooking.client.name.split(' ')[0]}
              </h3>

              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
                A confirmation SMS & calendar invite have been dispatched. We look forward to providing you
                with an unmatched grooming experience.
              </p>

              {/* Receipt Ticket */}
              <div
                className="booking-receipt-box"
                style={{
                  maxWidth: '500px',
                  margin: '0 auto 2.5rem auto',
                  backgroundColor: 'rgba(10, 12, 16, 0.85)',
                  border: '1.5px dashed var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Booking Reference</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--gold-light)', fontSize: '1rem' }}>
                    {confirmedBooking.id}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Service</span>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{confirmedBooking.service.title}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Craftsman</span>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{confirmedBooking.barber.name}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Date & Time</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.9rem' }}>
                    {confirmedBooking.date} @ {confirmedBooking.time}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '1rem' }}>
                  <span style={{ fontWeight: 700, color: '#fff' }}>Total Due at Chair</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                    ₦{confirmedBooking.service.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="booking-finish-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {onViewDashboard && (
                  <button onClick={onViewDashboard} className="btn btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={16} /> View in My Dashboard
                  </button>
                )}
                <button onClick={resetForm} className="btn btn-outline-gold">
                  Book Another Appointment
                </button>
                {onFinished && (
                  <button onClick={onFinished} className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
                    Return to Overview
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .booking-card {
            padding: 1.25rem 0.85rem !important;
          }
          .step-indicator-text {
            font-size: 0.68rem !important;
          }
          .booking-step-actions {
            flex-direction: column-reverse !important;
            gap: 0.75rem !important;
          }
          .booking-step-actions .btn {
            width: 100% !important;
          }
          .time-slots-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
          }
          .booking-receipt-box {
            padding: 1.2rem 1rem !important;
          }
          .booking-finish-actions {
            flex-direction: column !important;
          }
          .booking-finish-actions .btn {
            width: 100% !important;
          }
        }
        @media (max-width: 380px) {
          .time-slots-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
