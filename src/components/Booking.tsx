import { useState } from 'react';
import { motion } from 'framer-motion';

export interface BookingData {
  id: string;
  name: string;
  phone: string;
  email: string;
  room: string;
  checkin: string;
  checkout: string;
  dates: string;
  price: string;
  status: 'Pending' | 'Confirmed';
  createdAt: string;
}

export function Booking() {
  const [status, setStatus] = useState<null | 'success'>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    checkin: '',
    checkout: '',
    roomType: '',
  });

  const roomPriceMap: Record<string, { label: string; price: string }> = {
    single: { label: 'Single Room', price: '₹599/night' },
    double: { label: 'Double Room', price: '₹899/night' },
    deluxe: { label: 'Deluxe Room', price: '₹1499/night' },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const roomInfo = roomPriceMap[formData.roomType] || { label: formData.roomType, price: 'N/A' };

    const newBooking: BookingData = {
      id: `BK-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      room: roomInfo.label,
      checkin: formData.checkin,
      checkout: formData.checkout,
      dates: `${formData.checkin} → ${formData.checkout}`,
      price: roomInfo.price,
      status: 'Pending',
      createdAt: new Date().toLocaleString('en-IN'),
    };

    const existing: BookingData[] = JSON.parse(localStorage.getItem('rahul_bookings') || '[]');
    existing.unshift(newBooking);
    localStorage.setItem('rahul_bookings', JSON.stringify(existing));

    setStatus('success');
    setFormData({ name: '', phone: '', email: '', checkin: '', checkout: '', roomType: '' });
    setTimeout(() => setStatus(null), 6000);
  };

  return (
    <section id="booking" className="py-24 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

          <div className="text-center mb-10 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Stay</h2>
            <p className="text-foreground/70">Reserve your room quickly and easily. We'll confirm your booking shortly.</p>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 text-green-600 dark:text-green-400 p-8 rounded-2xl text-center border border-green-500/30"
            >
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold mb-2">Booking Request Received!</h3>
              <p className="text-sm">The owner will review your request and send you a confirmation via WhatsApp or Email shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  required name="name" type="text"
                  value={formData.name} onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number (WhatsApp)</label>
                <input
                  required name="phone" type="tel"
                  value={formData.phone} onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email Address <span className="text-foreground/40 font-normal">(for confirmation)</span></label>
                <input
                  required name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="e.g. priya@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Check-in Date</label>
                <input
                  required name="checkin" type="date"
                  value={formData.checkin} onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Check-out Date</label>
                <input
                  required name="checkout" type="date"
                  value={formData.checkout} onChange={handleChange}
                  min={formData.checkin || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Room Type</label>
                <select
                  required name="roomType"
                  value={formData.roomType} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select a room...</option>
                  <option value="single">Single Room – ₹599/night</option>
                  <option value="double">Double Room – ₹899/night</option>
                  <option value="deluxe">Deluxe Room – ₹1499/night</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-lg"
                >
                  Submit Booking Request
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
