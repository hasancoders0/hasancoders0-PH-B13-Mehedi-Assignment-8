"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  FaSun,
  FaHome,
  FaShoppingBag,
  FaUserCircle,
  FaBars,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  // ✅ NextAuth session
  const { data: session, status } = useSession();

  // ✅ Local user (email login)
  const [localUser, setLocalUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    };

    const userData = loadUser();

    // ✅ Single state update (fix warning)
    setLocalUser(userData);
    setMounted(true);
  }, []);

  // 🔥 Combine both auth systems
  const user = useMemo(() => {
    return session?.user || localUser;
  }, [session, localUser]);

  const isActive = (path) => pathname === path;
  const isProducts = pathname.startsWith("/products");

  // ⛔ Prevent hydration mismatch
  if (!mounted || status === "loading") return null;

  return (
    <header className="bg-base-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <FaSun /> SunCart
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link
            href="/"
            className={`flex items-center gap-1 ${
              isActive("/") ? "text-primary font-semibold" : "hover:text-primary"
            }`}
          >
            <FaHome /> Home
          </Link>

          <Link
            href="/products"
            className={`flex items-center gap-1 ${
              isProducts ? "text-primary font-semibold" : "hover:text-primary"
            }`}
          >
            <FaShoppingBag /> Products
          </Link>

          {user && (
            <Link
              href="/my-profile"
              className={`flex items-center gap-1 ${
                isActive("/my-profile")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }`}
            >
              <FaUserCircle /> My Profile
            </Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {user ? (
            <div className="flex items-center gap-2">
              {/* ✅ Always default icon */}
              <FaUserCircle className="text-2xl text-gray-600" />

              <span className="hidden md:block text-sm font-medium">
                {user.name}
              </span>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`btn btn-sm flex items-center gap-2 ${
                  isActive("/login") ? "btn-primary" : "btn-outline"
                }`}
              >
                <FaSignInAlt /> Login
              </Link>

              <Link
                href="/register"
                className={`btn btn-sm flex items-center gap-2 ${
                  isActive("/register") ? "btn-primary" : "btn-outline"
                }`}
              >
                <FaUserPlus /> Register
              </Link>
            </>
          )}

          {/* MOBILE MENU */}
          <div className="md:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <FaBars />
            </label>

            <ul className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56 space-y-2">
              <li>
                <Link href="/" className="flex items-center gap-2">
                  <FaHome /> Home
                </Link>
              </li>

              <li>
                <Link href="/products" className="flex items-center gap-2">
                  <FaShoppingBag /> Products
                </Link>
              </li>

              {user && (
                <li>
                  <Link
                    href="/my-profile"
                    className="flex items-center gap-2"
                  >
                    <FaUserCircle /> My Profile
                  </Link>
                </li>
              )}

              {!user && (
                <>
                  <li>
                    <Link href="/login" className="flex items-center gap-2">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>

                  <li>
                    <Link href="/register" className="flex items-center gap-2">
                      <FaUserPlus /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>

      </div>
    </header>
  );
}