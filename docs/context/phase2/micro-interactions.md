# Micro-interactions — Phase 2

## Button Interactions

### Primary Button States
```typescript
import { motion } from 'framer-motion';

const buttonVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  pressed: {
    scale: 0.98,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.1,
      ease: "easeIn"
    }
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed"
  }
};

// Ripple effect on click
const RippleButton = ({ children, onClick }) => {
  const [ripples, setRipples] = useState([]);
  
  const addRipple = (e: MouseEvent) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };
  
  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      onClick={(e) => {
        addRipple(e);
        onClick?.(e);
      }}
      className="relative overflow-hidden"
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
};
```

### Icon Button Animations
```typescript
const iconButtonVariants = {
  rest: { rotate: 0 },
  hover: { 
    rotate: 15,
    transition: {
      duration: 0.3,
      ease: "anticipate"
    }
  },
  tap: { 
    rotate: -15,
    scale: 0.9 
  }
};

// Morphing icon button (e.g., menu to close)
const MorphingIconButton = ({ isOpen, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      className="relative w-10 h-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute left-1 right-1 h-0.5 bg-current"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute left-1 right-1 h-0.5 bg-current"
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? 20 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute left-1 right-1 h-0.5 bg-current"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
```

## Link Hover Effects

### Underline Growth
```typescript
const UnderlineLink = ({ children, href }) => {
  return (
    <motion.a
      href={href}
      className="relative inline-block"
      whileHover="hover"
      initial="rest"
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-0.5 bg-primary"
        variants={{
          rest: { width: "0%" },
          hover: { 
            width: "100%",
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }
        }}
      />
    </motion.a>
  );
};

// Gradient underline
const GradientUnderlineLink = ({ children, href }) => {
  return (
    <motion.a
      href={href}
      className="relative inline-block"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-1 rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--primary), var(--secondary))"
        }}
        variants={{
          rest: { 
            width: "0%",
            opacity: 0
          },
          hover: { 
            width: "100%",
            opacity: 1,
            transition: {
              width: { duration: 0.4, ease: "easeOut" },
              opacity: { duration: 0.2 }
            }
          }
        }}
        initial="rest"
      />
    </motion.a>
  );
};
```

## Input Field Interactions

### Focus Animations
```typescript
const AnimatedInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  return (
    <div className="relative">
      <motion.label
        className="absolute left-3 pointer-events-none text-muted-foreground"
        animate={{
          y: isFocused || hasValue ? -20 : 0,
          scale: isFocused || hasValue ? 0.8 : 1,
          x: isFocused || hasValue ? -10 : 0,
          color: isFocused ? "var(--primary)" : "var(--muted-foreground)"
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}
      </motion.label>
      
      <motion.input
        {...props}
        className="w-full px-3 py-2 border rounded-md"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        whileFocus={{
          boxShadow: "0 0 0 3px rgba(var(--primary-rgb), 0.1)"
        }}
      />
      
      {/* Animated border */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        animate={{
          width: isFocused ? "100%" : "0%"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};
```

## Card Hover Effects

### Lift and Shadow
```typescript
const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Gradient border animation
const GradientBorderCard = ({ children }) => {
  return (
    <motion.div
      className="relative p-[2px] rounded-xl overflow-hidden"
      whileHover="hover"
      initial="rest"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, var(--primary), var(--secondary), var(--primary))",
          backgroundSize: "200% 200%"
        }}
        variants={{
          rest: { backgroundPosition: "0% 50%" },
          hover: {
            backgroundPosition: "100% 50%",
            transition: {
              duration: 2,
              ease: "linear",
              repeat: Infinity
            }
          }
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-background rounded-xl p-6">
        {children}
      </div>
    </motion.div>
  );
};
```

## Loading States

### Skeleton Loading
```typescript
const SkeletonLoader = ({ width, height }) => {
  return (
    <motion.div
      className="bg-muted rounded"
      style={{ width, height }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%"]
      }}
      transition={{
        duration: 1.5,
        ease: "linear",
        repeat: Infinity
      }}
      style={{
        backgroundImage: "linear-gradient(90deg, var(--muted) 25%, var(--muted-foreground) 50%, var(--muted) 75%)",
        backgroundSize: "200% 100%"
      }}
    />
  );
};

// Pulse loader
const PulseLoader = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
};
```

## Toggle & Switch Animations

### Animated Switch
```typescript
const AnimatedSwitch = ({ checked, onChange }) => {
  return (
    <motion.button
      className={`relative w-14 h-7 rounded-full ${
        checked ? "bg-primary" : "bg-muted"
      }`}
      onClick={() => onChange(!checked)}
      animate={{
        backgroundColor: checked ? "var(--primary)" : "var(--muted)"
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md"
        animate={{
          x: checked ? 28 : 2
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
    </motion.button>
  );
};
```

## Tooltip & Popover

### Smooth Tooltip
```typescript
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute bottom-full left-1/2 mb-2 px-3 py-1 bg-popover text-popover-foreground rounded-md shadow-lg pointer-events-none z-50"
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.2 }}
          >
            {content}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-4 border-transparent border-t-popover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

## Success/Error Feedback

### Animated Checkmark
```typescript
const SuccessCheckmark = ({ show }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.1 }
      }
    }
  };
  
  return (
    <AnimatePresence>
      {show && (
        <motion.svg
          width="24"
          height="24"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="var(--success)"
            strokeWidth="2"
            fill="none"
            variants={pathVariants}
          />
          <motion.path
            d="M7 12l3 3 7-7"
            stroke="var(--success)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
};
```

## Performance Tips

1. **Use transform and opacity**: These properties are GPU-accelerated
2. **Avoid layout thrashing**: Don't animate width/height when possible
3. **Batch animations**: Use stagger for multiple elements
4. **Lazy load heavy animations**: Only initialize when in viewport
5. **Test on real devices**: Ensure smooth 60fps on mobile

```typescript
// Performance-optimized animation config
const optimizedConfig = {
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.8,
    restDelta: 0.001,
    restSpeed: 0.001
  },
  // Use GPU-accelerated properties
  style: {
    transform: "translateZ(0)", // Force GPU acceleration
    willChange: "transform" // Hint to browser
  }
};
```
