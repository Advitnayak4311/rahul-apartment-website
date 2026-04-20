import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-card py-12 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-2xl font-bold tracking-tighter text-primary">
            Rahul <span className="text-foreground">Apartment</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground/70">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#rooms" className="hover:text-primary transition-colors">Rooms</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#booking" className="hover:text-primary transition-colors">Book Now</a>
            <Link to="/admin" className="hover:text-primary transition-colors font-bold text-primary/80">Admin Portal</Link>
          </div>

          <div className="text-sm text-foreground/50">
            &copy; {new Date().getFullYear()} Rahul Apartment. All rights reserved.
          </div>
          
        </div>
      </div>
    </footer>
  );
}
