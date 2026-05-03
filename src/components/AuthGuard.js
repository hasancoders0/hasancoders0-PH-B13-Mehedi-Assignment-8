"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession();

  const [localUser, setLocalUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  // ✅ Only run on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setLocalUser(stored);
    } catch {
      setLocalUser(null);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || status === "loading") return;

    if (!session && !localUser) {
      toast.error("Please login first");
      router.push(`/login?redirect=${pathname}`);
    }
  }, [session, localUser, status, mounted, pathname, router]);

  // 🔐 Final auth check
  const isAuthenticated = session || localUser;

  // 🔄 Loading state
  if (!mounted || status === "loading" || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return children;
}