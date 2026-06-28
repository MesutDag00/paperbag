"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 1C6.373 1 1 6.373 1 13c0 2.127.553 4.126 1.522 5.858L1 25l6.322-1.499A11.944 11.944 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z"
        fill="white"
      />
      <path
        d="M13 2.8A10.2 10.2 0 002.8 13c0 1.89.514 3.659 1.41 5.175l.183.308-1.17 4.274 4.4-1.15.295.172A10.165 10.165 0 0013 23.2 10.2 10.2 0 0023.2 13 10.2 10.2 0 0013 2.8z"
        fill="#25D366"
      />
      <path
        d="M9.786 8.1c-.21-.469-.432-.478-.632-.487-.163-.007-.35-.007-.536-.007-.187 0-.49.07-.746.35-.257.28-.98.958-.98 2.336 0 1.378 1.003 2.71 1.143 2.897.14.187 1.936 3.08 4.76 4.2 2.358.93 2.824.746 3.332.7.51-.047 1.633-.667 1.865-1.31.233-.643.233-1.193.163-1.31-.07-.116-.257-.186-.537-.326-.28-.14-1.657-.817-1.913-.91-.257-.094-.444-.14-.632.14-.187.28-.723.91-.886 1.097-.163.186-.326.21-.606.07-.28-.14-1.18-.435-2.248-1.387-.831-.74-1.392-1.655-1.555-1.935-.163-.28-.017-.432.122-.571.126-.126.28-.327.42-.49.14-.164.187-.28.28-.467.094-.186.047-.35-.023-.49-.07-.14-.614-1.527-.856-2.09z"
        fill="white"
      />
    </svg>
  );
}

export function WhatsAppFab({
  phone,
  defaultMessage = "Merhaba, özel ambalaj talebim hakkında bilgi almak istiyorum.",
}: {
  phone: string;
  defaultMessage?: string;
}) {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const isProductDetail = /^\/products\/[^/]+$/.test(pathname);
  const isAbout = pathname === "/about";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry!.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`group fixed bottom-6 right-6 z-50 flex items-center justify-end transition-all duration-300 ${
        visible && !isProductDetail && !isAbout ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişime geç"
        className="flex items-center overflow-hidden rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.50)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(37,211,102,0.70)] hover:scale-[1.03]"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-semibold text-white transition-all duration-300 group-hover:max-w-[180px] pl-0 group-hover:pl-5">
          WhatsApp&apos;tan Yaz
        </span>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <WhatsAppIcon />
        </span>
      </Link>
    </div>
  );
}

/* Ürün sayfaları için — mesaja ürün adını ekler */
export function WhatsAppProductButton({
  phone,
  productTitle,
}: {
  phone: string;
  productTitle: string;
}) {
  const message = `Merhaba, *${productTitle}* ürünü için özel teklif almak istiyorum. Detaylarınızı paylaşır mısınız?`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[12px] bg-[#25D366] text-white text-[14px] font-semibold hover:bg-[#20b858] hover:shadow-[0_4px_16px_rgba(37,211,102,0.45)] transition-all duration-200"
    >
      <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
        <path d="M13 1C6.373 1 1 6.373 1 13c0 2.127.553 4.126 1.522 5.858L1 25l6.322-1.499A11.944 11.944 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="white" fillOpacity=".3"/>
        <path d="M9.786 8.1c-.21-.469-.432-.478-.632-.487-.163-.007-.35-.007-.536-.007-.187 0-.49.07-.746.35-.257.28-.98.958-.98 2.336 0 1.378 1.003 2.71 1.143 2.897.14.187 1.936 3.08 4.76 4.2 2.358.93 2.824.746 3.332.7.51-.047 1.633-.667 1.865-1.31.233-.643.233-1.193.163-1.31-.07-.116-.257-.186-.537-.326-.28-.14-1.657-.817-1.913-.91-.257-.094-.444-.14-.632.14-.187.28-.723.91-.886 1.097-.163.186-.326.21-.606.07-.28-.14-1.18-.435-2.248-1.387-.831-.74-1.392-1.655-1.555-1.935-.163-.28-.017-.432.122-.571.126-.126.28-.327.42-.49.14-.164.187-.28.28-.467.094-.186.047-.35-.023-.49-.07-.14-.614-1.527-.856-2.09z" fill="white"/>
      </svg>
      WhatsApp&apos;tan Teklif Al
    </Link>
  );
}
