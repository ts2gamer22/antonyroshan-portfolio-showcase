import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface PullQuoteProps {
  children: ReactNode;
  author?: string;
  role?: string;
  variant?: 'default' | 'minimal' | 'centered';
}

const PullQuote = ({ children, author, role, variant = 'default' }: PullQuoteProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const quoteMarkVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.2,
      transition: {
        delay: 0.3,
        duration: 0.4
      }
    }
  };

  if (variant === 'minimal') {
    return (
      <motion.blockquote
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        className="relative my-12 mx-auto max-w-prose border-l-4 border-primary/30 pl-6"
      >
        <p className="text-xl font-serif leading-relaxed text-foreground/90 italic">
          {children}
        </p>
        {author && (
          <footer className="mt-4">
            <cite className="not-italic">
              <span className="text-sm font-semibold text-foreground">— {author}</span>
              {role && <span className="text-muted-foreground text-sm">, {role}</span>}
            </cite>
          </footer>
        )}
      </motion.blockquote>
    );
  }

  if (variant === 'centered') {
    return (
      <motion.blockquote
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        className="relative my-16 mx-auto max-w-prose text-center"
      >
        <motion.span 
          variants={quoteMarkVariants}
          className="block text-6xl text-primary/20 font-serif mb-4"
        >
          "
        </motion.span>
        
        <p className="text-2xl font-serif leading-relaxed text-foreground/90 italic">
          {children}
        </p>
        
        {author && (
          <footer className="mt-6">
            <cite className="not-italic">
              <span className="block text-lg font-semibold text-foreground">
                {author}
              </span>
              {role && (
                <span className="text-muted-foreground text-sm">
                  {role}
                </span>
              )}
            </cite>
          </footer>
        )}
      </motion.blockquote>
    );
  }

  // Default variant
  return (
    <motion.blockquote
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="relative my-12 mx-auto max-w-prose"
    >
      <div className="relative bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent rounded-lg p-8 border-l-4 border-primary/30">
        <motion.span 
          variants={quoteMarkVariants}
          className="absolute -top-4 -left-2 text-8xl text-primary/20 font-serif select-none"
          aria-hidden="true"
        >
          "
        </motion.span>
        
        <p className="text-2xl font-serif leading-relaxed text-foreground/90 italic">
          {children}
        </p>
        
        <motion.span 
          variants={quoteMarkVariants}
          className="absolute -bottom-8 right-4 text-8xl text-primary/20 font-serif rotate-180 select-none"
          aria-hidden="true"
        >
          "
        </motion.span>

        {author && (
          <footer className="mt-6 text-right">
            <cite className="not-italic">
              <span className="block text-lg font-semibold text-foreground">
                {author}
              </span>
              {role && (
                <span className="text-muted-foreground text-sm">
                  {role}
                </span>
              )}
            </cite>
          </footer>
        )}
      </div>
    </motion.blockquote>
  );
};

export default PullQuote;
