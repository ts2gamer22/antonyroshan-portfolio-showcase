import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { fadeIn as defaultFadeIn } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  once?: boolean;
  margin?: string;
}

const Reveal = ({
  children,
  className,
  variants = defaultFadeIn,
  once = true,
  margin = "-10% 0px -10% 0px",
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin });
  const prefersReducedMotion = usePrefersReducedMotion();

  const safeVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : variants;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={safeVariants}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;

