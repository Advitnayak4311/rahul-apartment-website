import { useState } from 'react';
import { motion } from 'framer-motion';
import { BellRing, Utensils, Wrench, HelpCircle } from 'lucide-react';

interface QueryData {
  id: string;
  name: string;
  phone: string;
  room: string;
  issue: string;
  time: string;
  status: 'Open' | 'Resolved';
}

const serviceCategories = [
  { icon: Utensils, label: 'Food & Beverages', value: 'Food & Beverages' },
  { icon: Wrench, label: 'Maintenance / Repair', value: 'Maintenance / Repair' },
  { icon: BellRing, label: 'Housekeeping', value: 'Housekeeping' },
  { icon: HelpCircle, label: 'General Query', value: 'General Query' },
];

export function RoomService() {
  const [status, setStatus] = useState<null | 'success'>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    room: '',
    category: '',
    issue: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuery: QueryData = {
      id: `QR-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      room: formData.room,
      issue: `[${formData.category}] ${formData.issue}`,
      time: new Date().toLocaleString('en-IN'),
      status: 'Open',
    };

    const existing: QueryData[] = JSON.parse(localStorage.getItem('rahul_queries') || '[]');
    existing.unshift(newQuery);
    localStorage.setItem('rahul_queries', JSON.stringify(existing));

    setStatus('success');
    setFormData({ name: '', phone: '', room: '', category: '', issue: '' });
    setTimeout(() => setStatus(null), 6000);
  };

  return (
    <section id="room-service" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
            Guest Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Room Service & Help Desk</h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Need something? Raise a request instantly and our team will attend to you promptly.
          </p>
        </div>

        {/* Category Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {serviceCategories.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="glass p-5 rounded-2xl text-center hover:-translate-y-1 transition-transform cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <Icon size={22} />
              </div>
              <p className="text-sm font-semibold text-foreground/80">{label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto glass rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 text-green-600 dark:text-green-400 p-8 rounded-2xl text-center border border-green-500/30"
            >
              <BellRing size={36} className="mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Request Submitted! ✅</h3>
              <p className="text-sm">Our team has been notified and will attend to you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Your Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Amit Kumar"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Room Number / Name</label>
                  <input
                    required
                    name="room"
                    type="text"
                    value={formData.room}
                    onChange={handleChange}
                    placeholder="e.g. Room 101 or Deluxe Suite"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select type...</option>
                    {serviceCategories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Describe Your Request</label>
                <textarea
                  required
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  rows={4}
                  placeholder="e.g. Please send extra towels and drinking water to my room..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-lg"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
