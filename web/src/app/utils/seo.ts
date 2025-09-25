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
