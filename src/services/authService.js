// Authentication & Member Session Management for The Noble Blade

const AUTH_USER_KEY = 'noble_blade_auth_user';
const USERS_LIST_KEY = 'noble_blade_users';
const BOOKINGS_KEY = 'noble_blade_bookings';

// Default pre-seeded demo VIP client
export const DEFAULT_DEMO_USER = {
  id: 'usr_demo_8821',
  memberId: 'NB-8821',
  name: 'Alexander Vance',
  email: 'alexander@nobleblade.com',
  password: 'password123',
  phone: '(555) 728-1920',
  role: 'client',
  tier: 'Gentleman Patron (VIP)',
  loyaltyPoints: 420,
  joinedDate: 'September 2024',
  preferredBarber: "Marcus 'The Architect' Sterling",
  beveragePreference: 'Single-Malt Highland Scotch',
  haircutNotes: 'Low skin fade #0.5 into natural scissor crop on top, matte texture finish',
  beardNotes: 'Crisp cheek razor lines, rounded chin, sandalwood conditioning balm',
  skinSensitivity: 'Sensitive neck — warm lather & cold towel finish',
};

// Default pre-seeded Admin account
export const DEFAULT_ADMIN_USER = {
  id: 'usr_admin_001',
  memberId: 'NB-ADMIN-01',
  name: 'Marcus Sterling (Shop Owner & Admin)',
  email: 'admin@nobleblade.com',
  password: 'admin',
  phone: '(555) 900-0001',
  role: 'admin',
  tier: 'Master Proprietor / Admin',
  loyaltyPoints: 9999,
  joinedDate: 'January 2018',
  preferredBarber: "Marcus 'The Architect' Sterling",
  beveragePreference: 'Single-Malt Highland Scotch',
  haircutNotes: 'Master scissor craftsmanship & clean taper',
  beardNotes: 'Straight razor finish',
  skinSensitivity: 'Normal',
};

// Seed default mock bookings for the demo user if none exist
export function initDefaultData() {
  try {
    const existingUsers = JSON.parse(localStorage.getItem(USERS_LIST_KEY) || '[]');
    let changed = false;

    const demoExists = existingUsers.some(u => u.email.toLowerCase() === DEFAULT_DEMO_USER.email.toLowerCase());
    if (!demoExists) {
      existingUsers.push(DEFAULT_DEMO_USER);
      changed = true;
    }

    const adminExists = existingUsers.some(u => u.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase());
    if (!adminExists) {
      existingUsers.push(DEFAULT_ADMIN_USER);
      changed = true;
    } else {
      // Ensure role is admin
      const adminIdx = existingUsers.findIndex(u => u.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase());
      if (adminIdx >= 0 && existingUsers[adminIdx].role !== 'admin') {
        existingUsers[adminIdx].role = 'admin';
        changed = true;
      }
    }

    if (changed) {
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(existingUsers));
    }

    const existingBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
    if (existingBookings.length === 0) {
      // Create initial upcoming and past appointments for demo immersion
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowIso = tomorrow.toISOString().split('T')[0];

      const lastMonth = new Date();
      lastMonth.setDate(lastMonth.getDate() - 18);
      const lastMonthIso = lastMonth.toISOString().split('T')[0];

      const initialBookings = [
        {
          id: 'NB-739104',
          userEmail: DEFAULT_DEMO_USER.email,
          service: {
            id: 'svc-1',
            title: 'The Royal Cut & Hot Towel Shave',
            price: 65,
            duration: '60 mins',
            category: 'signature',
          },
          barber: {
            id: 'marcus-sterling',
            name: "Marcus 'The Architect' Sterling",
            role: 'Master Craftsman & Founder',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
          },
          date: tomorrowIso,
          time: '02:30 PM',
          status: 'Confirmed',
          chairNumber: 'Chair 01 (Executive)',
          client: {
            name: DEFAULT_DEMO_USER.name,
            phone: DEFAULT_DEMO_USER.phone,
            email: DEFAULT_DEMO_USER.email,
            notes: 'Preparing for Saturday banquet. Extra attention to neckline.',
          },
          createdAt: new Date().toISOString(),
        },
        {
          id: 'NB-582910',
          userEmail: DEFAULT_DEMO_USER.email,
          service: {
            id: 'svc-3',
            title: 'Traditional Hot Lather Shave',
            price: 35,
            duration: '35 mins',
            category: 'shave',
          },
          barber: {
            id: 'elena-rostova',
            name: 'Elena Rostova',
            role: 'Straight Razor Specialist',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
          },
          date: lastMonthIso,
          time: '11:45 AM',
          status: 'Completed',
          chairNumber: 'Chair 03',
          client: {
            name: DEFAULT_DEMO_USER.name,
            phone: DEFAULT_DEMO_USER.phone,
            email: DEFAULT_DEMO_USER.email,
            notes: '',
          },
          createdAt: lastMonth.toISOString(),
        }
      ];

      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
    }
  } catch (err) {
    console.error('Error initializing default auth data:', err);
  }
}

