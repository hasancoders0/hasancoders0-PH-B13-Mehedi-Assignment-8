"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // ✅ Combined state (fix warning)
  const [clientState, setClientState] = useState({
    user: null,
    mounted: false,
  });

  // ✅ Load local user
  useEffect(() => {
    const stored = localStorage.getItem("user");

    setClientState({
      user: stored ? JSON.parse(stored) : null,
      mounted: true,
    });
  }, []);

  // 🔥 Combine both auth systems
  const user = session?.user || clientState.user;

  // 🔐 Protect route
  useEffect(() => {
    if (clientState.mounted && status !== "loading" && !user) {
      router.push("/login");
    }
  }, [user, status, clientState.mounted, router]);

  // ⏳ Loading state
  if (!clientState.mounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) return null;

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");

    if (session) {
      signOut({ callbackUrl: "/" });
    } else {
      toast.success("Logged out");
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 animate__animated animate__fadeInUp">

      <div className="max-w-4xl mx-auto px-4 md:px-8">

        <div className="bg-base-100 rounded-3xl shadow-md p-6 md:p-10 space-y-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <FaUserCircle className="text-6xl text-primary" />
            </div>

            <div className="text-center md:text-left space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold">
                {user.name || "User"}
              </h2>

              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope />
                {user.email}
              </p>
            </div>

          </div>

          <div className="border-t"></div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium flex items-center gap-2">
                <FaUser />
                {user.name}
              </p>
            </div>

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium flex items-center gap-2">
                <FaEnvelope />
                {user.email}
              </p>
            </div>

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium">
                {session ? "Google Account" : "Email Account"}
              </p>
            </div>

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>

          </div>

          <div className="border-t"></div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row gap-3">

            <Link
              href="/my-profile/edit"
              className="btn btn-outline flex items-center gap-2 w-full md:w-auto"
            >
              <FaEdit />
              Edit Profile
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-error flex items-center gap-2 w-full md:w-auto"
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