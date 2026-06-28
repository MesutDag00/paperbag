"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

interface Props {
  products: Product[];
  categoryMap: Record<string, string>;
}

export function FeaturedCarousel({ products, categoryMap }: Props) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const total = products.length;

  function go(dir: 1 | -1) {
    if (fading || total <= 1) return;
    setFading(true);
    setTimeout(() => {
      setCurrent((c) => (c + dir + total) % total);
      setFading(false);
    }, 250);
  }

  function at(offset: number): Product {
    return products[(current + offset + total) % total]!;
  }

  const prev = at(-1);
  const center = at(0);
  const next = at(1);

  return (
    <div className="relative select-none">

      {/* Sol ok */}
      <button
        onClick={() => go(-1)}
        disabled={total <= 1}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#94A3B8] hover:text-[#9B2FC9] hover:border-[#9B2FC9]/30 shadow-sm transition-all duration-200 disabled:opacity-0"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
          <path d="M11 4.5L6.5 9l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Kart sahası */}
      <div className="flex items-center justify-center gap-4 px-4 sm:px-16">

        {/* Sol kart — sadece desktop */}
        {total > 1 && (
          <button
            onClick={() => go(-1)}
            className="hidden sm:block shrink-0 w-[260px] rounded-[20px] overflow-hidden shadow-md
              scale-[0.88] hover:scale-[0.94]
              transition-all duration-300 ease-out origin-right cursor-pointer focus:outline-none"
            style={{ transition: fading ? "none" : undefined }}
          >
            <SideCard product={prev} categoryName={categoryMap[prev.categoryId]} />
          </button>
        )}

        {/* Merkez kart */}
        <Link
          href={`/products/${center.slug}`}
          className={`shrink-0 w-full max-w-[360px] sm:w-[340px] rounded-[24px] overflow-hidden shadow-[0_12px_48px_rgba(155,47,201,0.18)] z-10
            transition-all duration-300 ease-out hover:shadow-[0_20px_60px_rgba(155,47,201,0.28)] hover:scale-[1.03] block
            ${fading ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"}`}
        >
          <CenterCard product={center} categoryName={categoryMap[center.categoryId]} />
        </Link>

        {/* Sağ kart — sadece desktop */}
        {total > 1 && (
          <button
            onClick={() => go(1)}
            className="hidden sm:block shrink-0 w-[260px] rounded-[20px] overflow-hidden shadow-md
              scale-[0.88] hover:scale-[0.94]
              transition-all duration-300 ease-out origin-left cursor-pointer focus:outline-none"
            style={{ transition: fading ? "none" : undefined }}
          >
            <SideCard product={next} categoryName={categoryMap[next.categoryId]} />
          </button>
        )}

      </div>

      {/* Sağ ok */}
      <button
        onClick={() => go(1)}
        disabled={total <= 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#94A3B8] hover:text-[#9B2FC9] hover:border-[#9B2FC9]/30 shadow-sm transition-all duration-200 disabled:opacity-0"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
          <path d="M7 4.5L11.5 9 7 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Nokta indikatörler */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {products.map((_, i) => (
            <div key={i} className="w-9 h-3 flex items-center justify-center">
              <button
                onClick={() => {
                  if (fading || i === current) return;
                  setFading(true);
                  setTimeout(() => { setCurrent(i); setFading(false); }, 250);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ease-out ${
                  i === current
                    ? "w-9 bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] shadow-[0_0_8px_rgba(155,47,201,0.4)]"
                    : "w-2.5 bg-[#9B2FC9]/15 hover:bg-[#9B2FC9]/30"
                }`}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

/* ── Merkez Kart ── */
function CenterCard({ product, categoryName }: { product: Product; categoryName?: string }) {
  return (
    <div className="bg-white">
      {/* Görsel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {product.coverImageUrl ? (
          <Image
            src={product.coverImageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 280px, 340px"
            quality={90}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-100" />
        )}
        {/* Kategori badge */}
        {categoryName && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-black uppercase tracking-[0.12em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] text-white px-2.5 py-1 rounded-full shadow">
              {categoryName}
            </span>
          </div>
        )}
        {/* Yıldız */}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
              fill="url(#starGrad)" />
            <defs>
              <linearGradient id="starGrad" x1="2" y1="1" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Metin alanı */}
      <div className="px-5 py-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-[17px] text-[#0F172A] leading-snug truncate">
            {product.title}
          </h3>
          {product.description && (
            <p className="mt-1 text-[13px] text-[#64748B] leading-relaxed line-clamp-1">
              {product.description.replace(/[#*_]/g, "").slice(0, 80)}
            </p>
          )}
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#9B2FC9] hover:bg-[#9B2FC9] hover:text-white hover:border-[#9B2FC9] transition-all duration-200">
          <svg width="13" height="13" fill="none" viewBox="0 0 12 12">
            <path d="M2 6h8M6 2.5 9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Yan Kart ── */
function SideCard({ product, categoryName }: { product: Product; categoryName?: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
      {product.coverImageUrl ? (
        <Image
          src={product.coverImageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 220px, 520px"
          quality={90}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      {categoryName && (
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-black uppercase tracking-[0.12em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] text-white px-2.5 py-1 rounded-full shadow">
            {categoryName}
          </span>
        </div>
      )}
      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
            fill="url(#starGrad2)" />
          <defs>
            <linearGradient id="starGrad2" x1="2" y1="1" x2="12" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
