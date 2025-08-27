# Phase 1 Context — Design Tokens and Theming

Current baseline (from src/index.css and tailwind.config.ts)
- Color tokens already defined via CSS variables for light/dark (background, foreground, primary, secondary, muted, accent, card, gold, etc.).
- Tailwind extends those via theme.extend.colors.
- Shadows, radii, gradients are mapped via custom CSS vars.

Additions and refinements
- Spacing/padding: settle on 8px baseline (2, 4, 8, 12, 16, 24, 32, 48, 64).
- Radii: use var(--radius) = 12px; ensure md/sm derivations map consistently.
- Shadows: `--shadow-card`, `--shadow-hover`, `--shadow-glow` already exist; ensure hover states use `transition: box-shadow` for smoothness.
- Gradients: `--gradient-hero`, `--gradient-card`, `--gradient-accent`; ensure hero gradient subtly shifts with motion (opacity/blur only; avoid color flashing).

Recommended utilities
```css
/* src/index.css */
@layer components {
  .transition-smooth { transition: var(--transition-smooth); }
  .shadow-card { box-shadow: var(--shadow-card); }
  .shadow-hover { box-shadow: var(--shadow-hover); }
  .hero-gradient { background: var(--gradient-hero); }
  .card-gradient { background: var(--gradient-card); }
}
```

Contrast & dark-mode parity checklist
- [ ] Primary on background meets WCAG AA for text and controls.
- [ ] Muted foreground is legible on muted backgrounds.
- [ ] Gold accent has sufficient contrast for text/badges.

Usage guidelines
- Prefer tokens over raw HSL; never hardcode hex in components.
- Use `ring` token for focus rings and avoid default outline when possible.
- Keep motion-related glow subtle; avoid over-bright blurs on dark mode.

