import React from 'react';
import { CheckCircle2, Sparkles, Scissors, Clock, Award } from 'lucide-react';
import barber1 from '../assets/barber1.jpg';

export default function About({ onMeetBarbers, onBookNow }) {
  const highlights = [
    { title: 'Japanese Steel Shears', desc: 'Hand-honed blades ensuring buttery-smooth, split-end resistant cuts.' },
    { title: 'Artisanal Hot Lather', desc: 'Pre-shave eucalyptus oils with steaming hot towels for ultimate comfort.' },
    { title: 'Tailored Consultation', desc: 'Every haircut begins with face shape, growth pattern, and lifestyle analysis.' },
    { title: 'Complimentary Bar Service', desc: 'Enjoy single-malt whiskey, craft espresso, or cold brew while you wait.' },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '4.5rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left Column: Visual frame */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-gold)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
              }}
            >
              <img
                src={barber1}
                alt="Master Barber Marcus Vance at The Noble Blade"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 11, 14, 0.85) 0%, transparent 60%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem',
                }}
              >
                <div style={{ color: 'var(--gold-light)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
                  Founder & Master Barber
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800 }}>
                  Marcus "The Architect" Vance
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                  "A gentleman's haircut is not merely grooming—it is his personal signature to the world."
                </p>
              </div>
            </div>

            {/* Badge overlay */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '-1.5rem',
                padding: '1rem 1.25rem',
                background: 'rgba(18, 20, 28, 0.95)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <Award size={28} color="var(--gold-light)" />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>8+ Years</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>Master Barber Heritage</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div>
            <div className="section-tag">
              <Sparkles size={14} /> The Noble Blade Legacy
            </div>

            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Crafted For Men Who Settle For <span className="gradient-gold-text">Nothing Less Than Mastery.</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Founded in 2018, The Noble Blade was born from an unyielding commitment to revitalize the timeless ritual
              of the traditional barbershop. We fused time-tested English and Italian straight-razor techniques with 
              cutting-edge fade precision and modern styling aesthetics.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Whether you are preparing for a boardroom keynote, a wedding day, or maintaining your weekly standard,
              our chairs offer an unhurried, tailored grooming journey second to none.
            </p>

            {/* Feature Checklist Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2.5rem',
              }}
              className="about-features"
            >
              {highlights.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={20} color="var(--gold-light)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem', color: '#fff' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button onClick={onBookNow} className="btn btn-gold">
                <Scissors size={16} /> Reserve Your Appointment
              </button>
              {onMeetBarbers && (
                <button onClick={onMeetBarbers} className="btn btn-outline-gold">
                  Meet The Craft Barbers
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .about-features {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
