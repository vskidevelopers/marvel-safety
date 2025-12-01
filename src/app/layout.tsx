import { Navbar } from "@/components/ui/navbar";
import { ConvexClientProvider } from "./ConvexClientProvider";

import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { CartProvider } from "./context/cart-context";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = false; // TODO: Implement real authentication check 
  // TODO: Fetch real cart count from Convex
  const cartCount = 0; // Replace with real data later

  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <CartProvider >
            <Navbar cartCount={cartCount} isAuthenticated={isAuthenticated} />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ConvexClientProvider>

      </body>
    </html>
  );
}