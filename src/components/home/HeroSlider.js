"use client";

import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircle,
} from "react-icons/fa";
import Link from "next/link";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/hero/banner1.jpg",
    },
    {
      id: 2,
      image: "/hero/banner2.jpg",
      title: "Explore Summer Essentials",
      subtitle: "Sunglasses, skincare & beach accessories",
      button: "Shop Collection",
    },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">

      <div className="relative w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">

        {/* SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === current
                ? "opacity-100 scale-100 z-10 animate__animated animate__fadeIn"
                : "opacity-0 scale-95 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt="banner"
              className="w-full h-full object-cover object-center"
            />

            {/* SECOND SLIDE TEXT (CENTERED + FIXED COLOR) */}
            {index === 1 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                  {slide.title}
                </h2>

                <p className="text-sm md:text-base text-gray-700 mt-2">
                  {slide.subtitle}
                </p>

                <Link
                  href="/products"
                  className="btn btn-primary mt-4 rounded-full flex items-center gap-2"
                >
                  {slide.button}
                  <FaArrowRight />
                </Link>

              </div>
            )}
          </div>
        ))}

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-white text-black hover:bg-primary hover:text-white shadow-md"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-white text-black hover:bg-primary hover:text-white shadow-md"
        >
          <FaArrowRight />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`text-sm transition ${
                index === current
                  ? "text-primary scale-125"
                  : "text-white/70"
              }`}
            >
              <FaCircle />
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}