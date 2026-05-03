"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-16">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">
              SunCart
            </h2>
            <p className="text-sm text-gray-500">
              Your one-stop shop for summer essentials like sunglasses,
              outfits, skincare, and more.
            </p>

            <div className="flex gap-3 pt-2">

              <a className="btn btn-circle btn-sm bg-base-100 hover:bg-primary hover:text-white">
                <FaFacebookF />
              </a>

              <a className="btn btn-circle btn-sm bg-base-100 hover:bg-primary hover:text-white">
                <FaInstagram />
              </a>

              <a className="btn btn-circle btn-sm bg-base-100 hover:bg-primary hover:text-white">
                <FaTwitter />
              </a>

              <a className="btn btn-circle btn-sm bg-base-100 hover:bg-primary hover:text-white">
                <FaYoutube />
              </a>

            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/my-profile" className="hover:text-primary">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Customer</h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-primary cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-primary cursor-pointer">
                Returns
              </li>
              <li className="hover:text-primary cursor-pointer">
                Shipping Info
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Newsletter</h3>

            <p className="text-sm text-gray-500 mb-3">
              Get updates on new arrivals and offers
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered input-sm w-full"
              />
              <button className="btn btn-primary btn-sm">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SunCart. All rights reserved.
        </div>

      </div>

    </footer>
  );
}