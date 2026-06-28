import { getAdminFirestore } from "@/lib/firebase/admin";
import type { Category } from "@/types/category";

const COLLECTION = "categories";

export async function getPublishedCategories(): Promise<Category[]> {
  const db = getAdminFirestore();
  const snap = await db
    .collection(COLLECTION)
    .where("isPublished", "==", true)
    .orderBy("order")
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Category));
}

export async function getAllCategories(): Promise<Category[]> {
  const db = getAdminFirestore();
  const snap = await db.collection(COLLECTION).orderBy("order").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Category));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = getAdminFirestore();
  const snap = await db
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .limit(1)
    .get();
  if (snap.empty) return null;
  const doc = snap.docs[0]!;
  return { id: doc.id, ...doc.data() } as Category;
}
