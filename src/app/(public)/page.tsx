import { getAllCategories } from "@/lib/firestore/categories";
import { getFeaturedProducts } from "@/lib/firestore/products";
import { GradientButton } from "@/components/ui/gradient-button";
import { FeaturedCarousel } from "@/components/public/FeaturedCarousel";
import { FeaturesSection } from "@/components/public/FeaturesSection";
import { HowItWorksSection } from "@/components/public/HowItWorksSection";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getAllCategories(),
    getFeaturedProducts(),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <div className="bg-[#FAFAFA]">

      {/* ── 1. Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          height: "calc(100vh - 72px)",
          minHeight: "560px",
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Sol çanta */}
        <div className="hidden lg:block absolute left-0 z-10"
          style={{ bottom: "6%", left: "6.2%", width: "clamp(220px, 22vw, 320px)", height: "clamp(280px, 62%, 480px)", animation: "heroSlideLeft 1s ease-out 0.4s both" }}>
          <Image src="/hero-bag-left.png" alt="Sirius Ambalaj mermer çanta" fill className="object-contain object-bottom mix-blend-multiply" priority quality={90} sizes="320px" />
        </div>

        {/* Sağ çantalar */}
        <div className="hidden lg:block absolute right-0 z-10"
          style={{ bottom: "8%", width: "clamp(460px, 48vw, 700px)", height: "clamp(520px, 78%, 740px)", animation: "heroSlideRight 1s ease-out 0.6s both" }}>
          <Image src="/hero-bags-right.png" alt="Sirius Ambalaj ürün koleksiyonu" fill className="object-contain mix-blend-multiply" style={{ objectPosition: "right bottom" }} priority quality={90} sizes="700px" />
        </div>

        {/* Merkez metin */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-[560px]" style={{ animation: "heroFadeUp 0.9s ease-out 0.1s both" }}>
            <h1 className="font-[family-name:var(--font-jakarta)] font-extrabold text-5xl sm:text-6xl lg:text-[52px] xl:text-[62px] leading-[1.08] tracking-tighter text-slate-900">
              Ürününüzü{" "}
              <span className="bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent">
                öne çıkaran
              </span>{" "}
              ambalaj tasarımları
            </h1>
          </div>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap" style={{ animation: "heroFadeUp 0.9s ease-out 0.35s both" }}>
            <GradientButton href="/products" size="lg">Ürün Kataloğu</GradientButton>
            <Link href="/about" className="inline-flex items-center justify-center h-14 px-8 text-[15px] font-semibold rounded-full border border-white/60 text-slate-800 bg-white/60 backdrop-blur-sm hover:bg-white/90 transition-all duration-200">
              Hakkımızda
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-bounce">
          <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500">Keşfet</span>
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M5 7.5l5 5 5-5" stroke="url(#scrollGrad2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="scrollGrad2" x1="5" y1="7.5" x2="15" y2="12.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* ── 3. Öne Çıkan Ürünler ── */}
      {featuredProducts.length > 0 && (
        <section className="relative py-20 px-6 overflow-hidden" style={{
          background: [
            "radial-gradient(ellipse 900px 700px at -5% 50%, rgba(155,47,201,0.10) 0%, transparent 65%)",
            "radial-gradient(ellipse 700px 600px at 105% 30%, rgba(155,47,201,0.08) 0%, transparent 65%)",
            "radial-gradient(ellipse 500px 400px at 50% 110%, rgba(245,166,35,0.06) 0%, transparent 65%)",
            "linear-gradient(160deg, #fdf6ff 0%, #ffffff 45%, #fffbf5 100%)",
          ].join(", ")
        }}>
          <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-[#9B2FC9]/[0.06]" />
          <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 w-[320px] h-[320px] rounded-full border border-[#9B2FC9]/[0.04]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full border border-[#F5A623]/[0.07]" />

          <div className="max-w-[1280px] mx-auto relative z-10">
            <ScrollReveal className="text-center mb-12">
              <p className="text-[11px] font-bold tracking-[0.14em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent mb-2">Öne çıkanlar</p>
              <h2 className="font-[family-name:var(--font-jakarta)] font-extrabold text-[28px] text-slate-900 leading-tight">Seçili Ürünlerimiz</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <FeaturedCarousel products={featuredProducts} categoryMap={categoryMap} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── 4. Nasıl Çalışır ── */}
      <ScrollReveal threshold={0.08}>
        <HowItWorksSection />
      </ScrollReveal>

      {/* ── 5. Neden Biz ── */}
      <ScrollReveal threshold={0.08}>
        <FeaturesSection />
      </ScrollReveal>


    </div>
  );
}
