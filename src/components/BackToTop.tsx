import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      setProgress(pct);
      setVisible(scrolled > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      style={{ willChange: 'transform' }}
    >
      <div className="relative">
        <ArrowUp className="w-5 h-5" />
        {/* Progress ring */}
        <svg className="absolute -inset-1.5" viewBox="0 0 36 36" aria-hidden="true">
          <path
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <motion.path
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="100 100"
            strokeDashoffset={100 - progress}
          />
        </svg>
      </div>
    </motion.button>
  );
};

export default BackToTop;

