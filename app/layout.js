import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "animate.css";
import ToastProvider from "@/components/ToastProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />

        {/* ✅ FIXED */}
        <ToastProvider />

      </body>
    </html>
  );
}