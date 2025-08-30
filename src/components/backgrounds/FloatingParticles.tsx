import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  className?: string;
  quantity?: number;
  stationary?: boolean;
  color?: string;
}

export const FloatingParticles = ({
  className,
  quantity = 8, // Very minimal - Airbnb style
  stationary = false,
  color = 'rgba(120, 119, 198, 0.15)', // Very subtle color
}: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particlesArray: Particle[] = [];
    
    for (let i = 0; i < quantity; i++) {
      particlesArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1, // Small particles: 1-3px
        duration: Math.random() * 20 + 30, // Slow movement: 30-50s
        delay: Math.random() * 20, // Random start delay
      });
    }
    
    setParticles(particlesArray);
  }, [quantity]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            filter: 'blur(0.5px)',
          }}
          animate={
            stationary
              ? {}
              : {
                  x: [0, 30, -30, 0],
                  y: [0, -30, 30, -15, 0],
                  opacity: [0, 0.8, 0.6, 0.8, 0],
                }
          }
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Additional subtle floating orbs for depth */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            width: 80,
            height: 80,
            background: `radial-gradient(circle, ${color.replace('0.15', '0.05')} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, 50, 0, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 60 + i * 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
