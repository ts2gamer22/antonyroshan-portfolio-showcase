import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  className?: string;
  showRadialGradient?: boolean;
  children?: React.ReactNode;
}

export const AuroraBackground = ({
  className,
  showRadialGradient = false,
  children,
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Smooth interpolation for gentler movement
      mousePosition.current = {
        x: mousePosition.current.x + (x - mousePosition.current.x) * 0.1,
        y: mousePosition.current.y + (y - mousePosition.current.y) * 0.1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      {/* Aurora Effect Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle base gradient - Airbnb style */}
        <div className="absolute -inset-[10px] opacity-20">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(120, 119, 198, 0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Subtle Aurora Wave 1 - Very gentle movement */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 80% 50% at 50% 130%,
                rgba(120, 119, 198, 0.08),
                transparent 50%
              )
            `,
          }}
          animate={{
            translateY: [0, -30, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0,
          }}
        />

        {/* Subtle Aurora Wave 2 - Minimal pink accent */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 70% 40% at 50% -30%,
                rgba(255, 119, 198, 0.05),
                transparent 50%
              )
            `,
          }}
          animate={{
            translateY: [0, 30, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Subtle Aurora Wave 3 - Gentle blue */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 40% 60% at -10% 50%,
                rgba(120, 219, 255, 0.06),
                transparent 50%
              )
            `,
          }}
          animate={{
            translateX: [0, 20, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />


        {/* Interactive gradient that follows mouse */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: `
              radial-gradient(
                600px at ${mousePosition.current.x * 100}% ${mousePosition.current.y * 100}%,
                rgba(120, 119, 198, 0.15),
                transparent 40%
              )
            `,
          }}
        />

        {/* Animated gradient mesh */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="aurora-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
            </filter>
            <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                stopColor="rgba(120, 119, 198, 0.3)"
                animate={{ stopColor: ["rgba(120, 119, 198, 0.3)", "rgba(255, 119, 198, 0.3)", "rgba(120, 119, 198, 0.3)"] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.stop
                offset="50%"
                stopColor="rgba(255, 119, 198, 0.3)"
                animate={{ stopColor: ["rgba(255, 119, 198, 0.3)", "rgba(120, 219, 255, 0.3)", "rgba(255, 119, 198, 0.3)"] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.stop
                offset="100%"
                stopColor="rgba(120, 219, 255, 0.3)"
                animate={{ stopColor: ["rgba(120, 219, 255, 0.3)", "rgba(255, 219, 120, 0.3)", "rgba(120, 219, 255, 0.3)"] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </linearGradient>
          </defs>
          <motion.rect
            width="100%"
            height="100%"
            fill="url(#aurora-gradient)"
            filter="url(#aurora-blur)"
            opacity="0.4"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* Optional radial gradient overlay */}
      {showRadialGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AuroraBackground;
