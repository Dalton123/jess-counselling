export const getCanonicalUrl = (path: string = "") => {
  const baseUrl = "https://www.wilkinsoncounselling.co.uk";

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Always add trailing slash for consistency
  if (cleanPath) {
    return cleanPath.endsWith("/") ? `${baseUrl}/${cleanPath}` : `${baseUrl}/${cleanPath}/`;
  }
  return `${baseUrl}/`;
};

const SITE_NAME = "Wilkinson Counselling";

type PageSeoMetadata = {
  title: string;
  description: string;
};

const pageSeoMetadata: Record<string, PageSeoMetadata> = {
  adults: {
    title: "Adult Counselling Manchester | Wilkinson Counselling",
    description:
      "Person-centred counselling for adults in Manchester, by video or by phone, offering a calm, confidential space to explore what you are experiencing.",
  },
  "children-young-people-therapy": {
    title: "Child Counselling Manchester | Wilkinson Counselling",
    description:
      "Counselling for children and young people in Manchester, with a gentle, age-appropriate approach shaped around each child and their individual needs.",
  },
  contact: {
    title: "Contact | Wilkinson Counselling",
    description:
      "Contact Wilkinson Counselling to ask about in-person counselling in Manchester or sessions by phone or video, with no pressure to decide straight away.",
  },
  faq: {
    title: "Counselling FAQs | Wilkinson Counselling",
    description:
      "Answers to common questions about counselling for adults, children and young people in Manchester and online, including sessions, privacy and accreditation.",
  },
};

const blogTitleOverrides: Record<string, string> = {
  "time-to-talk-day-why-talking-helps-manchester-counselling":
    "Time to Talk Day: Why Talking Matters",
};

export const getPageSeoMetadata = (slug: string) => pageSeoMetadata[slug];

export const getBlogSeoTitle = (slug: string, title: string) => {
  const titleOverride = blogTitleOverrides[slug];
  if (titleOverride) return titleOverride;

  const brandedTitle = `${title} | ${SITE_NAME}`;
  return brandedTitle.length <= 60 ? brandedTitle : title;
};

export const limitMetaDescription = (description: string, maxLength = 160) => {
  const normalizedDescription = description.trim().replace(/\s+/g, " ");
  if (normalizedDescription.length <= maxLength) return normalizedDescription;

  const shortened = normalizedDescription.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const cleanEnding = lastSpace > 120 ? shortened.slice(0, lastSpace) : shortened;

  return `${cleanEnding.replace(/[\s,;:.!?-]+$/, "")}…`;
};
