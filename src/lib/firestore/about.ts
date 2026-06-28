import { getAdminFirestore } from "@/lib/firebase/admin";
import type { About } from "@/types/about";

const COLLECTION = "site_config";
const DOC_ID = "about";

export async function getAbout(): Promise<About | null> {
  const db = getAdminFirestore();
  const snap = await db.collection(COLLECTION).doc(DOC_ID).get();
  if (!snap.exists) return null;
  return snap.data() as About;
}
