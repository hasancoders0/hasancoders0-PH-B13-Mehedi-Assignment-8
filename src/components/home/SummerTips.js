import { FaTint, FaSun, FaHatCowboy, FaAppleAlt } from "react-icons/fa";

export default function SummerTips() {
  return (
    <section className="bg-base-200 p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Summer Care Tips
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex items-center gap-3">
          <FaTint className="text-blue-500" />
          <p>Stay hydrated</p>
        </div>

        <div className="flex items-center gap-3">
          <FaSun className="text-yellow-500" />
          <p>Use sunscreen daily</p>
        </div>

        <div className="flex items-center gap-3">
          <FaHatCowboy className="text-orange-500" />
          <p>Wear hats & sunglasses</p>
        </div>

        <div className="flex items-center gap-3">
          <FaAppleAlt className="text-green-500" />
          <p>Eat fresh fruits</p>
        </div>

      </div>
    </section>
  );
}