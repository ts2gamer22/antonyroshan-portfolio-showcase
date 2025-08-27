import { motion } from 'framer-motion';

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

const ProjectFilters = ({ categories, activeCategory, onChange }: ProjectFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={`
              px-4 py-2 rounded-full text-sm font-medium border transition-all
              ${isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-background text-foreground border-border hover:bg-muted'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ProjectFilters;
