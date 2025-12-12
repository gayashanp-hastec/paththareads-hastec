import { prisma } from "./prisma";
import { redis } from "./redis";
import crypto from "crypto";
import { SESSION_COOKIE_NAME } from "./cookies";

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 days
  await redis.set(
    `sess:${sessionId}`,
    JSON.stringify({ userId, createdAt: now.toISOString() }),
    "EX",
    60 * 60 * 24 * 7
  );
  return { sessionId, expires };
}

export async function getSession(req: Request) {
  const sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;
  const data = await redis.get(`sess:${sessionId}`);
  if (!data) return null;
  const parsed = JSON.parse(data);
  const user = await prisma.user.findUnique({
    where: { id: parsed.userId },
    include: { userRoles: { include: { role: true } } },
  });
  return { sessionId, user };
}

export async function requireAdmin(req: Request) {
  const ses = await getSession(req);
  if (!ses?.user) throw new Error("UNAUTHORIZED");
  const roles = ses.user.userRoles.map((r) => r.role.name);
  if (!roles.includes("SUPER_ADMIN") && !roles.includes("ADMIN"))
    throw new Error("FORBIDDEN");
  return ses;
}
