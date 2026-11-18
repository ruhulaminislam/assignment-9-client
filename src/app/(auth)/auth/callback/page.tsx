"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthCallbackPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    if (session.user.role === "admin") {
      router.replace("/dashboards/admin/overview");
    } else if (session.user.role === "user") {
      router.replace("/dashboards/user/overview");
    } else {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  return <p>Redirecting...</p>;
}