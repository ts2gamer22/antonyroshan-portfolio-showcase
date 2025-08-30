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
      {/* Always visible content */}
      {children}
      
      {/* Gradient border overlay - only shows on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Gradient border effect */}
        <div
          className="absolute inset-0 rounded-xl p-[2px]"
          style={{
            background: `linear-gradient(135deg,
              hsl(var(--primary)) 0%,
              hsl(var(--accent)) 25%,
              hsl(var(--primary)) 50%,
              hsl(var(--accent)) 75%,
              hsl(var(--primary)) 100%)`,
            backgroundSize: isHovered ? '300% 300%' : '100% 100%',
            animation: isHovered ? 'gradient-shift 3s linear infinite' : 'none'
          }}
        >
          {/* Inner mask to create border effect */}
          <div className="rounded-[10px] bg-background h-full w-full" />
        </div>
      </motion.div>

      {/* Subtle glow under the card */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl -z-10"
        style={{
          background: `radial-gradient(600px circle at center, hsl(var(--primary) / 0.15) 0%, transparent 40%)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
};

export default GradientBorder;
