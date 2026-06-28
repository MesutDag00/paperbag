import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata = { title: "Yeni Kategori" };

export default function NewCategoryPage() {
  return (
    <>
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-base font-medium">Yeni kategori ekle</h1>
      </div>
      <div className="p-6">
        <CategoryForm />
      </div>
    </>
  );
}
