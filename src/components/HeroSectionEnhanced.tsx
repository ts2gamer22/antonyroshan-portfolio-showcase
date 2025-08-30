import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TextSplitter, fadeUpVariants } from '@/components/TextSplitter';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import AuroraBackground from '@/components/backgrounds/AuroraBackground';
import FloatingParticles from '@/components/backgrounds/FloatingParticles';
import ThreeHeroCanvas from '@/components/backgrounds/ThreeHeroCanvas';
import antonyHeadshot from '@/assets/anto.jpeg';

const HeroSectionEnhanced = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  
  // Mouse parallax for image - more subtle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);
  
  useEffect(() => {
    if (prefersReducedMotion || !imageRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = imageRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);
  
  // Animation variants with slower, smoother timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };
  
  const roleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + i * 0.2,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };
  
  const statsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.5 + i * 0.15,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  };
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  
  const roles = ['Doctoral Student', 'Johns Hopkins University', 'Chemical & Biomolecular Engineering'];
  
  return (
    <AuroraBackground className="relative min-h-screen">
      {/* Subtle floating particles */}
      <FloatingParticles 
        quantity={5} 
        color="rgba(120, 119, 198, 0.08)" 
        className="z-0"
      />
      <ThreeHeroCanvas />
      
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center">
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Content - Airbnb style spacing */}
            <div className="space-y-12 lg:order-2">
              <div className="space-y-8">
                <motion.div className="overflow-hidden">
                  <TextSplitter
                    text="Antony Roshan"
                    mode="words"
                    className="text-5xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight block"
                    variants={fadeUpVariants}
                    staggerDelay={0.15}
                    as="h1"
                  />
                </motion.div>
                
                <motion.div className="flex flex-wrap gap-4 text-lg lg:text-xl text-muted-foreground/80 font-light">
                  {roles.map((role, index) => (
                    <motion.span
                      key={role}
                      custom={index}
                      variants={roleVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {role}
                      {index < roles.length - 1 && <span className="mx-3 opacity-20">•</span>}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="space-y-10"
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
              >
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed max-w-xl font-light">
                  I'm a current doctoral student at Johns Hopkins University in the Department of Chemical and Biomolecular Engineering, 
                  with expertise in machine learning, computational modeling, and bioprocess engineering.
                </p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="interactive group px-8 py-6 text-base" 
                      asChild
                    >
                      <Link to="/projects">
                        <span>View My Work</span>
                        <motion.div
                          className="inline-block ml-2"
                          animate={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          <ArrowRight className="inline w-4 h-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Button 
                      variant="professional" 
                      size="lg" 
                      className="interactive group px-8 py-6 text-base" 
                      asChild
                    >
                      <Link to="/contact">
                        <motion.div
                          className="inline-block mr-2"
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          <Mail className="inline w-4 h-4" />
                        </motion.div>
                        <span>Get In Touch</span>
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Quick Stats - Minimal and clean */}
              <motion.div className="flex flex-wrap gap-16 pt-12 border-t border-border/5">
                {[
                  { value: 'PhD', label: 'Johns Hopkins' },
                  { value: '#1', label: 'IIT Madras Cohort' },
                  { value: '2025', label: 'Current Year' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.value}
                    custom={index}
                    variants={statsVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <motion.div
                      className="text-3xl font-medium text-foreground/90"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground/70 mt-1 font-light">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Image - Cleaner presentation */}
            <motion.div
              className="flex justify-center lg:justify-start lg:order-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.6,
                duration: 1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <motion.div
                ref={imageRef}
                className="relative"
                style={{
                  y: prefersReducedMotion ? 0 : imageY,
                  scale: prefersReducedMotion ? 1 : imageScale,
                  rotateX: prefersReducedMotion ? 0 : rotateX,
                  rotateY: prefersReducedMotion ? 0 : rotateY,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Very subtle glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-3xl opacity-50 scale-110"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Image with clean presentation */}
                <motion.div
                  className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{
                    scale: prefersReducedMotion ? 1 : 1.02,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
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
                      transition: 'opacity 0.8s ease-out',
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator - Very subtle */}
        <motion.button
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
          onClick={scrollToContent}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to content"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown size={24} className="opacity-60" />
          </motion.div>
        </motion.button>
      </section>
    </AuroraBackground>
  );
};

export default HeroSectionEnhanced;
