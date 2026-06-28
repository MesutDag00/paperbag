import { getAllProducts } from "@/lib/firestore/products";
import { getAllCategories } from "@/lib/firestore/categories";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata = { title: "Ürünler" };

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <>
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-base font-medium">Ürünler</h1>
        <Link href="/admin/products/new" className={buttonVariants({ size: "sm" })}>
          + Yeni ürün ekle
        </Link>
      </div>
      <div className="p-6">
        <div className="bg-white border rounded-xl px-4 py-2">
          <ProductsTable products={products} categoryMap={categoryMap} />
        </div>
      </div>
    </>
  );
}
