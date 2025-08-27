import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  isHovered?: boolean;
}

const GradientBorder = ({ children, className = '', isHovered = false }: GradientBorderProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Gradient ring wrapper that actually wraps content to show a 2px ring */}
      <motion.div
        className="rounded-xl p-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ willChange: 'transform' }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="rounded-xl p-[2px]"
          style={{
            background: `linear-gradient(135deg,
              hsl(var(--primary)) 0%,
hsl(var(--secondary)) 25%,
              hsl(var(--primary)) 50%,
              hsl(var(--secondary)) 75%,
              hsl(var(--primary)) 100%)`,
            backgroundSize: '300% 300%'
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%'
          }}
          transition={{ duration: 3, ease: 'linear', repeat: isHovered ? Infinity : 0 }}
        >
          {/* Card content container inside the ring */}
          <div className="rounded-[10px] bg-background h-full">
            {children}
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle glow under the card */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(600px circle at center, hsl(var(--primary) / 0.15) 0%, transparent 40%)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default GradientBorder;
