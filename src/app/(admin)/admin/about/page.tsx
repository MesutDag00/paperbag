import { getAbout } from "@/lib/firestore/about";
import { AboutForm } from "@/components/admin/AboutForm";

export const metadata = { title: "Site Bilgisi" };

export default async function AboutAdminPage() {
  const about = await getAbout();

  return (
    <>
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-base font-medium">Site Bilgisi</h1>
        <p className="text-xs text-gray-400 mt-0.5">Sitenizde görünen marka adı, slogan ve iletişim bilgileri</p>
      </div>
      <div className="p-6">
        <div className="bg-white border rounded-xl p-6 max-w-2xl">
          <AboutForm initialData={about} />
        </div>
      </div>
    </>
  );
}
