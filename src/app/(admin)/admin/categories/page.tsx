import { getAllCategories } from "@/lib/firestore/categories";
import { CategoriesTable } from "@/components/admin/CategoriesTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata = { title: "Kategoriler" };

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <>
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-base font-medium">Kategoriler</h1>
        <Link href="/admin/categories/new" className={buttonVariants({ size: "sm" })}>
          + Yeni kategori ekle
        </Link>
      </div>
      <div className="p-6">
        <div className="bg-white border rounded-xl px-4 py-2">
          <CategoriesTable categories={categories} />
        </div>
      </div>
    </>
  );
}
