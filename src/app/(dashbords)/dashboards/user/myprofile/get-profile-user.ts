import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

type SessionUser = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>["user"];

/**
 * `role` and `isBlocked` are additional user fields declared in `src/lib/auth.ts`,
 * so they exist on the session user at runtime.
 */
export type ProfileUser = SessionUser & {
  role?: "admin" | "user";
  isBlocked?: boolean;
};

/**
 * Reads the signed-in user from the existing Better Auth session on the server.
 * If there is no session, the visitor is sent to the sign-in page.
 */
export async function getProfileUser(): Promise<ProfileUser> {
  const session = await auth.api.getSession({ headers: await headers(),query:{disableCookieCache:true} });

  if (!session) {
    redirect("/sign-in");
  }
  
  console.log(session.user);
  return session.user as ProfileUser;
}
