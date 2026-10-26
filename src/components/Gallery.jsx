import React, { useState } from 'react';
import { Camera, ZoomIn, X, Scissors, ArrowRight, Sparkles } from 'lucide-react';
import haircut1 from '../assets/haircut1.jpg';
import haircut2 from '../assets/haircut2.jpg';
import barber1 from '../assets/barber1.jpg';
import barber2 from '../assets/barber2.jpg';

export const GALLERY_ITEMS = [
  {
    id: 1,
    image: haircut1,
    title: 'Mid Skin Fade & Textured Pompadour',
    category: 'fades',
    tag: 'Signature Cut',
    barber: 'Marcus Vance',
    description: 'Seamless low-to-skin transition with a hand-sculpted textured crown and sharp temple lines.',
  },
  {
    id: 2,
    image: haircut2,
    title: 'Executive Side Part & Clean Taper',
    category: 'classic',
    tag: 'Executive Choice',
    barber: 'Julian Rossi',
    description: 'Crisp scissor-sculpted side parting with tapered neckline and blended natural facial stubble.',
  },
  {
    id: 3,
    image: barber2,
    title: 'Precision Clipper & Beard Alignment',
    category: 'beards',
    tag: 'Beard Sculpt',
    barber: 'Julian Rossi',
    description: 'Geometric cheek razor lining with balanced beard weight debulking and hot eucalyptus steam.',
  },
  {
    id: 4,
    image: barber1,
    title: 'Master Scissor Styling Session',
    category: 'classic',
    tag: 'Parlour Craft',
    barber: 'Marcus Vance',
    description: 'Old-world scissor-over-comb craftsmanship inside our bespoke private lounge chairs.',
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
        padding: '6rem 0',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Camera size={14} /> The Lookbook
          </div>
          <h2 className="section-title">
            Our Work in the Chair: <span className="gradient-gold-text">Crafted Perfection</span>
          </h2>
          <p className="section-desc">
            Browse through our portfolio of custom fades, textured crops, razor-sharp beard contours,
            and timeless gentleman classics.
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
            { id: 'all', label: 'All Work' },
            { id: 'fades', label: 'Skin Fades & Crops' },
            { id: 'classic', label: 'Executive & Classic' },
            { id: 'beards', label: 'Beard Alignments' },
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
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
                group: 'true',
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
                    background: 'linear-gradient(to top, rgba(10, 11, 14, 0.9) 0%, transparent 60%)',
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

                {/* Zoom Icon indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(12, 14, 20, 0.8)',
                    color: 'var(--gold-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <ZoomIn size={16} />
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '0.2rem' }}>
                    Cut by {item.barber}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
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
            className="glass-card"
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
                top: '1rem',
                right: '1rem',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
            />

            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Crafted by {selectedImage.barber}
                </span>
                <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--gold-subtle)', color: 'var(--gold-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                  {selectedImage.tag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
                {selectedImage.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedImage.description}
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
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
                  <Scissors size={16} /> Request This Look
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
