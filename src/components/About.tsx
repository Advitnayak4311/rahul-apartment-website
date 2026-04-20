import { motion } from 'framer-motion';
import { BedDouble, Clock, Award, ShieldCheck } from 'lucide-react';

export function About() {
  const features = [
    { icon: Award, title: 'Premier Service Provider', desc: 'Recognized as the undisputed #1 lodging and hospitality destination in the entire Ankola region.' },
    { icon: ShieldCheck, title: 'Premium Facilities', desc: 'Uncompromising quality featuring air conditioning, high-speed Wi-Fi, modern decor, and power-backup.' },
    { icon: BedDouble, title: 'Luxury & Comfort', desc: 'Immaculately sanitized, beautifully designed spaces tailored for your absolute relaxation and privacy.' },
    { icon: Clock, title: '24/7 Dedicated Support', desc: 'Round-the-clock professional concierge and housekeeping to attend to your every need.' },
  ];

  return (
    <section id="about" className="pt-40 pb-24 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-bl-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase mb-4">
            Discover Excellence
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">About <span className="text-primary">Rahul Apartment</span></h2>
          
          <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
            <p>
              Welcome to Rahul Apartment, the <strong className="text-foreground">premier, best-in-class lodging and hospitality provider</strong> in the Ankola region. We pride ourselves on delivering a distinctly premium experience that seamlessly blends the warmth of home with the meticulous amenities of a modern resort.
            </p>
            <p>
              Whether you are traveling for crucial business, embarking on a family vacation, or seeking a serene, unbothered weekend getaway, our fully furnished accommodations are meticulously designed to cater to your rigorous standards. We guarantee unmatched tranquility, absolute privacy, and total structural safety.
            </p>
            <p>
              Equipped with state-of-the-art facilities, rigorous multi-step cleanliness protocols, expansive parking, and prime geographic connectivity to local hubs, Rahul Apartment proudly stands as the region's absolute pinnacle of comfort, luxury, and exceptional guest service.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass bg-white/60 dark:bg-card/50 border border-border/50 text-card-foreground hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-extrabold mb-3">{feature.title}</h3>
              <p className="text-foreground/75 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
