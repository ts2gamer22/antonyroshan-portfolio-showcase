import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-3">
              <a 
                href="mailto:antonyroshan03@gmail.com"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-smooth"
              >
                <Mail className="h-4 w-4" />
                <span>antonyroshan03@gmail.com</span>
              </a>
              <a 
                href="tel:+919884629287"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-smooth"
              >
                <Phone className="h-4 w-4" />
                <span>+91 9884629287</span>
              </a>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Professional Links</h3>
            <div className="flex space-x-4">
              <a 
                href="#"
                className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#"
                className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <a 
                href="/cv.pdf" 
                download
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                Download CV
              </a>
              <a 
                href="#"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                Research Publications
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Antony Roshan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;