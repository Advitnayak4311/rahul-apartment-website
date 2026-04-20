import { MapPin, Phone, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Get in touch with us for inquiries or to confirm your booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Location</h3>
                <p className="text-foreground/70">Rahul Apartment, Ankola,<br/>Uttara Kannada, Karnataka 581314</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Phone Number</h3>
                <p className="text-foreground/70">
                  <a href="tel:+919242953738" className="hover:text-primary hover:underline transition-colors font-medium">+91 9242953738</a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email Address</h3>
                <p className="text-foreground/70">
                  <a href="mailto:rahulapartmentankola@gmail.com" className="hover:text-primary hover:underline transition-colors font-medium">rahulapartmentankola@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="h-80 lg:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-border">
            <iframe
              src="https://maps.google.com/maps?q=14.6634801,74.3064051&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rahul Apartment Exact Location"
              className="grayscale-[30%] contrast-[1.1] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
