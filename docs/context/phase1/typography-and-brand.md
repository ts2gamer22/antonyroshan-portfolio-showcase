# Phase 1 Context — Typography and Brand

Fonts
- Sans (UI): Geist (already integrated)
- Serif (editorial): Newsreader

Import (CSS)
Add to src/index.css near the top (after Geist):
```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@300;400;500;600;700&display=swap');
```

Tailwind config additions
In tailwind.config.ts, extend theme.fontFamily:
```ts
fontFamily: {
  sans: ['Geist', 'sans-serif'],
  serif: ['Newsreader', 'serif'],
},
```

Usage guidance
- Use sans (Geist) for navigation, UI, forms, labels, and most headings.
- Use serif (Newsreader) for long-form content (About page), block quotes/pull-quotes, and select H1s where appropriate.
- Keep a consistent vertical rhythm; rely on Tailwind typography plugin for prose.

Type scale (reference)
- XS 12, SM 14, Base 16, LG 18, XL 20, 2XL 24, 3XL 30, 4XL 36, 5XL 48

Brand tone
- Primary blue (215°) expresses technical confidence; keep gold for awards/achievements.
- Elevation via soft shadows; avoid overly glassy UI except for the top nav.

Do / Don’t
- Do: ensure contrast in light + dark modes.
- Do: pair serif only in longer paragraphs or hero subcopy for warmth.
- Don’t: mix more than 2 font families site-wide.

