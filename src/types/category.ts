export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isPublished: boolean;
  coverImageUrl: string;
  createdAt: number;
  updatedAt: number;
}

export type CategoryCreateInput = Omit<Category, "id" | "createdAt" | "updatedAt">;
export type CategoryUpdateInput = Partial<CategoryCreateInput>;
export type CategoryFormInput = Omit<Category, "id" | "slug" | "order" | "createdAt" | "updatedAt">;
