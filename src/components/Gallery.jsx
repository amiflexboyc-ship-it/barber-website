import React, { useState } from 'react';
import { Camera, ZoomIn, X, Scissors, ArrowRight, Sparkles, Tag } from 'lucide-react';
import cutWavesProfile from '../assets/cut_waves_profile.jpg';
import cutWavesChin from '../assets/cut_waves_chin.jpg';
import cutHightopCurls from '../assets/cut_hightop_curls.jpg';
import galleryCrispLineup from '../assets/gallery_crisp_lineup.jpg';
import galleryBarberLaugh from '../assets/gallery_barber_laugh.jpg';
import galleryFadeTaper from '../assets/gallery_fade_taper.jpg';

export const GALLERY_ITEMS = [
  {
    id: 1,
    image: cutWavesProfile,
    title: '360 Waves Profile & Precision Beard Edge',
    category: 'waves',
    tag: 'Signature Waves',
    price: 7000,
    barber: 'Adedayo',
    description: 'Deep 360 spinning wave sculpting, razor sharp temple boxes, and surgical beard line alignment.',
  },
  {
    id: 2,
    image: cutWavesChin,
    title: 'Executive Wave Taper & Full Beard Sculpt',
    category: 'waves',
    tag: 'Executive Grooming',
    price: 8500,
    barber: 'Samuel',
    description: 'Low skin taper paired with spinning wave flow, clean ear arch clearance, and nourished beard detailing.',
  },
  {
    id: 3,
    image: cutHightopCurls,
    title: 'Textured Sponge Twists & Drop Skin Fade',
    category: 'fades',
    tag: 'Modern Artistry',
    price: 10000,
    barber: 'Olaoluwa',
    description: 'High-contrast drop skin fade, textured sponge twists, crisp hairline detailing, and beard fade gradient.',
  },
  {
    id: 4,
    image: galleryCrispLineup,
    title: 'Ultra Razor Sharp Lineup & Forehead Detail',
    category: 'lineup',
    tag: 'Surgical Lineup',
    price: 5000,
    barber: 'James',
    description: 'Micro-calibrated gold trimmer hairline detailing, crisp 90-degree temple boxes, and clean neck finish.',
  },
  {
    id: 5,
    image: galleryFadeTaper,
    title: 'Mid Skin Fade & Natural Beard Sculpt',
    category: 'fades',
    tag: 'Master Fade',
    price: 8000,
    barber: 'Samuel',
    description: 'Seamless zero-gap skin transition with debulked beard weight and sharp cheek lines.',
  },
  {
    id: 6,
    image: galleryBarberLaugh,
    title: 'The Adetech VIP Salon Cut & Steam Treatment',
    category: 'vip',
    tag: 'VIP Lounge Experience',
    price: 15000,
    barber: 'Adedayo',
    description: 'Full master haircut consultation, hot eucalyptus towel facial steam, precision shave, and styling.',
  },
];

export default function Gallery({ onSelectStyle }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      style={{
        padding: '5rem 0',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Camera size={14} /> The Lookbook & Price Guide
          </div>
          <h2 className="section-title">
            Our Work in the Chair: <span className="gradient-gold-text">Crafted Perfection</span>
          </h2>
          <p className="section-desc">
            Browse our signature cuts, 360 waves, drop fades, and beard contours with transparent Nigerian Naira pricing.
          </p>
        </div>

        {/* Filter tags */}
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
            { id: 'all', label: 'All Portfolio' },
            { id: 'waves', label: '360 Waves & Tapers' },
            { id: 'fades', label: 'Skin & Drop Fades' },
            { id: 'lineup', label: 'Razor Lineups' },
            { id: 'vip', label: 'VIP Lounge Experience' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.04)',
                color: activeCategory === cat.id ? '#070d1e' : 'var(--text-secondary)',
                border: activeCategory === cat.id ? '1px solid var(--gold-light)' : '1px solid var(--border-subtle)',
                padding: '0.55rem 1.3rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onClick={() => setSelectedImage(item)}
            >
              <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1.0)';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 11, 14, 0.95) 0%, rgba(10, 11, 14, 0.2) 50%, transparent 100%)',
                  }}
                />

                {/* Tag pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(12, 14, 20, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--gold-light)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-gold)',
                  }}
                >
                  {item.tag}
                </div>

                {/* Nigerian Naira Price Badge Top Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'var(--gold-light)',
                    color: '#070d1e',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  ₦{item.price.toLocaleString()}
                </div>

                {/* Content Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                      Crafted by {item.barber}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      Click to inspect
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div
            className="glass-card gallery-modal-card"
            style={{
              maxWidth: '750px',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-gold)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
              aria-label="Close image modal"
            >
              <X size={20} />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="gallery-modal-img"
              style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', display: 'block' }}
            />

            <div className="gallery-modal-body" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Crafted by {selectedImage.barber}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--gold-subtle)', color: 'var(--gold-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                    {selectedImage.tag}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold-light)', backgroundColor: 'rgba(197, 160, 89, 0.15)', border: '1px solid var(--border-gold)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
                    ₦{selectedImage.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
                {selectedImage.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedImage.description}
              </p>

              <div className="gallery-modal-actions" style={{ display: 'flex', gap: '0.85rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="btn btn-ghost"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const chosen = selectedImage;
                    setSelectedImage(null);
                    if (onSelectStyle) onSelectStyle(chosen);
                  }}
                  className="btn btn-gold"
                >
                  <Scissors size={16} /> Request This Look (₦{selectedImage.price.toLocaleString()})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .gallery-modal-body {
            padding: 1.25rem 1rem !important;
          }
          .gallery-modal-img {
            max-height: 260px !important;
          }
          .gallery-modal-actions {
            flex-direction: column-reverse !important;
          }
          .gallery-modal-actions .btn {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
