"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaBalanceScale,
  FaEye,
} from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      <div className="card bg-base-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 rounded-2xl overflow-hidden">

        <figure className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />

          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Add to cart");
              }}
              className="btn btn-circle btn-sm bg-white text-gray-700 hover:bg-primary hover:text-white shadow"
            >
              <FaShoppingCart />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Wishlist");
              }}
              className="btn btn-circle btn-sm bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow"
            >
              <FaHeart />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Compare");
              }}
              className="btn btn-circle btn-sm bg-white text-gray-700 hover:bg-gray-800 hover:text-white shadow"
            >
              <FaBalanceScale />
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
            <span className="btn btn-sm btn-primary rounded-full flex items-center gap-2">
              <FaEye />
              View Product
            </span>
          </div>
        </figure>

        <div className="card-body p-4 space-y-3">

          <h2 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition">
            {product.name}
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <FaStar />
              <span className="font-medium">{product.rating}</span>
            </div>

            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
              {product.brand}
            </span>
          </div>

          <div className="border-t border-gray-100"></div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Add to cart");
              }}
              className="btn btn-sm btn-outline rounded-full px-4 flex items-center gap-1 hover:btn-primary transition"
            >
              <FaShoppingCart />
              Add
            </button>
          </div>
          <span className="btn btn-primary btn-sm w-full rounded-full flex items-center justify-center gap-2 md:hidden">
            <FaEye />
            View Product
          </span>

        </div>

      </div>
    </Link>
  );
}