import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Giriş" };

export default async function LoginPage(props: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await props.searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border">
        <h1 className="text-2xl font-bold text-center mb-2">Admin Paneli</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Devam etmek için giriş yapın
        </p>
        <LoginForm redirectTo={next ?? "/admin"} />
      </div>
    </div>
  );
}
