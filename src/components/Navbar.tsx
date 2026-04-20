import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-lg border-b border-border/40' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-extrabold tracking-tighter cursor-pointer text-primary" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          Rahul <span className="text-foreground">Apartment</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 font-medium text-foreground/80">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#rooms" className="hover:text-primary transition-colors">Rooms</a>
          <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          <ThemeToggle />
          <a href="#booking" className="px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
            Book Now
          </a>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass flex flex-col items-center py-6 space-y-4 shadow-xl">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#rooms" onClick={() => setIsMobileMenuOpen(false)}>Rooms</a>
          <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <a href="#booking" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-primary-foreground px-6 py-2 rounded-full">
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
