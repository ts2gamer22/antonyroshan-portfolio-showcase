import { motion } from 'framer-motion';
import pythonImg from '@/assets/python.png';
import matlabImg from '@/assets/matlab.png';
import pytorchImg from '@/assets/pytorch.png';
import tensorflowImg from '@/assets/tensorflow.png';
import numpyImg from '@/assets/numpy.png';
import pandasImg from '@/assets/pandas.png';

const SkillsModern = () => {
  const skills = [
    { name: 'Python', image: pythonImg },
    { name: 'MATLAB', image: matlabImg },
    { name: 'PyTorch', image: pytorchImg },
    { name: 'TensorFlow', image: tensorflowImg },
    { name: 'NumPy', image: numpyImg },
    { name: 'Pandas', image: pandasImg },
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
