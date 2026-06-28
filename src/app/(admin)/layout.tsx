import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { verifySession } from "@/server/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? "/admin";
    redirect(`/login?next=${encodeURIComponent(pathname)}`);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto flex flex-col">{children}</main>
    </div>
  );
}
