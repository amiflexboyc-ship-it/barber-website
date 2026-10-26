import React from 'react';
import { Award, Scissors, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import Barbers from '../components/Barbers.jsx';

export default function BarbersPage({ onNavigate, onSelectBarber }) {
  const tools = [
    { name: 'Mizutani Japanese Shears', desc: 'Hand-forged cobalt alloy steel creating effortless razor-like sharpness without hair damage.' },
    { name: 'Oster Classic 76 & Wahl Senior', desc: 'Heavy-duty rotary magnetic motors calibrated for microscopic fade blending.' },
    { name: 'Campbell Hot Lather Machine', desc: 'Constant 115°F thermal foam softening the toughest beard bristles.' },
    { name: 'Organic Sandalwood Apothecary', desc: 'Small-batch botanical beard oils, sea salt sprays, and petroleum-free pomades.' },
  ];

  return (
    <div className="page-wrapper" style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <div className="section-tag">
            <Award size={14} /> Master Barber Guild
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
            Meet The Artisans of <span className="gradient-gold-text">The Noble Blade</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Our team comprises award-winning master craftsmen who treat barbering as an exacting discipline.
            Select your preferred barber and experience grooming at its pinnacle.
          </p>
        </div>

        {/* Master Barbers component */}
        <Barbers
          onBookWithBarber={(barber) => {
            onSelectBarber(barber);
            onNavigate('booking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* The Artisan Toolkit section */}
        <div style={{ marginTop: '6rem' }}>
          <div className="section-header">
            <div className="section-tag">
              <Scissors size={14} /> Instruments of Precision
            </div>
            <h2 className="section-title">
              Our Master <span className="gradient-gold-text">Toolkit & Standards</span>
            </h2>
            <p className="section-desc">
              A master craftsman never blames his tools, because he only wields the finest implements in the world.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {tools.map((t, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--gold-subtle)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-light)',
                    marginBottom: '1rem',
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  {t.name}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
