import React from 'react';
import { Award, Flame, Coffee, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Award,
      title: 'Guild-Certified Masters',
      description: 'Our barbers undergo over 1,500 hours of specialized training in vintage straight-razor and modern precision fade geometry.',
    },
    {
      icon: Flame,
      title: 'The Steaming Ritual',
      description: 'Eucalyptus steam towels open pores for effortless blade gliding without razor burn or irritation.',
    },
    {
      icon: Coffee,
      title: 'Private Gentlemen\'s Lounge',
      description: 'Recline in 1960s custom leather Takara Belmont chairs with complimentary single-barrel bourbon or barista espresso.',
    },
    {
      icon: ShieldCheck,
      title: 'The Sharp Line Guarantee',
      description: 'If your fade or beard neckline is anything less than immaculate, enjoy a complimentary 7-day touch-up on the house.',
    },
  ];

  return (
    <section
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
            <Sparkles size={14} /> The Noble Distinction
          </div>
          <h2 className="section-title">
            Why Discerning Gentlemen <span className="gradient-gold-text">Choose Our Chairs</span>
          </h2>
          <p className="section-desc">
            We don't do quick rushed haircuts. We provide a restorative ritual that leaves you confident,
            sharp, and ready to conquer your endeavors.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="glass-card"
                style={{
                  padding: '2.5rem 1.75rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.2) 0%, rgba(197, 160, 89, 0.05) 100%)',
                    border: '1.5px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-light)',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Icon size={28} />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.85rem', color: '#ffffff' }}>
                  {pillar.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ambient quote box */}
        <div
          className="why-quote-box"
          style={{
            marginTop: '3.5rem',
            padding: '2rem 2.5rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(90deg, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.02) 100%)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <HeartHandshake size={36} color="var(--gold-light)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                Sanitation & Hygiene Protocol Exceeding Health Standards
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Single-use surgical blades, UV-C sterilizers, and freshly laundered towels for every gentleman.
              </div>
            </div>
          </div>
          <span
            style={{
              padding: '0.4rem 1rem',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Hospital-Grade Clean
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .why-quote-box {
            padding: 1.5rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
