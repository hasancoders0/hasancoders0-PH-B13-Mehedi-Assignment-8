import clientPromise from "@/lib/mongodb";

export default async function ProductDetails({ params }) {
  // ✅ FIX: await params
  const { slug } = await params;

  const client = await clientPromise;
  const db = client.db("suncart");

  const product = await db
    .collection("products")
    .findOne({ slug: slug });

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-500">
        Product not found ❌
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500">{product.brand}</p>

          <p className="text-yellow-500">⭐ {product.rating}</p>

          <p className="text-2xl font-bold text-primary">
            ${product.price}
          </p>

          <p>{product.description}</p>

          <p>Stock: {product.stock}</p>
        </div>
      </div>
    </div>
  );
}