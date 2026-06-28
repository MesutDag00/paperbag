"use server";

import { revalidateTag } from "next/cache";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { verifySession } from "@/server/auth";
import { tags } from "@/lib/cache-tags";
import type { CategoryFormInput, CategoryUpdateInput } from "@/types/category";

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createCategory(data: CategoryFormInput) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  const now = Date.now();
  const slug = slugify(data.name);
  await db.collection("categories").add({ ...data, slug, order: 0, createdAt: now, updatedAt: now });

  revalidateTag(tags.categories(), "hours");
}

export async function updateCategory(id: string, data: CategoryUpdateInput) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  const existing = await db.collection("categories").doc(id).get();
  const currentSlug = (existing.data()?.slug as string) ?? "";

  await db.collection("categories").doc(id).update({ ...data, updatedAt: Date.now() });

  revalidateTag(tags.categories(), "hours");
  revalidateTag(tags.category(currentSlug), "hours");
}

export async function deleteCategory(id: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  const doc = await db.collection("categories").doc(id).get();
  const slug = (doc.data()?.slug as string) ?? "";

  await db.collection("categories").doc(id).delete();

  revalidateTag(tags.categories(), "hours");
  revalidateTag(tags.category(slug), "hours");
}

export async function toggleCategoryPublished(id: string, isPublished: boolean) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  await db.collection("categories").doc(id).update({ isPublished, updatedAt: Date.now() });

  revalidateTag(tags.categories(), "hours");
}
