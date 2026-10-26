import React, { useState } from 'react';
import { Scissors, Sparkles, Clock, Check, ArrowRight } from 'lucide-react';

export const SERVICES_DATA = [
  {
    id: 'skin-fade',
    title: 'The Signature Skin Fade',
    category: 'haircut',
    price: 7000,
    duration: '45 mins',
    popular: true,
    description: 'Precision clipper and foil fade blended down to skin, bespoke shear-work on top, straight razor neck cleanup, and styled with premium matte clay.',
    includes: ['Custom Face-Shape Consultation', 'Zero-gap clipper taper & fade', 'Hot towel razor neck shave', 'Matte or high-sheen finish styling'],
  },
  {
    id: 'classic-gentleman',
    title: 'Executive Scissor Cut & Waves',
    category: 'haircut',
    price: 6000,
    duration: '40 mins',
    popular: false,
    description: 'Traditional scissor-over-comb hand cut tailored to natural part lines and texture. Ideal for wave sculpting and gentleman cuts.',
    includes: ['Deep cleansing shampoo & rinse', 'Precision scissor architecture', 'Blowdry & volume structuring', 'Finishing wave butter application'],
  },
  {
    id: 'hot-towel-shave',
    title: 'Royal Straight Razor Shave',
    category: 'shave',
    price: 5000,
    duration: '35 mins',
    popular: true,
    description: 'The quintessential barbershop ritual. Steaming hot eucalyptus towels, warm lather massage, surgical straight razor shave, and cold towel close.',
    includes: ['Pre-shave botanical essential oils', 'Double hot towel lather treatment', 'Japanese straight-razor shave', 'Post-shave soothing witch hazel splash'],
  },
  {
    id: 'beard-sculpt',
    title: 'Artisan Beard Sculpt & Lineup',
    category: 'shave',
    price: 4000,
    duration: '30 mins',
    popular: false,
    description: 'Comprehensive beard shaping, mustache contouring, cheek and throat straight razor alignment, finished with conditioning argan oil.',
    includes: ['Length tapering & weight debulking', 'Razor-sharp cheekbone & neck line', 'Hot towel steam soak', 'Organic sandalwood beard balm treatment'],
  },
  {
    id: 'royal-overhaul',
    title: 'The Royal Parlour Overhaul',
    category: 'packages',
    price: 18000,
    duration: '75 mins',
    popular: true,
    description: 'Our ultimate luxury experience. Full signature haircut, artisan beard sculpt or royal shave, invigorating scalp massage, and complimentary scotch.',
    includes: ['Full signature haircut of choice', 'Royal straight razor shave or beard sculpt', 'Menthol scalp massage & rinse', 'Facial steam & cold compress close', 'Complimentary top-shelf whiskey or espresso'],
  },
  {
    id: 'father-son',
    title: 'The Heir & Patriarch Combo',
    category: 'packages',
    price: 14000,
    duration: '60 mins',
    popular: false,
    description: 'Dual side-by-side appointments for father and son. Two tailored haircuts, complimentary beverages, and memories in the barber chair.',
    includes: ['Two customized haircut sessions', 'Side-by-side chair reservation', 'Styling tips & hair coaching', 'Choice of complimentary drinks'],
  },
];

export default function Services({ onSelectService, onViewAllServices }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredServices = activeTab === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  return (
    <section
      id="services"
      style={{
        padding: '6rem 0',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Scissors size={14} /> Tailored Grooming Menu
          </div>
          <h2 className="section-title">
            Artisanal Cuts, Shaves & <span className="gradient-gold-text">Gentlemen's Services</span>
          </h2>
          <p className="section-desc">
            Every service is conducted with surgical precision, sanitized medical-grade tools,
            and luxury apothecary grooming products designed to elevate your personal presence.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'all', label: 'All Services' },
            { id: 'haircut', label: 'Haircuts' },
            { id: 'shave', label: 'Beard & Shaves' },
            { id: 'packages', label: 'VIP Packages' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === tab.id ? '#070d1e' : 'var(--text-secondary)',
                border: activeTab === tab.id ? '1px solid var(--gold-light)' : '1px solid var(--border-subtle)',
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: service.popular ? '1px solid rgba(197, 160, 89, 0.5)' : '1px solid var(--border-subtle)',
                boxShadow: service.popular ? '0 10px 30px rgba(197, 160, 89, 0.12)' : 'none',
              }}
            >
              {service.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    color: 'var(--gold-light)',
                    border: '1px solid var(--border-gold)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Sparkles size={12} /> Most Requested
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem', paddingRight: service.popular ? '6.5rem' : '0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  {service.title}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--gold-light)' }}>
                  ₦{service.price.toLocaleString()}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Clock size={14} /> {service.duration}
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                {service.description}
              </p>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Service Includes:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {service.includes.map((inc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <Check size={14} color="var(--gold-light)" style={{ flexShrink: 0 }} />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectService(service)}
                className={service.popular ? 'btn btn-gold' : 'btn btn-outline-gold'}
                style={{ width: '100%', marginTop: 'auto' }}
              >
                <span>Select & Book Service</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
