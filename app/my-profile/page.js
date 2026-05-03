"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

export default function MyProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/login");
    } else {
      setUser(JSON.parse(stored));
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 space-y-5 text-center">

        {/* Profile Image */}
        <img
          src={user.photo || "https://i.ibb.co/2kR8FzZ/avatar.png"}
          alt="profile"
          className="w-24 h-24 mx-auto rounded-full border"
        />

        {/* Name */}
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
          <FaUser /> {user.name}
        </h2>

        {/* Email */}
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <FaEnvelope /> {user.email}
        </p>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error w-full mt-4 flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}