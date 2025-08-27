import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TextSplitter, fadeUpVariants } from '@/components/TextSplitter';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import antonyHeadshot from '@/assets/antony-headshot.jpg';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  // Mouse parallax for image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };
  
  const roleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.5 + i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.8,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 2 + i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
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
    <section ref={heroRef} className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center">
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <div className="container relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div className="overflow-hidden">
                <TextSplitter
                  text="Antony Roshan"
                  mode="words"
                  className="text-5xl lg:text-6xl font-bold text-foreground leading-tight block"
                  variants={fadeUpVariants}
                  staggerDelay={0.1}
                  as="h1"
                />
              </motion.div>
              
              <motion.div className="flex flex-wrap gap-2 text-xl lg:text-2xl text-muted-foreground font-light">
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
                    {index < roles.length - 1 && <span className="mx-2">|</span>}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="space-y-6"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
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
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Button variant="hero" size="lg" className="interactive group" asChild>
                    <Link to="/projects">
                      <span>View My Work</span>
                      <motion.div
                        className="inline-block ml-2"
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <ArrowRight className="inline" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Button variant="professional" size="lg" className="interactive group" asChild>
                    <Link to="/contact">
                      <motion.div
                        className="inline-block mr-2"
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Mail className="inline" />
                      </motion.div>
                      <span>Get In Touch</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div className="flex flex-wrap gap-8 pt-8">
              {[
                { value: 'PhD', label: 'Johns Hopkins' },
                { value: '#1', label: 'IIT Madras Cohort' },
                { value: '2025', label: 'Current Year' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.value}
                  className="text-center"
                  custom={index}
                  variants={statsVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="text-2xl font-bold text-primary"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.17, 0.55, 0.55, 1],
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
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-hero-gradient rounded-3xl blur-2xl opacity-30 scale-105"
                animate={{
                  scale: [1.05, 1.1, 1.05],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Image with loading state */}
              <motion.div
                className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-glow"
                whileHover={{
                  scale: prefersReducedMotion ? 1 : 1.05,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {!imageLoaded && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                <img
                  src={antonyHeadshot}
                  alt="Antony Roshan - Professional Headshot"
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={scrollToContent}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;