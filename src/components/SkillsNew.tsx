import { motion } from 'framer-motion';
import { 
  Beaker, 
  Brain, 
  FlaskConical,
  LineChart,
  Microscope,
  TestTube2,
  Code2,
  Database,
  GitBranch,
  Server,
  Terminal
} from 'lucide-react';

const SkillsNew = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      skills: [
        { name: "Python", level: 95 },
        { name: "MATLAB", level: 90 },
        { name: "C++", level: 85 },
        { name: "C", level: 80 },
        { name: "R", level: 85 },
        { name: "JavaScript", level: 75 },
        { name: "TypeScript", level: 70 },
      ]
    },
    {
      title: "Machine Learning & AI",
      icon: Brain,
      skills: [
        { name: "TensorFlow", level: 90 },
        { name: "PyTorch", level: 85 },
        { name: "Scikit-learn", level: 95 },
        { name: "Neural Networks", level: 88 },
      ]
    },
    {
      title: "Data Science",
      icon: LineChart,
      skills: [
        { name: "Pandas", level: 95 },
        { name: "NumPy", level: 95 },
        { name: "Jupyter", level: 90 },
        { name: "Data Analysis", level: 92 },
      ]
    },
    {
      title: "Chemical Engineering",
      icon: FlaskConical,
      skills: [
        { name: "Process Simulation", level: 90 },
        { name: "Bioprocess Engineering", level: 95 },
        { name: "Reactor Design", level: 88 },
        { name: "Computational Modeling", level: 92 },
      ]
    },
    {
      title: "Development Tools",
      icon: GitBranch,
      skills: [
        { name: "Git", level: 85 },
        { name: "GitHub", level: 85 },
        { name: "Docker", level: 75 },
        { name: "Linux", level: 80 },
        { name: "VS Code", level: 90 },
        { name: "Anaconda", level: 88 },
      ]
    },
    {
      title: "Databases & Web",
      icon: Database,
      skills: [
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "React", level: 70 },
        { name: "HTML/CSS", level: 75 },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-foreground mb-12 text-center"
      >
        Technical Skills
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SkillsNew;
