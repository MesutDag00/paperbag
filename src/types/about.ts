export interface About {
  brandName: string;
  tagline: string;
  description: string; // markdown
  logoUrl: string;
  contactEmail: string;
  whatsappNumber?: string; // uluslararası format, başında + yok: 905XXXXXXXXX
  instagramUrl?: string;   // tam URL: https://instagram.com/...
  updatedAt: number; // unix timestamp
}

export type AboutUpdateInput = Omit<About, "updatedAt">;
