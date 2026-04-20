import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Users, MessageSquare, IndianRupee, LogOut,
  CheckCircle, Clock, Trash2, RefreshCw, Bell, PhoneCall, X,
  Mail, MessageCircle, Send, Loader2, AlertCircle,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { EMAILJS_CONFIG, IS_EMAILJS_CONFIGURED } from '../emailjsConfig';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Booking {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  room: string;
  dates: string;
  checkin?: string;
  checkout?: string;
  price: string;
  status: 'Confirmed' | 'Pending';
  createdAt?: string;
}

interface Query {
  id: string;
  name: string;
  phone?: string;
  room?: string;
  issue: string;
  time: string;
  status: 'Open' | 'Resolved';
}

type Tab = 'bookings' | 'queries' | 'guests' | 'revenue';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadBookings(): Booking[] {
  try { return JSON.parse(localStorage.getItem('rahul_bookings') || '[]'); }
  catch { return []; }
}
function saveBookings(data: Booking[]) {
  localStorage.setItem('rahul_bookings', JSON.stringify(data));
}
function loadQueries(): Query[] {
  try { return JSON.parse(localStorage.getItem('rahul_queries') || '[]'); }
  catch { return []; }
}
function saveQueries(data: Query[]) {
  localStorage.setItem('rahul_queries', JSON.stringify(data));
}

/** Strip non-digits and make a clean WhatsApp-compatible number */
function cleanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  // If it starts with 0, replace with 91; if less than 12 digits assume India
  if (digits.startsWith('0')) return '91' + digits.slice(1);
  if (digits.length === 10) return '91' + digits;
  return digits;
}

function buildWhatsAppUrl(booking: Booking): string {
  if (!booking.phone) return '';
  const num = cleanPhone(booking.phone);

  // String.fromCodePoint() generates emoji at runtime — works regardless of TS target
  const hotel   = String.fromCodePoint(0x1F3E8); // 🏨
  const check   = String.fromCodePoint(0x2705);  // ✅
  const notepad = String.fromCodePoint(0x1F4CB); // 📋
  const pin     = String.fromCodePoint(0x1F4CD); // 📍
  const tel     = String.fromCodePoint(0x1F4DE); // 📞
  const pray    = String.fromCodePoint(0x1F64F); // 🙏
  const bullet  = String.fromCodePoint(0x2022);  // •

  const msg = encodeURIComponent(
    `${hotel} *Rahul Apartment - Booking Confirmation*\n\n` +
    `Dear ${booking.name},\n\n` +
    `${check} Your room booking has been *Confirmed*!\n\n` +
    `${notepad} *Booking Details:*\n` +
    `${bullet} Booking ID: ${booking.id}\n` +
    `${bullet} Room: ${booking.room}\n` +
    `${bullet} Dates: ${booking.dates}\n` +
    `${bullet} Price: ${booking.price}\n\n` +
    `Please arrive with a valid ID proof.\n\n` +
    `${pin} Rahul Apartment, Ankola, Uttara Kannada, Karnataka 581314\n` +
    `${tel} +91 9242953738\n\n` +
    `We look forward to welcoming you! ${pray}`
  );
  return `https://wa.me/${num}?text=${msg}`;
}

function buildEmailUrl(booking: Booking): string {
  if (!booking.email) return '';
  const subject = encodeURIComponent(`Room Booking Confirmed – Rahul Apartment (${booking.id})`);
  const body = encodeURIComponent(
    `Dear ${booking.name},\n\n` +
    `We are pleased to confirm your room booking at Rahul Apartment.\n\n` +
    `Booking Details:\n` +
    `  • Booking ID : ${booking.id}\n` +
    `  • Room Type  : ${booking.room}\n` +
    `  • Check-in   : ${booking.checkin || booking.dates}\n` +
    `  • Check-out  : ${booking.checkout || ''}\n` +
    `  • Price      : ${booking.price}\n\n` +
    `Please carry a valid government-issued ID proof at check-in.\n\n` +
    `Address:\n` +
    `Rahul Apartment, Ankola, Uttara Kannada, Karnataka – 581314\n\n` +
    `For any queries, call us at +91 9242953738 or reply to this email.\n\n` +
    `We look forward to hosting you!\n\n` +
    `Warm regards,\n` +
    `Rahul Apartment Team\n` +
    `rahulapartmentankola@gmail.com`
  );
  return `mailto:${booking.email}?subject=${subject}&body=${body}`;
}

