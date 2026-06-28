"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/server/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MultiImageUpload } from "@/components/admin/MultiImageUpload";
import type { Category } from "@/types/category";
import type { Product, ProductFormInput } from "@/types/product";

interface Props {
  categories: Category[];
  initialData?: Product;
  productId?: string;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ProductForm({ categories, initialData, productId }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl ?? "");
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [featuresText, setFeaturesText] = useState((initialData?.features ?? []).join("\n"));
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [isPending, startTransition] = useTransition();
  const [saveError, setSaveError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaveError("");
    const features = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
    startTransition(async () => {
      try {
        const data: ProductFormInput = {
          title, description, categoryId, coverImageUrl, images,
          features, isFeatured, isPublished: initialData?.isPublished ?? false,
        };
        if (productId) {
          await updateProduct(productId, data);
        } else {
          await createProduct(data);
        }
        router.push("/admin/products");
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
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">Ürün Bilgileri</p>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Ürün Adı</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örnek: Paslanmaz Çelik Termos"
              required
            />
            {title && !productId && (
              <p className="text-xs text-gray-400">URL: /urunler/{slugify(title)}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Kategori</Label>
            <Select value={categoryId} onValueChange={(v) => setCategoryId(v ?? "")}>
              <SelectTrigger><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Açıklama</Label>
            <textarea
              className="w-full border rounded-md p-3 text-sm min-h-[120px] resize-y bg-background"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ürün hakkında kısa bir açıklama yazın..."
            />
          </div>
          <div className="space-y-1">
            <Label>Özellikler <span className="text-gray-400 font-normal">(her satıra bir özellik)</span></Label>
            <textarea
              className="w-full border rounded-md p-3 text-sm min-h-[80px] resize-y bg-background"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder={"Su geçirmez\nUSB-C şarj\n2 yıl garanti"}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">Görseller</p>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Kapak Görseli</Label>
            <ImageUpload storagePath="products" value={coverImageUrl} onChange={setCoverImageUrl} />
          </div>
          <div className="space-y-1">
            <Label>Ek Görseller</Label>
            <MultiImageUpload storagePath="products/gallery" values={images} onChange={setImages} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">Yayın Ayarları</p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">Ana sayfada öne çıkar</span>
          </label>
        </div>
      </div>

      {saveError && <p className="text-sm text-red-600 mb-2">{saveError}</p>}
      <div className="flex gap-3 pt-2 border-t">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          İptal
        </Button>
      </div>
    </form>
  );
}
