import { groq } from "next-sanity";

export const headerQuery = `
  *[_type == "header"][0] {
    siteTitle,
    logo {
      asset->{
        url,
        metadata { dimensions }
      },
      alt
    },
    links[] {
      name,
      url,
      submenu[] {
        name,
        url
      }
    },
    cta {
      name,
      url
    }
  }
`;

export const footerQuery = groq`*[_type == "footer"][0] {
  logoText,
  socialLinks[] {
    platform,
    url,
    isActive
  },
  showBackToTop
}`;

export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0] {
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
    },
    testimonials[]-> {
      _id,
      quote,
      author,
      role
    }
  }
}`;

export const allPagesQuery = groq`*[_type == "page" && defined(slug.current)] {
  title,
  "slug": slug.current
}`;
