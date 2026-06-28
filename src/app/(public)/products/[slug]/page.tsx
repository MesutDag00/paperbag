import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/firestore/products";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { ProductImageGallery } from "@/components/public/ProductImageGallery";
import { GradientButton } from "@/components/ui/gradient-button";
import { getAbout } from "@/lib/firestore/about";
import { WhatsAppProductButton } from "@/components/public/WhatsAppFab";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Category } from "@/types/category";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.title };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const [product, about] = await Promise.all([
    getProductBySlug(slug),
    getAbout(),
  ]);

  if (!product) notFound();

  const whatsappNumber = about?.whatsappNumber;

  let category: Category | null = null;
  if (product.categoryId) {
    const snap = await getAdminFirestore().collection("categories").doc(product.categoryId).get();
    if (snap.exists) category = { id: snap.id, ...snap.data() } as Category;
  }

  const allImages = [
    ...(product.coverImageUrl ? [product.coverImageUrl] : []),
    ...product.images.filter((img) => img !== product.coverImageUrl),
  ];

  const contactEmail = about?.contactEmail ?? "";

  return (
    <div className="bg-[#FAFAFA] min-h-[calc(100vh-72px)]">
      <div className="max-w-[1200px] mx-auto px-6 py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] mb-6 shrink-0">
          <Link href="/products" className="text-[#64748B] hover:text-[#0F172A] transition-colors">
            Ürünler
          </Link>
          {category && (
            <>
              <span className="text-[#E2E8F0]">/</span>
              <Link
                href={`/category/${category.slug}`}
                className="text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <span className="text-[#E2E8F0]">/</span>
          <span className="font-medium bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent">
            {product.title}
          </span>
        </nav>

        {/* Ana İçerik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.06)]">

          {/* Sol — Görsel Galerisi */}
          <div className="p-7 bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col h-[340px] md:h-auto">
            <ProductImageGallery images={allImages} title={product.title} />
          </div>

          {/* Sağ — Ürün Bilgisi */}
          <div className="flex flex-col p-7">

            {/* Kategori + Başlık */}
            <div className="pb-4 border-b border-[#F1F5F9]">
              {category && (
                <p className="text-[11px] font-bold tracking-[0.14em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent mb-2">
                  {category.name}
                </p>
              )}
              <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-[26px] sm:text-[32px] leading-[1.15] text-[#0F172A]">
                {product.title}
              </h1>
            </div>

            {/* Özellikler */}
            {product.features.length > 0 && (
              <div className="py-4 border-b border-[#F1F5F9]">
                <p className="text-[11px] font-bold tracking-[0.12em] text-[#94A3B8] mb-3">
                  Özellikler
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f, i) => (
                    <span
                      key={`${f}-${i}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[13px] font-medium text-[#374151]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Açıklama */}
            {product.description && (
              <div className="py-6 border-b border-[#F1F5F9] prose prose-sm max-w-none text-[#64748B] leading-relaxed [&_p]:mb-2 [&_p]:text-[15px] [&_h2]:font-[family-name:var(--font-jakarta)] [&_h2]:text-[#0F172A] [&_strong]:text-[#0F172A]">
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3 flex-wrap">
              {whatsappNumber && (
                <WhatsAppProductButton phone={whatsappNumber} productTitle={product.title} />
              )}
              {contactEmail ? (
                <GradientButton href={`mailto:${contactEmail}?subject=Teklif Talebi — ${product.title}`} size="md">
                  E-posta ile Teklif Al
                </GradientButton>
              ) : (
                <GradientButton href="/about" size="md">
                  İletişime Geç
                </GradientButton>
              )}
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-12 px-7 text-[15px] font-semibold rounded-[14px] border border-[#E2E8F0] text-[#64748B] bg-white hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors duration-200"
              >
                ← Tüm Ürünler
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
