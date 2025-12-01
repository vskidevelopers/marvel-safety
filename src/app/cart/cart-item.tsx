// components/ui/cart-item.tsx
"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import { CartItem } from "@/types/cart";

export function CartItemComponent({ item }: { item: CartItem }) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="border-b last:border-b-0 p-4 flex gap-4">
            <Link href={`/products/${item.slug}`} className="w-20 h-20 flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                />
            </Link>

            <div className="flex-1 min-w-0">
                <Link href={`/products/${item.slug}`}>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {item.name}
                    </h3>
                </Link>

                {/* PPE Specs */}
                <div className="text-xs text-gray-600 mt-1 flex flex-wrap gap-1">
                    {item.specs.color && <span>{item.specs.color}</span>}
                    {item.specs.size && <span>• {item.specs.size}</span>}
                    {item.specs.material && <span>• {item.specs.material}</span>}
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-1 mt-2">
                    {item.certifications.map(cert => (
                        <span
                            key={cert}
                            className="bg-orange-100 text-orange-800 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap"
                        >
                            {cert}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center border border-gray-300 rounded">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-2 py-1 min-w-[24px] text-center">
                            {item.quantity && !isNaN(item.quantity) ? item.quantity : 1}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm whitespace-nowrap"
                    >
                        Remove
                    </button>
                </div>
            </div>

            <div className="text-right font-bold text-orange-600 w-20 flex-shrink-0">
                KES {item.subtotal}
            </div>
        </div>
    );
}