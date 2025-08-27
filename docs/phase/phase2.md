# Phase 2 — Navigation + Hero Overhaul

## Goal
Transform the navigation and hero sections into premium, motion-rich experiences that establish Antony's academic/engineering brand with confidence and sophistication.

## Preconditions
- Phase 1 complete: Framer Motion installed, motion utilities created, typography system established
- Design tokens refined and consistent across light/dark modes
- Reduced motion hook available and tested

## 🎯 Navigation Enhancements

### Task 1: Glass Morphism Navigation Bar
**Priority: High**  
**Estimated Time: 2 hours**

- [ ] Apply glass morphism styling to Navigation component
  - `backdrop-filter: blur(10px)`
  - `background: rgba(255, 255, 255, 0.7)` (light mode)
  - `background: rgba(0, 0, 0, 0.7)` (dark mode)
  - `border-bottom: 1px solid rgba(border-color, 0.1)`
- [ ] Ensure text maintains AA contrast ratios
- [ ] Add subtle shadow for depth: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- [ ] Test across different background colors and images

### Task 2: Scroll-Based Navigation Visibility
**Priority: High**  
**Estimated Time: 3 hours**

- [ ] Create `useScrollDirection` hook in `src/hooks/useScrollDirection.ts`
  ```typescript
  interface ScrollData {
    scrollDirection: 'up' | 'down' | null;
    scrollY: number;
    isAtTop: boolean;
  }
  ```
- [ ] Implement scroll threshold (5-10px) to prevent jitter
- [ ] Add Framer Motion variants for show/hide states:
  - Hidden: `{ y: '-100%', opacity: 0 }`
  - Visible: `{ y: 0, opacity: 1 }`
- [ ] Use `AnimatePresence` for smooth mount/unmount
- [ ] Test on mobile devices for touch scroll behavior

### Task 3: Active Link Indicators
**Priority: Medium**  
**Estimated Time: 2 hours**

- [ ] Use React Router's `useLocation` to detect active route
- [ ] Create underline indicator component with Framer Motion
- [ ] Implement `layoutId` for smooth underline transitions between links
- [ ] Style active link with color accent and weight change
- [ ] Ensure indicator works with both desktop and mobile navigation

### Task 4: Hover Animations
**Priority: Medium**  
**Estimated Time: 1.5 hours**

- [ ] Add underline grow effect on hover using Framer Motion variants
- [ ] Implement slight color shift on hover (opacity or hue)
- [ ] Add micro-scale animation (1.02) for interactive feedback
- [ ] Ensure hover states don't interfere with active indicators
- [ ] Disable hover effects on touch devices

### Task 5: Keyboard Navigation & Accessibility
**Priority: High**  
**Estimated Time: 2 hours**

- [ ] Add focus-visible rings with smooth transitions
- [ ] Implement proper tab order and skip-to-content link
- [ ] Add ARIA labels for hamburger menu and navigation regions
- [ ] Ensure Escape key closes mobile menu
- [ ] Implement focus trap in mobile menu when open
- [ ] Test with screen reader (NVDA/JAWS)

### Task 6: Mobile Menu Enhancement
**Priority: High**  
**Estimated Time: 3 hours**

- [ ] Create slide-in drawer animation with Framer Motion
- [ ] Add backdrop overlay with click-to-close functionality
- [ ] Implement hamburger-to-X icon transformation
- [ ] Add stagger animation for menu items
- [ ] Ensure body scroll lock when menu is open
- [ ] Test gesture support for swipe-to-close

## 🚀 Hero Section Transformation

### Task 7: Text Stagger Animation
**Priority: High**  
**Estimated Time: 3 hours**

- [ ] Create `TextSplitter` utility component in `src/components/TextSplitter.tsx`
  - Split by letters or words
  - Wrap each in `motion.span`
  - Apply stagger configuration
- [ ] Implement name reveal with letter stagger (0.05s delay per letter)
- [ ] Add wave/cascade effect option
- [ ] Configure easing curves (e.g., `easeOut` or custom cubic-bezier)
- [ ] Total animation duration: 1-1.5 seconds max

### Task 8: Descriptor Animation Sequence
**Priority: Medium**  
**Estimated Time: 2 hours**

- [ ] Create fade + slide-up animation for role/descriptor text
- [ ] Chain animation after name reveal completes
- [ ] Add subtle blur-to-focus effect
- [ ] Implement typewriter variant as alternative option
- [ ] Test readability during animation phases

### Task 9: CTA Button Micro-interactions
**Priority: High**  
**Estimated Time: 2 hours**

- [ ] Hover state:
  - Scale: 1.05
  - Box shadow glow effect
  - Background gradient shift
- [ ] Press state:
  - Scale: 0.95
  - Subtle inset shadow
- [ ] Add ripple effect on click (optional)
- [ ] Implement arrow icon animation on hover
- [ ] Ensure 44x44px minimum touch target

### Task 10: Photo/Avatar Parallax Effect
**Priority: Medium**  
**Estimated Time: 2.5 hours**

