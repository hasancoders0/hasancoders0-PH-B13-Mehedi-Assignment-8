import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { FaStar, FaShoppingCart } from "react-icons/fa";

export default async function ProductDetails({ params }) {
  const resolved = await params;
  const slug = resolved.slug;

  const client = await clientPromise;
  const db = client.db("suncart");

  const product = await db.collection("products").findOne({ slug });

  if (!product) return notFound();

  return (
    <AuthGuard>
      <div className="min-h-screen py-12">

        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-base-100 rounded-3xl p-4 shadow-sm">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            <div className="space-y-6">

              <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                {product.brand}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 text-yellow-500 text-sm">
                <FaStar />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-400">(120 reviews)</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.price}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  ${product.price + 10}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <p className="text-sm">
                Status:{" "}
                <span className="text-green-600 font-medium">
                  In Stock ({product.stock})
                </span>
              </p>

              <div className="pt-2">
                <button className="btn btn-primary w-full md:w-auto px-8 flex items-center justify-center gap-2 rounded-full shadow-md hover:scale-105 transition">
                  <FaShoppingCart />
                  Buy Now
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </AuthGuard>
  );
}