export const getCanonicalUrl = (path: string = "") => {
  const baseUrl = "https://wilkinsoncounselling.co.uk";

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Return base URL for homepage, otherwise append path
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
};
