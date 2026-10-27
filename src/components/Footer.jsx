import React, { useState } from 'react';
import { Scissors, ArrowUp, Send, CheckCircle2, Globe } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const WhatsappIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.127-.061-.264-.085-.595-.195-1.031-.383-1.834-.796-3.031-2.656-3.123-2.778-.092-.123-.746-.992-.746-1.893 0-.9.472-1.344.641-1.528.169-.184.368-.23.491-.23.123 0 .245.002.352.007.112.006.262-.043.409.313.153.37.521 1.272.567 1.365.046.092.077.2.015.323-.061.123-.092.2-.184.307-.092.108-.194.24-.277.323-.092.092-.188.192-.081.376.107.184.477.787 1.025 1.274.706.628 1.301.822 1.485.914.184.092.292.077.4-.046.108-.123.461-.537.584-.721.123-.184.246-.154.415-.092.169.062 1.074.507 1.258.599.184.092.307.138.353.215.046.077.046.446-.098.851zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.94.55 3.75 1.51 5.29L2 22l4.83-1.49c1.48.88 3.2 1.39 5.21 1.39 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2z"/>
  </svg>
);

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#050a18',
        borderTop: '1px solid rgba(147, 197, 253, 0.12)',
        padding: '5rem 0 2rem 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.8fr 0.8fr 1.2fr',
            gap: '3rem',
            marginBottom: '4rem',
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #15254a 0%, #0c162e 100%)',
                  border: '1.5px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                  boxShadow: '0 0 15px rgba(37, 99, 235, 0.25)',
                }}
              >
                <Scissors size={18} />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                ADETECH BARBING
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '320px' }}>
              Where old-world barber heritage meets contemporary sartorial precision.
              Dedicated to the gentleman who demands excellence in every cut.
            </p>

            {/* Contact Info Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
              <a
                href="https://wa.me/2349077108987"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
              >
                <WhatsappIcon /> WhatsApp: 09077108987
              </a>
              <a
                href="mailto:amiflexboyc@gmail.com"
                style={{ color: 'var(--gold-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                ✉️ amiflexboyc@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://wa.me/2349077108987"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid #25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
              >
                <WhatsappIcon />
              </a>
              {[
                { icon: InstagramIcon, href: '#instagram', label: 'Instagram' },
                { icon: FacebookIcon, href: '#facebook', label: 'Facebook' },
                { icon: YoutubeIcon, href: '#youtube', label: 'YouTube' },
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.href}
                    aria-label={soc.label}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-light)',
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--gold-subtle)';
                      e.currentTarget.style.borderColor = 'var(--gold-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'services', label: 'Service Menu' },
                { id: 'gallery', label: 'Style Portfolio' },
                { id: 'barbers', label: 'Master Barbers' },
                { id: 'booking', label: 'Reserve Chair' },
                { id: 'dashboard', label: 'Member Dashboard' },
                { id: 'contact', label: 'Contact & Hours' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours Summary */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              Parlour Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 600 }}>Mon – Thu</div>
                <div style={{ color: 'var(--text-muted)' }}>9:00 AM – 8:00 PM</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600 }}>Friday</div>
                <div style={{ color: 'var(--text-muted)' }}>8:30 AM – 8:30 PM</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600 }}>Saturday</div>
                <div style={{ color: 'var(--text-muted)' }}>9:00 AM – 7:00 PM</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600 }}>Sunday</div>
                <div style={{ color: 'var(--text-muted)' }}>10:00 AM – 5:00 PM</div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              The Gentleman's Gazette
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Receive exclusive invites to private grooming events, grooming guides, and priority holiday booking access.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600, padding: '0.5rem 0' }}>
                <CheckCircle2 size={16} /> Welcome to the Circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ padding: '0.65rem 1rem' }}
                  aria-label="Subscribe"
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Adetech Barbing. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--gold-light)',
                borderRadius: '50%',
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 550px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
