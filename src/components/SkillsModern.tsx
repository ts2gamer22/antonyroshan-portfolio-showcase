import { motion } from 'framer-motion';

const SkillsModern = () => {
  const skills = [
    { name: 'Python', image: '/skills/python.png' },
    { name: 'MATLAB', image: '/skills/matlab.png' },
    { name: 'PyTorch', image: '/skills/pytorch.png' },
    { name: 'TensorFlow', image: '/skills/tensorflow.png' },
    { name: 'NumPy', image: '/skills/numpy.png' },
    { name: 'Pandas', image: '/skills/pandas.png' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src={skill.image}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-medium text-foreground text-center">
              {skill.name}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsModern;
