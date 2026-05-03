import { FaShoppingBag } from "react-icons/fa";

export default function TopBrands() {
  const brands = ["SunShade", "GlowCare", "StyleWear", "ComfortWalk"];

  return (
    <section className="space-y-6">

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Top Brands
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((brand, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow hover:shadow-lg p-6 text-center transition"
          >
            <FaShoppingBag className="mx-auto text-primary text-2xl mb-2" />
            <p className="font-semibold">{brand}</p>
          </div>
        ))}
      </div>

    </section>
  );
}