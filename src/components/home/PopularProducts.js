"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function PopularProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products.slice(0, 3)));
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Popular Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}