export const tags = {
  about: () => "content:about" as const,
  categories: () => "content:categories" as const,
  category: (slug: string) => `content:category:${slug}` as const,
  products: () => "content:products" as const,
  product: (slug: string) => `content:product:${slug}` as const,
  featured: () => "content:featured" as const,
};