// ─── Notification Panel (auto-sends email, opens WhatsApp) ───────────────────

type EmailStatus = 'idle' | 'sending' | 'sent' | 'error' | 'not_configured';

function NotifyPanel({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  const waUrl = buildWhatsAppUrl(booking);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');

  // Auto-send email as soon as the panel opens
  useEffect(() => {
    if (!booking.email) return;

    if (!IS_EMAILJS_CONFIGURED) {
      setEmailStatus('not_configured');
      return;
    }

    setEmailStatus('sending');
    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          to_email:   booking.email,
          to_name:    booking.name,
          booking_id: booking.id,
          room:       booking.room,
          checkin:    booking.checkin  || booking.dates,
          checkout:   booking.checkout || '',
          dates:      booking.dates,
          price:      booking.price,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(() => setEmailStatus('sent'))
      .catch(() => setEmailStatus('error'));
  }, [booking]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md glass rounded-3xl p-8 shadow-2xl border border-border z-10">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-border rounded-xl transition-colors">
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-1">Booking Confirmed!</h3>
          <p className="text-foreground/60 text-sm">
            Notifying <span className="font-semibold text-foreground">{booking.name}</span>...
          </p>
        </div>

        {/* Guest info */}
        <div className="bg-background/60 rounded-2xl p-4 mb-5 text-sm space-y-1.5">
          <div className="flex justify-between">
            <span className="text-foreground/50">Booking ID</span>
            <span className="font-mono font-semibold">{booking.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/50">Room</span>
            <span className="font-semibold">{booking.room}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/50">Dates</span>
            <span className="font-semibold">{booking.dates}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/50">Price</span>
            <span className="font-semibold text-primary">{booking.price}</span>
          </div>
        </div>

        <div className="space-y-3">

          {/* ── Auto Email Status ── */}
          {booking.email ? (
            <div className={`w-full rounded-2xl px-5 py-4 flex items-center gap-3 transition-all ${
              emailStatus === 'sending'        ? 'bg-primary/10 border border-primary/30' :
              emailStatus === 'sent'           ? 'bg-green-500/10 border border-green-500/30' :
              emailStatus === 'error'          ? 'bg-red-500/10 border border-red-500/30' :
              emailStatus === 'not_configured' ? 'bg-yellow-500/10 border border-yellow-500/30' :
              'bg-background/50 border border-border'
            }`}>
              {emailStatus === 'sending' && <Loader2 size={20} className="text-primary animate-spin shrink-0" />}
              {emailStatus === 'sent'    && <CheckCircle size={20} className="text-green-500 shrink-0" />}
              {emailStatus === 'error'   && <AlertCircle size={20} className="text-red-500 shrink-0" />}
              {emailStatus === 'not_configured' && <AlertCircle size={20} className="text-yellow-500 shrink-0" />}
              {emailStatus === 'idle'    && <Mail size={20} className="text-foreground/40 shrink-0" />}
              <div>
                <p className={`text-sm font-semibold ${
                  emailStatus === 'sent'  ? 'text-green-600 dark:text-green-400' :
                  emailStatus === 'error' ? 'text-red-500' :
                  emailStatus === 'not_configured' ? 'text-yellow-600 dark:text-yellow-400' :
                  emailStatus === 'sending' ? 'text-primary' : 'text-foreground/60'
                }`}>
                  {emailStatus === 'sending'        && 'Sending confirmation email...'}
                  {emailStatus === 'sent'           && 'Email sent automatically!'}
                  {emailStatus === 'error'          && 'Email failed — use manual option below'}
                  {emailStatus === 'not_configured' && 'EmailJS not configured yet'}
                  {emailStatus === 'idle'           && 'Preparing email...'}
                </p>
                <p className="text-xs text-foreground/40">{booking.email}</p>
                {emailStatus === 'not_configured' && (
                  <p className="text-xs text-yellow-600/80 mt-0.5">Set up keys in src/emailjsConfig.ts</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-foreground/40 py-2 bg-background/40 rounded-xl">
              No email address — guest did not provide email
            </div>
          )}

          {/* Fallback manual email */}
          {(emailStatus === 'error' || emailStatus === 'not_configured') && booking.email && (
            <a
              href={buildEmailUrl(booking)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-xl text-sm transition-colors"
            >
              <Mail size={16} /> Open Email App Manually
            </a>
          )}

          {/* ── WhatsApp (pre-filled, 1-tap send) ── */}
          <div>
            {waUrl ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle size={20} />
                Send WhatsApp (1-tap)
              </a>
            ) : (
              <div className="text-center text-xs text-foreground/40 py-2">
                No phone number — WhatsApp unavailable
              </div>
            )}
            <p className="text-center text-xs text-foreground/30 mt-2">
              Opens WhatsApp with confirmation pre-filled — just tap Send
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function OwnerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notifyBooking, setNotifyBooking] = useState<Booking | null>(null);

  const refresh = useCallback(() => {
    setBookings(loadBookings());
    setQueries(loadQueries());
    setLastRefresh(new Date());
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, [refresh]);

  const confirmBooking = (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: 'Confirmed' as const } : b);
    setBookings(updated);
    saveBookings(updated);
    // Show notify panel for this booking
    const confirmed = updated.find((b) => b.id === id);
    if (confirmed) setNotifyBooking(confirmed);
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    saveBookings(updated);
    setDeleteConfirm(null);
  };

  const resolveQuery = (id: string) => {
    const updated = queries.map((q) => q.id === id ? { ...q, status: 'Resolved' as const } : q);
    setQueries(updated);
    saveQueries(updated);
  };

  const deleteQuery = (id: string) => {
    const updated = queries.filter((q) => q.id !== id);
    setQueries(updated);
    saveQueries(updated);
  };

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const openQueries = queries.filter((q) => q.status === 'Open').length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'Confirmed')
    .reduce((sum, b) => {
      const match = b.price.match(/₹([\d,]+)/);
      return sum + (match ? parseInt(match[1].replace(',', '')) : 0);
    }, 0);

  const stats = [
    { label: 'Total Bookings', value: String(bookings.length), icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Confirmed', value: String(confirmedCount), icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Open Queries', value: String(openQueries), icon: MessageSquare, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Revenue (est.)', value: totalRevenue > 0 ? `₹${totalRevenue.toLocaleString('en-IN')}` : '₹0', icon: IndianRupee, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const navItems: { key: Tab; label: string; icon: typeof Calendar; badge?: number }[] = [
    { key: 'bookings', label: 'Bookings', icon: Calendar, badge: pendingCount },
    { key: 'queries', label: 'Help Desk', icon: MessageSquare, badge: openQueries },
    { key: 'guests', label: 'Guests', icon: Users },
    { key: 'revenue', label: 'Revenue', icon: IndianRupee },
  ];

  return (
    <>
      {/* Notify Panel Overlay */}
      <AnimatePresence>
        {notifyBooking && (
          <NotifyPanel booking={notifyBooking} onClose={() => setNotifyBooking(null)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">

        {/* ── Sidebar ── */}
        <aside className="w-full md:w-64 glass border-r border-border/50 flex flex-col justify-between sticky top-0 md:h-screen z-20">
          <div>
            <div className="p-6 border-b border-border/30">
              <h2 className="text-2xl font-bold tracking-tighter text-primary">
                Rahul <span className="text-foreground">Admin</span>
              </h2>
              <p className="text-xs text-foreground/50 mt-1">Owner Dashboard</p>
            </div>
            <nav className="px-4 py-4 space-y-1">
              {navItems.map(({ key, label, icon: Icon, badge }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    activeTab === key ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-primary/10'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span className="font-medium">{label}</span>
                  </span>
                  {badge !== undefined && badge > 0 && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      activeTab === key ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 space-y-3 border-t border-border/50">
            <button
              onClick={refresh}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-primary/10 transition-colors text-sm"
            >
              <RefreshCw size={16} />
              <span>Refresh Data</span>
            </button>
            <div className="text-xs text-foreground/40 text-center">
              Updated: {lastRefresh.toLocaleTimeString('en-IN')}
            </div>
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-medium">Appearance</span>
              <ThemeToggle />
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Back to Website</span>
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full max-w-[100vw]">

          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, Owner 👋</h1>
              <p className="text-foreground/60 text-sm">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            {(pendingCount > 0 || openQueries > 0) && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-xl text-sm font-medium"
              >
                <Bell size={16} className="animate-pulse" />
                {pendingCount > 0 && <span>{pendingCount} pending booking{pendingCount > 1 ? 's' : ''}</span>}
                {pendingCount > 0 && openQueries > 0 && <span>•</span>}
                {openQueries > 0 && <span>{openQueries} open {openQueries > 1 ? 'queries' : 'query'}</span>}
              </motion.div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-5 rounded-2xl glass flex items-center space-x-4"
              >
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-foreground/50 text-xs font-medium">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ── Bookings Tab ── */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold">Booking Requests</h2>
                  <span className="text-sm text-foreground/50">{bookings.length} total</span>
                </div>

                {bookings.length === 0 ? (
                  <div className="glass p-12 rounded-2xl text-center text-foreground/50">
                    <Calendar size={40} className="mx-auto mb-4 opacity-30" />
                    <p>No booking requests yet. When guests submit a booking it will appear here.</p>
                  </div>
                ) : (
                  <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-border/50 text-foreground/50 bg-background/30">
                            <th className="py-4 px-4 font-semibold">Guest</th>
                            <th className="py-4 px-4 font-semibold">Contact</th>
                            <th className="py-4 px-4 font-semibold">Room</th>
                            <th className="py-4 px-4 font-semibold">Dates</th>
                            <th className="py-4 px-4 font-semibold">Price</th>
                            <th className="py-4 px-4 font-semibold">Status</th>
                            <th className="py-4 px-4 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((b) => (
                            <tr key={b.id} className="border-b border-border/20 last:border-0 hover:bg-background/40 transition-colors">
                              <td className="py-4 px-4">
                                <div className="font-semibold">{b.name}</div>
                                <div className="text-xs text-foreground/40 font-mono mt-0.5">{b.id}</div>
                              </td>
                              <td className="py-4 px-4 text-xs space-y-1">
                                {b.phone && (
                                  <a href={`tel:${b.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                                    <PhoneCall size={10} /> {b.phone}
                                  </a>
                                )}
                                {b.email && (
                                  <a href={`mailto:${b.email}`} className="flex items-center gap-1 text-foreground/60 hover:text-primary hover:underline">
                                    <Mail size={10} /> {b.email}
                                  </a>
                                )}
                              </td>
                              <td className="py-4 px-4">{b.room}</td>
                              <td className="py-4 px-4 text-xs">{b.dates}</td>
                              <td className="py-4 px-4 font-medium">{b.price}</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                  b.status === 'Confirmed'
                                    ? 'bg-green-500/15 text-green-500'
                                    : 'bg-yellow-500/15 text-yellow-500'
                                }`}>
                                  {b.status === 'Confirmed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                  {b.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                  {b.status === 'Pending' && (
                                    <button
                                      onClick={() => confirmBooking(b.id)}
                                      className="flex items-center gap-1 px-3 py-1.5 bg-green-500/15 text-green-500 hover:bg-green-500/30 rounded-lg text-xs font-semibold transition-colors"
                                    >
                                      <CheckCircle size={12} /> Confirm
                                    </button>
                                  )}
                                  {b.status === 'Confirmed' && (
                                    <button
                                      onClick={() => setNotifyBooking(b)}
                                      className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-semibold transition-colors"
                                    >
                                      <Send size={12} /> Notify
                                    </button>
                                  )}
                                  {deleteConfirm === b.id ? (
                                    <span className="flex items-center gap-1">
                                      <button onClick={() => deleteBooking(b.id)} className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold">
                                        Yes, delete
                                      </button>
                                      <button onClick={() => setDeleteConfirm(null)} className="p-1 hover:bg-border rounded-lg">
                                        <X size={12} />
                                      </button>
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => setDeleteConfirm(b.id)}
                                      className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Help Desk Tab ── */}
            {activeTab === 'queries' && (
              <motion.div key="queries" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold">Help Desk & Room Service Requests</h2>
                  <span className="text-sm text-foreground/50">{queries.length} total</span>
                </div>
                {queries.length === 0 ? (
                  <div className="glass p-12 rounded-2xl text-center text-foreground/50">
                    <MessageSquare size={40} className="mx-auto mb-4 opacity-30" />
                    <p>No service requests yet. Guest queries will appear here in real time.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {queries.map((q) => (
                      <motion.div key={q.id} layout className="glass p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <span className="font-bold text-base">{q.name}</span>
                            {q.room && <span className="text-xs px-2 py-0.5 bg-border/60 rounded-full text-foreground/70">Room: {q.room}</span>}
                            <span className="text-xs text-foreground/40">{q.time}</span>
                          </div>
                          <p className="text-foreground/80 text-sm">{q.issue}</p>
                          {q.phone && (
                            <a href={`tel:${q.phone}`} className="text-xs text-primary flex items-center gap-1 hover:underline mt-1">
                              <PhoneCall size={10} /> {q.phone}
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                            q.status === 'Open' ? 'bg-red-500/15 text-red-500' : 'bg-green-500/15 text-green-500'
                          }`}>
                            {q.status}
                          </span>
                          {q.phone && (
                            <a
                              href={`https://wa.me/${cleanPhone(q.phone)}?text=${encodeURIComponent(`Hi ${q.name}, regarding your request at Rahul Apartment – our team is attending to it shortly. Thank you!`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1.5 bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 rounded-lg text-xs font-semibold transition-colors"
                            >
                              <MessageCircle size={12} /> WhatsApp
                            </a>
                          )}
                          {q.status === 'Open' && (
                            <button
                              onClick={() => resolveQuery(q.id)}
                              className="px-3 py-1.5 bg-green-500/15 text-green-500 hover:bg-green-500/25 rounded-lg text-xs font-semibold transition-colors"
                            >
                              Resolve
                            </button>
                          )}
                          <button onClick={() => deleteQuery(q.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Guests Tab ── */}
            {activeTab === 'guests' && (
              <motion.div key="guests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h2 className="text-xl font-bold mb-6">Guest Directory</h2>
                {bookings.length === 0 ? (
                  <div className="glass p-12 rounded-2xl text-center text-foreground/50">
                    <Users size={40} className="mx-auto mb-4 opacity-30" />
                    <p>No guests registered yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((b) => (
                      <div key={b.id} className="glass p-5 rounded-2xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-lg">
                            {b.name.charAt(0).toUpperCase()}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            b.status === 'Confirmed' ? 'bg-green-500/15 text-green-500' : 'bg-yellow-500/15 text-yellow-500'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <h3 className="font-bold mb-1">{b.name}</h3>
                        {b.phone && (
                          <a href={`tel:${b.phone}`} className="text-xs text-primary flex items-center gap-1 hover:underline mb-1">
                            <PhoneCall size={10} /> {b.phone}
                          </a>
                        )}
                        {b.email && (
                          <a href={`mailto:${b.email}`} className="text-xs text-foreground/60 flex items-center gap-1 hover:text-primary hover:underline mb-1">
                            <Mail size={10} /> {b.email}
                          </a>
                        )}
                        <p className="text-xs text-foreground/60">{b.room}</p>
                        <p className="text-xs text-foreground/50 mt-1">{b.dates}</p>
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => setNotifyBooking(b)}
                            className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-semibold transition-colors"
                          >
                            <Send size={12} /> Notify Guest
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Revenue Tab ── */}
            {activeTab === 'revenue' && (
              <motion.div key="revenue" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Total Bookings', value: bookings.length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Confirmed', value: confirmedCount, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Pending', value: pendingCount, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                  ].map((item, i) => (
                    <div key={i} className={`glass p-6 rounded-2xl ${item.bg}`}>
                      <p className="text-foreground/60 text-sm mb-1">{item.label}</p>
                      <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="glass p-6 rounded-2xl mb-6">
                  <p className="text-foreground/60 text-sm mb-1">Estimated Revenue from Confirmed Bookings</p>
                  <p className="text-4xl font-bold text-primary">
                    {totalRevenue > 0 ? `₹${totalRevenue.toLocaleString('en-IN')}` : '₹0'}
                  </p>
                  <p className="text-xs text-foreground/40 mt-2">* Based on per-night price. Actual revenue may vary.</p>
                </div>
                {confirmedCount === 0 && (
                  <div className="glass p-10 rounded-2xl text-center text-foreground/40">
                    <IndianRupee size={40} className="mx-auto mb-4 opacity-30" />
                    <p>Confirm bookings to track revenue here.</p>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
