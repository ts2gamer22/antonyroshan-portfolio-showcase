import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import BackToTop from '@/components/BackToTop';

const Footer = () => {
  const year = new Date().getFullYear();

  const iconHover = { whileHover: { scale: 1.05, rotate: 2 }, whileTap: { scale: 0.95 } };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-3">
              <a 
                href="mailto:antonyroshan03@gmail.com"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <Mail className="h-4 w-4" />
                <span>antonyroshan03@gmail.com</span>
              </a>
              <a 
                href="tel:+919884629287"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
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
            <TooltipProvider>
              <div className="flex space-x-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a 
                      href="https://linkedin.com/in/antonyroshan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      {...iconHover}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    LinkedIn
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a 
                      href="https://github.com/antonyroshan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      {...iconHover}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    GitHub
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <a 
                href="/cv.pdf" 
                download
                className="block text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © {year} Antony Roshan. All rights reserved.
          </p>
        </div>
      </div>
      <BackToTop />
    </footer>
  );
};

export default Footer;
