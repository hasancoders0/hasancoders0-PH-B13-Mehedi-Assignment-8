"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-6 space-y-4">

        <h2 className="text-2xl font-bold text-center text-primary">
          Create Account
        </h2>

        {/* Google Signup */}
        <button className="btn btn-outline w-full flex items-center gap-2">
          <FaGoogle /> Continue with Google
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleRegister} className="space-y-3">

          <div className="flex items-center gap-2 border p-2 rounded-lg">
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

          <div className="flex items-center gap-2 border p-2 rounded-lg">
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

          <div className="flex items-center gap-2 border p-2 rounded-lg">
            <FaImage />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2 border p-2 rounded-lg">
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

          <button className="btn btn-primary w-full mt-2">
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