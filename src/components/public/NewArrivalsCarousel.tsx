"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

interface Props {
  products: Product[];
  categoryMap: Record<string, string>;
}

export function NewArrivalsCarousel({ products, categoryMap }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  }

  return (
    <div className="relative">

      {/* Sol fade maskesi */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-4 w-16 z-10"
        style={{ background: "linear-gradient(to right, rgba(26,5,51,0.9), transparent)" }}
      />
      {/* Sağ fade maskesi */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 z-10"
        style={{ background: "linear-gradient(to left, rgba(42,21,0,0.9), transparent)" }}
      />

      {/* Sol ok */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-[45%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/25 hover:text-white transition-all"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 18 18">
          <path d="M11 4.5L6.5 9l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Kart şeridi */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="snap-start shrink-0 w-[220px] sm:w-[260px] group/card"
          >
            {/* Gradient border wrapper */}
            <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-white/10 group-hover/card:from-[#9B2FC9]/50 group-hover/card:to-[#F5A623]/30 transition-all duration-300">
              <div className="relative aspect-square rounded-[14px] overflow-hidden bg-slate-900">
                {product.coverImageUrl ? (
                  <Image
                    src={product.coverImageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 220px, 260px"
                    quality={90}
                    className="object-cover group-hover/card:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-500 text-sm">
                    Görsel yok
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* YENİ badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] text-white px-2.5 py-1 rounded-full shadow">
                    ✦ Yeni
                  </span>
                </div>

                {/* Alt metin */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {categoryMap[product.categoryId] && (
                    <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1 font-semibold">
                      {categoryMap[product.categoryId]}
                    </p>
                  )}
                  <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-white/50 group-hover/card:text-white/80 transition-colors">
                    <span>İncele</span>
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6h8M6 2.5 9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Sağ ok */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-[45%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/25 hover:text-white transition-all"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 18 18">
          <path d="M7 4.5L11.5 9 7 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </div>
  );
}
