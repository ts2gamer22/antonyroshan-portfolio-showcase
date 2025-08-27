import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  description?: string;
}

interface SkillsProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  // Technical Skills
  { name: 'Python', level: 90, category: 'Programming', description: 'Machine Learning, Data Analysis, Scientific Computing' },
  { name: 'MATLAB', level: 85, category: 'Programming', description: 'Numerical Methods, Simulations, Control Systems' },
  { name: 'React/TypeScript', level: 75, category: 'Programming', description: 'Web Development, Interactive UIs' },
  { name: 'SQL', level: 70, category: 'Programming', description: 'Database Management, Data Querying' },
  
  // Engineering Skills
  { name: 'Process Design', level: 85, category: 'Engineering', description: 'Chemical Process Optimization, P&ID Development' },
  { name: 'CFD Simulation', level: 80, category: 'Engineering', description: 'Fluid Dynamics, Heat Transfer Analysis' },
  { name: 'Bioreactor Design', level: 88, category: 'Engineering', description: 'Fermentation, Cell Culture Systems' },
  { name: 'ASPEN Plus', level: 75, category: 'Engineering', description: 'Process Simulation and Optimization' },
  
  // Research Skills
  { name: 'Machine Learning', level: 85, category: 'Research', description: 'Neural Networks, Deep Learning, Predictive Modeling' },
  { name: 'Data Analysis', level: 90, category: 'Research', description: 'Statistical Analysis, Visualization, Interpretation' },
  { name: 'Technical Writing', level: 88, category: 'Research', description: 'Research Papers, Documentation, Proposals' },
  { name: 'Experimental Design', level: 82, category: 'Research', description: 'DoE, Statistical Planning, Validation' },
];

const categoryColors: { [key: string]: string } = {
  'Programming': 'from-blue-500 to-indigo-500',
  'Engineering': 'from-green-500 to-emerald-500',
  'Research': 'from-purple-500 to-pink-500',
};

const Skills = ({ skills = defaultSkills }: SkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = Array.from(new Set(skills.map(s => s.category)));
  const filteredSkills = selectedCategory 
    ? skills.filter(s => s.category === selectedCategory)
    : skills;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getSkillColor = (category: string, level: number) => {
    if (level >= 85) return categoryColors[category] || 'from-gray-500 to-gray-600';
    if (level >= 70) return 'from-gray-400 to-gray-500';
    return 'from-gray-300 to-gray-400';
  };

  return (
    <section ref={ref} className="py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set spanning engineering, programming, and research methodologies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            All Skills
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ 
                    duration: 1,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getSkillColor(skill.category, skill.level)} rounded-full`}
                >
                  <motion.div
                    animate={{
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-white/20 rounded-full"
                  />
                </motion.div>
              </div>

              {/* Description on Hover */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  hoveredSkill === skill.name
                    ? { height: 'auto', opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {skill.description && (
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                )}
              </motion.div>

              {/* Decorative Elements */}
              {skill.level >= 85 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ 
                    delay: index * 0.05 + 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-xs font-bold">★</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded" />
            <span className="text-muted-foreground">Programming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded" />
            <span className="text-muted-foreground">Engineering</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
            <span className="text-muted-foreground">Research</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded" />
            <span className="text-muted-foreground">Expert Level (85%+)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
