# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo for Wilkinson Counselling containing:
- **web/**: Next.js frontend application (main website)
- **studio/**: Sanity CMS studio for content management

## Development Commands

### Root Level (Monorepo)
- `npm run dev` - Start both web and studio in parallel using concurrently
- `npm run dev:web` - Start only the web application
- `npm run dev:studio` - Start only the Sanity studio
- `npm run build` - Build both workspaces
- `npm run build:web` - Build only the web application
- `npm run build:studio` - Build only the Sanity studio

### Web Application (web/)
- `npm run dev` - Start Next.js development server (port 3000)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook development server (port 6006)
- `npm run build-storybook` - Build Storybook for production

### Sanity Studio (studio/)
- `npm run dev` - Start Sanity studio development server
- `npm run start` - Start Sanity studio
- `npm run build` - Build Sanity studio
- `npm run deploy` - Deploy studio to Sanity hosting

## Architecture Overview

### Frontend (Next.js App Router)
- **Component Architecture**: Atomic design pattern with atoms, molecules, and organisms
- **Styling**: Tailwind CSS with custom CSS variables and global styles
- **Fonts**: DM Serif Display (serif) and Montserrat (sans-serif) from Google Fonts
- **Content Management**: Sanity CMS integration with GROQ queries
- **Testing**: Vitest with Storybook test addon for component testing

### Key Directories
- `web/src/app/components/` - React components organized by atomic design
  - `atoms/` - Basic building blocks (Button, SectionWrapper, etc.)
  - `molecules/` - Component combinations (Feature, ServiceCard, etc.)
  - `organisms/` - Complex components (Header, Footer, Services, etc.)
- `web/src/app/sanity/` - Sanity configuration and queries
- `web/src/app/hooks/` - Custom React hooks
- `web/src/app/utils/` - Utility functions
- `web/src/app/styles/` - Global CSS and component-specific styles

### Content Management (Sanity)
- **Project ID**: mlba4v6u
- **Dataset**: production
- **Schema Location**: `studio/schemaTypes/`
- **Custom Components**: `studio/components/` (StyledText, FancyText)

### Component System
The application uses a `ComponentSelector` pattern for dynamic content rendering:
- Page content is stored in Sanity as arrays of components with `_type` fields
- `ComponentSelector` maps component types to their React implementations
- Supported component types: hero, services, feature, contact, accordion, richTextModule, etc.

### Path Aliases
- `@atoms/` → `web/src/app/components/atoms/`
- `@molecules/` → `web/src/app/components/molecules/`
- `@organisms/` → `web/src/app/components/organisms/`
- `@sanity/` → `web/src/app/sanity/`
- `@styles/` → `web/src/app/styles/`

## Testing Strategy
- Component testing through Storybook stories
- Vitest configuration for browser-based testing with Playwright
- Story-driven development with Storybook addon for testing

## Code Patterns
- TypeScript strict mode enabled
- ESLint with Next.js config
- SCSS modules and global CSS with Tailwind
- Custom hooks for reusable logic (useToggle, useBreakpoint, etc.)
- Sanity client configured for content fetching with GROQ queries