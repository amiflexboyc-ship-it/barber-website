// Admin Service for The Noble Blade — Central Control Hub
import { SERVICES_DATA } from '../components/Services.jsx';
import { BARBERS_DATA } from '../components/Barbers.jsx';

const BOOKINGS_KEY = 'noble_blade_bookings';
const BARBERS_KEY = 'noble_blade_barbers';
const SERVICES_KEY = 'noble_blade_services';
const USERS_KEY = 'noble_blade_users';
const SETTINGS_KEY = 'noble_blade_shop_settings';

const DEFAULT_SETTINGS = {
  parlourName: 'The Noble Blade',
  tagline: "Gentlemen's Parlour & Grooming Salon",
  phone: '(555) 892-3472',
  email: 'concierge@nobleblade.com',
  address: '448 Montgomery St, Financial District, SF',
  openHours: 'Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 5:00 PM',
  acceptingWalkins: true,
  announcement: 'Accepting Walk-ins & Priority Online Bookings for the Weekend',
  loyaltyMultiplier: 10,
  enableOnlineBooking: true,
};

// Ensure base dataset exists
export function initAdminData() {
  try {
    if (!localStorage.getItem(BARBERS_KEY)) {
      localStorage.setItem(BARBERS_KEY, JSON.stringify(BARBERS_DATA));
    }
    if (!localStorage.getItem(SERVICES_KEY)) {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(SERVICES_DATA));
    }
    if (!localStorage.getItem(SETTINGS_KEY)) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    }
  } catch (err) {
    console.error('Error initializing admin data:', err);
  }
}

// ----------------------------------------------------
// BOOKINGS MANAGEMENT
// ----------------------------------------------------
export function getAllBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function updateBookingStatus(bookingId, newStatus) {
  try {
    const list = getAllBookings();
    const updated = list.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating booking status:', err);
    return [];
  }
}

export function updateBookingDetails(bookingId, details) {
  try {
    const list = getAllBookings();
    const updated = list.map(b => {
      if (b.id === bookingId) {
        return { ...b, ...details };
      }
      return b;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating booking details:', err);
    return [];
  }
}

export function deleteBooking(bookingId) {
  try {
    const list = getAllBookings();
    const updated = list.filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting booking:', err);
    return [];
  }
}

export function createAdminBooking(bookingData) {
  try {
    const list = getAllBookings();
    const bookingId = 'NB-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: bookingId,
      status: 'Confirmed',
      chairNumber: 'Chair 01 (Executive)',
      createdAt: new Date().toISOString(),
      ...bookingData,
    };
    const updated = [newBooking, ...list];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  } catch (err) {
    console.error('Error creating admin booking:', err);
    return null;
  }
}

// ----------------------------------------------------
// BARBERS MANAGEMENT
// ----------------------------------------------------
export function getBarbersList() {
  initAdminData();
  try {
    return JSON.parse(localStorage.getItem(BARBERS_KEY) || '[]') || BARBERS_DATA;
  } catch {
    return BARBERS_DATA;
  }
}

export function saveBarber(barber) {
  try {
    const list = getBarbersList();
    let updated;
    const exists = list.some(b => b.id === barber.id);
    if (exists) {
      updated = list.map(b => b.id === barber.id ? barber : b);
    } else {
      updated = [...list, barber];
    }
    localStorage.setItem(BARBERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving barber:', err);
    return [];
  }
}

export function deleteBarber(barberId) {
  try {
    const list = getBarbersList();
    const updated = list.filter(b => b.id !== barberId);
    localStorage.setItem(BARBERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting barber:', err);
    return [];
  }
}

// ----------------------------------------------------
// SERVICES MANAGEMENT
// ----------------------------------------------------
export function getServicesList() {
  initAdminData();
  try {
    return JSON.parse(localStorage.getItem(SERVICES_KEY) || '[]') || SERVICES_DATA;
  } catch {
    return SERVICES_DATA;
  }
}

export function saveService(service) {
  try {
    const list = getServicesList();
    let updated;
    const exists = list.some(s => s.id === service.id);
    if (exists) {
      updated = list.map(s => s.id === service.id ? service : s);
    } else {
      updated = [...list, service];
    }
    localStorage.setItem(SERVICES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving service:', err);
    return [];
  }
}

export function deleteService(serviceId) {
  try {
    const list = getServicesList();
    const updated = list.filter(s => s.id !== serviceId);
    localStorage.setItem(SERVICES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting service:', err);
    return [];
  }
}

// ----------------------------------------------------
// CLIENTS & MEMBERS MANAGEMENT
// ----------------------------------------------------
export function getAllClients() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function updateClientPoints(email, points) {
  try {
    const list = getAllClients();
    const updated = list.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        return { ...u, loyaltyPoints: Number(points) };
      }
      return u;
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating client points:', err);
    return [];
  }
}

export function updateClientTier(email, newTier) {
  try {
    const list = getAllClients();
    const updated = list.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        return { ...u, tier: newTier };
      }
      return u;
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating client tier:', err);
    return [];
  }
}

export function deleteClient(email) {
  try {
    const list = getAllClients();
    const updated = list.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting client:', err);
    return [];
  }
}

// ----------------------------------------------------
// SHOP SETTINGS MANAGEMENT
// ----------------------------------------------------
export function getShopSettings() {
  initAdminData();
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveShopSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  } catch (err) {
    console.error('Error saving settings:', err);
    return settings;
  }
}

// ----------------------------------------------------
// SHOP ANALYTICS
// ----------------------------------------------------
export function getShopAnalytics() {
  const bookings = getAllBookings();
  const clients = getAllClients();
  const barbers = getBarbersList();
  const services = getServicesList();

  const totalRevenue = bookings.reduce((sum, b) => {
    if (b.status === 'Cancelled') return sum;
    const price = Number(b.service?.price) || 0;
    return sum + price;
  }, 0);

  const completedCount = bookings.filter(b => b.status === 'Completed').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed' || !b.status).length;
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

  return {
    totalRevenue,
    totalBookings: bookings.length,
    completedCount,
    confirmedCount,
    cancelledCount,
    totalClients: clients.length,
    totalBarbers: barbers.length,
    totalServices: services.length,
  };
}
