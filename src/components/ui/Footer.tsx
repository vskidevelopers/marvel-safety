"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Mail, Shield, Package, MessageCircle } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  // Marvel Safety real categories (wearable-focused)
  const SHOP_CATEGORIES = [
    { name: "Head & Face Protection", href: "/products?category=head-face" },
    { name: "Respiratory Protection", href: "/products?category=respiratory" },
    { name: "Hand Protection", href: "/products?category=hand" },
    { name: "Body Protection Wear", href: "/products?category=body" },
    { name: "Safety Footwear", href: "/products?category=foot" },
    { name: "Visibility Wear", href: "/products?category=high-vis" },
    { name: "Site Safety Equipment", href: "/products?category=site" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 text-white p-1.5 rounded font-bold text-lg">MS</div>
              <span className="font-bold text-xl">Marvel Safety</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              KEBS-certified wearable PPE supplier serving Nairobi and nationwide Kenya.
              Trusted by construction firms, apiaries, factories, and healthcare workers.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-500">Shop by Category</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {SHOP_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-500">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>
                  Enterprise Road, Industrial Area<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>info@marvelsafety.co.ke</span>
              </li>
            </ul>
          </div>

          {/* B2B & Compliance */}
          <div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-500">For Businesses</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/quote" className="hover:text-orange-400 transition-colors flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Request Bulk Order Quote
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/254700123456"
                    className="hover:text-orange-400 transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp: +254 700 123 456
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-400 transition-colors flex items- center gap-2">
                    <Mail className="h-4 w-4" />
                    Email for Corporate Orders
                  </Link>
                </li>
              </ul>
            </div>

            <div className="my-6 border-t border-gray-800" />

            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="bg-orange-600/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium">KEBS Certified</span>
              </div>
              <div className="bg-orange-600/20 px-3 py-1.5 rounded flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium">Nairobi Based</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Marvel Safety Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
