import React from 'react';
import { Calendar, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Booking from '../components/Booking.jsx';

export default function BookingPage({ onNavigate, initialService, initialBarber, currentUser }) {
  const bookingPolicies = [
    { title: 'No-Rush Chair Time', desc: 'We book buffer time between all appointments to ensure you never feel hurried.' },
    { title: 'Complimentary Rescheduling', desc: 'Change your reservation up to 2 hours prior without penalty or friction.' },
    { title: 'Complimentary Beverage Service', desc: 'Craft espresso, mineral water, or single-malt whiskey served on arrival.' },
    { title: 'Flawless 7-Day Guarantee', desc: 'Free hairline touch-up within 7 days if you need a quick sharpen before an event.' },
  ];

  return (
    <div className="page-wrapper" style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container">
        {/* Booking Interactive Engine */}
        <Booking
          initialService={initialService}
          initialBarber={initialBarber}
          currentUser={currentUser}
          onViewDashboard={() => {
            onNavigate('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onFinished={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Confidence & Policy Badges */}
        <div style={{ maxWidth: '920px', margin: '4rem auto 0 auto' }}>
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <div className="section-tag">
              <ShieldCheck size={14} /> The Noble Assurance
            </div>
            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>
              Our Chair <span className="gradient-gold-text">Commitment & Etiquette</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {bookingPolicies.map((p, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <CheckCircle2 size={24} color="var(--gold-light)" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                  {p.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
