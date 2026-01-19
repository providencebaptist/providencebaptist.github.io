type ImageCdnOptions = {
  width: number;
  quality?: number;
};

export const buildImageCdnUrl = (src: string, { width, quality = 75 }: ImageCdnOptions) => {
  if (typeof window === "undefined") {
    return src;
  }

  const absoluteUrl = new URL(src, window.location.origin).href;
  const encodedUrl = encodeURIComponent(absoluteUrl);

  return `https://images.weserv.nl/?url=${encodedUrl}&w=${width}&output=webp&q=${quality}`;
};
