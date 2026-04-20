import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Wifi, Zap, Car, MapPin, Bus, ShoppingBag, PlusCircle, ShieldCheck } from 'lucide-react';

export function Hero() {
  const [isSearching, setIsSearching] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [error, setError] = useState('');

  const handleCheckAvailability = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      setError("Please select both Check-In and Check-Out dates to continue.");
      return;
    }
    
    setError('');
    setIsSearching(true);
    setIsAvailable(false);
    
    // Simulate API search latency
    setTimeout(() => {
      setIsSearching(false);
      setIsAvailable(true);
    }, 1500);
  };

  return (
    <section className="relative pt-28 pb-40 lg:pt-36 lg:pb-48 flex items-center justify-center bg-background overflow-visible">
      {/* Ultra Clean, Light Abstract Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-indigo-50/30 dark:from-slate-900 dark:via-background dark:to-indigo-950/20">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-300/10 dark:bg-blue-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-300/10 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full text-center py-12 flex flex-col items-center"
        >
          {/* Welcome Text Highlight */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary text-xl md:text-2xl font-black tracking-widest uppercase mb-6 drop-shadow-sm"
          >
            Welcome, Your Perfect Stay Awaits
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-foreground drop-shadow-sm leading-tight"
          >
            Premium Comfort at <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Rahul Apartment</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-base md:text-xl text-foreground/80 mb-6 max-w-4xl mx-auto font-medium leading-relaxed text-center drop-shadow-sm"
          >
            Experience a modern, pristine, and affordable stay proudly located in the heart of Ankola.
          </motion.p>
          
          {/* Quick Features Square Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-2 w-full"
          >
            {[
              { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Seamless internet access across all rooms." },
              { icon: Zap, title: "24/7 Power", desc: "Uninterrupted generator power backup." },
              { icon: Car, title: "Secure Parking", desc: "Safe, expansive parking for your vehicles." },
              { icon: MapPin, title: "Prime Location", desc: "Immediate access to city transit and hubs." },
              { icon: Bus, title: "Near Transit", desc: "Walking distance to the main bus station." },
              { icon: ShoppingBag, title: "Local Markets", desc: "Steps away from the main shopping hubs." },
              { icon: PlusCircle, title: "Medical Support", desc: "Surrounded by pharmacies and hospitals." },
              { icon: ShieldCheck, title: "100% Secure", desc: "Total privacy and safety for all guests." }
            ].map((feature, i) => (
              <div key={i} className="bg-white/90 dark:bg-black/50 backdrop-blur-xl border border-border/50 rounded-2xl p-4 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-3 shadow-lg shadow-primary/20">
                  <feature.icon size={20} />
                </div>
                <h3 className="font-extrabold text-foreground text-sm mb-1.5">{feature.title}</h3>
                <p className="text-foreground/60 text-xs font-medium leading-relaxed line-clamp-2">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Advanced Booking Bar Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center translate-y-1/2 px-4"
      >
        <div className="glass bg-background/90 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl border border-border/50 rounded-2xl p-4 md:p-6 w-full max-w-5xl flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto flex-1">
              <div className="text-left px-4 border-b md:border-b-0 md:border-r border-border/30 pb-3 md:pb-0">
                <label className="block text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2">Check In</label>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-foreground font-bold focus:outline-none w-full cursor-pointer text-lg md:text-xl h-10" 
                />
              </div>
              <div className="text-left px-4 border-b md:border-b-0 md:border-r border-border/30 pb-3 md:pb-0">
                <label className="block text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2">Check Out</label>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-foreground font-bold focus:outline-none w-full cursor-pointer text-lg md:text-xl h-10" 
                />
              </div>
              <div className="text-left px-4">
                <label className="block text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2">Guests</label>
                <select className="bg-transparent text-foreground font-bold focus:outline-none w-full cursor-pointer border-0 text-lg md:text-xl h-10">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>
            
            <div className="w-full md:w-auto mt-2 md:mt-0">
              {!isAvailable ? (
                <button 
                  onClick={handleCheckAvailability} 
                  disabled={isSearching} 
                  className="w-full px-10 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all text-center whitespace-nowrap min-w-[200px]"
                >
                  {isSearching ? "Searching..." : "Check Availability"}
                </button>
              ) : (
                <a href="#booking" className="block w-full px-10 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-600/30 transition-transform transform hover:scale-[1.02] active:scale-[0.98] text-center whitespace-nowrap min-w-[200px] animate-in fade-in zoom-in duration-300">
                  Book Room Now
                </a>
              )}
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg p-3 text-sm flex items-center justify-center font-medium">
                  {error}
                </div>
              </motion.div>
            )}
            
            {isAvailable && !error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-lg p-4 flex items-center justify-center font-medium shadow-sm">
                  🎉 Good news! We have Deluxe and Double Rooms available for your dates.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
