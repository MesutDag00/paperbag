import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { WhatsAppFab } from "@/components/public/WhatsAppFab";
import { getAbout } from "@/lib/firestore/about";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const about = await getAbout();

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader brandName={about?.brandName ?? ""} />
      <main className="flex-1">{children}</main>
      <PublicFooter
        brandName={about?.brandName ?? ""}
        contactEmail={about?.contactEmail ?? ""}
        whatsappNumber={about?.whatsappNumber}
        instagramUrl={about?.instagramUrl}
      />
      {about?.whatsappNumber && (
        <WhatsAppFab phone={about.whatsappNumber} />
      )}
    </div>
  );
}
