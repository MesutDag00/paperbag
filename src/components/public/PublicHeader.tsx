"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/products", label: "Ürünler" },
  { href: "/about", label: "Hakkımızda" },
];

export function PublicHeader({ brandName }: { brandName: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] flex items-center backdrop-blur-[16px] bg-white/80 border-b border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/icon.png" alt={brandName} width={44} height={44} className="rounded-xl" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-[10px] text-[14px] font-medium transition-colors",
                  isActive
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#9B2FC9] to-[#F5A623]"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <GradientButton href="/products" size="sm">
            Ürünleri Keşfet
          </GradientButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-[10px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menü"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-[#E2E8F0] shadow-lg md:hidden">
          <nav className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-[10px] text-[14px] font-medium transition-colors",
                    isActive
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-[#F8FAFC]"
                      : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <div className="pt-2">
              <GradientButton href="/products" size="sm" className="w-full">
                Ürünleri Keşfet
              </GradientButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
