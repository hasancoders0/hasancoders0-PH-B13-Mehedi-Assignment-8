import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl overflow-hidden">

      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover"
        />
      </figure>

      <div className="p-4 space-y-2">

        <h2 className="text-lg font-semibold line-clamp-1">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <FaStar /> {product.rating}
        </div>

        <p className="text-primary font-bold text-lg">
          ${product.price}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="btn btn-primary btn-sm w-full mt-2"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}