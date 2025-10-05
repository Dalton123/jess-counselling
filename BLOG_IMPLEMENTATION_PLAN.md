# Blog Implementation Plan

## Overview
Adding a blog feature to Wilkinson Counselling website with full SEO support.

## Architecture Decisions

### Content Strategy
- **Reuse existing richText component** - no need to create new content editor
- **Follow existing page pattern** - dynamic routing via Next.js App Router
- **Separate blog posts from pages** - dedicated `blogPost` document type in Sanity

### Routes
- `/blog` - Blog listing page (all posts)
- `/blog/[slug]` - Individual blog post pages

## Implementation Checklist

### 1. Sanity Schema (Backend)
- [ ] Create `blogPost.ts` schema with fields:
  - `title` (required)
  - `slug` (required, auto-generated from title)
  - `publishedDate` (datetime, required)
  - `author` (string, optional)
  - `excerpt` (text, for meta description & listing preview)
  - `featuredImage` (image with alt text)
  - `content` (richText type - reuses existing)
  - `published` (boolean, default false)
  - `metaDescription` (text, optional override for SEO)
  - `category` or `tags` (array of strings, optional - for future filtering)
- [ ] Add to `schemaTypes/index.ts`
- [ ] Update internal link references to include blogPost type

### 2. Frontend Components

#### Blog Listing Page (`/blog/page.tsx`)
- [ ] Create page with metadata
- [ ] Query all published blog posts (sorted by date desc)
- [ ] Display in grid layout
- [ ] SEO: Add OpenGraph, canonical URL, structured data for Blog

#### Individual Post Page (`/blog/[slug]/page.tsx`)
- [ ] Dynamic route for individual posts
- [ ] Generate static params for all published posts
- [ ] Metadata generation (title, description, OG image)
- [ ] Structured data (BlogPosting schema)
- [ ] Render post header (title, date, author)
- [ ] Render content using existing RichText component

#### New Components
- [ ] `BlogCard` molecule - for listing page (image, title, excerpt, date, read more link)
- [ ] `BlogPostHeader` molecule - for individual posts (title, date, author)

### 3. Sanity Queries (`sanity/lib/queries.ts`)
- [ ] `allBlogPostsQuery` - for listing page (with excerpt, date, featured image)
- [ ] `blogPostQuery` - for individual post (full content)
- [ ] `allBlogSlugsQuery` - for generateStaticParams

### 4. SEO Implementation

#### Sitemap (`sitemap.ts`)
- [ ] Add query for all published blog posts
- [ ] Include in sitemap with:
  - `changeFrequency: 'monthly'`
  - `priority: 0.7`
  - `lastModified: publishedDate`

#### Structured Data (`utils/structuredData.ts`)
- [ ] Add `generateBlogPostStructuredData()` function
- [ ] Include BlogPosting schema with:
  - headline, datePublished, dateModified
  - author (Person schema)
  - publisher (Organization schema)
  - description, image, url

#### Metadata
- [ ] Blog listing: OpenGraph, canonical, description
- [ ] Individual posts: Dynamic OG images (featuredImage), publish date in meta

### 5. Optional Future Enhancements (Not in initial implementation)
- Pagination for blog listing
- Category/tag filtering
- Related posts
- Search functionality
- RSS feed
- Author profiles
- Comments section

## File Structure
```
studio/
  schemas/
    blogPost.ts (NEW)
  schemaTypes/
    index.ts (UPDATE)

web/
  src/app/
    blog/
      page.tsx (NEW - listing)
      [slug]/
        page.tsx (NEW - individual post)
    components/
      molecules/
        BlogCard/ (NEW)
        BlogPostHeader/ (NEW)
    sanity/
      lib/
        queries.ts (UPDATE)
    utils/
      structuredData.ts (UPDATE)
    sitemap.ts (UPDATE)
```

## Testing Checklist
- [ ] Create test blog post in Sanity
- [ ] Verify listing page displays correctly
- [ ] Verify individual post renders with RichText
- [ ] Check metadata in browser dev tools
- [ ] Validate structured data with Google Rich Results Test
- [ ] Verify sitemap includes blog posts
- [ ] Test social sharing (OG tags)
- [ ] Mobile responsiveness

## Notes
- Revalidation: Set to 3600 (1 hour) like other pages
- Images: Use existing urlForImage helper
- Styling: Follow existing Tailwind patterns
- Colors: Use existing teal color scheme
