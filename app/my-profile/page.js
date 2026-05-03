"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

export default function MyProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 animate__animated animate__fadeInUp">

      <div className="max-w-4xl mx-auto px-4 md:px-8">

        {/* PROFILE CARD */}
        <div className="bg-base-100 rounded-2xl shadow-md p-6 md:p-8 space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* AVATAR */}
            <div className="text-primary">
              <FaUserCircle className="text-7xl" />
            </div>

            {/* USER INFO */}
            <div className="space-y-2 text-center md:text-left">

              <h2 className="text-2xl font-bold">
                {user.name || "User"}
              </h2>

              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope />
                {user.email}
              </p>

            </div>

          </div>

          {/* DIVIDER */}
          <div className="border-t"></div>

          {/* ACCOUNT SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium">Customer</p>
            </div>

            <div className="p-4 bg-base-200 rounded-xl">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">
                Active
              </p>
            </div>

          </div>

          {/* ACTION */}
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