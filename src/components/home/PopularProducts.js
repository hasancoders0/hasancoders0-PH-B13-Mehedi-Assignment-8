"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";

export default function PopularProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products.slice(0, 3)));
  }, []);

  return (
    <section className="animate__animated animate__fadeInUp">

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Popular Products
            </h2>
            <p className="text-sm text-gray-500">
              Discover trending summer essentials
            </p>
          </div>

          <Link
            href="/products"
            className="btn btn-sm btn-outline rounded-full flex items-center gap-2 hover:btn-primary transition-all duration-200 hover:gap-3"
          >
            View All
            <FaArrowRight />
          </Link>

        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product, index) => (
            <div
              key={product._id}
              className={`animate__animated animate__fadeInUp`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: "both",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}