import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import AuroraBackground from '@/components/backgrounds/AuroraBackground';
import FloatingParticles from '@/components/backgrounds/FloatingParticles';
import antonyHeadshot from '@/assets/anto.jpeg';

const HeroSectionEnhanced = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  
  const roles = ['Doctoral Student', 'Johns Hopkins University', 'Chemical & Biomolecular Engineering'];
  
  return (
    <AuroraBackground className="relative min-h-screen">
      <FloatingParticles 
        quantity={5} 
        color="rgba(120, 119, 198, 0.08)" 
        className="z-0"
      />
      
      <section className="relative pt-32 pb-20 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center">
        <div className="container max-w-7xl mx-auto relative z-10">
          {/* Mobile: Title first, then image, then rest */}
          {/* Desktop: Image left, all content right */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 lg:items-center">
            {/* Title - Mobile only (first position) */}
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h1 className="text-5xl font-semibold text-foreground leading-[1.1] tracking-tight text-center">
                Antony Roshan
              </h1>
            </motion.div>

            {/* Image - Second on mobile, first on desktop */}
            <motion.div
              className="flex justify-center lg:justify-start lg:order-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
                )}
                <img
                  src={antonyHeadshot}
                  alt="Antony Roshan - Professional Headshot"
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.6s ease-out',
                  }}
                />
              </div>
            </motion.div>

            {/* Content - Third on mobile, second on desktop */}
            <motion.div
              className="space-y-8 lg:space-y-12 lg:order-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              {/* Title - Desktop only */}
              <div className="hidden lg:block space-y-8">
                <h1 className="text-5xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight">
                  Antony Roshan
                </h1>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-lg lg:text-xl text-muted-foreground/80 font-light">
                  {roles.map((role, index) => (
                    <span key={role} className="inline-block">
                      {role}
                      {index < roles.length - 1 && <span className="mx-2 lg:mx-3 opacity-20">•</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roles - Mobile only */}
              <div className="lg:hidden flex flex-col gap-1 text-base text-muted-foreground/80 font-light text-center">
                {roles.map((role) => (
                  <span key={role} className="block">
                    {role}
                  </span>
                ))}
              </div>

              <div className="space-y-8 lg:space-y-10">
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/90 leading-relaxed max-w-xl font-light text-center lg:text-left">
                  I'm a current doctoral student at Johns Hopkins University in the Department of Chemical and Biomolecular Engineering, 
                  with expertise in machine learning, computational modeling, and bioprocess engineering.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="interactive group px-8 py-6 text-base" 
                    asChild
                  >
                    <Link to="/projects">
                      <span>View My Work</span>
                      <ArrowRight className="inline w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="professional" 
                    size="lg" 
                    className="interactive group px-8 py-6 text-base" 
                    asChild
                  >
                    <Link to="/contact">
                      <Mail className="inline w-4 h-4 mr-2" />
                      <span>Get In Touch</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 lg:gap-16 pt-8 lg:pt-12 border-t border-border/5 justify-center lg:justify-start">
                {[
                  { value: 'PhD', label: 'Johns Hopkins' },
                  { value: '#1', label: 'IIT Madras Cohort' },
                  { value: '2025', label: 'Current Year' },
                ].map((stat) => (
                  <div key={stat.value} className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl font-medium text-foreground/90">
                      {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground/70 mt-1 font-light">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
          onClick={scrollToContent}
          aria-label="Scroll to content"
        >
          <ChevronDown size={24} className="opacity-60" />
        </button>
      </section>
    </AuroraBackground>
  );
};

export default HeroSectionEnhanced;
