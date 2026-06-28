"use server";

import { revalidateTag } from "next/cache";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { verifySession } from "@/server/auth";
import { tags } from "@/lib/cache-tags";
import type { AboutUpdateInput } from "@/types/about";

export async function updateAbout(data: AboutUpdateInput) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const db = getAdminFirestore();
  await db.collection("site_config").doc("about").set(
    { ...data, updatedAt: Date.now() },
    { merge: true }
  );

  revalidateTag(tags.about(), "hours");
}
