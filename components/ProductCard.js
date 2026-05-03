import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <div className="card bg-base-100 shadow-soft rounded-card overflow-hidden hover:scale-105 transition">

      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold">{product.name}</h2>

        <p className="text-sm text-gray-500">{product.brand}</p>

        <div className="flex items-center gap-2 text-yellow-500">
          <FaStar /> {product.rating}
        </div>

        <p className="text-primary font-semibold">${product.price}</p>

        <Link
          href={`/products/${product._id}`}
          className="btn btn-primary btn-sm w-full mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}