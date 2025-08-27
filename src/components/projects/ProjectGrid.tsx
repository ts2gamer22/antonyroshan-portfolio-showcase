import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ProjectGridProps {
  children: ReactNode;
  className?: string;
}

// Container variants for staggered children
const containerVariants = {
  hidden: { 
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

// Reduced motion variants
const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const ProjectGrid = ({ children, className = '' }: ProjectGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px',
  });
  const shouldReduceMotion = useReducedMotion();

  const finalVariants = shouldReduceMotion ? reducedMotionVariants : containerVariants;

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={finalVariants}
    >
      {children}
    </motion.div>
  );
};

export default ProjectGrid;
