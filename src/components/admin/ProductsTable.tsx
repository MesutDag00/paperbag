"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";
import { deleteProduct, toggleProductPublished, toggleProductFeatured } from "@/server/actions/products";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface Props {
  products: Product[];
  categoryMap: Record<string, string>;
}

export function ProductsTable({ products, categoryMap }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [publishedMap, setPublishedMap] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((p) => [p.id, p.isPublished]))
  );
  const [featuredMap, setFeaturedMap] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((p) => [p.id, p.isFeatured]))
  );

  function handleTogglePublish(id: string, current: boolean) {
    setPublishedMap((prev) => ({ ...prev, [id]: !current }));
    startTransition(() => toggleProductPublished(id, !current));
  }

  function handleToggleFeatured(id: string, current: boolean) {
    setFeaturedMap((prev) => ({ ...prev, [id]: !current }));
    startTransition(() => toggleProductFeatured(id, !current));
  }

  function handleDelete(id: string) {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;
    setDeletingId(id);
    startTransition(async () => { await deleteProduct(id); setDeletingId(null); });
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-sm">Henüz ürün yok.</p>
        <p className="text-xs mt-1">Sağ üstteki butona tıklayarak ilk ürününüzü ekleyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {products.map((p) => {
        const isPublished = publishedMap[p.id] ?? p.isPublished;
        const isFeatured = featuredMap[p.id] ?? p.isFeatured;

        return (
          <div key={p.id} className="flex items-center gap-3 py-3 px-1">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
              {p.coverImageUrl ? (
                <Image src={p.coverImageUrl} alt={p.title} width={40} height={40} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
              <p className="text-xs text-gray-400">{categoryMap[p.categoryId] ?? "—"}</p>
            </div>

            {/* Öne çıkar yıldızı */}
            <button
              onClick={() => handleToggleFeatured(p.id, isFeatured)}
              disabled={isPending}
              title={isFeatured ? "Öne çıkarmayı kaldır" : "Öne çıkar"}
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-md transition-colors disabled:opacity-40",
                isFeatured
                  ? "text-amber-400 hover:text-amber-500"
                  : "text-gray-300 hover:text-amber-400"
              )}
            >
              <Star size={16} fill={isFeatured ? "currentColor" : "none"} />
            </button>

            {/* Yayınla toggle */}
            <button
              onClick={() => handleTogglePublish(p.id, isPublished)}
              disabled={isPending}
              title={isPublished ? "Gizle" : "Yayınla"}
              className={cn(
                "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:opacity-50",
                isPublished ? "bg-green-200" : "bg-gray-200"
              )}
            >
              <span
                className={cn(
                  "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform",
                  isPublished ? "translate-x-4" : "translate-x-1"
                )}
              />
            </button>

            <div className="flex items-center gap-1.5">
              <Link
                href={`/admin/products/${p.id}`}
                className={cn(buttonVariants({ size: "sm", variant: "outline" }), "h-8 gap-1.5")}
              >
                <Pencil size={13} />
                Düzenle
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                disabled={isPending || deletingId === p.id}
                className="h-8 w-8 flex items-center justify-center rounded-md border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
