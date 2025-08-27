import type { Variants } from "framer-motion";

// Easing curves
export const EASING_SMOOTH_OUT = [0.22, 1, 0.36, 1] as const;
export const EASING_SPRINGY = [0.16, 1, 0.3, 1] as const;

// Reusable variants
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING_SMOOTH_OUT },
  },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING_SPRINGY },
  },
};

export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

