import { motion } from 'framer-motion';

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

const ProjectFilters = ({ categories, activeCategory, onChange }: ProjectFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={`
              px-5 py-2.5 rounded-full text-sm font-medium border transition-all
              ${isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-background text-foreground border-border hover:bg-muted hover:border-muted-foreground/20'}
            `}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ProjectFilters;
