"use client";

import { FaArrowRight } from "react-icons/fa";

export default function SummerTips() {
  const tips = [
    {
      id: 1,
      title: "Stay Cool & Hydrated",
      desc: "Drink plenty of water and keep your body cool during hot days.",
      image: "/tips/tip1.jpg",
    },
    {
      id: 2,
      title: "Protect Your Skin",
      desc: "Use sunscreen and skincare products to avoid sun damage.",
      image: "/tips/tip2.jpg",
    },
    {
      id: 3,
      title: "Choose Light Outfits",
      desc: "Wear breathable fabrics to stay comfortable in summer heat.",
      image: "/tips/tip3.jpg",
    },
  ];

  return (
    <section className="py-12 bg-base-100 animate__animated animate__fadeInUp">

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">

        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Summer Tips
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Stay fresh, stylish, and protected this summer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {tips.map((tip, index) => (
            <div
              key={tip.id}
              className="card bg-base-100 shadow-md rounded-xl overflow-hidden group transition hover:shadow-xl animate__animated animate__fadeInUp"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: "both",
              }}
            >

              <figure className="overflow-hidden">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />
              </figure>

              <div className="p-4 space-y-2">

                <h3 className="font-semibold text-lg text-gray-800">
                  {tip.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {tip.desc}
                </p>

                <button className="flex items-center gap-2 text-primary text-sm font-medium mt-2 hover:gap-3 transition-all">
                  Learn More <FaArrowRight />
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}