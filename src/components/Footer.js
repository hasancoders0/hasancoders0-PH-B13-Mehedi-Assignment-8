import {
  FaSun,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-20">

      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
            <FaSun /> SunCart
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your trusted summer essentials store. Shop the best products for your sunny days.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-primary cursor-pointer">Home</a></li>
            <li><a className="hover:text-primary cursor-pointer">Products</a></li>
            <li><a className="hover:text-primary cursor-pointer">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope /> support@suncart.com
          </p>

          <p className="flex items-center gap-2 text-sm mt-2">
            <FaPhone /> +123 456 789
          </p>

          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebook className="hover:text-primary cursor-pointer" />
            <FaInstagram className="hover:text-primary cursor-pointer" />
            <FaTwitter className="hover:text-primary cursor-pointer" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-sm py-4 border-t">
        © 2026 SunCart. All rights reserved.
      </div>
    </footer>
  );
}