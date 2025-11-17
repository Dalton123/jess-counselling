# Jessica Wilkinson Counselling Website 🌊

A modern, high-performance counselling practice website built with Next.js 15, Sanity CMS, and Tailwind CSS. This project showcases a complete headless CMS implementation with advanced features including dynamic page building, email integration, and SEO optimization.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-3-f03e2f?style=flat-square&logo=sanity)](https://www.sanity.io/)

## 🌟 Features

### Content Management

- **Visual Page Builder** - Build pages with reusable content modules through Sanity Studio
- **Real-time Preview** - See changes instantly with Next.js draft mode integration
- **Flexible Content Blocks** - Hero sections, service showcases, testimonials, rich text, and more
- **Image Optimization** - Automatic AVIF/WebP conversion with Sanity's CDN

### Performance & SEO

- **Core Web Vitals Optimized** - Lighthouse scores 95+
- **Dynamic Sitemap Generation** - Automatically updates with new content
- **Structured Data** - JSON-LD schema for local business SEO
- **Meta Tags & Open Graph** - Optimized social sharing
- **Edge-Ready** - Deployed on Vercel Edge Network

### User Experience

- **Mobile-First Design** - Fully responsive across all devices
- **Smooth Animations** - Framer Motion for delightful micro-interactions
- **Accessible Components** - WCAG compliant with semantic HTML
- **Progressive Enhancement** - Works without JavaScript, enhanced with it

### Developer Experience

- **TypeScript** - Full type safety across the stack
- **Monorepo Setup** - Yarn workspaces for web and studio
- **Component Library** - Atomic design with Storybook documentation
- **Testing** - Vitest + Playwright for unit and E2E tests
- **Modern Tooling** - ESLint, Prettier, and hot reload

## 🏗️ Architecture

```
jess-counselling/
├── web/                    # Next.js 15 frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── [...slug]/ # Dynamic page routing
│   │   │   ├── blog/      # Blog implementation
│   │   │   └── api/       # API routes (contact form)
│   │   ├── components/
│   │   │   ├── atoms/     # Basic UI elements
│   │   │   ├── molecules/ # Composite components
│   │   │   └── organisms/ # Complex sections
│   │   ├── sanity/        # Sanity client & queries
│   │   └── utils/         # Helper functions
│   └── public/            # Static assets
│
└── studio/                # Sanity Studio CMS
    ├── schemas/           # Content schemas
    │   ├── modules/       # Page builder modules
    │   └── objects/       # Reusable schema objects
    └── components/        # Custom Studio components
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Yarn 1.22+
- A Sanity account (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Dalton123/jess-counselling.git
   cd jess-counselling
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create `.env.local` in the `web` directory:

   ```env
   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token

   # Email (Resend)
   RESEND_API_KEY=your_resend_key

   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development servers**

   ```bash
   yarn dev
   ```

   This starts both:

   - Next.js frontend at `http://localhost:3000`
   - Sanity Studio at `http://localhost:3333`

### Building for Production

```bash
# Build both workspaces
yarn build

# Or build individually
yarn build:web
yarn build:studio
```

## 🎨 Key Technologies

### Frontend Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router, Server Components, and advanced caching
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling with the latest beta
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **[React 19](https://react.dev/)** - Latest React features

### Content & Data

- **[Sanity](https://www.sanity.io/)** - Headless CMS with real-time collaboration
- **[GROQ](https://www.sanity.io/docs/groq)** - Powerful query language for content
- **[@portabletext/react](https://github.com/portabletext/react-portabletext)** - Render rich text content

### Developer Tools

- **[Storybook](https://storybook.js.org/)** - Component development environment
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing
- **[ESLint](https://eslint.org/)** - Code linting with Next.js config

### Deployment & Services

- **[Vercel](https://vercel.com/)** - Hosting platform with Edge Network
- **[Resend](https://resend.com/)** - Modern email API for contact forms

## 📦 Project Structure Deep Dive

### Content Schemas

The Sanity schemas define the content structure:

```typescript
// studio/schemas/page.ts
export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug" },
    { name: "published", type: "boolean" },
    {
      name: "content",
      type: "array",
      of: [
        { type: "hero" },
        { type: "services" },
        { type: "richTextModule" },
        { type: "testimonialsCarousel" },
        // ... more modules
      ],
    },
  ],
});
```

### Component Architecture

Components follow atomic design principles:

- **Atoms** (Button, SectionWrapper) - Basic building blocks
- **Molecules** (BlogCard, ServiceCard) - Simple component groups
- **Organisms** (Header, Footer, Hero) - Complex UI sections

### Dynamic Routing

Pages are generated from Sanity content:

```typescript
// app/[...slug]/page.tsx
export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({ slug: [page.slug] }));
}
```

## 🎯 Performance Optimizations

### Image Optimization

- AVIF/WebP formats with automatic fallbacks
- Responsive srcsets for different screen sizes
- Lazy loading below the fold
- Sanity CDN for fast delivery

### Code Splitting

- Automatic route-based code splitting
- Dynamic imports for heavy components
- Tree shaking unused code

### Caching Strategy

```typescript
// next.config.ts
images: {
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}
```

### Font Loading

```typescript
const dmSerifDisplay = DM_Serif_Display({
  display: "swap",
  preload: true,
  fallback: ["serif"],
});
```

## 🔧 Available Scripts

### Root Level

```bash
yarn dev              # Run both web and studio in development
yarn dev:web          # Run only Next.js
yarn dev:studio       # Run only Sanity Studio
yarn build            # Build both workspaces
yarn build:web        # Build Next.js for production
yarn build:studio     # Build Sanity Studio
```

### Web Workspace

```bash
yarn lint             # Run ESLint
yarn storybook        # Start Storybook on port 6006
yarn build-storybook  # Build static Storybook
```

### Studio Workspace

```bash
yarn deploy           # Deploy Studio to Sanity's hosted platform
yarn deploy-graphql   # Deploy GraphQL API
```

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run unit tests
yarn test

# Run E2E tests
yarn test:e2e

# Coverage report
yarn test:coverage
```

## 📝 Content Management Guide

### Creating a New Page

1. Open Sanity Studio (`http://localhost:3333`)
2. Navigate to "Pages" → "Create new page"
3. Add title and generate slug
4. Build content by adding modules:
   - **Hero** - Page header with CTA
   - **Services** - Service cards with images
   - **Rich Text** - Content sections
   - **Testimonials** - Carousel of testimonials
5. Toggle "Published" when ready to go live

### Adding Blog Posts

1. Navigate to "Blog Posts" in Studio
2. Create new post with:
   - Title, slug, and featured image
   - Category and tags
   - Rich content with portable text
   - SEO meta description
3. Publish to make it appear on `/blog`

## 🎨 Customization

### Colors

Tailwind colors are defined in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#0d9488',   // Teal
      secondary: '#f97316', // Orange
      // ... more colors
    }
  }
}
```

### Typography

Font configuration in `app/layout.tsx`:

```typescript
import { Montserrat } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
```

### Adding New Content Modules

1. Create schema in `studio/schemas/modules/`
2. Add to page schema's content array
3. Create React component in `web/src/app/components/`
4. Register in `ComponentSelector.tsx`

## 🚢 Deployment

### Vercel Deployment

The project is configured for zero-config deployment on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Vercel automatically:

- Builds on every push
- Creates preview deployments for PRs
- Enables edge caching
- Provides analytics

### Sanity Studio Deployment

Deploy Studio separately to Sanity's platform:

```bash
cd studio
yarn deploy
```

Access at: `https://your-project.sanity.studio`

## 🐛 Troubleshooting

### Common Issues

**Issue**: Sanity content not appearing

- Check environment variables are set correctly
- Ensure content is marked as "published"
- Verify API token has correct permissions

**Issue**: Images not loading

- Check Sanity project ID and dataset
- Verify image URLs in Sanity CDN
- Check Next.js image configuration

**Issue**: Build fails

- Clear `.next` cache: `rm -rf .next`
- Update dependencies: `yarn install`
- Check for TypeScript errors

## 📚 Learning Resources

This project demonstrates:

- Next.js 15 App Router patterns
- Headless CMS integration
- TypeScript best practices
- Component-driven development
- Performance optimization techniques
- SEO implementation
- Email integration
- Monorepo architecture

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome! Feel free to:

- Open issues for bugs
- Suggest improvements
- Ask questions about implementation

## 📄 License

This project is private and proprietary. All rights reserved.

## 👤 About the Developer

Built by **Dalton Walsh** as a professional project demonstrating modern web development practices. This site showcases expertise in:

- React/Next.js ecosystem
- Headless CMS architecture
- Performance optimization
- TypeScript development
- Full-stack JavaScript

### Connect

- GitHub: [@Dalton123](https://github.com/Dalton123)
- Portfolio: [\[Dalton Walsh\]](https://daltonwalsh.com/)

---

**Note for Recruiters**: This project represents a complete, production-ready website with modern architecture, performance optimization, and best practices. The codebase demonstrates proficiency in the latest web technologies and problem-solving approaches. Feel free to explore the code and reach out with any questions!
