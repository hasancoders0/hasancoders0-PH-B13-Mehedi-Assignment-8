import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

export default async function ProductDetails({ params }) {
  const resolved = await params;
  const slug = resolved.slug;

  const client = await clientPromise;
  const db = client.db("suncart");

  const product = await db
    .collection("products")
    .findOne({ slug });

  if (!product) return notFound();

  return (
    <AuthGuard>

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">

        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl w-full h-[400px] object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500">{product.brand}</p>

          <p className="text-yellow-500">⭐ {product.rating}</p>

          <p className="text-2xl text-primary font-semibold">
            ${product.price}
          </p>

          <p>{product.description}</p>

          <p>Stock: {product.stock}</p>

          <button className="btn btn-primary w-full mt-4">
            Buy Now
          </button>
        </div>

      </div>

    </AuthGuard>
  );
}