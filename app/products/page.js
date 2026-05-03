"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { FaSearch } from "react-icons/fa";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  // ✅ FIX: useMemo instead of useEffect + setState
  const filteredProducts = useMemo(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [products, search, category]);

  const categories = [
    "All",
    "Accessories",
    "Clothing",
    "Footwear",
    "Skincare",
  ];

  return (
    <div className="min-h-screen py-10 animate__animated animate__fadeInUp">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              All Products
            </h1>
            <p className="text-sm text-gray-500">
              {filteredProducts.length} products available
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-2 border rounded-full px-3 py-2 bg-white w-full md:w-80">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`btn btn-sm rounded-full ${
                category === cat ? "btn-primary" : "btn-outline"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found
          </div>
        )}

        {/* GRID */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate__animated animate__fadeInUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}