import React, { useState, useEffect } from 'react';
import {
  Scissors,
  Calendar,
  Clock,
  User,
  Users,
  Award,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  Settings,
  Search,
  Filter,
  Eye,
  LogOut,
  Phone,
  Mail,
  Sparkles,
  ShieldCheck,
  Crown,
  ChevronRight,
  RefreshCw,
  Sliders,
  Bell,
  Star
} from 'lucide-react';
import {
  getAllBookings,
  updateBookingStatus,
  updateBookingDetails,
  deleteBooking,
  createAdminBooking,
  getBarbersList,
  saveBarber,
  deleteBarber,
  getServicesList,
  saveService,
  deleteService,
  getAllClients,
  updateClientPoints,
  updateClientTier,
  deleteClient,
  getShopSettings,
  saveShopSettings,
  getShopAnalytics
} from '../services/adminService.js';

export default function AdminDashboardPage({ currentUser, onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'barbers' | 'services' | 'clients' | 'settings'

  // Data states
  const [analytics, setAnalytics] = useState(getShopAnalytics());
  const [bookings, setBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [shopSettings, setShopSettings] = useState(getShopSettings());

  // Filter & Search states
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilterStatus, setBookingFilterStatus] = useState('all');
  const [clientSearch, setClientSearch] = useState('');

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Modals state
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [isAddBarberOpen, setIsAddBarberOpen] = useState(false);
  const [editingBarber, setEditingBarber] = useState(null);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [pointsModalClient, setPointsModalClient] = useState(null);
  const [pointsInput, setPointsInput] = useState('');

  // New Booking Form State
  const [newBookingForm, setNewBookingForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    barberId: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:45 AM',
    notes: 'Walk-in / Phone reservation created by Admin',
  });

  // Barber Form State
  const [barberForm, setBarberForm] = useState({
    id: '',
    name: '',
    role: 'Master Craftsman',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    experience: '8+ Years Experience',
    rating: '5.0',
    reviewsCount: 150,
    specialties: 'Japanese Shear Sculpting, Skin Fades',
    schedule: 'Mon - Fri • 9:00 AM - 6:00 PM',
    bio: '',
  });

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    id: '',
    title: '',
    category: 'haircut',
    price: 45,
    duration: '45 mins',
    popular: false,
    description: '',
    includes: 'Bespoke consultation, Hot towel neck shave, Matte styling',
  });

  // Reload all datasets
  const reloadData = () => {
    setBookings(getAllBookings());
    setBarbers(getBarbersList());
    setServices(getServicesList());
    setClients(getAllClients());
    setShopSettings(getShopSettings());
    setAnalytics(getShopAnalytics());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3200);
  };

  // ---------------- BOOKINGS ACTIONS ----------------
  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    reloadData();
    showToast(`Booking ${bookingId} status changed to ${newStatus}.`);
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm(`Delete reservation reference ${bookingId}?`)) {
      deleteBooking(bookingId);
      reloadData();
      showToast(`Booking ${bookingId} permanently deleted.`, 'info');
    }
  };

  const handleCreateBookingSubmit = (e) => {
    e.preventDefault();
    if (!newBookingForm.clientName || !newBookingForm.serviceId || !newBookingForm.barberId) {
      showToast('Please fill all required booking details.', 'error');
      return;
    }

    const matchedService = services.find(s => s.id === newBookingForm.serviceId) || services[0];
    const matchedBarber = barbers.find(b => b.id === newBookingForm.barberId) || barbers[0];

    createAdminBooking({
      service: matchedService,
      barber: matchedBarber,
      date: newBookingForm.date,
      time: newBookingForm.time,
      userEmail: newBookingForm.clientEmail,
      client: {
        name: newBookingForm.clientName,
        phone: newBookingForm.clientPhone,
        email: newBookingForm.clientEmail,
        notes: newBookingForm.notes,
      },
    });

    setIsAddBookingOpen(false);
    reloadData();
    showToast('Reservation booked and assigned successfully!');
  };

  // ---------------- BARBERS ACTIONS ----------------
  const handleSaveBarberSubmit = (e) => {
    e.preventDefault();
    if (!barberForm.name) {
      showToast('Barber name is required.', 'error');
      return;
    }

    const barberId = editingBarber ? editingBarber.id : `barber-${Date.now()}`;
    const specsArray = typeof barberForm.specialties === 'string'
      ? barberForm.specialties.split(',').map(s => s.trim()).filter(Boolean)
      : barberForm.specialties;

    saveBarber({
      ...barberForm,
      id: barberId,
      specialties: specsArray,
    });

    setIsAddBarberOpen(false);
    setEditingBarber(null);
    reloadData();
    showToast(`Barber "${barberForm.name}" profile saved.`);
  };

  const handleDeleteBarber = (barberId, barberName) => {
    if (window.confirm(`Remove barber "${barberName}" from team directory?`)) {
      deleteBarber(barberId);
      reloadData();
      showToast(`Barber "${barberName}" removed.`, 'info');
    }
  };

  // ---------------- SERVICES ACTIONS ----------------
  const handleSaveServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.price) {
      showToast('Service title and price are required.', 'error');
      return;
    }

    const serviceId = editingService ? editingService.id : `svc-${Date.now()}`;
    const includesArray = typeof serviceForm.includes === 'string'
      ? serviceForm.includes.split(',').map(s => s.trim()).filter(Boolean)
      : serviceForm.includes;

    saveService({
      ...serviceForm,
      id: serviceId,
      price: Number(serviceForm.price),
      includes: includesArray,
    });

    setIsAddServiceOpen(false);
    setEditingService(null);
    reloadData();
    showToast(`Service "${serviceForm.title}" saved.`);
  };

  const handleDeleteService = (serviceId, serviceTitle) => {
    if (window.confirm(`Remove service "${serviceTitle}" from menu?`)) {
      deleteService(serviceId);
      reloadData();
      showToast(`Service "${serviceTitle}" removed.`, 'info');
    }
  };

  // ---------------- CLIENTS ACTIONS ----------------
  const handleUpdatePointsSubmit = (e) => {
    e.preventDefault();
    if (!pointsModalClient) return;
    updateClientPoints(pointsModalClient.email, pointsInput);
    setPointsModalClient(null);
    setPointsInput('');
    reloadData();
    showToast(`Updated loyalty points for ${pointsModalClient.name}.`);
  };

  const handleChangeTier = (email, newTier) => {
    updateClientTier(email, newTier);
    reloadData();
    showToast(`Updated tier to "${newTier}".`);
  };

  const handleDeleteClient = (email, name) => {
    if (window.confirm(`Delete client record for ${name} (${email})?`)) {
      deleteClient(email);
      reloadData();
      showToast(`Client ${name} deleted.`, 'info');
    }
  };

  // ---------------- SETTINGS ACTIONS ----------------
  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveShopSettings(shopSettings);
    showToast('Shop operational settings updated successfully!');
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      (b.client?.name || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.client?.email || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.id || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.barber?.name || '').toLowerCase().includes(bookingSearch.toLowerCase());

    if (bookingFilterStatus === 'all') return matchesSearch;
    return matchesSearch && (b.status || 'Confirmed').toLowerCase() === bookingFilterStatus.toLowerCase();
  });

  // Filtered Clients
  const filteredClients = clients.filter(c =>
    (c.name || '').toLowerCase().includes(clientSearch.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(clientSearch.toLowerCase()) ||
    (c.phone || '').toLowerCase().includes(clientSearch.toLowerCase()) ||
    (c.memberId || '').toLowerCase().includes(clientSearch.toLowerCase())
  );

  return (
    <div className="page-wrapper" style={{ minHeight: '90vh', padding: '2rem 0 6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Toast Alert */}
        {toast.show && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              right: '25px',
              zIndex: 9999,
              backgroundColor: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : toast.type === 'info' ? 'rgba(37, 99, 235, 0.95)' : 'rgba(197, 160, 89, 0.95)',
              color: toast.type === 'error' || toast.type === 'info' ? '#ffffff' : '#070d1e',
              padding: '0.85rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 30px rgba(2,6,18,0.7)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Master Admin Header */}
        <div
          className="glass-card admin-header-card"
          style={{
            padding: '1.75rem 2.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--gold-light)',
            boxShadow: '0 15px 40px rgba(2,6,18,0.7), 0 0 25px rgba(37, 99, 235, 0.2)',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            background: 'linear-gradient(135deg, rgba(20, 36, 75, 0.9) 0%, rgba(9, 16, 36, 0.95) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c5a059 0%, #876829 100%)',
                color: '#070d1e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(197, 160, 89, 0.4)',
              }}
            >
              <Crown size={28} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff', fontWeight: 800 }}>
                  THE NOBLE BLADE • ADMIN CONSOLE
                </h1>
                <span
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.2)',
                    border: '1px solid var(--gold-light)',
                    color: 'var(--gold-light)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    letterSpacing: '0.08em',
                  }}
                >
                  FULL CONTROL
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Master Control Hub • Manage all reservations, craftsman schedules, service pricing, registered clients & live parlour alerts.
              </p>
            </div>
          </div>

          {/* Quick Admin Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('home')}
              className="btn btn-outline-gold"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
            >
              <Eye size={15} />
              <span>View Public Parlour</span>
            </button>

            <button
              onClick={onLogout}
              style={{
                padding: '0.65rem 1.15rem',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Stats Bar */}
        <div
          className="admin-kpi-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(197, 160, 89, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gross Revenue</span>
              <DollarSign size={18} color="var(--gold-light)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>
              ₦{analytics.totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
              <TrendingUp size={12} /> From all confirmed chairs
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>All Reservations</span>
              <Calendar size={18} color="var(--gold-light)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
              {analytics.totalBookings}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {analytics.confirmedCount} upcoming • {analytics.completedCount} completed
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Craftsmen</span>
              <Scissors size={18} color="var(--gold-light)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
              {barbers.length} Barbers
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              All chairs staffed & available
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Registered Patrons</span>
              <Users size={18} color="var(--gold-light)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
              {clients.length} Clients
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Verified member profiles
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Menu</span>
              <Sparkles size={18} color="var(--gold-light)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
              {services.length} Treatments
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Haircuts, shaves & packages
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
            { id: 'bookings', label: 'Chair Bookings', icon: Calendar, badge: bookings.length },
            { id: 'barbers', label: 'Master Barbers', icon: Scissors, badge: barbers.length },
            { id: 'services', label: 'Services & Pricing', icon: Award, badge: services.length },
            { id: 'clients', label: 'Clients & Patrons', icon: Users, badge: clients.length },
            { id: 'settings', label: 'Parlour Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 1.3rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--gold-light)' : '2px solid transparent',
                  color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    style={{
                      backgroundColor: isActive ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.1)',
                      color: isActive ? '#070d1e' : 'var(--text-secondary)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW & RECENT ACTIVITY                    */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              {/* Recent Bookings Queue */}
              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#fff' }}>
                    Recent Chair Reservations
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    Manage All <ChevronRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {bookings.slice(0, 5).map((b) => (
                    <div
                      key={b.id}
                      style={{
                        padding: '1rem',
                        backgroundColor: 'rgba(10, 12, 17, 0.7)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{b.client?.name || 'Walk-in Guest'}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {b.id}</span>
                        </div>
                        <div style={{ color: 'var(--gold-light)', fontSize: '0.82rem' }}>
                          {b.service?.title} with {b.barber?.name}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                          {b.date} @ {b.time}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: b.status === 'Completed' ? 'rgba(59, 130, 246, 0.15)' : b.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: b.status === 'Completed' ? '#60a5fa' : b.status === 'Cancelled' ? '#f87171' : '#10b981',
                          }}
                        >
                          {b.status || 'Confirmed'}
                        </span>
                        <span style={{ fontWeight: 800, color: 'var(--gold-light)', fontSize: '0.95rem' }}>
                          ₦{(b.service?.price || 7000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shop Status & Quick Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>
                    Live Parlour Controls
                  </h3>

                  {/* Walk-in Acceptance Switch */}
                  <div
                    style={{
                      padding: '1rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.7)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Accepting Walk-ins</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                        Controls walk-in status displayed in top header banner
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const updated = { ...shopSettings, acceptingWalkins: !shopSettings.acceptingWalkins };
                        setShopSettings(updated);
                        saveShopSettings(updated);
                        showToast(`Walk-ins are now ${updated.acceptingWalkins ? 'ACCEPTED' : 'DISABLED'}.`);
                      }}
                      style={{
                        padding: '0.45rem 0.9rem',
                        backgroundColor: shopSettings.acceptingWalkins ? '#10b981' : '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      {shopSettings.acceptingWalkins ? 'ACTIVE (ON)' : 'CLOSED (OFF)'}
                    </button>
                  </div>

                  {/* Current Active Announcement */}
                  <div style={{ padding: '1rem', backgroundColor: 'rgba(10, 12, 17, 0.7)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      <Bell size={14} /> Shop Broadcast Notice
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      "{shopSettings.announcement}"
                    </div>
                    <button
                      onClick={() => setActiveTab('settings')}
                      style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontSize: '0.78rem', cursor: 'pointer', marginTop: '0.5rem', textDecoration: 'underline' }}
                    >
                      Edit Announcement
                    </button>
                  </div>
                </div>

                {/* Quick Add Barbers / Services triggers */}
                <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
                  <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>
                    Quick Management Actions
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <button
                      onClick={() => {
                        setEditingBarber(null);
                        setBarberForm({
                          id: '',
                          name: '',
                          role: 'Master Craftsman',
                          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
                          experience: '6+ Years Experience',
                          rating: '5.0',
                          reviewsCount: 100,
                          specialties: 'Skin Fades, Hot Lather Shaves',
                          schedule: 'Tue - Sat • 9:00 AM - 7:00 PM',
                          bio: '',
                        });
                        setIsAddBarberOpen(true);
                      }}
                      className="btn btn-outline-gold"
                      style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    >
                      <Plus size={15} /> Add New Master Barber
                    </button>

                    <button
                      onClick={() => {
                        setEditingService(null);
                        setServiceForm({
                          id: '',
                          title: '',
                          category: 'haircut',
                          price: 45,
                          duration: '45 mins',
                          popular: false,
                          description: '',
                          includes: 'Bespoke consultation, Hot towel, Styling',
                        });
                        setIsAddServiceOpen(true);
                      }}
                      className="btn btn-outline-gold"
                      style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    >
                      <Plus size={15} /> Add Treatment to Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: ALL CHAIR BOOKINGS MANAGER                    */}
        {/* ==================================================== */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
                  Chair Reservations & Scheduling ({filteredBookings.length})
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Filter by status, confirm walk-ins, update chair appointments, or cancel slots.
                </p>
              </div>

              <button
                onClick={() => setIsAddBookingOpen(true)}
                className="btn btn-gold"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Create Walk-in / Phone Reservation
              </button>
            </div>

            {/* Filter Bar */}
            <div
              className="glass-card"
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ position: 'relative', flex: '1 1 250px' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search client, email, ref #, or barber..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    backgroundColor: 'rgba(10, 12, 17, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status:</span>
                {['all', 'confirmed', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilterStatus(status)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: bookingFilterStatus === status ? '1px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: bookingFilterStatus === status ? 'rgba(197, 160, 89, 0.2)' : 'transparent',
                      color: bookingFilterStatus === status ? 'var(--gold-light)' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table / List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredBookings.length === 0 ? (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                  <Calendar size={40} color="var(--gold-light)" style={{ margin: '0 auto 0.75rem auto', opacity: 0.6 }} />
                  <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>No Matching Reservations Found</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Try clearing filters or search terms.</p>
                </div>
              ) : (
                filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="glass-card"
                    style={{
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'grid',
                      gridTemplateColumns: 'auto 1.4fr 1.2fr 1fr auto',
                      gap: '1.25rem',
                      alignItems: 'center',
                    }}
                  >
                    {/* Status badge & ID */}
                    <div style={{ minWidth: '110px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: b.status === 'Completed' ? 'rgba(59, 130, 246, 0.15)' : b.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          color: b.status === 'Completed' ? '#60a5fa' : b.status === 'Cancelled' ? '#f87171' : '#10b981',
                          marginBottom: '0.4rem',
                        }}
                      >
                        {b.status || 'Confirmed'}
                      </span>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                        {b.id}
                      </div>
                    </div>

                    {/* Client info */}
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                        {b.client?.name || 'Patron'}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                        {b.client?.email || 'No email provided'}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {b.client?.phone}
                      </div>
                    </div>

                    {/* Service & Barber */}
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                        {b.service?.title}
                      </div>
                      <div style={{ color: 'var(--gold-light)', fontSize: '0.82rem' }}>
                        Craftsman: {b.barber?.name}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {b.chairNumber || 'Chair 01'}
                      </div>
                    </div>

                    {/* Date, Time & Price */}
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600 }}>
                        {b.date}
                      </div>
                      <div style={{ color: 'var(--gold-light)', fontSize: '0.82rem' }}>
                        {b.time}
                      </div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem' }}>
                        ₦{(b.service?.price || 7000).toLocaleString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '140px' }}>
                      {b.status !== 'Completed' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'Completed')}
                          style={{
                            padding: '0.35rem 0.75rem',
                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                            color: '#60a5fa',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Mark Completed
                        </button>
                      )}

                      {b.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'Confirmed')}
                          style={{
                            padding: '0.35rem 0.75rem',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Re-Confirm
                        </button>
                      )}

                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'Cancelled')}
                          style={{
                            padding: '0.35rem 0.75rem',
                            backgroundColor: 'transparent',
                            color: '#f87171',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel Chair
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          background: 'none',
                          color: 'var(--text-muted)',
                          border: 'none',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <Trash2 size={12} /> Delete Record
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: MASTER BARBERS MANAGEMENT                     */}
        {/* ==================================================== */}
        {activeTab === 'barbers' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
                  Master Barbers & Craftsmen Roster ({barbers.length})
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Manage parlour artisans, adjust specialties, availability schedules, and bio credentials.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBarber(null);
                  setBarberForm({
                    id: '',
                    name: '',
                    role: 'Master Craftsman',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
                    experience: '6+ Years Experience',
                    rating: '5.0',
                    reviewsCount: 120,
                    specialties: 'Japanese Shear Sculpting, Straight Razor Shaves',
                    schedule: 'Mon - Fri • 9:00 AM - 6:00 PM',
                    bio: '',
                  });
                  setIsAddBarberOpen(true);
                }}
                className="btn btn-gold"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add Master Barber
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {barbers.map((b) => (
                <div
                  key={b.id}
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          backgroundImage: `url(${b.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: '2px solid var(--gold-light)',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>{b.name}</h3>
                        <div style={{ color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 600 }}>{b.role}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                          <span>{b.experience} •</span>
                          <Star size={12} fill="var(--gold-light)" color="var(--gold-light)" />
                          <span>{b.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <strong>Schedule:</strong> {b.schedule}
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Specialties:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
                        {(Array.isArray(b.specialties) ? b.specialties : []).map((s, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: 'rgba(197, 160, 89, 0.12)',
                              color: 'var(--gold-light)',
                              fontSize: '0.75rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 'var(--radius-full)',
                              border: '1px solid rgba(197, 160, 89, 0.25)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                    <button
                      onClick={() => {
                        setEditingBarber(b);
                        setBarberForm({
                          ...b,
                          specialties: Array.isArray(b.specialties) ? b.specialties.join(', ') : b.specialties,
                        });
                        setIsAddBarberOpen(true);
                      }}
                      className="btn btn-outline-gold"
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
                    >
                      <Edit size={14} /> Edit Profile
                    </button>

                    <button
                      onClick={() => handleDeleteBarber(b.id, b.name)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        background: 'none',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: SERVICES & PRICING MANAGEMENT                 */}
        {/* ==================================================== */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
                  Grooming Treatments & Service Menu ({services.length})
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Adjust service pricing (₦), duration, package descriptions, and add new bespoke offerings.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService(null);
                  setServiceForm({
                    id: '',
                    title: '',
                    category: 'haircut',
                    price: 48,
                    duration: '45 mins',
                    popular: false,
                    description: '',
                    includes: 'Bespoke consultation, Hot towel, Styling',
                  });
                  setIsAddServiceOpen(true);
                }}
                className="btn btn-gold"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add New Treatment
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {services.map((s) => (
                <div
                  key={s.id}
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-secondary)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.category}
                      </span>
                      {s.popular && (
                        <span
                          style={{
                            backgroundColor: 'rgba(197, 160, 89, 0.2)',
                            color: 'var(--gold-light)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.55rem',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          POPULAR
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem' }}>
                      {s.title}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                        ₦{s.price.toLocaleString()}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        • {s.duration}
                      </span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {s.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                    <button
                      onClick={() => {
                        setEditingService(s);
                        setServiceForm({
                          ...s,
                          includes: Array.isArray(s.includes) ? s.includes.join(', ') : s.includes,
                        });
                        setIsAddServiceOpen(true);
                      }}
                      className="btn btn-outline-gold"
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
                    >
                      <Edit size={14} /> Edit Service
                    </button>

                    <button
                      onClick={() => handleDeleteService(s.id, s.title)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        background: 'none',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: REGISTERED CLIENTS & PATRONS                  */}
        {/* ==================================================== */}
        {activeTab === 'clients' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
                  Registered Patrons & VIP Members ({filteredClients.length})
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Manage client accounts, loyalty points balances, and VIP club patronage tiers.
                </p>
              </div>

              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search patron by name, email..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                    backgroundColor: 'rgba(10, 12, 17, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredClients.map((client) => (
                <div
                  key={client.id || client.email}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1.5fr 1fr 1fr auto',
                    gap: '1.25rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: client.role === 'admin' ? '#c5a059' : '#15254a',
                      color: client.role === 'admin' ? '#070d1e' : 'var(--gold-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    {client.name ? client.name[0] : 'P'}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{client.name}</strong>
                      {client.role === 'admin' && (
                        <span style={{ backgroundColor: 'rgba(197,160,89,0.2)', color: 'var(--gold-light)', fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: 4, fontWeight: 700 }}>
                          ADMIN
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      {client.email} • {client.phone || 'No phone'}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      Member ID: {client.memberId || 'NB-Patron'} • Joined {client.joinedDate || 'Recently'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Patron Tier</div>
                    <select
                      value={client.tier || 'Gentleman Patron (VIP)'}
                      onChange={(e) => handleChangeTier(client.email, e.target.value)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        backgroundColor: 'rgba(10, 12, 17, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--gold-light)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        outline: 'none',
                        marginTop: '0.2rem',
                      }}
                    >
                      <option value="Regular Patron">Regular Patron</option>
                      <option value="Gentleman Patron (VIP)">Gentleman Patron (VIP)</option>
                      <option value="Diamond Blade Elite">Diamond Blade Elite</option>
                      <option value="Master Proprietor / Admin">Master Proprietor / Admin</option>
                    </select>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Loyalty Balance</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <strong style={{ color: 'var(--gold-light)', fontSize: '1rem' }}>
                        {client.loyaltyPoints || 0} pts
                      </strong>
                      <button
                        onClick={() => {
                          setPointsModalClient(client);
                          setPointsInput(String(client.loyaltyPoints || 0));
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          fontSize: '0.75rem',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        Adjust
                      </button>
                    </div>
                  </div>

                  <div>
                    {client.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteClient(client.email, client.name)}
                        style={{
                          background: 'none',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          color: '#f87171',
                          padding: '0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                        }}
                        title="Delete client account"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: PARLOUR SETTINGS & BROADCAST                  */}
        {/* ==================================================== */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '780px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
                Parlour Global Configuration
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Update parlour broadcast banners, contact telephone, physical salon location, and operating hours.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Parlour Business Name
                  </label>
                  <input
                    type="text"
                    value={shopSettings.parlourName}
                    onChange={(e) => setShopSettings({ ...shopSettings, parlourName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Telephone Hotline
                  </label>
                  <input
                    type="text"
                    value={shopSettings.phone}
                    onChange={(e) => setShopSettings({ ...shopSettings, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Concierge Email
                  </label>
                  <input
                    type="email"
                    value={shopSettings.email}
                    onChange={(e) => setShopSettings({ ...shopSettings, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Physical Address
                  </label>
                  <input
                    type="text"
                    value={shopSettings.address}
                    onChange={(e) => setShopSettings({ ...shopSettings, address: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'rgba(10, 12, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Live Broadcast Notice (Announced in Parlour)
                </label>
                <input
                  type="text"
                  value={shopSettings.announcement}
                  onChange={(e) => setShopSettings({ ...shopSettings, announcement: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    backgroundColor: 'rgba(10, 12, 17, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Standard Operating Hours
                </label>
                <input
                  type="text"
                  value={shopSettings.openHours}
                  onChange={(e) => setShopSettings({ ...shopSettings, openHours: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    backgroundColor: 'rgba(10, 12, 17, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <button type="submit" className="btn btn-gold" style={{ padding: '0.85rem 1.75rem' }}>
                <CheckCircle2 size={16} /> Save Global Shop Settings
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: CREATE WALK-IN / ADMIN BOOKING                */}
      {/* ==================================================== */}
      {isAddBookingOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border-gold)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '1.25rem' }}>
              Create Chair Reservation (Admin)
            </h3>

            <form onSubmit={handleCreateBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Client Name *</label>
                <input
                  type="text"
                  required
                  value={newBookingForm.clientName}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, clientName: e.target.value })}
                  placeholder="e.g. Lord Charles Sterling"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Email</label>
                  <input
                    type="email"
                    value={newBookingForm.clientEmail}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, clientEmail: e.target.value })}
                    placeholder="client@mail.com"
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Phone</label>
                  <input
                    type="tel"
                    value={newBookingForm.clientPhone}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, clientPhone: e.target.value })}
                    placeholder="(555) 000-0000"
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Treatment *</label>
                  <select
                    required
                    value={newBookingForm.serviceId}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, serviceId: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="">Select Treatment</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.title} (₦{s.price.toLocaleString()})</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Master Barber *</label>
                  <select
                    required
                    value={newBookingForm.barberId}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, barberId: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="">Select Barber</option>
                    {barbers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Date</label>
                  <input
                    type="date"
                    value={newBookingForm.date}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, date: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Time</label>
                  <input
                    type="text"
                    value={newBookingForm.time}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, time: e.target.value })}
                    placeholder="e.g. 02:30 PM"
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddBookingOpen(false)} style={{ padding: '0.65rem 1.25rem', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ padding: '0.65rem 1.25rem' }}>
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT BARBER                             */}
      {/* ==================================================== */}
      {isAddBarberOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border-gold)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '1.25rem' }}>
              {editingBarber ? 'Edit Master Barber Profile' : 'Add New Master Barber'}
            </h3>

            <form onSubmit={handleSaveBarberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={barberForm.name}
                  onChange={(e) => setBarberForm({ ...barberForm, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Role Title</label>
                <input
                  type="text"
                  value={barberForm.role}
                  onChange={(e) => setBarberForm({ ...barberForm, role: e.target.value })}
                  placeholder="e.g. Master Craftsman & Color Specialist"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Avatar Image URL</label>
                <input
                  type="url"
                  value={barberForm.image}
                  onChange={(e) => setBarberForm({ ...barberForm, image: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Experience</label>
                  <input
                    type="text"
                    value={barberForm.experience}
                    onChange={(e) => setBarberForm({ ...barberForm, experience: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Schedule</label>
                  <input
                    type="text"
                    value={barberForm.schedule}
                    onChange={(e) => setBarberForm({ ...barberForm, schedule: e.target.value })}
                    placeholder="Tue - Sat • 9AM - 6PM"
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Specialties (comma separated)</label>
                <input
                  type="text"
                  value={barberForm.specialties}
                  onChange={(e) => setBarberForm({ ...barberForm, specialties: e.target.value })}
                  placeholder="Skin Fades, Hot Towel Shave, Scissor Work"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddBarberOpen(false)} style={{ padding: '0.65rem 1.25rem', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ padding: '0.65rem 1.25rem' }}>
                  Save Barber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT SERVICE                            */}
      {/* ==================================================== */}
      {isAddServiceOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border-gold)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '1.25rem' }}>
              {editingService ? 'Edit Treatment Details' : 'Add Treatment to Menu'}
            </h3>

            <form onSubmit={handleSaveServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Treatment Title *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="haircut">Haircut</option>
                    <option value="shave">Shave</option>
                    <option value="packages">Packages</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Price (₦) *</label>
                  <input
                    type="number"
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Duration</label>
                  <input
                    type="text"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                    placeholder="e.g. 45 mins"
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <input
                    type="checkbox"
                    id="popularCheck"
                    checked={serviceForm.popular}
                    onChange={(e) => setServiceForm({ ...serviceForm, popular: e.target.checked })}
                    style={{ accentColor: 'var(--gold-primary)' }}
                  />
                  <label htmlFor="popularCheck" style={{ fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                    Mark as Popular
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Description</label>
                <textarea
                  rows={2}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Includes (comma separated)</label>
                <input
                  type="text"
                  value={serviceForm.includes}
                  onChange={(e) => setServiceForm({ ...serviceForm, includes: e.target.value })}
                  placeholder="Consultation, Hot towel razor neck shave, Matte styling"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddServiceOpen(false)} style={{ padding: '0.65rem 1.25rem', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ padding: '0.65rem 1.25rem' }}>
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADJUST LOYALTY POINTS                         */}
      {/* ==================================================== */}
      {pointsModalClient && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border-gold)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
              Adjust Loyalty Points
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Patron: <strong style={{ color: '#fff' }}>{pointsModalClient.name}</strong> ({pointsModalClient.email})
            </p>

            <form onSubmit={handleUpdatePointsSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Total Blade Points Balance
                </label>
                <input
                  type="number"
                  required
                  value={pointsInput}
                  onChange={(e) => setPointsInput(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', backgroundColor: 'rgba(10,12,17,0.8)', border: '1px solid var(--gold-light)', borderRadius: 'var(--radius-sm)', color: 'var(--gold-light)', fontSize: '1.2rem', fontWeight: 800, textAlign: 'center' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setPointsModalClient(null)} style={{ padding: '0.65rem 1.2rem', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ padding: '0.65rem 1.2rem' }}>
                  Save Points
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Mobile Responsive Admin Styles */}
      <style>{`
        @media (max-width: 768px) {
          .admin-header-card {
            padding: 1.25rem 1rem !important;
          }
          .admin-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }
        }
        @media (max-width: 480px) {
          .admin-kpi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
