import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, revokeSession, SESSION_COOKIE, SESSION_EXPIRES_MS } from "@/server/auth";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json() as { idToken: string };
    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    const sessionCookie = await createSessionCookie(idToken);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, sessionCookie, {
      maxAge: SESSION_EXPIRES_MS / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function DELETE() {
  await revokeSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