// Get currently authenticated user from localStorage
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Save authenticated user
export function setStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      // Also sync user in the users directory
      const users = getAllUsers();
      const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (idx >= 0) {
        users[idx] = user;
      } else {
        users.push(user);
      }
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (err) {
    console.error('Error saving user:', err);
  }
}

// Get all registered users
export function getAllUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_LIST_KEY) || '[]');
  } catch {
    return [];
  }
}

// Sign up new user
export function registerUser({ name, email, phone, password, preferredBarber = "Marcus 'The Architect' Sterling", haircutNotes = '' }) {
  initDefaultData();
  const users = getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return { success: false, error: 'An account with this email address already exists. Please log in instead.' };
  }

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newUser = {
    id: `usr_${Date.now()}`,
    memberId: `NB-${randomNum}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    phone: phone.trim(),
    role: 'client',
    tier: 'Gentleman Patron (VIP)',
    loyaltyPoints: 100, // 100 Welcome Points!
    joinedDate: dateStr,
    preferredBarber: preferredBarber || "Marcus 'The Architect' Sterling",
    beveragePreference: 'Single-Malt Highland Scotch',
    haircutNotes: haircutNotes.trim() || 'Classic taper with scissor textured top',
    beardNotes: 'Clean razor line with natural taper',
    skinSensitivity: 'Normal - Hot towel & aftershave splash',
  };

  users.push(newUser);
  localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
  setStoredUser(newUser);

  return { success: true, user: newUser };
}

// Log in existing user
export function loginUser({ email, password }) {
  initDefaultData();
  const users = getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return { success: false, error: 'No member account found with this email. Please check your spelling or sign up.' };
  }

  if (user.password !== password) {
    return { success: false, error: 'Incorrect password. Please try again or use the demo login.' };
  }

  setStoredUser(user);
  return { success: true, user };
}

// Demo VIP 1-click login
export function loginAsDemo() {
  initDefaultData();
  const users = getAllUsers();
  const demo = users.find(u => u.email.toLowerCase() === DEFAULT_DEMO_USER.email.toLowerCase()) || DEFAULT_DEMO_USER;
  setStoredUser(demo);
  return demo;
}

// 1-Click Admin Login
export function loginAsAdmin() {
  initDefaultData();
  const users = getAllUsers();
  const admin = users.find(u => u.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase()) || DEFAULT_ADMIN_USER;
  setStoredUser(admin);
  return admin;
}

// Log out user
export function logoutUser() {
  setStoredUser(null);
}

// Get bookings for current user
export function getUserBookings(userEmail) {
  try {
    const all = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
    if (!userEmail) return all;
    return all.filter(b => {
      // match either by userEmail field or client.email
      if (b.userEmail && b.userEmail.toLowerCase() === userEmail.toLowerCase()) return true;
      if (b.client && b.client.email && b.client.email.toLowerCase() === userEmail.toLowerCase()) return true;
      return false;
    });
  } catch {
    return [];
  }
}

// Cancel booking
export function cancelUserBooking(bookingId) {
  try {
    const all = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
    const updated = all.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'Cancelled' };
      }
      return b;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error cancelling booking:', err);
    return [];
  }
}

// Reschedule booking date/time
export function rescheduleUserBooking(bookingId, newDate, newTime) {
  try {
    const all = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
    const updated = all.map(b => {
      if (b.id === bookingId) {
        return { ...b, date: newDate, time: newTime, status: 'Confirmed' };
      }
      return b;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error rescheduling booking:', err);
    return [];
  }
}
