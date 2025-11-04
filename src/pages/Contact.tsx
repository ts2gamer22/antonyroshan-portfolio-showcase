import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Linkedin, Instagram, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:antonyroshan03@gmail.com',
      username: 'antonyroshan03@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/antonyroshan03',
      username: 'antonyroshan03',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Spearmint1080',
      username: 'Spearmint1080',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/anto._.gjr',
      username: 'anto._.gjr',
    },
  ];

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-[80vh] flex items-center justify-center pt-24 pb-16">
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl mx-auto text-center">
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-8"
            >
              Get In Touch
            </motion.h1>

            {/* Social Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative p-8 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Content */}
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Icon */}
                      <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                      
                      {/* Label */}
                      <h3 className="text-lg font-semibold text-foreground">{link.label}</h3>
                      
                      {/* Username */}
                      <p className="text-sm text-muted-foreground break-all">{link.username}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;