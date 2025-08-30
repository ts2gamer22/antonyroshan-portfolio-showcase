import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon, Calendar, User } from 'lucide-react';

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

  return (
    <div
      className="group relative h-[560px] w-full [perspective:2000px]"
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
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              animate={{
                scale: isFlipped ? 1.08 : 1,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="backdrop-blur-md bg-background/90 shadow-sm px-3 py-1">
                {project.category}
              </Badge>
            </div>
          </div>

          {/* Front content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-5">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground leading-tight line-clamp-2">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{project.duration}</span>
              </div>
            </div>
            
            {/* Description preview */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {project.description}
            </p>
            
            {/* Skills preview */}
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 4).map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-xs px-2.5 py-0.5">
                  {skill}
                </Badge>
              ))}
              {project.skills.length > 4 && (
                <Badge variant="ghost" className="text-xs px-2.5 py-0.5">
                  +{project.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-8',
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
          
          <div className="relative z-10 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="space-y-3 mb-5">
              <h3 className="text-lg font-bold text-foreground leading-tight">
                {project.title}
              </h3>
              
              {/* Meta info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed line-clamp-2">{project.guide}</span>
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="space-y-3 mb-5 flex-1 overflow-y-auto">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
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
                    <span className="leading-relaxed line-clamp-2">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Technologies & Skills
              </h4>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {project.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.03 + 0.3,
                      duration: 0.2,
                    }}
                  >
                    <Badge variant="secondary" className="text-xs px-2.5 py-0.5">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipProjectCard;
