# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is a modern React portfolio application built for Antony Roshan (doctoral student at Johns Hopkins University). It's built with Vite, TypeScript, React Router, shadcn/ui component library, and Tailwind CSS with a professional academic theme.

## Development Commands

### Core Development
```bash
# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build for development mode (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Lint the codebase
npm run lint
```

### Package Management
This project uses both npm (package-lock.json) and has bun.lockb present. Use npm for consistency unless specifically working with Bun features.

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with SWC plugin for fast compilation
- **Routing**: React Router DOM v6 (BrowserRouter setup)
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Theming**: next-themes with custom ThemeProvider
- **Icons**: Lucide React
- **Notifications**: Sonner for toast notifications

### Project Structure

#### Core Application (`src/`)
- **`main.tsx`**: Application entry point
- **`App.tsx`**: Root component with providers (Router, Theme, Query, Toasts)
- **`pages/`**: Route components (Index, About, Projects, Contact, NotFound)
- **`components/`**: Reusable React components
  - Main components: Navigation, HeroSection, FeaturedProjects, Footer, Timeline
  - **`ui/`**: shadcn/ui component library (accordion, button, card, etc.)
- **`lib/utils.ts`**: Utility functions (cn helper for class merging)
- **`hooks/`**: Custom React hooks (use-mobile, use-toast)
- **`assets/`**: Static images and resources

#### Configuration Files
- **`vite.config.ts`**: Vite configuration with path aliases (`@` → `./src`)
- **`tailwind.config.ts`**: Extensive Tailwind customization with professional theme
- **`components.json`**: shadcn/ui configuration
- **`tsconfig.json`**: TypeScript project references setup
- **`eslint.config.js`**: ESLint configuration with React and TypeScript rules

### Design System
The project uses a sophisticated design system defined in `src/index.css`:
- **Colors**: Professional blue palette with academic gold accents
- **Typography**: Geist font family with semantic size scale
- **Components**: Custom gradients, shadows, and animations
- **Theme**: Light/dark mode support with CSS custom properties
- **Layout**: Responsive design with mobile-first approach

### Key Features
- **Multi-page portfolio**: Home, About, Projects, Contact pages
- **Theme switching**: Light/dark mode toggle
- **Responsive design**: Mobile-first with professional styling
- **Component library**: Full shadcn/ui integration
- **Type safety**: Strict TypeScript configuration (relaxed for development)
- **Modern routing**: Client-side routing with proper 404 handling

### Development Notes
- The project uses path aliases: `@/` maps to `src/`
- TypeScript is configured with relaxed settings for development (`strict: false`)
- ESLint has `@typescript-eslint/no-unused-vars` disabled
- Development server runs on port 8080 with host `::`
- Includes lovable-tagger plugin for development mode component tagging

### Asset Management
- Images are stored in `src/assets/` and imported directly
- Public assets (favicon, CV PDF, etc.) are in `public/`
- Professional headshots and project images are included

### Styling Guidelines
- Uses CSS custom properties for theming
- Follows shadcn/ui conventions for component styling
- Implements a professional academic color scheme
- Custom gradients and shadow system for visual depth
- Responsive breakpoints defined in Tailwind config
