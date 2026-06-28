import { getAllCategories } from "@/lib/firestore/categories";
import { getAllProducts } from "@/lib/firestore/products";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata = { title: "Genel Bakış" };

export default async function DashboardPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  const publishedProducts = products.filter((p) => p.isPublished).length;
  const draftProducts = products.length - publishedProducts;

  return (
    <>
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-base font-medium">Genel Bakış</h1>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs text-gray-400 mb-1">Toplam ürün</p>
            <p className="text-3xl font-medium">{products.length}</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs text-gray-400 mb-1">Yayında</p>
            <p className="text-3xl font-medium text-green-600">{publishedProducts}</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs text-gray-400 mb-1">Taslak</p>
            <p className="text-3xl font-medium text-gray-400">{draftProducts}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Hızlı işlemler</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/products/new" className={buttonVariants()}>
              + Yeni ürün ekle
            </Link>
            <Link href="/admin/categories/new" className={buttonVariants({ variant: "outline" })}>
              + Yeni kategori ekle
            </Link>
          </div>
        </div>

        {categories.length === 0 && products.length === 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-700">
            <p className="font-medium mb-1">Başlamak için:</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-600">
              <li>Önce bir kategori oluşturun (örn: Elektronik, Aksesuar)</li>
              <li>Ardından ürün ekleyin ve kategoriye atayın</li>
              <li>Yayınla toggle'ını açarak ürünü sitede görünür yapın</li>
            </ol>
          </div>
        )}
      </div>
    </>
  );
}
