# PullQuote Component

## Purpose
A visually distinctive component for highlighting key quotes, achievements, or important statements with editorial typography and scroll-triggered animations.

## Design Specifications

### Typography
- Font: Newsreader (serif)
- Size: 1.5-2x base text size
- Line height: 1.5-1.6 for readability
- Color: Slightly muted from primary text for sophistication

### Visual Elements
- Large decorative quote marks (before/after)
- Subtle background tint or gradient
- Optional left border accent (3-4px)
- Padding: 2-3rem for breathing room
- Max-width: 65ch for optimal reading

### Animation
- Trigger: Intersection Observer at 20% visibility
- Entry: Fade up with slight scale (0.95 → 1)
- Quote marks: Delayed fade-in after text
- Duration: 0.6s with ease-out timing

## Implementation Example

```tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

const PullQuote = ({ children, author, role }: PullQuoteProps) => {
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

  return (
    <motion.blockquote
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="relative my-12 mx-auto max-w-prose"
    >
      <div className="relative bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-8 border-l-4 border-primary/30">
        <motion.span 
          variants={quoteMarkVariants}
          className="absolute -top-4 -left-2 text-8xl text-primary/20 font-serif"
        >
          "
        </motion.span>
        
        <p className="text-2xl font-serif leading-relaxed text-foreground/90 italic">
          {children}
        </p>
        
        <motion.span 
          variants={quoteMarkVariants}
          className="absolute -bottom-8 right-4 text-8xl text-primary/20 font-serif rotate-180"
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
```

## Usage Guidelines

### When to Use
- Highlighting testimonials or recommendations
- Emphasizing key achievements or milestones
- Breaking up long text sections
- Drawing attention to important statements

### Content Guidelines
- Keep quotes concise (2-3 sentences max)
- Ensure high contrast with surrounding content
- Use sparingly (1-2 per page maximum)
- Always provide attribution when applicable

### Accessibility
- Semantic `<blockquote>` element
- Proper `<cite>` for attribution
- Sufficient color contrast (WCAG AA)
- Respects prefers-reduced-motion
- Screen reader friendly structure

## Variations

### Minimal Style
- No background, just typography
- Simple left border
- Smaller quote marks

### Centered Style
- Center-aligned text
- Quote marks above/below
- Symmetrical padding

### Card Style
- Full background color
- Shadow elevation
- Rounded corners

## Dark Mode Considerations
- Adjust background opacity
- Ensure quote marks remain visible
- Maintain readability contrast
- Consider using border instead of background
