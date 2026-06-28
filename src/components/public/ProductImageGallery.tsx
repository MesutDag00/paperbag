"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
}

export function ProductImageGallery({ images, title }: Props) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin(`${x}% ${y}%`);
    }
    setZoomed((z) => !z);
  }

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] text-[14px]">
        Görsel eklenmemiş
      </div>
    );
  }

  return (
    <div className="flex gap-3 flex-1 min-h-0">
      {/* ── Sol — Dikey thumbnail şeridi ── */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 shrink-0">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => { setSelected(i); setZoomed(false); }}
              className={`relative w-[54px] h-[54px] rounded-[10px] overflow-hidden bg-white transition-all duration-150 shrink-0 ${
                selected === i
                  ? "border-2 border-[#9B2FC9] shadow-[0_0_0_3px_rgba(155,47,201,0.12)]"
                  : "border border-[#E2E8F0] hover:border-[#9B2FC9]/50"
              }`}
            >
              <Image src={img} alt="" fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}

      {/* ── Sağ — Ana Görsel ── */}
      <div
        className={`relative flex-1 rounded-[14px] overflow-hidden bg-white border border-[#E2E8F0] shadow-[0_1px_4px_rgba(15,23,42,0.06)] select-none ${
          zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[selected]!}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-200"
          style={{
            transformOrigin: origin,
            transform: zoomed ? "scale(2.2)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
}
