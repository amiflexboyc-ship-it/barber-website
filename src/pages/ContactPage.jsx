import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Contact from '../components/Contact.jsx';

export default function ContactPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Do you accept walk-in clients, or is booking mandatory?',
      a: 'We gladly accommodate walk-in gentlemen whenever an open chair is available. However, Friday through Sunday sessions fill up rapidly, so we strongly advise reserving your chair in advance online.',
    },
    {
      q: 'Where can I park when visiting the parlour?',
      a: 'We offer complimentary valet parking directly in front of Suite 104 on St. James Boulevard. In addition, there is a dedicated customer parking garage adjacent to our building with validation provided upon checkout.',
    },
    {
      q: 'What is included with a straight-razor shave?',
      a: 'Our signature straight-razor shave includes warm botanical pre-shave oils, two hot eucalyptus-infused steaming towels, whipped warm lather massage, surgical razor strokes, an alum block astringent pass, and a refreshing chilled cucumber towel finish.',
    },
    {
      q: 'Can I book a private grooming party for groomsmen or corporate events?',
      a: 'Yes, we frequently host private after-hours parlour buyouts for groomsmen parties and executive teams. This includes dedicated barbers, private lounge access, tailored cuts, and premium bar service. Send us a message via the form above for availability and custom pricing.',
    },
    {
      q: 'What payment methods are accepted at The Noble Blade?',
      a: 'We accept all major credit and debit cards (Visa, MasterCard, Amex), Apple Pay, Google Pay, cash, and Noble Blade digital gift certificates.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="page-wrapper" style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container">
        {/* Contact Component */}
        <Contact />

        {/* FAQs Accordion */}
        <div style={{ maxWidth: '850px', margin: '5rem auto 0 auto' }}>
          <div className="section-header">
            <div className="section-tag">
              <HelpCircle size={14} /> Frequently Asked Questions
            </div>
            <h2 className="section-title">
              Common Inquiries <span className="gradient-gold-text">& Parlour Etiquette</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card"
                  style={{
                    overflow: 'hidden',
                    border: isOpen ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: isOpen ? 'var(--gold-light)' : '#ffffff',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--gold-light)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.25rem 1.5rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '1rem',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
