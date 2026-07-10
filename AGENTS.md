# AGENTS.md

Guidance for AI agents and automation working on the Wilkinson Counselling website.

## Project context

This repository is the Wilkinson Counselling website: a sensitive professional-services site for a counselling practice. Treat it differently from a normal marketing site. The priority is trust, clarity, safety, and the client's professional voice, not aggressive conversion or high-volume SEO output.

The monorepo contains:

- `web/` - Next.js frontend application for the public website.
- `studio/` - Sanity CMS studio for content management.

Sanity project/dataset:

- Project ID: `mlba4v6u`
- Dataset: `production`

## Core ethos

The site should feel warm, grounded, calm, and professional. It should reassure visitors without overpromising. Assume readers may be anxious, uncertain, vulnerable, or looking on behalf of a child or family member.

Write and edit as a calm counsellor explaining something useful to a worried person. Be human, plain-spoken, and measured.

## Voice and tone guardrails

Prefer:

- Warm, professional, non-clinical language.
- Plain English over therapy jargon.
- Gentle phrasing such as "you might notice", "some people find", "it can help to", and "it may be worth".
- Practical examples that help visitors recognise situations without self-diagnosing.
- Clear local relevance where appropriate, especially Manchester and nearby areas, without keyword stuffing.
- A sense of choice and agency: visitors can get in touch, ask questions, or explore whether counselling feels right.

Avoid:

- Diagnosis from website copy or blog posts.
- Guaranteed outcomes or claims that counselling will fix a problem.
- Fear-based lead generation.
- Sales pressure, urgency tactics, or manipulative CTAs.
- Overly clinical certainty.
- Generic AI wellness language.
- Fabricated credentials, locations, availability, testimonials, client outcomes, or specialisms.
- Copy that makes the practice sound like a large clinic if the page is meant to feel personal and independent.

## Sensitive content rules

Counselling, child/young-person support, safeguarding, self-harm, trauma, anxiety, and family topics need extra care.

- Do not present blog content as medical or diagnostic advice.
- Do not imply that a reader definitely needs counselling.
- For urgent risk, safeguarding, self-harm, or crisis-related content, include appropriate routes to urgent or professional support and use authoritative UK sources where needed.
- Keep examples realistic but not graphic.
- Do not publish sensitive content autonomously. Create drafts or recommendations and leave final judgement to a human reviewer unless the user explicitly approves a specific publish action.

## Copy change workflow

When updating site copy:

1. Inspect the current page, component, or Sanity content before editing.
2. Make small, reviewable changes rather than broad rewrites.
3. Preserve the existing calm visual and design language unless the user asks for a redesign.
4. Keep SEO improvements secondary to trust and readability.
5. Avoid changing facts about services, credentials, pricing, availability, or locations unless confirmed by the user or current source content.
6. Review the diff for tone, overclaiming, and accidental clinical or diagnostic wording.
7. Verify locally where practical before reporting completion.

## Blog/content pipeline

- Choose topics from real search intent, existing service priorities, and gaps in the current blog.
- Prefer specific parent or client questions over generic therapy articles.
- Strengthen service clusters without duplicating existing posts.
- Draft first. Human review is required before publishing.
- Use calm, non-identifiable, non-distressing imagery.
- Wilkinson blog documents use `featuredImage` for the hero image.
- Published blog IDs follow `blog-{slug}`; drafts follow `drafts.blog-{slug}`.

## Development commands

Root level:

- `npm run dev` - start both web and studio.
- `npm run dev:web` - start only the web application.
- `npm run dev:studio` - start only Sanity Studio.
- `npm run build` - build both workspaces.
- `npm run build:web` - build only the web application.
- `npm run build:studio` - build only Sanity Studio.

## Final review checklist

- The copy still sounds like a warm, professional counselling practice.
- No unsupported clinical claims, diagnoses, or guarantees were introduced.
- No facts about Jessica, credentials, availability, pricing, services, or locations were invented.
- CTAs feel invitational rather than pushy.
- Local SEO language is natural and restrained.
- Sensitive topics are handled with care and appropriate signposting.
- Code and content changes are small enough to review safely.
- Build, lint, and local verification have been run where practical, or blockers are stated clearly.