- [ ] Implement scroll-based parallax using `useScroll` and `useTransform`
- [ ] Add subtle scale effect (1 to 1.05) on scroll
- [ ] Create soft glow/shadow that intensifies on hover
- [ ] Apply `transform: translateZ(0)` for GPU acceleration
- [ ] Limit parallax range to prevent excessive movement
- [ ] Add loading skeleton for image

### Task 11: Background Visual Effects
**Priority: Low**  
**Estimated Time: 3 hours**

- [ ] Option A: Gradient pulse animation
  - Animate gradient positions with CSS keyframes
  - Use radial gradients for organic feel
  - Sync with brand colors
- [ ] Option B: Particle system
  - Implement with canvas or CSS transforms
  - Keep particle count low (20-30)
  - Add blur for depth effect
- [ ] Ensure effects are subtle and don't distract from content
- [ ] Disable on mobile for performance

### Task 12: Scroll-to-Content CTA
**Priority: Medium**  
**Estimated Time: 1.5 hours**

- [ ] Create animated arrow/chevron component
- [ ] Add bounce animation to draw attention
- [ ] Implement smooth scroll on click
- [ ] Hide after user scrolls past threshold
- [ ] Add keyboard support (Enter/Space to activate)
- [ ] Include screen reader text "Scroll to main content"

### Task 13: Responsive Layout Optimization
**Priority: High**  
**Estimated Time: 2 hours**

- [ ] Mobile (< 768px):
  - Stack layout vertically
  - Reduce animation complexity
  - Adjust font sizes for readability
- [ ] Tablet (768px - 1024px):
  - Two-column layout
  - Balanced spacing
- [ ] Desktop (> 1024px):
  - Full grid/flex layout
  - All animations enabled
- [ ] Test line lengths stay within 60-75 characters
- [ ] Verify no horizontal scroll on any breakpoint

## 🎨 Cross-Cutting Improvements

### Task 14: Performance Optimization
**Priority: High**  
**Estimated Time: 2 hours**

- [ ] Use `will-change` sparingly for animated elements
- [ ] Implement `transform` and `opacity` only animations
- [ ] Add `contain: layout` where appropriate
- [ ] Lazy load heavy animation code
- [ ] Profile with Chrome DevTools Performance tab
- [ ] Target 60fps on mid-range devices

### Task 15: Reduced Motion Support
**Priority: High**  
**Estimated Time: 1.5 hours**

- [ ] Check `usePrefersReducedMotion` in all animated components
- [ ] Provide instant/subtle transitions as fallbacks
- [ ] Ensure no information is lost when animations are disabled
- [ ] Test with `prefers-reduced-motion: reduce` enabled
- [ ] Document reduced motion behavior

### Task 16: Testing & QA
**Priority: High**  
**Estimated Time: 3 hours**

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Chrome Android)
- [ ] Lighthouse scores:
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
- [ ] Test navigation state persistence on route changes
- [ ] Verify all animations respect 60fps target
- [ ] Check memory leaks with animation cleanup

## 📝 Documentation Requirements

Each component should include:
- Usage examples
- Props interface documentation
- Animation variant configurations
- Performance considerations
- Accessibility notes
- Troubleshooting guide

## ✅ Acceptance Criteria

### Navigation
- [ ] Glass morphism effect works across all themes
- [ ] Hide/show on scroll is smooth without jank
- [ ] Active indicators accurately reflect current route
- [ ] All navigation items keyboard accessible
- [ ] Mobile menu provides excellent UX
- [ ] Focus management is properly implemented

### Hero
- [ ] Text animations complete within 1.5 seconds
- [ ] All micro-interactions feel premium and intentional
- [ ] Parallax effects are subtle and performant
- [ ] Responsive layouts are properly implemented
- [ ] Content remains readable during all animation states
- [ ] Reduced motion fallbacks are acceptable

### Performance
- [ ] 60fps maintained on mid-range devices
- [ ] No layout shifts during animations
- [ ] Page loads remain fast (< 3s on 3G)
- [ ] Memory usage stays reasonable
- [ ] No animation-related memory leaks

### Accessibility
- [ ] WCAG AA compliance for all text
- [ ] All interactive elements keyboard navigable
- [ ] Screen reader experience is coherent
- [ ] Focus indicators are clearly visible
- [ ] Reduced motion preferences respected

## 🚫 Out of Scope (Phase 2)

- GSAP timeline animations (Phase 5)
- Projects grid animations (Phase 3)
- About page typography (Phase 4)
- Contact form interactions (Phase 4)
- Smooth scroll library integration (Phase 5)

## 🔄 Dependencies

- Framer Motion (already installed in Phase 1)
- Motion utilities from Phase 1
- Design tokens from Phase 1
- React Router DOM (existing)
- Tailwind CSS (existing)

## 📅 Estimated Timeline

Total estimated time: ~35 hours
- Navigation tasks: ~14 hours
- Hero tasks: ~16 hours
- Cross-cutting tasks: ~5 hours

Recommended approach: Complete navigation first, then hero, with continuous testing throughout.

## 🎯 Next Steps

1. Begin with Navigation glass morphism styling
2. Implement scroll direction detection
3. Move to Hero text animations
4. Layer in micro-interactions progressively
5. Performance optimization pass
6. Final QA and accessibility audit
