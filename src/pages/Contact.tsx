import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Linkedin, Instagram, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const Contact = () => {
  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:antonyroshan03@gmail.com',
      description: 'antonyroshan03@gmail.com',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/antonyroshan',
      description: 'Professional Profile',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/antonyroshan',
      description: 'Code Repository',
      color: 'from-gray-700 to-gray-800',
      hoverColor: 'hover:from-gray-800 hover:to-gray-900'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/antonyroshan',
      description: 'Personal Updates',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600'
    },
  ];

  return (
    <>
      <Navigation />
      <Toaster position="bottom-right" />
      <main id="main-content" className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold text-foreground">Get In Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              I'm always interested in discussing research opportunities, academic collaborations, 
              or potential career opportunities in engineering and technology.
            </p>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
                <ContactForm />
              </motion.div>

              {/* Contact Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Connect With Me</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${link.color} text-white mr-4`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-foreground">{link.label}</h3>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-3">Availability</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Currently available for opportunities
                    </p>
                    <p>📍 Chennai, Tamil Nadu, India</p>
                    <p>📞 +91 9884629287</p>
                    <p>⏰ Response time: Within 24 hours</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="px-4 sm:px-6 lg:px-8 mt-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-12 rounded-2xl bg-hero-gradient text-primary-foreground shadow-glow relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/5"
                animate={{
                  backgroundImage: [
                    'radial-gradient(circle at 20% 50%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                    'radial-gradient(circle at 80% 50%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                    'radial-gradient(circle at 20% 50%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <h2 className="text-3xl font-bold mb-4 relative z-10">Let's Collaborate</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto relative z-10">
                Whether you're interested in research collaboration, have exciting career opportunities, 
                or want to discuss innovative projects in chemical engineering and machine learning.
              </p>
              <motion.div
                className="flex justify-center gap-4 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="/cv.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  Download CV
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;