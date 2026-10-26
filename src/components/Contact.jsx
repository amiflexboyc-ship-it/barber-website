import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Car, Wifi, Wine, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSent(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setIsSent(false);
    }, 4500);
  };

  const scheduleHours = [
    { day: 'Monday - Thursday', hours: '9:00 AM – 8:00 PM', open: true },
    { day: 'Friday', hours: '8:30 AM – 8:30 PM', open: true },
    { day: 'Saturday', hours: '9:00 AM – 7:00 PM', open: true },
    { day: 'Sunday', hours: '10:00 AM – 5:00 PM', open: true },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '6rem 0',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MapPin size={14} /> The Parlour Location
          </div>
          <h2 className="section-title">
            Visit Our Parlour & <span className="gradient-gold-text">Connect With Us</span>
          </h2>
          <p className="section-desc">
            Conveniently situated in the historic heritage district with private client parking.
            Stop by for a walk-in cut or drop us a message.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '3.5rem',
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Message Form */}
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              border: '1px solid var(--border-gold)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', color: '#fff' }}>
              Send a Note to Our Concierge
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Inquiring about private bookings, groomsmen party packages, or bespoke grooming memberships?
            </p>

            {isSent ? (
              <div
                style={{
                  padding: '2rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Message Dispatched</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Thank you. Our parlour concierge will respond to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alexander Vance"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: '#0c1630',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      outline: 'none',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Groomsmen / Wedding Package">Groomsmen / Wedding Private Event</option>
                    <option value="Executive Membership">Executive Monthly Membership</option>
                    <option value="Press / Collaboration">Press or Partnership</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our barbers assist you?"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      outline: 'none',
                      fontSize: '0.9rem',
                      resize: 'none',
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Location, Hours, Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Quick Contact Cards */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>Parlour Address</div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>452 St. James Boulevard, Suite 104</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Historic Heritage Quarter, City Center</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>Phone & Appointments</div>
                    <a href="tel:09077108987" style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem', textDecoration: 'none' }}>
                      09077108987
                    </a>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Direct line for calls and instant reservations</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(37, 211, 102, 0.15)', border: '1px solid #25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', flexShrink: 0 }}>
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#25D366', textTransform: 'uppercase', fontWeight: 700 }}>WhatsApp Chat</div>
                    <a
                      href="https://wa.me/2349077108987"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 700, color: '#25D366', fontSize: '1.05rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      Chat on WhatsApp (09077108987)
                    </a>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Instant response & booking inquiries on WhatsApp</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>Electronic Mail</div>
                    <a href="mailto:amiflexboyc@gmail.com" style={{ fontWeight: 700, color: '#fff', fontSize: '1rem', textDecoration: 'none' }}>
                      amiflexboyc@gmail.com
                    </a>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>24/7 client response mailbox</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} color="var(--gold-light)" />
                  <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem' }}>Hours of Grooming</span>
                </div>
                <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                  Open Today
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {scheduleHours.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.day}</span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Pills */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <Car size={13} color="var(--gold-light)" /> Free Valet Parking
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <Wine size={13} color="var(--gold-light)" /> Whiskey & Espresso Bar
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <Wifi size={13} color="var(--gold-light)" /> High-Speed Wi-Fi
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
