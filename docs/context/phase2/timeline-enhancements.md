# Timeline Component Enhancements

## Overview
Advanced timeline component with scroll-triggered animations, milestone reveals, and interactive hover states for showcasing academic and professional journey.

## Visual Design

### Structure
- Vertical timeline with centered line
- Alternating left/right layout on desktop
- Stacked layout on mobile
- Connecting dots at each milestone
- Animated progress line

### Visual Elements
```css
/* Timeline line */
.timeline-line {
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--primary) 50%,
    transparent 100%
  );
}

/* Milestone dots */
.timeline-dot {
  width: 16px;
  height: 16px;
  border: 3px solid var(--primary);
  background: var(--background);
  z-index: 10;
}

/* Active dot */
.timeline-dot.active {
  background: var(--primary);
  box-shadow: 0 0 20px var(--primary-alpha-50);
}
```

## Animation Implementation

### Scroll-Triggered Line Draw
```tsx
import { motion, useScroll, useTransform } from 'framer-motion';

const TimelineLine = () => {
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent"
      style={{ height: lineHeight }}
    />
  );
};
```

### Milestone Reveal Animation
```tsx
const MilestoneCard = ({ data, index, isLeft }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
    rootMargin: "-100px",
  });

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -50 : 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: index * 0.1 + 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`relative flex ${isLeft ? 'flex-row-reverse' : ''} items-center`}
    >
      {/* Milestone content */}
      <div className="flex-1 p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{data.title}</h3>
          <span className="text-sm text-muted-foreground">{data.date}</span>
        </div>
        <p className="text-muted-foreground mb-3">{data.organization}</p>
        <p className="text-sm">{data.description}</p>
        
        {/* Expandable details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t"
            >
              {data.details}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Connecting dot */}
      <motion.div
        variants={dotVariants}
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-primary rounded-full opacity-30"
        />
      </motion.div>
    </motion.div>
  );
};
```

## Interactive Features

### Hover Effects
```tsx
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

const handleMouseEnter = (index: number) => {
  setHoveredIndex(index);
  // Highlight connecting line segment
  // Show additional details
  // Animate related dots
};

const cardHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};
```

### Click to Expand
```tsx
const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

const toggleExpand = (index: number) => {
  setExpandedItems(prev => {
    const newSet = new Set(prev);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    return newSet;
  });
};
```

## Icon System
```tsx
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen,
  Code,
  Beaker
} from 'lucide-react';

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  achievement: Award,
  publication: BookOpen,
  project: Code,
  research: Beaker
};

const MilestoneIcon = ({ type, className }) => {
  const Icon = iconMap[type] || Briefcase;
  return <Icon className={className} />;
};
```

## Progress Indicator
```tsx
const TimelineProgress = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      // Calculate which milestone is currently in view
      const milestones = document.querySelectorAll('.milestone');
      milestones.forEach((milestone, index) => {
        const rect = milestone.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          setActiveIndex(index);
        }
      });
    });
    
    return unsubscribe;
  }, [scrollY]);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2">
      {milestones.map((_, index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index <= activeIndex ? 'bg-primary' : 'bg-muted'
          }`}
          whileHover={{ scale: 1.5 }}
          onClick={() => scrollToMilestone(index)}
        />
      ))}
    </div>
  );
};
```

## Mobile Optimization
```tsx
const TimelineMobile = ({ milestones }) => {
  return (
    <div className="relative pl-8">
      {/* Single line on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />
      
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative mb-8"
        >
          {/* Dot */}
          <div className="absolute -left-8 w-4 h-4 bg-primary rounded-full" />
          
          {/* Content */}
          <div className="bg-card p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MilestoneIcon type={milestone.type} className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">
                {milestone.date}
              </span>
            </div>
            <h3 className="font-semibold">{milestone.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {milestone.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
```

## Data Structure
```typescript
interface Milestone {
  id: string;
  type: 'education' | 'work' | 'achievement' | 'publication' | 'research';
  date: string;
  dateRange?: {
    start: Date;
    end?: Date;
  };
  title: string;
  organization: string;
  location?: string;
  description: string;
  details?: {
    achievements?: string[];
    skills?: string[];
    links?: Array<{
      label: string;
      url: string;
    }>;
  };
  highlight?: boolean;
}
```

## Accessibility
- Semantic HTML structure with proper headings
- ARIA labels for decorative elements
- Keyboard navigation between milestones
- Screen reader announcements for expansions
- Reduced motion respects user preferences

## Performance Considerations
- Use `will-change: transform` for animated elements
- Implement virtual scrolling for long timelines
- Lazy load expanded content
- Debounce scroll handlers
- Use CSS transforms over position changes
