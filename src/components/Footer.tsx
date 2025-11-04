import { Mail, Linkedin, Github, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import BackToTop from '@/components/BackToTop';

const Footer = () => {
  const year = new Date().getFullYear();

  const iconHover = { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:antonyroshan03@gmail.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <Mail className="h-4 w-4" />
                <span>antonyroshan03@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Links</h3>
            <div className="flex space-x-3">
              <motion.a 
                href="https://linkedin.com/in/antonyroshan03"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                {...iconHover}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>

              <motion.a 
                href="https://github.com/Spearmint1080"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                {...iconHover}
              >
                <Github className="h-4 w-4" />
              </motion.a>

              <motion.a 
                href="https://instagram.com/anto._.gjr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                {...iconHover}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {year} Antony Roshan
          </p>
        </div>
      </div>
      <BackToTop />
    </footer>
  );
};

export default Footer;
