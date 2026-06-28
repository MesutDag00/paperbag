"use server";

import { revalidateTag } from "next/cache";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { verifySession } from "@/server/auth";
import { tags } from "@/lib/cache-tags";
import type { ProductFormInput, ProductUpdateInput } from "@/types/product";

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createProduct(data: ProductFormInput) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  const now = Date.now();
  const slug = slugify(data.title);
  await db.collection("products").add({ ...data, slug, order: 0, createdAt: now, updatedAt: now });

  revalidateTag(tags.products(), "hours");
  if (data.isFeatured) revalidateTag(tags.featured(), "hours");
}

export async function updateProduct(id: string, data: ProductUpdateInput) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  const existing = await db.collection("products").doc(id).get();
  const currentSlug = (existing.data()?.slug as string) ?? "";

  await db.collection("products").doc(id).update({ ...data, updatedAt: Date.now() });

  revalidateTag(tags.products(), "hours");
  revalidateTag(tags.product(currentSlug), "hours");
  revalidateTag(tags.featured(), "hours");
}

export async function deleteProduct(id: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  const doc = await db.collection("products").doc(id).get();
  const slug = (doc.data()?.slug as string) ?? "";

  await db.collection("products").doc(id).delete();

  revalidateTag(tags.products(), "hours");
  revalidateTag(tags.product(slug), "hours");
  revalidateTag(tags.featured(), "hours");
}

export async function toggleProductPublished(id: string, isPublished: boolean) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  await db.collection("products").doc(id).update({ isPublished, updatedAt: Date.now() });

  revalidateTag(tags.products(), "hours");
  revalidateTag(tags.featured(), "hours");
}

export async function toggleProductFeatured(id: string, isFeatured: boolean) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  await db.collection("products").doc(id).update({ isFeatured, updatedAt: Date.now() });

  revalidateTag(tags.featured(), "hours");
  revalidateTag(tags.products(), "hours");
}
