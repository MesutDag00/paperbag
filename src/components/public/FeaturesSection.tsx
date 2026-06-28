import { Package, Truck, Palette, BadgeCheck } from "lucide-react";
import type { ReactNode } from "react";

const stats: { value: string; label: string }[] = [
  { value: "500+", label: "Mutlu Müşteri" },
  { value: "10+",  label: "Yıl Deneyim"  },
  { value: "24s",  label: "Teslimat Süresi" },
  { value: "%100", label: "Memnuniyet"   },
];

const features: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Yüksek Kalite",
    description:
      "E-oluklu, mikrooluklu ve mukavva seçenekleriyle ürünlerinizi güvenle koruyan dayanıklı ambalajlar.",
    icon: <Package size={22} strokeWidth={1.6} />,
  },
  {
    title: "Hızlı Teslimat",
    description:
      "Siparişiniz onaylandıktan sonra üretim ve teslimat sürecini en kısa sürede tamamlıyoruz.",
    icon: <Truck size={22} strokeWidth={1.6} />,
  },
  {
    title: "Özel Tasarım",
    description:
      "Markanızın renk, logo ve ölçülerine göre tamamen kişiselleştirilmiş baskı ve şekillendirme.",
    icon: <Palette size={22} strokeWidth={1.6} />,
  },
  {
    title: "Uygun Fiyat",
    description:
      "Küçük seri veya büyük parti fark etmeksizin rekabetçi fiyat politikamız her bütçeye uygundur.",
    icon: <BadgeCheck size={22} strokeWidth={1.6} />,
  },
];

export function FeaturesSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-white px-6 pt-20 pb-52">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold tracking-[0.14em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent mb-2">
            Neden Sirius Ambalaj?
          </p>
          <h2 className="font-[family-name:var(--font-jakarta)] font-extrabold text-[28px] sm:text-[32px] text-slate-900 leading-tight mb-3">
            İşinize değer katan fark
          </h2>
          <p className="text-[15px] text-slate-600 leading-relaxed max-w-[440px] mx-auto">
            Kaliteli üretimden zamanında teslimat ve özel tasarıma kadar her adımda yanınızdayız.
          </p>
        </div>

        {/* ── Güven Şeridi (Stats) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <span className="font-[family-name:var(--font-jakarta)] font-bold text-[40px] leading-none bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent">
                {value}
              </span>
              <span className="mt-2 text-[13px] text-slate-500 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Avantaj Kartları ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 p-6 rounded-[20px] border border-slate-100 hover:shadow-lg hover:bg-[#FAFAFA] transition-all duration-300"
            >
              {/* İkon */}
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-slate-50 border border-slate-100 text-[#9B2FC9] transition-all duration-200">
                {icon}
              </div>

              {/* Başlık */}
              <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-[17px] text-slate-800 leading-snug">
                {title}
              </h3>

              {/* Açıklama */}
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
