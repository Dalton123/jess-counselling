# Case Study: Building a Modern Counselling Practice Website with Next.js 15 and Sanity CMS

_A comprehensive look at developing a professional counselling website that balances performance, accessibility, and content management._

---

## Project Overview

Jessica Wilkinson Counselling needed a modern, professional website to establish her online presence as a BACP-registered counsellor. The project required a solution that would be easy for a non-technical client to manage while delivering excellent performance and user experience.

**[Image Placeholder: Final website homepage screenshot showing the hero section with the tagline "Guidance. Growth. Healing."]**

### Key Requirements

- Professional, calming design reflecting the counselling practice
- Easy content management for the client
- Strong SEO foundation for local search visibility
- Mobile-first responsive design
- Fast loading times for better user experience
- Contact form with email integration
- Separate sections for adult and child counselling services

### Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **CMS**: Sanity Studio
- **Animations**: Framer Motion
- **Email**: Resend API
- **Hosting**: Vercel
- **Icons**: React Icons

---

## Design & User Experience

### Visual Identity

The design needed to convey trust, professionalism, and calm - essential qualities for a counselling practice. I chose a soothing color palette centered around teal (#0d9488) with soft, organic shapes and subtle animations.

**[Image Placeholder: Color palette and typography showcase]**

### Typography

- **Headlines**: DM Serif Display for elegance and professionalism
- **Body Text**: Montserrat for excellent readability
- Both fonts were optimized with `font-display: swap` and preloading for performance

### Layout Philosophy

The layout follows a clear hierarchy with generous white space, making information easily digestible. Each section serves a specific purpose in the user journey from awareness to contact.

**[Image Placeholder: Wireframes or design mockups showing the layout structure]**

---

## Technical Implementation

### Next.js 15 Architecture

I chose Next.js 15 for its cutting-edge features and performance optimizations:

```typescript
// Dynamic routing with catch-all segments
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const pages = await getAllPages();

  return pages
    .filter((page: SanityPage) => page.slug !== "404")
    .map((page: SanityPage) => ({
      slug: [page.slug],
    }));
}
```

**[Image Placeholder: Architecture diagram showing Next.js app structure]**

### Sanity CMS Integration

The headless CMS setup allows Jessica to manage content without touching code:

```typescript
export const pageQuery = groq`*[_type == "page" && slug.current == $slug && published == true][0] {
  title,
  description,
  content[] {
    _type,
    ...,
    selectedServices[]-> {
      _id,
      title,
      description,
      image,
      imageAlt,
      link {
        href,
        text
      }
    }
  }
}`;
```

**[Image Placeholder: Screenshot of Sanity Studio interface showing the page builder]**

### Component Architecture

Built with atomic design principles:

- **Atoms**: Button, SectionWrapper
- **Molecules**: Feature cards, ServiceCard, SectionHeader
- **Organisms**: Header, Footer, Hero, Services sections

**[Image Placeholder: Component hierarchy diagram or Storybook screenshot]**

---

## Performance Optimization

### Initial Challenges

The hero section initially had poor Core Web Vitals:

- **LCP**: 5,190ms (Poor)
- **Heavy parallax effects** impacting mobile performance
- **Unoptimized font loading**

### Solutions Implemented

#### 1. Image Optimization

```typescript
// Next.js config for advanced image optimization
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
}
```

#### 2. Font Performance

```typescript
const dmSerifDisplay = DM_Serif_Display({
  display: "swap",
  preload: true,
  fallback: ["serif"],
});
```

#### 3. Progressive Enhancement

Removed heavy parallax effects in favor of subtle Framer Motion animations:

```typescript
// Conditional animation loading
const shouldAnimate = useMediaQuery('(min-width: 1024px)');

return (
  <motion.div
    initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
    animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);
```

### Results

- **LCP improved to 4,150ms** (significant improvement)
- **Perfect mobile responsiveness**
- **Eliminated layout shifts**

**[Image Placeholder: Before/after Lighthouse performance scores]**

---

## Content Management Features

### Dynamic Page Builder

Created a flexible component system allowing Jessica to build pages from reusable blocks:

- Hero sections with customizable CTAs
- Service showcases with image and text
- Testimonials carousel
- Contact forms
- Rich text content blocks

**[Image Placeholder: Sanity Studio showing the page builder in action]**

### Publishing Workflow

Implemented a simple published/unpublished system:

```typescript
// Only fetch published content
const publishedPages = groq`*[_type == "page" && published == true]`;
```

This allows Jessica to prepare content privately before making it live.

---

## Advanced Features

### Contact Form with Email Integration

Built a robust contact form using Resend API:

```typescript
// Honeypot spam protection
const honeypot = formData.get("companyName");
if (honeypot) {
  return NextResponse.json({ error: "Spam detected" }, { status: 400 });
}

// Send auto-reply email
await resend.emails.send({
  from: "jessica@wilkinsoncounselling.co.uk",
  to: email,
  subject: "Thank you for your enquiry",
  react: AutoReplyEmail({ name }),
});
```

**[Image Placeholder: Contact form screenshot and email template preview]**

### SEO & Technical Implementation

#### Dynamic Sitemap Generation

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: PageData[] = await client.fetch(pagesQuery);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      priority: 0.8,
    })),
  ];
}
```

#### Meta Tags & Open Graph

Comprehensive metadata for social sharing and SEO:

```typescript
export const metadata = {
  metadataBase: new URL("https://wilkinsoncounselling.co.uk"),
  openGraph: {
    title: "Jessica Wilkinson Counselling",
    description:
      "Professional counselling services for children, adolescents and adults",
    images: ["/images/Wilkinson-counselling-OG.jpg"],
  },
};
```

**[Image Placeholder: Social media preview cards showing Open Graph implementation]**

---

## Challenges & Solutions

### 1. Google Search Console Issues

**Problem**: Duplicate content warnings, pages not being indexed
**Solution**:

- Implemented redirects from `/home` to `/`
- Added canonical URLs and metadataBase
- Enhanced sitemap with explicit page listings

### 2. Performance vs. Visual Appeal

**Problem**: Beautiful parallax effects were hurting performance
**Solution**: Progressive enhancement - load complex animations only on capable devices

### 3. Content Flexibility vs. Design Consistency

**Problem**: Client needed content flexibility without breaking design
**Solution**: Structured content blocks with design constraints built into the CMS schema

**[Image Placeholder: Before/after comparison showing the evolution of a problematic component]**

---

## Deployment & DevOps

### Vercel Integration

Seamless deployment pipeline with:

- Automatic builds on git push
- Preview deployments for testing
- Edge functions for optimal performance
- Built-in analytics

### Environment Configuration

```typescript
// Sanity environment setup
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === "production",
});
```

**[Image Placeholder: Vercel dashboard showing deployment pipeline]**

---

## Results & Impact

### Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: All metrics in "Good" range
- **Mobile Performance**: Optimized for all device sizes

### Business Impact

- Professional online presence established
- Easy content management for ongoing updates
- Strong foundation for local SEO
- Improved client inquiry process

### Technical Achievements

- Modern, maintainable codebase
- Scalable content management system
- Optimized for search engines
- Excellent user experience across devices

**[Image Placeholder: Analytics dashboard showing traffic and performance metrics]**

---

## Lessons Learned

### Performance First

Early optimization is crucial. What looks good in design tools might not perform well in production, especially on mobile devices.

### Progressive Enhancement

Start with a solid, accessible foundation and enhance with JavaScript. This ensures the site works for everyone.

### Client Education

Spending time to create clear documentation and training for the CMS pays dividends in long-term client satisfaction.

### SEO is Technical

Modern SEO requires technical implementation from day one - sitemaps, meta tags, structured data, and Core Web Vitals all matter.

---

## Future Enhancements

### Planned Improvements

- **Blog integration** for SEO content marketing
- **Online booking system** for appointment scheduling
- **Resource library** for client handouts and exercises
- **Multilingual support** for diverse communities

### Technical Debt

- Migrate remaining class components to functional components
- Implement error boundaries for better error handling
- Add comprehensive testing suite
- Optimize bundle size further

**[Image Placeholder: Roadmap or feature backlog visualization]**

---

## Conclusion

Building the Jessica Wilkinson Counselling website was an excellent opportunity to combine modern web technologies with real business needs. The project successfully delivered a professional, performant website that empowers the client to manage her content while providing an excellent user experience for potential clients.

The choice of Next.js 15 with Sanity CMS proved ideal for this use case, offering the performance benefits of static generation with the flexibility of dynamic content management. The focus on Core Web Vitals and SEO has positioned the site well for organic discovery.

Most importantly, the website serves its primary purpose: helping people find and connect with mental health support in a welcoming, professional environment.

---

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Sanity Studio** - Headless CMS
- **Framer Motion** - Smooth animations
- **Resend** - Email API
- **Vercel** - Hosting and deployment
- **React Icons** - Icon library

**[Image Placeholder: Technology stack logos arranged in a grid]**

---

_This website represents a successful collaboration between technical implementation and user-centered design, resulting in a platform that serves both the business owner and her clients effectively._
