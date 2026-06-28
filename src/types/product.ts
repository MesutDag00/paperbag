export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string; // markdown
  categoryId: string;
  images: string[]; // Firebase Storage URLs
  coverImageUrl: string;
  features: string[];
  order: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: number;
  updatedAt: number;
}

export type ProductCreateInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
export type ProductUpdateInput = Partial<ProductCreateInput>;
export type ProductFormInput = Omit<Product, "id" | "slug" | "order" | "createdAt" | "updatedAt">;
