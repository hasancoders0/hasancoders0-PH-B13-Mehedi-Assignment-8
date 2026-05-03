"use client";

export default function TopBrands() {
  const brands = [
    { name: "Nike", logo: "/brands/nike.png" },
    { name: "Adidas", logo: "/brands/adidas.png" },
    { name: "Zara", logo: "/brands/zara.png" },
    { name: "H&M", logo: "/brands/hm.png" },
    { name: "Puma", logo: "/brands/puma.png" },
    { name: "Gucci", logo: "/brands/gucci.png" },
  ];

  return (
    <section className="py-12 bg-base-200 animate__animated animate__fadeInUp">

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">

        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Top Brands
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Trusted brands you love
          </p>
        </div>
        <div className="overflow-hidden">

          <div className="flex gap-6 w-max animate-scroll">

            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="min-w-[140px] bg-base-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition group"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 object-contain grayscale group-hover:grayscale-0 transition"
                />

                <p className="text-sm text-gray-600">
                  {brand.name}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
      <style jsx>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </section>
  );
}