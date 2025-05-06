export const isInternalLink = (url: string): boolean => /^\/(?!\/)/.test(url);
