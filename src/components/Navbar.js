"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaSun,
  FaHome,
  FaShoppingBag,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary"
        >
          <FaSun className="text-yellow-500" />
          SunCart
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium">

          <Link href="/" className="flex items-center gap-2 hover:text-primary transition">
            <FaHome /> Home
          </Link>

          <Link href="/products" className="flex items-center gap-2 hover:text-primary transition">
            <FaShoppingBag /> Products
          </Link>

          <Link href="/my-profile" className="flex items-center gap-2 hover:text-primary transition">
            <FaUser /> Profile
          </Link>

        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href="/login"
            className="btn btn-sm btn-primary rounded-full px-5 flex items-center gap-2"
          >
            <FaSignInAlt /> Login
          </Link>

          <Link
            href="/register"
            className="btn btn-sm btn-outline rounded-full px-5 flex items-center gap-2"
          >
            <FaUserPlus /> Register
          </Link>

        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl p-2 rounded-lg hover:bg-base-200 transition"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[400px] py-4" : "max-h-0"
        }`}
      >
        <div className="px-4 space-y-3">

          <Link
            href="/"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200"
            onClick={() => setOpen(false)}
          >
            <FaHome /> Home
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200"
            onClick={() => setOpen(false)}
          >
            <FaShoppingBag /> Products
          </Link>

          <Link
            href="/my-profile"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200"
            onClick={() => setOpen(false)}
          >
            <FaUser /> Profile
          </Link>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <Link
              href="/login"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              onClick={() => setOpen(false)}
            >
              <FaSignInAlt /> Login
            </Link>

            <Link
              href="/register"
              className="btn btn-outline w-full flex items-center justify-center gap-2"
              onClick={() => setOpen(false)}
            >
              <FaUserPlus /> Register
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
}