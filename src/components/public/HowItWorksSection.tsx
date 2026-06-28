import type { ReactNode } from "react";

const steps: { num: string; title: string; description: string; icon: ReactNode }[] = [
  {
    num: "01",
    title: "Bize Ulaşın",
    description: "WhatsApp, e-posta veya iletişim formu üzerinden ürün talebinizi ve beklentilerinizi iletin.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Tasarım & Teklif",
    description: "Markanıza özel tasarım hazırlanır, üretim detayları ve fiyat teklifi tarafınıza sunulur.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Üretim",
    description: "Onayın ardından siparişiniz üretim hattına alınır. Her aşama kalite kontrol ile izlenir.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Teslimat",
    description: "Ürünleriniz özenle paketlenerek kapınıza teslim edilir. Memnuniyetiniz önceliğimizdir.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" /><rect x="9" y="11" width="14" height="10" rx="1" /><circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      </svg>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 bg-[#FAFAFA]">
      <div className="max-w-[1280px] mx-auto w-full">

        {/* Başlık */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold tracking-[0.14em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent mb-2">
            Sipariş süreci
          </p>
          <h2 className="font-[family-name:var(--font-jakarta)] font-extrabold text-[28px] sm:text-[32px] text-slate-900 leading-tight">
            Nasıl çalışır?
          </h2>
        </div>

        {/* Adımlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">

          {/* ── İkon satırı (çizgi burada, tam ortalanmış) ── */}
          <div className="hidden lg:flex col-span-4 justify-around items-center relative">
            {/* Çizgi — ikonların tam ortasında */}
            <div
              aria-hidden
              className="absolute inset-x-[calc(100%/8)] top-1/2 -translate-y-1/2 h-px"
              style={{ background: "linear-gradient(to right, #9B2FC9, #F5A623)" }}
            />
            {steps.map(({ num, icon }) => (
              <div key={num} className="relative z-10 flex-1 flex justify-center">
                <div className="relative">
                  <div className="w-[56px] h-[56px] rounded-full bg-white border-2 border-[#E2E8F0] flex items-center justify-center text-[#9B2FC9] shadow-[0_2px_12px_rgba(155,47,201,0.12)]">
                    {icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#9B2FC9] to-[#F5A623] flex items-center justify-center text-[9px] font-bold text-white leading-none">
                    {num}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Metin satırı ── */}
          {steps.map(({ num, title, description, icon }) => (
            <div key={num} className="flex flex-col items-center text-center gap-3">
              {/* Mobilde ikon göster */}
              <div className="relative lg:hidden">
                <div className="w-[56px] h-[56px] rounded-full bg-white border-2 border-[#E2E8F0] flex items-center justify-center text-[#9B2FC9] shadow-[0_2px_12px_rgba(155,47,201,0.12)]">
                  {icon}
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#9B2FC9] to-[#F5A623] flex items-center justify-center text-[9px] font-bold text-white leading-none">
                  {num}
                </span>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-jakarta)] font-semibold text-[16px] text-slate-800 mb-2">
                  {title}
                </h3>
                <p className="text-[13px] text-slate-600 leading-relaxed max-w-[200px] mx-auto">
                  {description}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
