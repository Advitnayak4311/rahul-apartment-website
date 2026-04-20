import { useState } from 'react';
import { motion } from 'framer-motion';

export function Booking() {
  const [status, setStatus] = useState<null | 'success'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="booking" className="py-24 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

          <div className="text-center mb-10 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Stay</h2>
            <p className="text-foreground/70">Reserve your room quickly and easily.</p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 text-green-600 dark:text-green-400 p-6 rounded-2xl text-center border border-green-500/30"
            >
              <h3 className="text-xl font-bold mb-2">Booking Requested!</h3>
              <p>We've received your request. We'll contact you shortly to confirm.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-in Date</label>
                <input required type="date" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-out Date</label>
                <input required type="date" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Room Type</label>
                <select required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select a room...</option>
                  <option value="single">Single Room - ₹999/night</option>
                  <option value="double">Double Room - ₹1499/night</option>
                  <option value="deluxe">Deluxe Room - ₹2499/night</option>
                </select>
              </div>
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-lg">
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
