import { motion } from 'framer-motion';
import { Code2, Brain, BarChart3 } from 'lucide-react';

const SkillsModern = () => {
  const skillCategories = [
    {
      title: "Programming",
      icon: Code2,
      skills: ["Python", "MATLAB", "C++", "JavaScript"],
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500"
    },
    {
      title: "ML & AI",
      icon: Brain,
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Deep Learning"],
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500"
    },
    {
      title: "Data Science",
      icon: BarChart3,
      skills: ["NumPy", "Pandas", "Matplotlib", "Data Visualization"],
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className={`relative bg-gradient-to-br ${category.gradient} border border-border rounded-xl p-6 h-full hover:border-primary/50 transition-all duration-300`}>
            {/* Icon */}
            <div className={`mb-4 ${category.iconColor}`}>
              <category.icon className="w-8 h-8" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {category.title}
            </h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-background/50 dark:bg-card/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground hover:border-primary/50 transition-all duration-200 text-center"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsModern;
