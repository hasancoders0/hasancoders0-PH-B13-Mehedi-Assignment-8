"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaGoogle,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Account created successfully");
        router.push("/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">

      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 space-y-5">

        <h2 className="text-2xl font-bold text-center text-primary">
          Create Account
        </h2>

        {/* Google */}
        <button className="btn btn-outline w-full flex items-center gap-2">
          <FaGoogle /> Continue with Google
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleRegister} className="space-y-3">

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaImage />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className={`btn btn-primary w-full mt-2 ${loading && "loading"}`}
            disabled={loading}
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}