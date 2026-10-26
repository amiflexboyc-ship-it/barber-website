import React from 'react';
import { Camera, Scissors, Sparkles, ArrowRight } from 'lucide-react';
import Gallery from '../components/Gallery.jsx';

export default function GalleryPage({ onNavigate, onSelectStyle }) {
  return (
    <div className="page-wrapper" style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div className="section-tag">
            <Camera size={14} /> The Visual Archive
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
            Artistry & Precision <span className="gradient-gold-text">In Every Angle</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Explore our curated lookbook of custom skin fades, bespoke scissor shaping, executive tapers,
            and razor-honed beard lines created by our master craftsmen.
          </p>
        </div>

        {/* Gallery Component */}
        <Gallery
          onSelectStyle={(item) => {
            if (onSelectStyle) onSelectStyle(item);
            onNavigate('booking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Callout Card */}
        <div
          className="glass-card"
          style={{
            marginTop: '5rem',
            padding: '3rem',
            textAlign: 'center',
            border: '1.5px solid var(--border-gold)',
            background: 'linear-gradient(135deg, rgba(22, 25, 34, 0.9) 0%, rgba(14, 16, 22, 0.95) 100%)',
          }}
        >
          <Sparkles size={32} color="var(--gold-light)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>
            Have a Specific Reference Style in Mind?
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1rem', lineHeight: 1.6 }}>
            Bring your favorite photo or let our master barbers analyze your hair growth direction, bone architecture,
            and daily styling routine during your consultation.
          </p>
          <button
            onClick={() => {
              onNavigate('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-gold"
            style={{ padding: '0.9rem 2.2rem' }}
          >
            <Scissors size={18} /> Book Your Style Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
