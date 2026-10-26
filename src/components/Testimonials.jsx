import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Alexander Sterling',
    role: 'Corporate Attorney',
    rating: 5,
    date: '3 days ago',
    service: 'The Royal Parlour Overhaul',
    comment: 'The Noble Blade is the undisputed benchmark of men’s grooming. Marcus Vance understands hair geometry like a sculptor. The hot towel treatment and single-malt bourbon made the experience worth ten times the price.',
  },
  {
    name: 'Dr. Harrison Hayes',
    role: 'Orthopedic Surgeon',
    rating: 5,
    date: '1 week ago',
    service: 'Signature Skin Fade & Beard Sculpt',
    comment: 'Julian’s attention to detail is surgical. The transition on my skin fade is flawlessly blended, and the razor lineup stayed razor-sharp for almost two weeks. I wouldn’t trust any other shop in the city.',
  },
  {
    name: 'Gabriel Martinez',
    role: 'Creative Director & Founder',
    rating: 5,
    date: '2 weeks ago',
    service: 'Executive Scissor Cut',
    comment: 'The ambiance is exquisite—leather armchairs, jazz playing quietly, zero rush. You walk in feeling worn out from the work week and walk out feeling like a million dollars. Absolutely world-class.',
  },
  {
    name: 'David Thorne',
    role: 'Managing Partner',
    rating: 5,
    date: '3 weeks ago',
    service: 'Royal Straight Razor Shave',
    comment: 'My first straight razor shave with steaming eucalyptus towels was unforgettable. Not a single nick or ingrown hair. Pure old-world luxury executed with modern hygiene.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section
      id="testimonials"
      style={{
        padding: '6rem 0',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Quote size={14} /> The Verdict
          </div>
          <h2 className="section-title">
            Words From Our <span className="gradient-gold-text">Distinguished Patrons</span>
          </h2>
          <p className="section-desc">
            Over 850 five-star verified ratings across Google and Yelp. Here is what gentlemen have to
            say about their experience in our chairs.
          </p>
        </div>

        {/* Highlighted Review Card */}
        <div
          className="glass-card"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: '3rem 2.5rem',
            position: 'relative',
            border: '1px solid var(--border-gold)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Quote
            size={48}
            color="var(--gold-light)"
            style={{ opacity: 0.25, position: 'absolute', top: '2rem', right: '2.5rem' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="var(--gold-light)" color="var(--gold-light)" />
            ))}
            <span
              style={{
                marginLeft: '0.75rem',
                fontSize: '0.8rem',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={12} /> Verified Client
            </span>
          </div>

          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.7,
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              marginBottom: '2rem',
              minHeight: '85px',
            }}
          >
            "{current.comment}"
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '1.5rem',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                {current.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                {current.role} • <span style={{ color: 'var(--text-muted)' }}>{current.service}</span>
              </div>
            </div>

            {/* Slider Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={prevReview}
                className="btn btn-ghost"
                style={{ width: 42, height: 42, padding: 0, borderRadius: '50%' }}
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', minWidth: '40px', textAlign: 'center' }}>
                {currentIndex + 1} / {REVIEWS.length}
              </span>
              <button
                onClick={nextReview}
                className="btn btn-ghost"
                style={{ width: 42, height: 42, padding: 0, borderRadius: '50%' }}
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
