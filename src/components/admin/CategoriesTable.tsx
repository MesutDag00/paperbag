"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCategory, toggleCategoryPublished } from "@/server/actions/categories";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";

interface Props {
  categories: Category[];
}

export function CategoriesTable({ categories }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleToggle(id: string, current: boolean) {
    startTransition(() => toggleCategoryPublished(id, !current));
  }

  function handleDelete(id: string) {
    if (!confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) return;
    setDeletingId(id);
    startTransition(async () => { await deleteCategory(id); setDeletingId(null); });
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-sm">Henüz kategori yok.</p>
        <p className="text-xs mt-1">Sağ üstteki butona tıklayarak ilk kategorinizi ekleyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {categories.map((cat) => (
        <div key={cat.id} className="flex items-center gap-3 py-3 px-1">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{cat.name}</p>
            {cat.description && (
              <p className="text-xs text-gray-400 truncate">{cat.description}</p>
            )}
          </div>

          <button
            onClick={() => handleToggle(cat.id, cat.isPublished)}
            disabled={isPending}
            title={cat.isPublished ? "Gizle" : "Yayınla"}
            className={cn(
              "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:opacity-50",
              cat.isPublished ? "bg-green-200" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform",
                cat.isPublished ? "translate-x-4" : "translate-x-1"
              )}
            />
          </button>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/admin/categories/${cat.id}`}
              className={cn(buttonVariants({ size: "sm", variant: "outline" }), "h-8 gap-1.5")}
            >
              <Pencil size={13} />
              Düzenle
            </Link>
            <button
              onClick={() => handleDelete(cat.id)}
              disabled={isPending || deletingId === cat.id}
              className="h-8 w-8 flex items-center justify-center rounded-md border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
