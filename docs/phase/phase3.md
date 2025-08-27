# Phase 3 — Projects Grid & Detail Polish

## Goal
Transform the projects section into a delightful, interactive showcase with smooth animations, elegant hover effects, and optional filtering capabilities.

## Prerequisites
- Phase 1 complete (motion primitives, typography system)
- Phase 2 complete (navigation and hero polished)
- Framer Motion installed and configured
- Project data structure defined

## Core Tasks

### 1. Project Card Component Enhancement
Create an animated project card with reveal-on-scroll and hover interactions.

**Implementation Steps:**
- [ ] Create `AnimatedProjectCard.tsx` component
- [ ] Implement scroll-triggered reveal animation
- [ ] Add hover lift effect with shadow enhancement
- [ ] Create gradient border animation on hover
- [ ] Add tag pills with subtle animations
- [ ] Implement image lazy loading with blur-up effect

**Key Features:**
```typescript
// Card reveal variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1.0]
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};
```

### 2. Staggered Grid Animation
Implement a sophisticated stagger effect for the project grid.

**Implementation Steps:**
- [ ] Create `ProjectGrid.tsx` wrapper component
- [ ] Implement stagger children animation
- [ ] Add viewport-based triggering
- [ ] Optimize for performance with `once: true`
- [ ] Handle dynamic grid layouts (1, 2, 3 columns)

**Stagger Configuration:**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren"
    }
  }
};
```

### 3. Category Filter System (Optional)
Add interactive category filters with smooth transitions.

**Implementation Steps:**
- [ ] Create filter pill components
- [ ] Implement filter state management
- [ ] Add layout animations for filtering
- [ ] Create smooth fade/scale transitions
- [ ] Add "All" category reset

**Filter Animation:**
```typescript
const filterVariants = {
  active: {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
    scale: 1.05
  },
  inactive: {
    backgroundColor: "var(--muted)",
    color: "var(--muted-foreground)",
    scale: 1
  }
};
```

### 4. Gradient Ring Hover Effect
Create an animated gradient border that appears on hover.

**Implementation Steps:**
- [ ] Add gradient border container
- [ ] Implement rotation animation
- [ ] Create glow effect
- [ ] Ensure smooth transitions
- [ ] Optimize for GPU acceleration

### 5. Project Detail View (Optional)
Add route transitions and detail page animations.

**Implementation Steps:**
- [ ] Create project detail route
- [ ] Implement page transition animations
- [ ] Add back button with animation
- [ ] Create content reveal sequences
- [ ] Add image gallery with transitions

### 6. Performance Metrics Display
Add visual indicators for project metrics.

**Implementation Steps:**
- [ ] Create metric badge components
- [ ] Add duration indicators
- [ ] Implement technology tags
- [ ] Create status indicators
- [ ] Add animated counters

## Component Structure

```
src/
  components/
    projects/
      AnimatedProjectCard.tsx
      ProjectGrid.tsx
      ProjectFilters.tsx
      ProjectMetrics.tsx
      GradientBorder.tsx
    ui/
      Badge.tsx (enhanced)
      Tag.tsx
  hooks/
    useProjectFilter.ts
    useStaggerAnimation.ts
  pages/
    Projects.tsx (updated)
    ProjectDetail.tsx (new, optional)
```

## Acceptance Criteria

### Visual & Animation
- [ ] Cards reveal smoothly on scroll with no jank
- [ ] Hover effects are subtle but delightful
- [ ] Stagger timing feels natural (not too slow/fast)
- [ ] Gradient borders animate smoothly
- [ ] All animations run at 60fps

### Responsive Design
- [ ] Grid adapts to 1, 2, 3 columns appropriately
- [ ] Cards maintain aspect ratio on all screens
- [ ] Touch interactions work on mobile
- [ ] Hover effects are disabled on touch devices
- [ ] Filter pills wrap properly on small screens

### Performance
- [ ] Images lazy load with placeholder
- [ ] Animations use GPU-accelerated properties
- [ ] No layout shifts during animations
- [ ] Smooth scrolling maintained
- [ ] Memory usage stays reasonable

### Accessibility
- [ ] Cards are keyboard navigable
- [ ] Focus states are visible
- [ ] Screen readers announce content properly
- [ ] Reduced motion preference respected
- [ ] Color contrast meets WCAG standards

## Implementation Checklist

### Phase 3.1 - Card Component
- [ ] Create base AnimatedProjectCard component
- [ ] Add reveal animation on scroll
- [ ] Implement hover lift effect
- [ ] Add shadow transitions
- [ ] Test on multiple viewports

### Phase 3.2 - Grid System
- [ ] Create ProjectGrid wrapper
- [ ] Implement stagger animation
- [ ] Add responsive column logic
- [ ] Optimize scroll performance
- [ ] Test with various project counts

### Phase 3.3 - Hover Polish
- [ ] Add gradient border component
- [ ] Implement rotation animation
- [ ] Create glow effect
- [ ] Add scale transitions
- [ ] Fine-tune timing functions

### Phase 3.4 - Filters (Optional)
- [ ] Create filter state management
- [ ] Build filter pill components
- [ ] Add filter animations
- [ ] Implement layout transitions
- [ ] Test filter combinations

### Phase 3.5 - Metrics & Tags
- [ ] Create badge components
- [ ] Add technology tags
- [ ] Implement duration displays
- [ ] Add status indicators
- [ ] Style consistently

### Phase 3.6 - Testing & QA
- [ ] Test all animations at 60fps
- [ ] Verify mobile responsiveness
- [ ] Check accessibility compliance
- [ ] Validate reduced motion behavior
- [ ] Cross-browser testing

## Code Examples

### AnimatedProjectCard Base
```typescript
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" 
  });

  return (
    <motion.article
      ref={ref}
      className="group relative"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      variants={cardVariants}
      custom={index}
    >
      <GradientBorder>
        <Card className="h-full">
          {/* Card content */}
        </Card>
      </GradientBorder>
    </motion.article>
  );
};
```

### Gradient Border Component
```typescript
const GradientBorder = ({ children }) => {
  return (
    <motion.div
      className="relative p-[2px] rounded-xl overflow-hidden"
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #667eea 75%, #764ba2 100%)",
          backgroundSize: "200% 200%"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity
        }}
      />
      <div className="relative bg-background rounded-xl">
        {children}
      </div>
    </motion.div>
  );
};
```

## Performance Guidelines

1. **Use CSS transforms only** - translateX, translateY, scale, rotate
2. **Avoid layout recalculations** - Don't animate width, height, padding
3. **Implement virtualization** for large project lists
4. **Lazy load images** with blur-up placeholders
5. **Debounce filter operations** to prevent excessive re-renders

## Next Steps

After Phase 3 completion:
1. Gather user feedback on animations
2. Fine-tune timing and easing functions
3. Consider adding view mode toggles (grid/list)
4. Plan Phase 4 (About & Contact refinements)

## Success Metrics

- [ ] All project cards animate smoothly
- [ ] Page maintains 60fps during scroll
- [ ] Mobile experience is fluid
- [ ] Users find interactions delightful
- [ ] No accessibility violations
