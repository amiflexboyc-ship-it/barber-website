import React from 'react';
import { Star, Award, Scissors, Calendar, CheckCircle2 } from 'lucide-react';
import barber1 from '../assets/barber1.jpg';
import barber2 from '../assets/barber2.jpg';

export const BARBERS_DATA = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Founder & Master Craftsman',
    image: barber1,
    experience: '14+ Years Experience',
    rating: '5.0',
    reviewsCount: 520,
    specialties: ['Japanese Shear Sculpting', 'Traditional Straight Razor Shaves', 'Executive Restyling'],
    schedule: 'Mon - Thu • 9:00 AM - 6:00 PM',
    bio: 'Former senior educator for European barber guilds, Marcus combines vintage precision with effortless modern styling.',
  },
  {
    id: 'julian-rossi',
    name: 'Julian Rossi',
    role: 'Senior Fade & Beard Director',
    image: barber2,
    experience: '9+ Years Experience',
    rating: '4.9',
    reviewsCount: 380,
    specialties: ['Zero-Gap Skin Fades', 'Artisan Beard Sculpting', 'Textured Crop Dynamics'],
    schedule: 'Tue - Sat • 10:00 AM - 8:00 PM',
    bio: 'Renowned for surgical fade gradients and razor sharp beard alignments, Julian ensures every contour flatters your bone structure.',
  },
];

export default function Barbers({ onBookWithBarber }) {
  return (
    <section
      id="barbers"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} /> Master Artisans
          </div>
          <h2 className="section-title">
            The Hands Behind <span className="gradient-gold-text">The Blade</span>
          </h2>
          <p className="section-desc">
            Our craftsmen are not just barbers; they are licensed artisans dedicated to the mastery of
            traditional grooming and modern aesthetic tailoring.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {BARBERS_DATA.map((barber) => (
            <div
              key={barber.id}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image Frame */}
              <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                <img
                  src={barber.image}
                  alt={barber.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(14, 16, 22, 0.95) 0%, rgba(14, 16, 22, 0.2) 60%, transparent 100%)',
                  }}
                />

                {/* Rating badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'rgba(12, 14, 20, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.35rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--gold-light)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  <Star size={14} fill="var(--gold-light)" color="var(--gold-light)" />
                  <span>{barber.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({barber.reviewsCount})</span>
                </div>

                {/* Barber Info on bottom of image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.5rem',
                    right: '1.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                    {barber.role}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-serif)' }}>
                    {barber.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {barber.experience}
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {barber.bio}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.65rem' }}>
                    Specialties:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {barber.specialties.map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(197, 160, 89, 0.06)',
                    border: '1px solid rgba(197, 160, 89, 0.15)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Calendar size={15} color="var(--gold-light)" />
                  <span>{barber.schedule}</span>
                </div>

                <button
                  onClick={() => onBookWithBarber(barber)}
                  className="btn btn-gold"
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  <Scissors size={16} /> Book With {barber.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
