import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppFAB() {
  const whatsappNumber = "919242953738"; // Provided by user
  const message = "Hello! I am interested in booking a room at Rahul Apartment. Can you help me?";
  
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-card glass px-3 py-1.5 rounded-xl text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap shadow-lg transition-all border border-border/50">
        Chat with us!
      </div>
      <MessageCircle size={28} />
      
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-75 hidden sm:block" style={{ animationDuration: '3s' }} />
    </motion.a>
  );
}
