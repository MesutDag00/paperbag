import { notFound } from "next/navigation";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { getAllCategories } from "@/lib/firestore/categories";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product } from "@/types/product";

export const metadata = { title: "Ürün Düzenle" };

export default async function EditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const [snap, categories] = await Promise.all([
    getAdminFirestore().collection("products").doc(id).get(),
    getAllCategories(),
  ]);
  if (!snap.exists) notFound();

  const product = { id: snap.id, ...snap.data() } as Product;

  return (
    <>
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-base font-medium">Ürün düzenle</h1>
        <p className="text-xs text-gray-400 mt-0.5">{product.title}</p>
      </div>
      <div className="p-6">
        <ProductForm categories={categories} initialData={product} productId={id} />
      </div>
    </>
  );
}
