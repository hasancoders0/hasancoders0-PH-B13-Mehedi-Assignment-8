import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "animate.css";
import ToastProvider from "@/components/ToastProvider";
import Providers from "@/components/Providers"; // ✅

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>

        <Providers>

          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />

          <ToastProvider />

        </Providers>

      </body>
    </html>
  );
}