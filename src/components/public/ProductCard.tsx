import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-[3px] border border-slate-100 hover:shadow-xl"
    >
      {/* ── Görsel ── */}
      <div className="relative aspect-square bg-[#F8FAFC] overflow-hidden shrink-0">
        {product.coverImageUrl ? (
          <>
            <Image
              src={product.coverImageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Kategori badge — görsel üstünde sol üst */}
            {categoryName && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] text-white shadow-[0_2px_8px_rgba(155,47,201,0.4)]">
                  {categoryName}
                </span>
              </div>
            )}

            {/* Öne çıkan yıldız — sağ üst */}
            {product.isFeatured && (
              <div className="absolute top-3 right-3 z-10">
                <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-[#F5A623]/40 flex items-center justify-center shadow-[0_2px_8px_rgba(245,166,35,0.35)] animate-[starPulse_2s_ease-in-out_infinite]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill="url(#starGrad)"
                      stroke="url(#starGrad)"
                      strokeWidth="0.5"
                    />
                    <defs>
                      <linearGradient id="starGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9B2FC9"/>
                        <stop offset="1" stopColor="#F5A623"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            )}

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover CTA — görsel üzerinde kayar */}
            <div className="absolute inset-0 flex items-end p-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white text-[13px] font-semibold text-[#0F172A] shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Detayları Gör
                <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                  <path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#F0F4F8]">
            <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#9B2FC9]/12 to-[#F5A623]/12 flex items-center justify-center mb-3 border border-[#E2E8F0]">
              <span className="text-2xl">📦</span>
            </div>
            <span className="text-[12px] text-[#94A3B8] font-medium">Görsel eklenmemiş</span>
          </div>
        )}
      </div>

      {/* ── İçerik ── */}
      <div className="flex flex-col flex-1 px-5 py-4">
        {/* Başlık */}
        <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-[17px] leading-snug text-slate-800 group-hover:bg-gradient-to-r group-hover:from-[#9B2FC9] group-hover:to-[#F5A623] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2">
          {product.title}
        </h3>

        {/* Özellikler */}
        {product.features.length > 0 && (
          <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-1">
            {product.features.slice(0, 4).join(" · ")}
          </p>
        )}

        {/* Alt aksiyonu */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#F1F5F9]">
          <span className="text-[12px] font-semibold bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Ürünü İncele
          </span>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] group-hover:bg-gradient-to-r group-hover:from-[#9B2FC9] group-hover:to-[#F5A623] group-hover:border-transparent transition-all duration-200">
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12" className="text-[#94A3B8] group-hover:text-white transition-colors duration-200">
              <path d="M2 6h8M6 2.5 9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
