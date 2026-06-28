import { notFound } from "next/navigation";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { CategoryForm } from "@/components/admin/CategoryForm";
import type { Category } from "@/types/category";

export const metadata = { title: "Kategori Düzenle" };

export default async function EditCategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const db = getAdminFirestore();
  const snap = await db.collection("categories").doc(id).get();
  if (!snap.exists) notFound();

  const category = { id: snap.id, ...snap.data() } as Category;

  return (
    <>
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-base font-medium">Kategori düzenle</h1>
        <p className="text-xs text-gray-400 mt-0.5">{category.name}</p>
      </div>
      <div className="p-6">
        <CategoryForm initialData={category} categoryId={id} />
      </div>
    </>
  );
}
