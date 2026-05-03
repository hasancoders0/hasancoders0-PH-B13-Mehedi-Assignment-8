"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaUserPlus,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // 🔄 handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 📝 register user
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Account created successfully 🎉");

        // 👉 redirect to login
        setTimeout(() => {
          router.push("/login");
        }, 800);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  // 🔥 Google signup
  const handleGoogleRegister = async () => {
    setGoogleLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/my-profile",
      });
    } catch (error) {
      toast.error("Google signup failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">

      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 space-y-6 animate__animated animate__fadeIn">

        <h2 className="text-2xl font-bold text-center text-primary">
          Create Account
        </h2>

        <button
          onClick={handleGoogleRegister}
          disabled={googleLoading}
          className="btn btn-outline w-full flex items-center justify-center gap-2 hover:scale-[1.02] transition"
        >
          {googleLoading ? (
            "Connecting..."
          ) : (
            <>
              <FaGoogle /> Continue with Google
            </>
          )}
        </button>

        <div className="divider text-sm">OR</div>

        <form onSubmit={handleRegister} className="space-y-4">

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className={`btn btn-primary w-full flex items-center justify-center gap-2 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : (
              <>
                <FaUserPlus /> Create Account
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}