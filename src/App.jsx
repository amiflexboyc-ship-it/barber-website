import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AuthGate from './components/AuthGate.jsx';

import Home from './pages/Home.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import BarbersPage from './pages/BarbersPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';

import { getStoredUser, logoutUser, initDefaultData } from './services/authService.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);

  // Check persisted user session on mount
  useEffect(() => {
    initDefaultData();
    const stored = getStoredUser();
    if (stored) {
      setCurrentUser(stored);
    }
    setIsAuthChecking(false);
  }, []);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleSelectBarber = (barber) => {
    setSelectedBarber(barber);
  };

  const handleSelectStyle = (styleItem) => {
    setSelectedService({
      id: `custom-${styleItem.id}`,
      title: styleItem.title,
      category: 'haircut',
      price: 48,
      duration: '45 mins',
      popular: true,
      description: `Tailored session inspired by gallery cut: "${styleItem.title}". Includes full consultation with the barber.`,
      includes: ['Reference photo consultation', 'Skin fade or scissor taper', 'Straight razor neckline cleanup', 'Matte clay styling'],
    });
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  // Brief initial splash while checking local authentication storage
  if (isAuthChecking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold-light)',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          letterSpacing: '0.1em',
        }}
      >
        ADETECH BARBING • VERIFYING PATRON CREDENTIALS...
      </div>
    );
  }

  // ACCESS GATE: Without sign-up or login, the user CANNOT access the barber website!
  if (!currentUser) {
    return (
      <AuthGate
        onAuthenticated={(user) => {
          setCurrentUser(user);
          navigateTo(user.role === 'admin' ? 'admin-dashboard' : 'home');
        }}
      />
    );
  }

  // Once authenticated, unlock full access to the barber website and client dashboard
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Persistent Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Routed Page Content */}
      <main style={{ flexGrow: 1 }}>
        {currentPage === 'home' && (
          <Home
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
            onSelectBarber={handleSelectBarber}
            onSelectStyle={handleSelectStyle}
            currentUser={currentUser}
          />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboardPage
            currentUser={currentUser}
            onNavigate={navigateTo}
            onLogout={handleLogout}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            currentUser={currentUser}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={navigateTo}
            onSelectStyle={handleSelectStyle}
          />
        )}

        {currentPage === 'barbers' && (
          <BarbersPage
            onNavigate={navigateTo}
            onSelectBarber={handleSelectBarber}
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            onNavigate={navigateTo}
            initialService={selectedService}
            initialBarber={selectedBarber}
            currentUser={currentUser}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
