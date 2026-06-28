import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types/category";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group block bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden transition-all duration-200 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
    >
      {/* Görsel */}
      <div className="relative aspect-[4/3] bg-[#F8FAFC] overflow-hidden">
        {category.coverImageUrl ? (
          <>
            <Image
              src={category.coverImageUrl}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#9B2FC9]/20 to-[#F5A623]/20 opacity-30 group-hover:opacity-60 transition-opacity duration-200" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#9B2FC9]/5 to-[#F5A623]/5">
            <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-[#9B2FC9]/20 to-[#F5A623]/20 flex items-center justify-center mb-3">
              <span className="text-2xl">📦</span>
            </div>
            <span className="text-[13px] text-[#94A3B8] font-medium">Görsel eklenmemiş</span>
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-[18px] text-[#0F172A] leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#9B2FC9] group-hover:to-[#F5A623] transition-all duration-200">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1 text-[13px] text-[#64748B] line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
        <p className="mt-2 text-[12px] font-semibold text-[#9B2FC9] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Ürünleri gör →
        </p>
      </div>
    </Link>
  );
}
