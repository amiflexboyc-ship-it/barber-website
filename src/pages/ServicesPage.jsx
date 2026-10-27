import React from 'react';
import { Scissors, Check, Sparkles, Clock, Crown, ArrowRight, ShieldCheck } from 'lucide-react';
import Services, { SERVICES_DATA } from '../components/Services.jsx';

export default function ServicesPage({ onNavigate, onSelectService }) {
  const memberships = [
    {
      name: 'The Silver Blade Club',
      price: 25000,
      period: '/ month',
      features: [
        '2 Tailored Haircuts per month',
        'Complimentary Neck & Temple Cleanups anytime',
        '10% off all retail apothecary grooming products',
        'Complimentary craft beverage or espresso',
      ],
      popular: false,
    },
    {
      name: 'The Master Gentleman Guild',
      price: 50000,
      period: '/ month',
      features: [
        'Unlimited Haircuts & Fade Maintenance',
        'Bi-weekly Royal Hot Towel Shave or Beard Sculpt',
        'Priority same-day chair reservations',
        'Private locker & complimentary VIP refreshments',
        '1 Guest Pass per month for a friend',
      ],
      popular: true,
    },
  ];

  return (
    <div className="page-wrapper" style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container">
        {/* Page Banner Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <div className="section-tag">
            <Scissors size={14} /> Comprehensive Grooming Directory
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
            Tailored Grooming <span className="gradient-gold-text">& Gentleman's Rituals</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Every session includes a bespoke consultation, hair wash, hot lather neck cleanup,
            and finish styling with our small-batch organic apothecary pomades.
          </p>
        </div>

        {/* Reusable Core Services Component with direct action */}
        <Services
          onSelectService={(service) => {
            onSelectService(service);
            onNavigate('booking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Executive Membership Section */}
        <div style={{ marginTop: '6rem' }}>
          <div className="section-header">
            <div className="section-tag">
              <Crown size={14} /> VIP Memberships
            </div>
            <h2 className="section-title">
              The Gentleman's <span className="gradient-gold-text">Monthly Privilege</span>
            </h2>
            <p className="section-desc">
              For professionals who keep their look perpetually sharp. Enjoy recurring appointments,
              unlimited touch-ups, and lounge exclusivity.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            {memberships.map((m, i) => (
              <div
                key={i}
                className="glass-card membership-card"
                style={{
                  padding: '2.5rem',
                  border: m.popular ? '1.5px solid var(--gold-light)' : '1px solid var(--border-subtle)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {m.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'var(--gold-light)',
                      color: '#070d1e',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Recommended
                  </div>
                )}

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
                  {m.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--gold-light)' }}>
                    ₦{m.price.toLocaleString()}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{m.period}</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', flexGrow: 1 }}>
                  {m.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <Check size={16} color="var(--gold-light)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={m.popular ? 'btn btn-gold' : 'btn btn-outline-gold'}
                  style={{ width: '100%' }}
                >
                  Inquire For Membership
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .membership-card {
            padding: 1.5rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
