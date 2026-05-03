"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔁 redirect after login
  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔄 handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔐 handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ IMPORTANT FIX
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save user
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Toast
        toast.success("Login successful");

        // ✅ Delay for better UX
        setTimeout(() => {
          window.location.href = redirect;
        }, 800);
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">

      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 space-y-5">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary">
          Welcome Back
        </h2>

        {/* Google Button (UI only) */}
        <button className="btn btn-outline w-full flex items-center justify-center gap-2">
          <FaGoogle /> Continue with Google
        </button>

        <div className="divider">OR</div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3">

          {/* Email */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button
            className={`btn btn-primary w-full mt-2 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}