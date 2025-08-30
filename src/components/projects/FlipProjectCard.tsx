import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight, Code2, Rocket, Zap, Calendar, User } from 'lucide-react';

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

interface FlipProjectCardProps {
  project: Project;
  index: number;
}

const FlipProjectCard = ({ project }: FlipProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComponent = project.icon;

  return (
    <div
      className="group relative h-[480px] w-full [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700 ease-out'
        )}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-card',
            'border border-border',
            'shadow-lg dark:shadow-xl',
            'transition-all duration-700',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20'
          )}
        >
          {/* Project Image */}
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              animate={{
                scale: isFlipped ? 1.1 : 1,
              }}
              transition={{ duration: 0.7 }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                {project.category}
              </Badge>
            </div>
          </div>

          {/* Front content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
            <div className="flex items-start gap-4">
              <motion.div
                className="p-3 bg-primary/10 rounded-xl flex-shrink-0"
                animate={{
                  rotate: isFlipped ? 360 : 0,
                }}
                transition={{ duration: 0.7 }}
              >
                <IconComponent className="h-6 w-6 text-primary" />
              </motion.div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold text-foreground line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.duration}
                </p>
              </div>
            </div>
            
            {/* Description preview */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.description}
            </p>
            
            {/* Skills preview */}
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 3).map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {project.skills.length > 3 && (
                <Badge variant="ghost" className="text-xs">
                  +{project.skills.length - 3}
                </Badge>
              )}
            </div>

            {/* Hover indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Hover for details</span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-4 w-4 text-primary" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-6',
            'bg-card',
            'border border-border',
            'shadow-lg dark:shadow-xl',
            'flex flex-col',
            'transition-all duration-700',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20'
          )}
        >
          {/* Back gradient accent */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          
          <div className="relative z-10 flex-1 space-y-5">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {project.title}
                </h3>
              </div>
              
              {/* Meta info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <User className="h-3 w-3 mt-0.5" />
                  <span className="line-clamp-2">{project.guide}</span>
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Rocket className="h-4 w-4 text-primary" />
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {project.achievements.slice(0, 3).map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      duration: 0.3,
                    }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="line-clamp-2">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.05 + 0.3,
                      duration: 0.2,
                    }}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="relative z-10 mt-auto border-t border-border pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className={cn(
                'group/cta relative',
                'flex items-center justify-between',
                'rounded-lg p-3',
                'transition-all duration-300',
                'bg-muted/50',
                'hover:bg-primary/10',
                'hover:scale-[1.02] cursor-pointer',
                'border border-transparent hover:border-primary/20'
              )}
            >
              <span className="text-sm font-semibold text-foreground group-hover/cta:text-primary transition-colors">
                View Full Details
              </span>
              <div className="relative">
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-4 w-4 text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipProjectCard;
