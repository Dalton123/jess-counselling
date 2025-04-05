import { groq } from "next-sanity";

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
      image,
      imageAlt,
      link
    }
  }
}`;

export const allPagesQuery = groq`*[_type == "page" && defined(slug.current)] {
  title,
  "slug": slug.current
}`;
