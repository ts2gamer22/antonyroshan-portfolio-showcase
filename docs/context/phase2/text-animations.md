# Text Animation Patterns

## Text Splitter Component

A utility component that splits text into individual letters or words for animation.

### Implementation
```typescript
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextSplitterProps {
  text: string;
  mode?: 'letters' | 'words';
  className?: string;
  variants?: any;
  staggerDelay?: number;
}

export function TextSplitter({
  text,
  mode = 'letters',
  className = '',
  variants,
  staggerDelay = 0.05,
}: TextSplitterProps) {
  const elements = mode === 'letters' 
    ? text.split('') 
    : text.split(' ');
  
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {elements.map((el, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={variants}
        >
          {el}
          {mode === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

## Animation Variants

### Letter Stagger
```typescript
const letterStaggerVariants = {
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
```

### Wave Effect
```typescript
const waveVariants = {
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
```

### Typewriter Effect
```typescript
const typewriterVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.05,
      ease: 'linear',
    },
  },
};
```

### Fade & Blur
```typescript
const fadeBlurVariants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.17, 0.55, 0.55, 1],
    },
  },
};
```

## Hero Name Animation

### Complete Implementation
```typescript
import { motion } from 'framer-motion';
import { TextSplitter } from './TextSplitter';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const nameVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
};

export function HeroNameAnimation() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <motion.h1 className="text-6xl font-bold">
        <TextSplitter
          text="Antony Jose Pottackal"
          mode="words"
          variants={nameVariants}
          staggerDelay={0.1}
        />
      </motion.h1>
    </motion.div>
  );
}
```

## Descriptor Animation

### Sequential Reveal
```typescript
const descriptorVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2, // After name animation
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export function DescriptorAnimation() {
  const roles = ['AI Researcher', 'Full-Stack Developer', 'Problem Solver'];
  
  return (
    <motion.div
      variants={descriptorVariants}
      initial="hidden"
      animate="visible"
      className="mt-4"
    >
      <motion.p className="text-xl text-muted-foreground">
        {roles.map((role, index) => (
          <motion.span
            key={role}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.5 + index * 0.2,
              duration: 0.5,
            }}
            className="inline-block mr-2"
          >
            {role}
            {index < roles.length - 1 && ' •'}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
```

## Advanced Text Effects

### Glitch Effect
```typescript
const glitchVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      repeat: 3,
      repeatType: 'reverse',
    },
  },
  glitch: {
    x: [0, -2, 2, -1, 1, 0],
    y: [0, 1, -1, 2, -2, 0],
    filter: [
      'hue-rotate(0deg)',
      'hue-rotate(90deg)',
      'hue-rotate(180deg)',
      'hue-rotate(270deg)',
      'hue-rotate(0deg)',
    ],
    transition: {
      duration: 0.3,
    },
  },
};
```

### Scramble Effect
```typescript
import { useState, useEffect } from 'react';

function useScrambleText(text: string, duration = 1000) {
  const [scrambled, setScrambled] = useState(text);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setScrambled(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('')
      );
      
      iteration += 1 / 3;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
    }, duration / (maxIterations * 3));
    
    return () => clearInterval(interval);
  }, [text, duration, letters]);
  
  return scrambled;
}
```

## Performance Optimizations

### GPU Acceleration
```css
.text-animate {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}
```

### Reduced Motion
```typescript
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function AnimatedText({ text }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  if (prefersReducedMotion) {
    return <span>{text}</span>;
  }
  
  return (
    <TextSplitter
      text={text}
      variants={letterStaggerVariants}
    />
  );
}
```

### Intersection Observer
```typescript
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AnimateOnScroll({ children, variants }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
```

## Custom Easing Functions

### Elastic Easing
```typescript
const elasticEasing = [0.68, -0.55, 0.265, 1.55];

const elasticVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
};
```

### Custom Cubic Bezier
```typescript
const customEasing = {
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],
  easeOutElastic: [0.16, 1, 0.3, 1],
};
```

## Common Patterns

### Stagger Children in Container
```typescript
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1, // 1 for forward, -1 for backward
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
```

### Character Count Animation
```typescript
export function CountAnimation({ target, duration = 1 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const step = target / (duration * 60); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return <span>{count.toLocaleString()}</span>;
}
```
