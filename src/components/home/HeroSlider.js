"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HeroSlider() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">

      <div className="carousel w-full rounded-2xl overflow-hidden shadow-lg">

        {/* SLIDE 1 */}
        <div id="slide1" className="carousel-item relative w-full">

          <img
            src="/hero/banner1.jpg"
            className="w-full h-[250px] md:h-[400px] object-cover"
            alt="Summer Sale"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">

            <div className="text-white p-6 md:p-10 max-w-lg space-y-3">

              <h1 className="text-2xl md:text-4xl font-bold">
                Summer Sale 50% OFF
              </h1>

              <p className="text-sm md:text-base opacity-90">
                Hot deals on all summer essentials
              </p>

              <Link
                href="/products"
                className="btn btn-primary btn-sm md:btn-md rounded-full flex items-center gap-2 w-fit"
              >
                Shop Now
                <FaArrowRight />
              </Link>

            </div>
          </div>

          {/* NAV */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-3 right-3 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide2" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div id="slide2" className="carousel-item relative w-full">

          <img
            src="/hero/banner2.jpg"
            className="w-full h-[250px] md:h-[400px] object-cover"
            alt="Summer Essentials"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">

            <div className="text-white p-6 md:p-10 max-w-lg space-y-3">

              <h1 className="text-2xl md:text-4xl font-bold">
                Explore Summer Essentials
              </h1>

              <p className="text-sm md:text-base opacity-90">
                Sunglasses, skincare & beach accessories
              </p>

              <Link
                href="/products"
                className="btn btn-primary btn-sm md:btn-md rounded-full flex items-center gap-2 w-fit"
              >
                Shop Collection
                <FaArrowRight />
              </Link>

            </div>
          </div>

          {/* NAV */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-3 right-3 top-1/2">
            <a href="#slide1" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide1" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

      </div>

    </div>
  );
}