"use client";

import { useState } from "react";
import { ProductCard } from "@/components/public/ProductCard";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface Props {
  categories: Category[];
  products: Product[];
  totalProducts?: number;
}

export function ProductFilterClient({ categories, products, totalProducts }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const [displayId, setDisplayId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const countMap: Record<string, number> = {};
  for (const p of products) {
    if (p.categoryId) countMap[p.categoryId] = (countMap[p.categoryId] ?? 0) + 1;
  }

  const filtered = products.filter((p) => {
    const matchCategory = !displayId || p.categoryId === displayId;
    const matchQuery = !query.trim() || p.title.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });

  function switchCategory(id: string | null) {
    if (id === activeId) return;
    setFading(true);
    setTimeout(() => {
      setDisplayId(id);
      setActiveId(id);
      setFading(false);
    }, 160);
  }

  function handleSearch(value: string) {
    setFading(true);
    setTimeout(() => {
      setQuery(value);
      setFading(false);
    }, 120);
  }

  return (
    <div className="flex gap-8 items-start">

      {/* ── Sol — Sidebar ── */}
      <aside className="w-[200px] shrink-0 sticky top-[88px]" style={{ animation: "heroSlideLeft 0.7s ease-out 0.1s both" }}>

        {/* Search bar */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            width="14" height="14" fill="none" viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Ürün ara..."
            className="w-full h-9 pl-8 pr-8 rounded-[10px] border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#9B2FC9]/40 focus:ring-2 focus:ring-[#9B2FC9]/10 transition-all"
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Kategori başlığı */}
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-[11px] font-bold tracking-[0.12em] text-[#94A3B8]">
            Kategoriler
          </p>
          {totalProducts !== undefined && (
            <span className="text-[11px] text-[#CBD5E1] font-medium">{totalProducts} ürün</span>
          )}
        </div>
        <nav className="flex flex-col gap-0.5">
          <SidebarItem
            label="Tümü"
            count={products.length}
            isActive={activeId === null}
            onClick={() => switchCategory(null)}
          />
          {categories.map((cat) => (
            <SidebarItem
              key={cat.id}
              label={cat.name}
              count={countMap[cat.id] ?? 0}
              isActive={activeId === cat.id}
              onClick={() => switchCategory(cat.id)}
            />
          ))}
        </nav>
      </aside>

      {/* ── Sağ — Ürün Grid ── */}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "transition-all duration-[160ms] ease-out",
            fading ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
          )}
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-7">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-20 bg-gradient-to-br from-[#9B2FC9] to-[#F5A623] scale-150" />
                <div className="relative w-[72px] h-[72px] rounded-[20px] bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(155,47,201,0.10)] flex items-center justify-center">
                  <svg width="30" height="30" fill="none" viewBox="0 0 32 32">
                    <path d="M5 10h22M5 10v14a2 2 0 002 2h18a2 2 0 002-2V10M5 10l3-6h16l3 6" stroke="url(#fg1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16h8" stroke="url(#fg2)" strokeWidth="1.8" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="fg1" x1="5" y1="4" x2="27" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                      </linearGradient>
                      <linearGradient id="fg2" x1="12" y1="16" x2="20" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-[20px] text-[#0F172A] mb-2">
                {query ? `"${query}" için sonuç bulunamadı` : "Bu filtreye uygun ürün yok"}
              </h3>
              <p className="text-[#64748B] text-[14px] max-w-[280px] leading-relaxed">
                {query ? "Farklı bir arama terimi deneyin." : "Farklı bir kategori seçin ya da tüm ürünlere göz atın."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  style={{ animation: `heroFadeUp 0.6s ease-out ${0.1 + i * 0.05}s both` }}
                >
                  <ProductCard
                    product={product}
                    categoryName={categoryMap[product.categoryId]}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

function SidebarItem({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-all duration-150 text-left select-none",
        isActive
          ? "bg-gradient-to-r from-[#9B2FC9]/[0.08] to-[#F5A623]/[0.06] text-[#0F172A] border border-[#9B2FC9]/20"
          : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "text-[12px] font-semibold tabular-nums px-1.5 py-0.5 rounded-[6px]",
          isActive
            ? "bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] text-white"
            : "bg-[#F1F5F9] text-[#94A3B8]"
        )}
      >
        {count}
      </span>
    </button>
  );
}
