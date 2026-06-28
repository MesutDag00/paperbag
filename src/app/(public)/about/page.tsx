import { notFound } from "next/navigation";
import { getAbout } from "@/lib/firestore/about";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export async function generateMetadata() {
  return { title: "Hakkımızda" };
}

const stats = [
  { value: "1992", label: "Kuruluş Yılı" },
  { value: "500+", label: "Mutlu Müşteri" },
  { value: "30+",  label: "Yıl Deneyim"  },
  { value: "50K",  label: "Günlük Üretim" },
];

export default async function AboutPage() {
  const about = await getAbout();
  if (!about) notFound();

  return (
    <div className="bg-[#FAFAFA]">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden flex flex-col"
        style={{
          minHeight: "calc(100vh - 72px)",
          background: [
            "radial-gradient(ellipse 90% 80% at 10% 50%, rgba(243,232,255,0.75) 0%, transparent 55%)",
            "radial-gradient(ellipse 60% 60% at 85% 15%, rgba(253,231,243,0.6) 0%, transparent 55%)",
            "linear-gradient(160deg, #fdf6ff 0%, #fff7ed 55%, #fafafa 100%)",
          ].join(", "),
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-6 lg:py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 flex-1">

          {/* Sol — çift görsel */}
          <ScrollReveal animation="slideLeft" delay={0.2} className="lg:w-[48%] w-full relative" style={{ paddingBottom: "clamp(60px, 8vw, 100px)", paddingRight: "clamp(50px, 7vw, 90px)" }}>

            {/* Ana görsel */}
            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_24px_64px_rgba(155,47,201,0.13)]">
              <Image
                src="/About-1.png"
                alt={about.brandName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 560px"
                quality={90}
              />
            </div>

            {/* Öne çıkan küçük görsel — fabrika / üretim */}
            <div
              className="absolute bottom-0 right-0 rounded-[16px] overflow-hidden ring-4 ring-white shadow-[0_12px_40px_rgba(0,0,0,0.16)]"
              style={{ width: "clamp(150px, 45%, 240px)", aspectRatio: "4/3" }}
            >
              <Image
                src="/About-2.png"
                alt="Üretim tesisi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 45vw, 480px"
                quality={100}
                unoptimized
              />
            </div>

            {/* Dekoratif dot grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 -left-6 w-24 h-24 opacity-30 -z-10"
              style={{
                backgroundImage: "radial-gradient(circle, #9B2FC9 1.2px, transparent 1.2px)",
                backgroundSize: "10px 10px",
              }}
            />
          </ScrollReveal>

          {/* Sağ — metin + butonlar */}
          <ScrollReveal animation="fadeUp" delay={0.1} className="lg:w-[52%]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B2FC9]/8 border border-[#9B2FC9]/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#9B2FC9] to-[#F5A623]" />
              <span className="text-[11px] font-bold tracking-[0.14em] text-[#9B2FC9]">
                Hakkımızda
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-jakarta)] font-extrabold text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.1] tracking-tight text-[#0F172A] mb-5">
              {about.brandName}:{" "}
              <span className="bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent">
                Markanızı Öne
              </span>{" "}
              Çıkaran Detay
            </h1>

            <p className="text-[16px] sm:text-[17px] text-[#64748B] leading-relaxed mb-8 max-w-[440px]">
              {about.tagline}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              {about.whatsappNumber && (
                <a
                  href={`https://wa.me/${about.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-white text-[15px] font-semibold transition-all duration-200"
                  style={{
                    background: "#25D366",
                    boxShadow: "0 4px 16px rgba(37,211,102,0.38)",
                  }}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp&apos;tan Teklif Al
                </a>
              )}
              {about.contactEmail && (
                <a
                  href={`mailto:${about.contactEmail}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-white text-[15px] font-semibold transition-all duration-200 hover:shadow-[0_4px_20px_rgba(155,47,201,0.42)]"
                  style={{ background: "linear-gradient(135deg, #9B2FC9, #F5A623)" }}
                >
                  <svg width="17" height="13" fill="none" viewBox="0 0 17 13">
                    <rect x="0.75" y="0.75" width="15.5" height="11.5" rx="1.25" stroke="white" strokeWidth="1.5"/>
                    <path d="M1 1.5l7.5 5 7.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  E-posta ile Teklif Al
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* İstatistikler — hero içinde alt bölüm */}
        <ScrollReveal animation="fadeUp" delay={0.3} className="border-t border-[#9B2FC9]/10">
          <div className="max-w-[1280px] mx-auto px-6 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-[family-name:var(--font-jakarta)] font-bold text-[40px] leading-none bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent">
                    {value}
                  </span>
                  <span className="mt-2 text-[13px] text-[#64748B] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── İçerik ── */}
      <section className="pt-10 pb-14 px-6" style={{ background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100px)" }}>
        <div className="max-w-[900px] mx-auto">

          {/* Başlık */}
          <ScrollReveal className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.14em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent mb-2">
              Biz kimiz
            </p>
            <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-[30px] text-[#0F172A] leading-tight">
              {about.brandName} hakkında
            </h2>
          </ScrollReveal>

          {/* Tek birleşik kart */}
          <ScrollReveal delay={0.1}>
          <div className="rounded-[28px] border border-[#EDE9F6] overflow-hidden" style={{ background: "linear-gradient(135deg, #fdf8ff 0%, #fff9f0 100%)" }}>
            {/* Üst gradient şerit */}
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #9B2FC9, #F5A623)" }} />

            <div className="flex flex-col lg:flex-row">

              {/* Sol — 2 özellik */}
              <div className="flex flex-col gap-0 lg:w-[300px] shrink-0 divide-y divide-[#EDE9F6]">
                {[
                  {
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 26 26">
                        <defs>
                          <linearGradient id="ab-ic1" x1="1" y1="1" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                          </linearGradient>
                        </defs>
                        <rect x="1.5" y="9" width="23" height="15" rx="2" stroke="url(#ab-ic1)" strokeWidth="1.6"/>
                        <path d="M1.5 13h23M13 9V24" stroke="url(#ab-ic1)" strokeWidth="1.6"/>
                        <path d="M13 9C13 9 9 9 7.5 6.5C6.5 4.5 7.5 2 10 2C12 2 13 4.5 13 4.5" stroke="url(#ab-ic1)" strokeWidth="1.6" strokeLinecap="round"/>
                        <path d="M13 9C13 9 17 9 18.5 6.5C19.5 4.5 18.5 2 16 2C14 2 13 4.5 13 4.5" stroke="url(#ab-ic1)" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    ),
                    title: "Özel Tasarım",
                    desc: "Estetik ve marka odaklı çözümler",
                  },
                  {
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 26 26">
                        <defs>
                          <linearGradient id="ab-ic2" x1="1" y1="1" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                          </linearGradient>
                        </defs>
                        <rect x="3" y="5" width="20" height="16" rx="2" stroke="url(#ab-ic2)" strokeWidth="1.6"/>
                        <path d="M3 10h20M8 5V3M18 5V3" stroke="url(#ab-ic2)" strokeWidth="1.6" strokeLinecap="round"/>
                        <path d="M8.5 15.5l2.5 2.5 6-6" stroke="url(#ab-ic2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    title: "Üretim Kalitesi",
                    desc: "Yüksek standartlı üretim süreçleri",
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex-1 flex items-center gap-5 p-7">
                    <div className="w-11 h-11 rounded-[12px] bg-white shadow-sm border border-[#EDE9F6] flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-jakarta)] font-bold text-[14px] text-[#0F172A] mb-0.5">{title}</p>
                      <p className="text-[12px] text-[#64748B] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dikey ayraç */}
              <div className="hidden lg:block w-[1px] bg-[#EDE9F6] my-6" />
              <div className="block lg:hidden h-[1px] bg-[#EDE9F6] mx-6" />

              {/* Orta — açıklama metni */}
              <div className="flex-1 flex items-center justify-center p-8 lg:p-10">
                <div className="text-center max-w-[440px]">
                  {about.description ? (
                    <div className="prose prose-slate max-w-none [&_p]:text-[#64748B] [&_p]:text-[15px] [&_p]:leading-[1.85] [&_p]:mb-4">
                      <ReactMarkdown>{about.description}</ReactMarkdown>
                    </div>
                  ) : (
                    <>
                      <p className="text-[14px] text-[#64748B] leading-[1.8] mb-3">
                        1992&apos;den bu yana estetik ve işlevselliği bir arada sunan Sirius Ambalaj, her ölçekteki markaya özel tasarım ve yüksek kaliteli üretim çözümleri sunmaktadır.
                      </p>
                      <p className="text-[14px] text-[#64748B] leading-[1.8]">
                        500&apos;den fazla mutlu müşteri ve 30 yılı aşkın deneyimimizle, markanızı en iyi şekilde yansıtan ambalaj çözümleri üretiyoruz.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Dikey ayraç */}
              <div className="hidden lg:block w-[1px] bg-[#EDE9F6] my-6" />
              <div className="block lg:hidden h-[1px] bg-[#EDE9F6] mx-6" />

              {/* Sağ — 2 özellik */}
              <div className="flex flex-col gap-0 lg:w-[300px] shrink-0 divide-y divide-[#EDE9F6]">
                {[
                  {
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 26 26">
                        <defs>
                          <linearGradient id="ab-ic3" x1="1" y1="1" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                          </linearGradient>
                        </defs>
                        <path d="M13 2L3 6v7c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V6L13 2z" stroke="url(#ab-ic3)" strokeWidth="1.6" strokeLinejoin="round"/>
                        <path d="M9 13l2.5 2.5 5.5-5.5" stroke="url(#ab-ic3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    title: "Kurumsal Güven",
                    desc: "30 yılı aşkın sektör deneyimi",
                  },
                  {
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 26 26">
                        <defs>
                          <linearGradient id="ab-ic4" x1="1" y1="1" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#9B2FC9"/><stop offset="1" stopColor="#F5A623"/>
                          </linearGradient>
                        </defs>
                        <circle cx="9" cy="9" r="4" stroke="url(#ab-ic4)" strokeWidth="1.6"/>
                        <circle cx="19" cy="9" r="3" stroke="url(#ab-ic4)" strokeWidth="1.6"/>
                        <path d="M1 22c0-4 3.6-7 8-7s8 3 8 7" stroke="url(#ab-ic4)" strokeWidth="1.6" strokeLinecap="round"/>
                        <path d="M19 12c2.5 0 5 1.5 5 5" stroke="url(#ab-ic4)" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    ),
                    title: "Marka Çözümleri",
                    desc: "Güvenilir ve sürdürülebilir ortaklık",
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex-1 flex items-center gap-5 p-7">
                    <div className="w-11 h-11 rounded-[12px] bg-white shadow-sm border border-[#EDE9F6] flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-jakarta)] font-bold text-[14px] text-[#0F172A] mb-0.5">{title}</p>
                      <p className="text-[12px] text-[#64748B] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA Alt Bant ── */}
      <section className="py-16 px-6 bg-white border-t border-[#F1F5F9]">
        <ScrollReveal delay={0.1} className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-jakarta)] font-bold text-[22px] text-[#0F172A] mb-1">
              Projenizi konuşalım
            </p>
            <p className="text-[15px] text-[#64748B]">Özel ambalaj ihtiyaçlarınız için teklif alın.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap shrink-0">
            {about.contactEmail && (
              <a
                href={`mailto:${about.contactEmail}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-white text-[14px] font-semibold hover:shadow-[0_4px_20px_rgba(155,47,201,0.4)] transition-shadow duration-200"
                style={{ background: "linear-gradient(135deg, #9B2FC9, #F5A623)" }}
              >
                {about.contactEmail}
              </a>
            )}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] border border-[#E2E8F0] text-[14px] font-semibold text-[#64748B] bg-white hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors duration-200"
            >
              Ürünleri İncele →
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
