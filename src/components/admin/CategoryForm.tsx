"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/server/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Category, CategoryFormInput } from "@/types/category";

interface Props {
  initialData?: Category;
  categoryId?: string;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function CategoryForm({ initialData, categoryId }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl ?? "");
  const [isPending, startTransition] = useTransition();
  const [saveError, setSaveError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaveError("");
    startTransition(async () => {
      try {
        const data: CategoryFormInput = { name, description, coverImageUrl, isPublished: initialData?.isPublished ?? false };
        if (categoryId) {
          await updateCategory(categoryId, data);
        } else {
          await createCategory(data);
        }
        router.push("/admin/categories");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "";
        if (msg === "Unauthorized") {
          router.push("/login?next=" + encodeURIComponent(window.location.pathname));
        } else {
          setSaveError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">Kategori Bilgileri</p>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Kategori Adı</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örnek: Elektronik"
              required
            />
            {name && !categoryId && (
              <p className="text-xs text-gray-400">URL: /kategori/{slugify(name)}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Açıklama <span className="text-gray-400 font-normal">(isteğe bağlı)</span></Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Bu kategorideki ürünler hakkında kısa bilgi..."
            />
          </div>
          <div className="space-y-1">
            <Label>Kapak Görseli</Label>
            <ImageUpload storagePath="categories" value={coverImageUrl} onChange={setCoverImageUrl} />
          </div>
        </div>
      </div>

      {saveError && <p className="text-sm text-red-600 mb-2">{saveError}</p>}
      <div className="flex gap-3 pt-2 border-t">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
          İptal
        </Button>
      </div>
    </form>
  );
}
