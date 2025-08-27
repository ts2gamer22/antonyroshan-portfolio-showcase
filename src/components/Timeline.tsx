import { Card } from '@/components/ui/card';
import { GraduationCap, Trophy, Users, Calendar, University } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'achievement' | 'leadership' | 'current';
  icon: React.ComponentType<{ className?: string }>;
}

const Timeline = () => {
  const { ref: containerRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const events: TimelineEvent[] = [
    {
      year: '2025',
      title: 'Doctoral Studies at Johns Hopkins University',
      description: 'Current PhD student in Chemical and Biomolecular Engineering Department',
      type: 'current',
      icon: University
    },
    {
      year: '2024',
      title: 'Graduated IIT Madras',
      description: 'B.Tech in Chemical Engineering with Minor in Bioprocess Engineering (CGPA: 9.31/10.00)',
      type: 'education',
      icon: GraduationCap
    },
    {
      year: '2021-2024',
      title: 'Academic Excellence at IIT Madras',
      description: 'Ranked #1 out of 117 students in Chemical Engineering cohort',
      type: 'achievement',
      icon: Trophy
    },
    {
      year: '2023-2024',
      title: 'Leadership Role',
      description: 'Corporate Relations Head at Entrepreneurship Cell IIT Madras, managing 25-member team',
      type: 'leadership',
      icon: Users
    },
    {
      year: '2021',
      title: 'IIT Madras Admission',
      description: 'Top 0.47% performance in JEE Advanced among 1.3 million candidates',
      type: 'achievement',
      icon: Trophy
    },
    {
      year: '2021',
      title: 'High School Excellence',
      description: 'Class XII from St. Michael\'s Academy, Chennai with 99.6% CGPA',
      type: 'education',
      icon: Calendar
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'current': return 'bg-primary text-primary-foreground';
      case 'education': return 'bg-blue-500 text-white';
      case 'achievement': return 'bg-gold text-gold-foreground';
      case 'leadership': return 'bg-green-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line with animated draw */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent"
        initial={{ height: 0, opacity: 0.6 }}
        animate={inView ? { height: '100%' } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      
      <div className="space-y-8">
        {events.map((event, index) => {
          const IconComponent = event.icon;
          return (
            <motion.div
              key={index}
              className="relative flex items-start space-x-6"
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              {/* Timeline marker with subtle pulse */}
              <motion.div
                className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getTypeColor(event.type)} shadow-lg`}
                animate={{ boxShadow: [
                  '0 0 0 0 rgba(0,0,0,0.15)',
                  '0 0 0 12px rgba(0,0,0,0.0)'
                ]}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IconComponent className="w-8 h-8" />
              </motion.div>
              
              {/* Event content */}
              <div className="flex-1 min-w-0 pb-8">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;