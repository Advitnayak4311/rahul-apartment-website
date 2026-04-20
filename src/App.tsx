import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Rooms } from './components/Rooms';
import { Gallery } from './components/Gallery';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FAQ } from './components/FAQ';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { OwnerDashboard } from './components/OwnerDashboard';

function LandingPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Gallery />
        <Booking />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<OwnerDashboard />} />
    </Routes>
  );
}

export default App;
