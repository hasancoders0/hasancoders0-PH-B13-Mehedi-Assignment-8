"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaUser, FaSave } from "react-icons/fa";

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [localUser, setLocalUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔄 Load user
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setLocalUser(JSON.parse(stored));
    } catch {
      setLocalUser(null);
    }
    setMounted(true);
  }, []);

  const user = session?.user || localUser;

  // 🔐 Protect route
  useEffect(() => {
    if (mounted && status !== "loading" && !user) {
      router.push("/login");
    }
  }, [user, status, mounted, router]);

  // 📝 Fill form
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) return null;

  // 🔄 Handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 Save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ update localStorage (email login)
        if (localUser) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        toast.success("Profile updated successfully 🎉");

        setTimeout(() => {
          router.push("/my-profile");
        }, 800);
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 space-y-5 animate__animated animate__fadeInUp">

        <h2 className="text-2xl font-bold text-center text-primary">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
            <FaUser />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          {/* Email (readonly for safety) */}
          <div className="border rounded-lg px-3 py-2 bg-gray-100 text-sm">
            {form.email}
          </div>

          {/* Button */}
          <button
            className={`btn btn-primary w-full flex items-center gap-2 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            <FaSave />
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}