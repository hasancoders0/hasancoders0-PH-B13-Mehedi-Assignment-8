import { FaFire, FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-yellow-300 via-orange-300 to-sky-300 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">

      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Summer Sale 50% OFF
        </h1>

        <p className="text-gray-700 flex items-center justify-center md:justify-start gap-2">
          <FaFire className="text-red-500" />
          Hot Deals on all summer essentials
        </p>

        <button className="btn btn-primary gap-2">
          Shop Now <FaArrowRight />
        </button>
      </div>

      <img
        src="https://i.ibb.co/7y9FzqF/sunglasses.jpg"
        alt="summer"
        className="w-full md:w-96 rounded-xl shadow-md"
      />
    </section>
  );
}