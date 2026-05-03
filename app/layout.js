import "./globals.css";
import "animate.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SunCart",
  description: "Summer Essentials Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="summer">
      <body>
        <Navbar />
        <main className="min-h-screen px-4 md:px-10 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}