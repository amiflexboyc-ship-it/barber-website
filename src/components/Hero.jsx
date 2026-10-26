import React from 'react';
import { Calendar, ArrowRight, Star, ShieldCheck, Scissors, Award } from 'lucide-react';
import heroBarber from '../assets/hero_barber.jpg';
import barber1 from '../assets/barber1.jpg';

export default function Hero({ onBookNow, onExploreServices }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 0 6rem 0',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Background ambient radial gradients */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(30, 64, 175, 0.28) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Copy & CTAs */}
          <div>
            <div className="section-tag">
              <Award size={14} /> Master Craftsmanship • Adetech Barbing
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              Precision Cuts & Artistry at <span className="gradient-gold-text">Adetech Barbing.</span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '560px',
              }}
            >
              Step into an elevated grooming sanctuary. Experience tailored scissor work,
              surgical fade lines, steaming hot towel shaves, and artisanal beard sculpting designed
              by Adetech for distinguished gentlemen.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '3.5rem' }}>
              <button
                onClick={onBookNow}
                className="btn btn-gold"
                style={{ padding: '1rem 2.2rem', fontSize: '1.05rem' }}
              >
                <Calendar size={18} /> Book Your Chair
              </button>
              <button
                onClick={onExploreServices}
                className="btn btn-outline-gold"
                style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
              >
                Explore Services <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust Badges & Stat Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              className="hero-stats"
            >
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                  15,000+
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Fades & Cuts Crafted</div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  4.9 <Star size={18} fill="var(--gold-light)" color="var(--gold-light)" />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Over 850+ Reviews</div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Handcrafted Precision</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Showcase Image */}
          <div style={{ position: 'relative' }}>
            {/* Main Featured Image Card */}
            <div
              className="glass-card"
              style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={heroBarber}
                alt="Adetech Barbing - Master Craftsman & Head Barber"
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  borderRadius: 'calc(var(--radius-lg) - 6px)',
                  display: 'block',
                }}
              />

              {/* Overlay Badge Bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(7, 13, 30, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    Master Barber & Stylist
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                    Adetech Barbing
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    color: 'var(--gold-light)',
                    padding: '0.35rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: '1px solid var(--border-gold)',
                  }}
                >
                  Expert Care
                </span>
              </div>
            </div>

            {/* Floating Barber Badge Top Right */}
            <div
              className="glass-card floating-card"
              style={{
                position: 'absolute',
                top: '-1.5rem',
                right: '-1.5rem',
                padding: '0.85rem 1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid var(--border-gold)',
                background: 'rgba(12, 22, 48, 0.95)',
                boxShadow: '0 15px 35px rgba(2, 6, 18, 0.7)',
              }}
            >
              <img
                src={heroBarber}
                alt="Adetech Lead Barber"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  border: '2px solid var(--gold-light)',
                }}
              />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 600 }}>Master Barber & Founder</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>Adetech</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> In Salon Today
                </div>
              </div>
            </div>

            {/* Floating Guarantee Badge Bottom Left */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '-1.5rem',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 17, 23, 0.95)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.2)',
                  color: 'var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={18} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Hot Towel & Straight Razor Included
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .floating-card {
            right: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .hero-stats {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
