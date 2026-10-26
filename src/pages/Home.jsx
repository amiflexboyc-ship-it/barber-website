import React from 'react';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Gallery from '../components/Gallery.jsx';
import Barbers from '../components/Barbers.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Booking from '../components/Booking.jsx';
import Contact from '../components/Contact.jsx';

export default function Home({ onNavigate, onSelectService, onSelectBarber, onSelectStyle, currentUser }) {
  return (
    <div className="page-wrapper">
      <Hero
        onBookNow={() => {
          const bookingEl = document.getElementById('booking-section');
          if (bookingEl) {
            bookingEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('booking');
          }
        }}
        onExploreServices={() => onNavigate('services')}
      />

      <About
        onMeetBarbers={() => onNavigate('barbers')}
        onBookNow={() => {
          const bookingEl = document.getElementById('booking-section');
          if (bookingEl) {
            bookingEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('booking');
          }
        }}
      />

      <Services
        onSelectService={(service) => {
          onSelectService(service);
          onNavigate('booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewAllServices={() => onNavigate('services')}
      />

      <WhyChooseUs />

      <Gallery
        onSelectStyle={(item) => {
          if (onSelectStyle) onSelectStyle(item);
          onNavigate('booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <Barbers
        onBookWithBarber={(barber) => {
          onSelectBarber(barber);
          onNavigate('booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <Testimonials />

      <Booking
        currentUser={currentUser}
        onViewDashboard={() => {
          onNavigate('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <Contact />
    </div>
  );
}
