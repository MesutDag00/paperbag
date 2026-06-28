import { getPublishedProducts, getNewProducts } from "@/lib/firestore/products";
import { getAllCategories } from "@/lib/firestore/categories";
import { ProductFilterClient } from "@/components/public/ProductFilterClient";
import { NewArrivalsCarousel } from "@/components/public/NewArrivalsCarousel";

export const metadata = { title: "Ürün Kataloğu" };

export default async function ProductsPage() {
  const [products, categories, newProducts] = await Promise.all([
    getPublishedProducts(),
    getAllCategories(),
    getNewProducts(5),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <div className="bg-[#FAFAFA] min-h-screen">

      {/* ── Yeni Eklenenler ── */}
      {newProducts.length > 0 && (
        <section className="relative py-14 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d1a4a 40%, #3d1f1f 70%, #2a1500 100%)" }}>
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="text-center mb-10" style={{ animation: "heroFadeUp 0.8s ease-out 0.1s both" }}>
              <p className="text-[11px] font-bold tracking-[0.14em] text-amber-400 mb-2">
                Yeni gelenler
              </p>
              <h2 className="font-[family-name:var(--font-jakarta)] font-extrabold text-[26px] text-white leading-tight">
                Son Eklenen Ürünler
              </h2>
            </div>
            <div style={{ animation: "heroFadeUp 0.8s ease-out 0.3s both" }}>
              <NewArrivalsCarousel products={newProducts} categoryMap={categoryMap} />
            </div>
          </div>
        </section>
      )}

      {/* ── Filtre + Ürün Grid ── */}
      <div className="max-w-[1400px] mx-auto px-4 pt-16 pb-16">
        <ProductFilterClient
          categories={categories}
          products={products}
          totalProducts={products.length}
        />
      </div>

    </div>
  );
}
