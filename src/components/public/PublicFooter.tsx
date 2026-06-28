import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/products", label: "Ürünler" },
  { href: "/category", label: "Kategoriler" },
  { href: "/about", label: "Hakkımızda" },
];

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
      <path d="M13 1C6.373 1 1 6.373 1 13c0 2.127.553 4.126 1.522 5.858L1 25l6.322-1.499A11.944 11.944 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="currentColor" fillOpacity=".25"/>
      <path d="M9.786 8.1c-.21-.469-.432-.478-.632-.487-.163-.007-.35-.007-.536-.007-.187 0-.49.07-.746.35-.257.28-.98.958-.98 2.336 0 1.378 1.003 2.71 1.143 2.897.14.187 1.936 3.08 4.76 4.2 2.358.93 2.824.746 3.332.7.51-.047 1.633-.667 1.865-1.31.233-.643.233-1.193.163-1.31-.07-.116-.257-.186-.537-.326-.28-.14-1.657-.817-1.913-.91-.257-.094-.444-.14-.632.14-.187.28-.723.91-.886 1.097-.163.186-.326.21-.606.07-.28-.14-1.18-.435-2.248-1.387-.831-.74-1.392-1.655-1.555-1.935-.163-.28-.017-.432.122-.571.126-.126.28-.327.42-.49.14-.164.187-.28.28-.467.094-.186.047-.35-.023-.49-.07-.14-.614-1.527-.856-2.09z" fill="currentColor"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 5.5 9 10l7-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function PublicFooter({
  brandName,
  contactEmail,
  whatsappNumber,
  instagramUrl,
}: {
  brandName: string;
  contactEmail: string;
  whatsappNumber?: string;
  instagramUrl?: string;
}) {
  const waUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Merhaba, bilgi almak istiyorum.")}`
    : null;

  const socialLinks = [
    waUrl && { href: waUrl, label: "WhatsApp", icon: <IconWhatsApp />, style: "bg-[#25D366]/10 border-[#25D366]/25 text-[#25D366] hover:bg-[#25D366]/20" },
    instagramUrl && { href: instagramUrl, label: "Instagram", icon: <IconInstagram />, style: "bg-[#E1306C]/10 border-[#E1306C]/25 text-[#E1306C] hover:bg-[#E1306C]/20" },
    contactEmail && { href: `mailto:${contactEmail}`, label: "E-posta", icon: <IconMail />, style: "bg-[#F5A623]/10 border-[#F5A623]/25 text-[#F5A623] hover:bg-[#F5A623]/20" },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode; style: string }[];

  return (
    <footer id="site-footer" className="bg-[#0A0F1A] mt-auto">
      {/* Gradient üst çizgi */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#9B2FC9] via-[#D44060] to-[#F5A623]" />

      {/* Ana İçerik */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">

          {/* Marka Sütunu */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] overflow-hidden ring-1 ring-white/10">
                <Image src="/icon.png" alt={brandName} width={40} height={40} className="object-cover" />
              </div>
              <span className="font-[family-name:var(--font-jakarta)] font-bold text-[18px] text-white tracking-tight">
                {brandName}
              </span>
            </div>
            <p className="text-[14px] text-[#64748B] leading-relaxed max-w-[280px]">
              Kaliteli ambalaj çözümleriyle markanızı güvenle taşıyoruz. Özel tasarım, hızlı teslimat.
            </p>

            {/* Sosyal Medya İkonları */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                {socialLinks.map(({ href, label, icon, style }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-9 h-9 rounded-[10px] flex items-center justify-center border transition-all duration-200 ${style}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigasyon Sütunu */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent mb-5">
              Sayfalar
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-[14px] text-[#475569] hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#334155] group-hover:bg-[#9B2FC9] transition-colors duration-200 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim Sütunu */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] bg-gradient-to-r from-[#9B2FC9] to-[#F5A623] bg-clip-text text-transparent mb-5">
              İletişim
            </p>
            <ul className="flex flex-col gap-4">
              {contactEmail && (
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-[#F5A623]/10 border border-[#F5A623]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#F5A623]">
                    <IconMail />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#334155] font-medium mb-0.5">E-posta</p>
                    <a href={`mailto:${contactEmail}`} className="text-[14px] text-[#64748B] hover:text-white transition-colors duration-200">
                      {contactEmail}
                    </a>
                  </div>
                </li>
              )}
              {whatsappNumber && (
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#25D366]">
                    <IconWhatsApp />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#334155] font-medium mb-0.5">WhatsApp</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#64748B] hover:text-[#25D366] transition-colors duration-200"
                    >
                      +{whatsappNumber}
                    </a>
                  </div>
                </li>
              )}
              {instagramUrl && (
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-[#E1306C]/10 border border-[#E1306C]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#E1306C]">
                    <IconInstagram />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#334155] font-medium mb-0.5">Instagram</p>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#64748B] hover:text-[#E1306C] transition-colors duration-200"
                    >
                      {instagramUrl.replace("https://instagram.com/", "@").replace("https://www.instagram.com/", "@")}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#9B2FC9]/10 border border-[#9B2FC9]/25 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <circle cx="7" cy="6" r="2" stroke="#9B2FC9" strokeWidth="1.2"/>
                    <path d="M7 1C4.8 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" stroke="#9B2FC9" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-[#334155] font-medium mb-0.5">Konum</p>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">Beştelsiz Mahallesi, 120 Sokak,<br />No:9, Zeytinburnu / İstanbul</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alt Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 py-5">
          <p className="text-[12px] text-[#334155] text-center">
            © {new Date().getFullYear()} {brandName}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
