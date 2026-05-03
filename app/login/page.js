"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      // store user (temporary)
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-6 space-y-4">

        <h2 className="text-2xl font-bold text-center text-primary">
          Welcome Back
        </h2>

        {/* Google Login */}
        <button className="btn btn-outline w-full flex items-center gap-2">
          <FaGoogle /> Continue with Google
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleLogin} className="space-y-3">

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
            Login
          </button>
        </form>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-primary cursor-pointer"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}