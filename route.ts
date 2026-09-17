import { env } from "cloudflare:workers";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const h = await headers();
  const userId = h.get("oai-authenticated-user-id");
  const email = h.get("oai-authenticated-user-email");
  if (!userId || !email) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const data = await request.formData();
  const photo = data.get("photo");
  const store = String(data.get("store") || "").trim();
  const latitude = data.get("latitude") ? Number(data.get("latitude")) : null;
  const longitude = data.get("longitude") ? Number(data.get("longitude")) : null;
  const what3words = String(data.get("what3words") || "").trim() || null;
  if (!(photo instanceof File) || photo.size === 0 || photo.size > 12_000_000 || !store) return NextResponse.json({ error: "Invalid receipt" }, { status: 400 });

  const bytes = await photo.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const imageHash = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  const duplicate = await env.DB.prepare("SELECT id FROM receipts WHERE image_hash = ?").bind(imageHash).first();
  if (duplicate) return NextResponse.json({ error: "This receipt has already been submitted" }, { status: 409 });

  const now = new Date().toISOString();
  const imageKey = `receipts/${now.slice(0, 10)}/${crypto.randomUUID()}`;
  await env.BUCKET.put(imageKey, bytes, { httpMetadata: { contentType: photo.type || "application/octet-stream" } });
  await env.DB.prepare("INSERT INTO contributors (user_id,email,display_name,points,created_at) VALUES (?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET email=excluded.email")
    .bind(userId, email, email, 0, now).run();
  const contributor = await env.DB.prepare("SELECT id FROM contributors WHERE user_id = ?").bind(userId).first<{ id: number }>();
  await env.DB.prepare("INSERT INTO receipts (contributor_id,store_name,latitude,longitude,what3words,image_key,image_hash,status,observed_at,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)")
    .bind(contributor!.id, store, latitude, longitude, what3words, imageKey, imageHash, "pending_ocr", now, now).run();
  return NextResponse.json({ status: "pending_ocr", pendingPoints: 50 }, { status: 201 });
}
