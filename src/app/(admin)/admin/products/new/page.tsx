import { getAllCategories } from "@/lib/firestore/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = { title: "Yeni Ürün" };

export default async function NewProductPage() {
  const categories = await getAllCategories();
  return (
    <>
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-base font-medium">Yeni ürün ekle</h1>
      </div>
      <div className="p-6">
        <ProductForm categories={categories} />
      </div>
    </>
  );
}
