"use client";

import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { updateAbout } from "@/server/actions/about";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { About } from "@/types/about";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  initialData: About | null;
}

export function AboutForm({ initialData }: Props) {
  const [brandName, setBrandName] = useState(initialData?.brandName ?? "");
  const [tagline, setTagline] = useState(initialData?.tagline ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl ?? "");
  const [contactEmail, setContactEmail] = useState(initialData?.contactEmail ?? "");
  const [whatsappNumber, setWhatsappNumber] = useState(initialData?.whatsappNumber ?? "");
  const [instagramUrl, setInstagramUrl] = useState(initialData?.instagramUrl ?? "");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    startTransition(async () => {
      await updateAbout({ brandName, tagline, description, logoUrl, contactEmail, whatsappNumber, instagramUrl });
      setSuccess(true);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="space-y-1">
        <Label>Marka / Site Adı</Label>
        <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} required />
      </div>
      <div className="space-y-1">
        <Label>Slogan</Label>
        <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
      </div>

      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide pt-2">İletişim Bilgileri</p>

      <div className="space-y-1">
        <Label>E-posta</Label>
        <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="info@sirketiniz.com" />
      </div>
      <div className="space-y-1">
        <Label>WhatsApp Numarası <span className="text-gray-400 font-normal">(başında + olmadan, ör: 905321234567)</span></Label>
        <Input value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="905321234567" />
      </div>
      <div className="space-y-1">
        <Label>Instagram URL <span className="text-gray-400 font-normal">(isteğe bağlı)</span></Label>
        <Input value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/hesabiniz" />
      </div>

      <div className="space-y-1 pt-2">
        <Label>Logo</Label>
        <ImageUpload storagePath="about/logo" value={logoUrl} onChange={setLogoUrl} />
      </div>
      <div className="space-y-1">
        <Label>Hakkımızda Metni (Markdown)</Label>
        <div data-color-mode="light">
          <MDEditor value={description} onChange={(v) => setDescription(v ?? "")} height={300} />
        </div>
      </div>
      {success && <p className="text-sm text-green-600">Kaydedildi.</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Kaydediliyor..." : "Kaydet"}
      </Button>
    </form>
  );
}
