import { motion } from 'framer-motion';

interface TextSplitterProps {
  text: string;
  mode?: 'letters' | 'words';
  className?: string;
  variants?: any;
  staggerDelay?: number;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

/**
 * Splits text into individual letters or words for animation
 */
export function TextSplitter({
  text,
  mode = 'letters',
  className = '',
  variants,
  staggerDelay = 0.05,
  as: Component = 'span',
}: TextSplitterProps) {
  const elements = mode === 'letters' 
    ? text.split('') 
    : text.split(' ');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
  
  const MotionComponent = motion[Component];
  
  return (
    <MotionComponent
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {elements.map((el, index) => (
        <motion.span
          key={`${el}-${index}`}
          className="inline-block"
          variants={variants}
          style={{ display: 'inline-block' }}
        >
          {el === ' ' ? '\u00A0' : el}
          {mode === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

// Pre-built animation variants
export const letterStaggerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
};

export const scaleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
};

export const waveVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  }),
};
