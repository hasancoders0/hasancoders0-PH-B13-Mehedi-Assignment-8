"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

export default function MyProfilePage() {
  const router = useRouter();

  // ✅ NextAuth session (Google)
  const { data: session, status } = useSession();

  // ✅ Local user (email login)
  const [localUser, setLocalUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setLocalUser(JSON.parse(stored));
    } catch {
      setLocalUser(null);
    }
    setMounted(true);
  }, []);

  // 🔥 Merge both systems
  const user = session?.user || localUser;

  // 🔐 Protect route
  useEffect(() => {
    if (mounted && status !== "loading" && !user) {
      router.push("/login");
    }
  }, [user, status, mounted, router]);

  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) return null;

  // 🔓 Logout
  const handleLogout = () => {
    // Email logout
    localStorage.removeItem("user");

    // Google logout
    if (session) {
      signOut({ callbackUrl: "/" });
    } else {
      toast.success("Logged out");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 animate__animated animate__fadeInUp">

      <div className="max-w-4xl mx-auto px-4 md:px-8">

        <div className="bg-base-100 rounded-2xl shadow-md p-6 md:p-8 space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-center gap-6">

            <FaUserCircle className="text-7xl text-primary" />

            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">
                {user.name || "User"}
              </h2>

              <p className="text-gray-500 flex items-center gap-2 justify-center md:justify-start">
                <FaEnvelope />
                {user.email}
              </p>
            </div>
          </div>

          <div className="border-t"></div>

          {/* INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium">
                {session ? "Google User" : "Email User"}
              </p>
            </div>

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">
                Active
              </p>
            </div>

          </div>

          {/* LOGOUT */}
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="btn btn-error w-full md:w-auto flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}