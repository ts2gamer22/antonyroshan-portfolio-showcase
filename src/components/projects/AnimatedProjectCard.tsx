import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GradientBorder from './GradientBorder';
import { LucideIcon } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  duration: string;
  guide: string;
  icon: LucideIcon;
  image: string;
  description: string;
  achievements: string[];
  skills: string[];
}

interface AnimatedProjectCardProps {
  project: Project;
  index: number;
}

// Card animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.94,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0], // Custom easing for smooth deceleration
      filter: {
        duration: 0.4,
      },
    },
  },
};

const hoverVariants = {
  rest: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Image variants for parallax effect
const imageVariants = {
  rest: {
    scale: 1,
    filter: 'brightness(1)',
  },
  hover: {
    scale: 1.1,
    filter: 'brightness(1.1)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Badge animation variants
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const AnimatedProjectCard = ({ project, index }: AnimatedProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });
  const shouldReduceMotion = useReducedMotion();

  const IconComponent = project.icon;

  // Simplified animations for reduced motion
  const finalCardVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : cardVariants;

  const finalHoverVariants = shouldReduceMotion
    ? { rest: {}, hover: {} }
    : hoverVariants;

  return (
    <motion.article
      ref={ref}
      className="group relative"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={finalCardVariants}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        variants={finalHoverVariants}
        initial="rest"
        animate={isHovered ? 'hover' : 'rest'}
      >
        <GradientBorder isHovered={isHovered}>
          <Card className="overflow-hidden border-0 shadow-card hover:shadow-hover transition-shadow duration-300">
            {/* Project Image with Parallax */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
              <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                variants={imageVariants}
                initial="rest"
                animate={isHovered ? 'hover' : 'rest'}
                loading="lazy"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category badge overlay */}
              <div className="absolute top-4 right-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  variants={badgeVariants}
                >
                  <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                    {project.category}
                  </Badge>
                </motion.div>
              </div>
            </div>

            <div className="p-8">
              {/* Header with Icon */}
              <div className="flex items-start space-x-4 mb-6">
                <motion.div
                  className="p-3 bg-primary/10 rounded-xl"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <IconComponent className="h-8 w-8 text-primary" />
                </motion.div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold text-foreground leading-tight line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.duration}
                  </p>
                </div>
              </div>

              {/* Guide Info */}
              <motion.div
                className="mb-6 p-4 bg-accent-light rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Guide:</span> {project.guide}
                </p>
              </motion.div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>

              {/* Key Achievements - Show limited on card */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-foreground mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {project.achievements.slice(0, 2).map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Skills Tags with Stagger */}
              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.6,
                    },
                  },
                }}
              >
                <div className="flex flex-wrap gap-2">
                  {project.skills.slice(0, 4).map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                  {project.skills.length > 4 && (
                    <motion.div variants={badgeVariants}>
                      <Badge variant="ghost" className="text-xs">
                        +{project.skills.length - 4} more
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </Card>
        </GradientBorder>
      </motion.div>
    </motion.article>
  );
};

export default AnimatedProjectCard;
