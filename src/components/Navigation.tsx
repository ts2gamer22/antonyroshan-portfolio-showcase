import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const prefersReducedMotion = usePrefersReducedMotion();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  
  // Animation state
  const isVisible = isAtTop || scrollDirection === 'up';
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Accessibility: lock body scroll and trap focus when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable && focusable.length > 0 ? focusable[0] : undefined;
    const last = focusable && focusable.length > 0 ? focusable[focusable.length - 1] : undefined;

    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  // Animation variants
  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: 'easeInOut'
      }
    },
    hidden: {
      y: '-100%',
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: 'easeInOut'
      }
    }
  };
  
  const linkVariants = {
    initial: {
      backgroundSize: '0% 2px',
    },
    hover: {
      backgroundSize: '100% 2px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };
  
  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };
  
  const mobileItemVariants = {
    closed: {
      x: 20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-[100]"
      >
        Skip to main content
      </a>

    <AnimatePresence mode="wait">
      {(isVisible || !isMounted) && (
        <motion.nav
          role="navigation"
          aria-label="Primary"
          variants={navVariants}
          initial={isMounted ? "hidden" : "visible"}
          animate="visible"
          exit="hidden"
          className="fixed top-0 w-full bg-background/70 dark:bg-background/70 backdrop-blur-md border-b border-border/50 z-50 shadow-sm"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div className="container">
            <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="text-xl font-semibold text-foreground hover:text-primary transition-smooth"
          >
            Antony Roshan
          </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.name} className="relative">
                      <Link
                        to={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`relative text-sm font-medium py-2 px-1 transition-colors link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${
                          active
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <motion.span
                          className="relative z-10"
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          {item.name}
                        </motion.span>
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            initial={false}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <motion.div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  <motion.div
                    animate={isOpen ? 'open' : 'closed'}
                    className="relative w-6 h-6"
                  >
                    <motion.span
                      className="absolute left-0 w-full h-0.5 bg-current"
                      style={{ top: 6 }}
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: 45, y: 6 },
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="absolute left-0 w-full h-0.5 bg-current"
                      style={{ top: 12 }}
                      variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="absolute left-0 w-full h-0.5 bg-current"
                      style={{ top: 18 }}
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: -45, y: -6 },
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>

    {/* Mobile Navigation Drawer (MOVED OUTSIDE) */}
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-[110] md:hidden"
          />
          
          {/* Drawer */}
          <motion.nav
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            ref={drawerRef}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background dark:bg-card border-l-2 border-border z-[120] md:hidden overflow-y-auto"
            style={{ 
              willChange: 'transform',
              boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X />
                </Button>
              </div>
              
              <motion.ul className="space-y-4">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <motion.li key={item.name} variants={mobileItemVariants}>
                      <Link
                        to={item.href}
                        className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
              
              <div className="mt-8 pt-8 border-t border-border flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navigation;