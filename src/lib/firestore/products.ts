import { getAdminFirestore } from "@/lib/firebase/admin";
import type { Product } from "@/types/product";

const COLLECTION = "products";

export async function getFeaturedProducts(): Promise<Product[]> {
  const db = getAdminFirestore();
  const snap = await db
    .collection(COLLECTION)
    .where("isPublished", "==", true)
    .where("isFeatured", "==", true)
    .orderBy("order")
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getPublishedProducts(): Promise<Product[]> {
  const db = getAdminFirestore();
  const snap = await db
    .collection(COLLECTION)
    .where("isPublished", "==", true)
    .orderBy("order")
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const db = getAdminFirestore();
  const snap = await db
    .collection(COLLECTION)
    .where("categoryId", "==", categoryId)
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getAdminFirestore();
  const snap = await db
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .where("isPublished", "==", true)
    .limit(1)
    .get();
  if (snap.empty) return null;
  const doc = snap.docs[0]!;
  return { id: doc.id, ...doc.data() } as Product;
}

export async function getNewProducts(limit = 5): Promise<Product[]> {
  const db = getAdminFirestore();
  const snap = await db
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .limit(limit * 4)
    .get();
  return snap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Product))
    .filter((p) => p.isPublished)
    .slice(0, limit);
}

export async function getAllProducts(): Promise<Product[]> {
  const db = getAdminFirestore();
  const snap = await db.collection(COLLECTION).orderBy("createdAt", "desc").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
}
