"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaSun,
  FaHome,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load user AFTER mount (no hydration issue)
useEffect(() => {
  const loadUser = () => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }

    setHydrated(true);
  };

  // ✅ defer execution (fix warning)
  setTimeout(loadUser, 0);
}, []);

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* 🔆 Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <FaSun className="text-yellow-500" />
          SunCart
        </Link>

        {/* 🖥 Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition">
            <FaHome /> Home
          </Link>

          <Link href="/products" className="flex items-center gap-2 hover:text-primary transition">
            <FaShoppingBag /> Products
          </Link>
        </nav>

        {/* 👉 Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {/* ✅ Prevent hydration mismatch */}
          {!hydrated ? (
            <div className="w-24 h-8 bg-base-200 rounded animate-pulse"></div>
          ) : !user ? (
            <>
              <Link href="/login" className="btn btn-sm btn-primary flex items-center gap-2">
                <FaSignInAlt /> Login
              </Link>

              <Link href="/register" className="btn btn-sm btn-outline flex items-center gap-2">
                <FaUserPlus /> Register
              </Link>
            </>
          ) : (
            <Link
              href="/my-profile"
              className="flex items-center gap-2 hover:bg-base-200 px-3 py-1 rounded-lg transition"
            >
              <img
                src={user.photo || "https://i.ibb.co/2kR8FzZ/avatar.png"}
                alt="user"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="font-medium">{user.name}</span>
            </Link>
          )}
        </div>

        {/* 📱 Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-base-100 border-t">

          <Link href="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>

          <Link href="/products" onClick={() => setOpen(false)} className="block">
            Products
          </Link>

          {!hydrated ? null : !user ? (
            <>
              <Link href="/login" className="btn btn-primary w-full">
                Login
              </Link>

              <Link href="/register" className="btn btn-outline w-full">
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/my-profile"
              className="flex items-center gap-2"
            >
              <img
                src={user.photo || "https://i.ibb.co/2kR8FzZ/avatar.png"}
                className="w-8 h-8 rounded-full"
                alt="user"
              />
              <span>{user.name}</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}