"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      toast.error("Please login first");

      router.push(`/login?redirect=${pathname}`);
    } else {
      setAllowed(true);
    }
  }, [router, pathname]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return children;
}