import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What are the standard check-in and check-out times?",
    answer: "Our standard check-in time is 12:00 PM (Noon), and check-out is at 11:00 AM. Early check-in or late check-out can be requested and is subject to availability."
  },
  {
    question: "Is there parking available on the premises?",
    answer: "Yes, we providing secure, on-site complimentary parking for all registered guests. No prior reservation is required for standard vehicles."
  },
  {
    question: "What ID documents are required at check-in?",
    answer: "We require a valid government-issued photo ID (Aadhar Card, Passport, or Driving License) for all adults staying in the room according to local regulations."
  },
  {
    question: "Do you offer backup power during outages?",
    answer: "Absolutely. We are equipped with a high-capacity standby generator that ensures 24/7 uninterrupted power for lights, fans, and essential electronics."
  },
  {
    question: "Are pets allowed in the apartment rooms?",
    answer: "To ensure a comfortable and allergy-free environment for all our future guests, we enforce a strict no-pets policy indoors."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-card/50">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-foreground/70">
            Everything you need to know about your stay at Rahul Apartment.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass border border-border/50 rounded-2xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-lg hover:bg-foreground/5 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary' : 'text-foreground/50'}`} 
                  size={20} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-1 text-foreground/70 border-t border-border/20">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
