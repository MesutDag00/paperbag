import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/firestore/categories";
import { getProductsByCategory } from "@/lib/firestore/products";
import { ProductCard } from "@/components/public/ProductCard";
import Link from "next/link";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return { title: category.name };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const category = await getCategoryBySlug(slug);
  if (!category || !category.isPublished) notFound();

  const products = await getProductsByCategory(category.id);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* ── Kategori Hero ── */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-6 py-14">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link
              href="/products"
              className="text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              Ürünler
            </Link>
            <span className="text-[#E2E8F0]">/</span>
            <span className="font-medium text-[#0F172A]">{category.name}</span>
          </nav>

          <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-[48px] leading-[1.1] tracking-tight bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-3 text-[18px] text-[#64748B] leading-relaxed max-w-[600px]">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* ── Ürünler ── */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            {/* Dekoratif arka plan */}
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-20 bg-gradient-to-br from-[#9B2FC9] to-[#F5A623] scale-150" />
              <div className="relative w-20 h-20 rounded-[22px] bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(155,47,201,0.10)] flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path d="M5 10h22M5 10v14a2 2 0 002 2h18a2 2 0 002-2V10M5 10l3-6h16l3 6" stroke="url(#g1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16h8" stroke="url(#g2)" strokeWidth="1.8" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="g1" x1="5" y1="4" x2="27" y2="26" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                    </linearGradient>
                    <linearGradient id="g2" x1="12" y1="16" x2="20" y2="16" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-[22px] text-[#0F172A] mb-2">
              Bu kategoride henüz ürün yok
            </h3>
            <p className="text-[#64748B] text-[15px] max-w-[320px] mb-8 leading-relaxed">
              Yeni ürünler yakında eklenecek. Diğer kategorilere göz atabilir ya da bizimle iletişime geçebilirsiniz.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-[12px] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
              >
                Tüm Ürünleri Gör
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-[12px] border border-[#E2E8F0] bg-white text-[#64748B] text-[14px] font-semibold hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[14px] text-[#94A3B8] font-medium mb-8">
              {products.length} ürün listeleniyor
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  categoryName={category.name}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
