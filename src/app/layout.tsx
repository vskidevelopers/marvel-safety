import { Navbar } from "@/components/ui/navbar";
// import ConvexClientProvider from "./ConvexClientProvider";
import { AuthProvider } from "./context/auth-context";
import { Toaster } from "sonner";

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

  // Cast Navbar to any to allow passing props until the Navbar component's props are properly typed.
  const NavbarAny = Navbar as any;



  return (
    <html lang="en">
      <body>

        {/* <ConvexClientProvider> */}
        <AuthProvider>
          <CartProvider >
            <NavbarAny cartCount={cartCount} isAuthenticated={isAuthenticated} />
            {children}
            <Toaster
              position="top-right"
              richColors // ← Safety-orange accents
            />
            <Footer />
          </CartProvider>
        </AuthProvider >
        {/* </ConvexClientProvider> */}



      </body>
    </html>
  );
}