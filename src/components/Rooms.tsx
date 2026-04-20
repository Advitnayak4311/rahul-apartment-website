import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wifi, Tv, Wind, Coffee, Bath, Car, Zap, Droplets, Bell, Fan } from 'lucide-react';

type Room = {
  type: string;
  price: string;
  desc: string;
  amenities: { icon: any; name: string }[];
};

const rooms: Room[] = [
  {
    type: 'Single Room',
    price: '₹599',
    desc: 'Perfect for solo travelers and short stays. Includes standard amenities.',
    amenities: [
      { icon: Wifi, name: 'Free High-Speed WiFi' },
      { icon: Tv, name: 'Smart TV' },
      { icon: Fan, name: 'AC & Non-AC Options' },
      { icon: Droplets, name: 'Attached Bath & 24/7 Hot Water' },
      { icon: Zap, name: 'Generator Power Backup' },
      { icon: Car, name: 'On-Site Parking Available' },
      { icon: Bell, name: 'Daily Housekeeping' }
    ]
  },
  {
    type: 'Double Room',
    price: '₹899',
    desc: 'Spacious room suitable for couples or two guests. Features a large double bed.',
    amenities: [
      { icon: Wifi, name: 'Free High-Speed WiFi' },
      { icon: Wind, name: 'Air Conditioning' },
      { icon: Tv, name: '42" Smart TV' },
      { icon: Coffee, name: 'Tea & Coffee Maker' },
      { icon: Droplets, name: 'Premium Bath & Hot Water' },
      { icon: Zap, name: 'Generator Power Backup' },
      { icon: Car, name: 'On-Site Parking Available' },
      { icon: Bell, name: 'Room Service & Housekeeping' }
    ]
  },
  {
    type: 'Deluxe Room',
    price: '₹1499',
    desc: 'Premium suite with extra space, superior comfort, and enhanced aesthetic.',
    amenities: [
      { icon: Wifi, name: 'Free Premium WiFi' },
      { icon: Wind, name: 'Advanced Air Conditioning' },
      { icon: Tv, name: '55" OLED Smart TV' },
      { icon: Bath, name: 'Luxury Bathtub & Hot Water' },
      { icon: Zap, name: 'Generator Power Backup' },
      { icon: Car, name: 'Complimentary Reserved Parking' },
      { icon: Bell, name: '24/7 Priority Room Service' }
    ]
  }
];

export function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  return (
    <section id="rooms" className="py-24 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Rooms</h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Choose from our selection of comfortable and well-equipped rooms tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group rounded-3xl overflow-hidden glass shadow-xl bg-background border border-border"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{room.type}</h3>
                  <div className="glass px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    {room.price} <span className="text-sm font-normal text-foreground/70">/ night</span>
                  </div>
                </div>
                <p className="text-foreground/70 mb-8 h-12">{room.desc}</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setSelectedRoom(room)}
                    className="w-1/2 block text-center bg-primary/20 hover:bg-primary/30 text-primary py-3 rounded-xl font-medium transition-colors"
                  >
                    View Details
                  </button>
                  <a href="#booking" className="w-1/2 block text-center bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium transition-colors">
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoom(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-card rounded-3xl overflow-hidden shadow-2xl glass border border-border"
            >
              <button 
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
              
              <div className="p-6 sm:p-8 pt-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6">
                  <h3 className="text-3xl font-bold text-foreground">{selectedRoom.type}</h3>
                  <p className="text-2xl font-semibold text-primary mt-2 sm:mt-0">{selectedRoom.price} <span className="text-sm text-foreground/70 font-normal">/ night</span></p>
                </div>

                <p className="text-foreground/80 text-lg mb-8">{selectedRoom.desc}</p>
                
                <h4 className="text-xl font-bold mb-4">Included Amenities & Facilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {selectedRoom.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-background border border-border/50">
                      <div className="text-primary"><item.icon size={20} /></div>
                      <span className="font-medium text-foreground/90">{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setSelectedRoom(null)} className="flex-1 py-3 bg-secondary hover:bg-secondary/80 rounded-xl font-medium transition-colors">
                    Close
                  </button>
                  <a href="#booking" onClick={() => setSelectedRoom(null)} className="flex-1 py-3 text-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    Book This Room
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
