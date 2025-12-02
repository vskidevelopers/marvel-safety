"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Smartphone, Truck, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/cart-context";

export default function CheckoutPage() {
    const { cart, totalPrice } = useCart();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "cod">("cod");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate order submission
        setTimeout(() => {
            toast.success("Order placed successfully!", {
                description: paymentMethod === "mpesa"
                    ? "M-Pesa confirmation received"
                    : "Delivery agent will contact you",
                duration: 5000,
            });
            router.push(`/order/${Date.now()}`);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Information */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Truck className="h-5 w-5 text-orange-600" />
                                <h2 className="text-lg font-bold text-gray-900">Shipping Information</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            placeholder="07XX XXX XXX"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Delivery Location</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            placeholder="Building, Street, Area (e.g., ABC Plaza, Mombasa Rd)"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">City/Town</label>
                                        <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white transition">
                                            <option>Nairobi</option>
                                            <option>Mombasa</option>
                                            <option>Kisumu</option>
                                            <option>Nakuru</option>
                                            <option>Eldoret</option>
                                            <option>Meru</option>
                                            <option>Nyeri</option>
                                            <option>Kajiado</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="pt-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Smartphone className="h-5 w-5 text-orange-600" />
                                        <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        {/* Pay on Delivery */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("cod")}
                                            className={`p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === "cod"
                                                ? "border-orange-500 bg-orange-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                                                    POPULAR
                                                </div>
                                                <span className="font-medium">Pay on Delivery</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Pay cash to delivery agent
                                            </p>
                                        </button>

                                        {/* M-Pesa */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("mpesa")}
                                            className={`p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === "mpesa"
                                                ? "border-orange-500 bg-orange-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="font-medium mb-2">Lipa na M-Pesa</div>
                                            <p className="text-sm text-gray-600">
                                                Pay instantly via mobile money
                                            </p>
                                        </button>
                                    </div>

                                    {/* M-Pesa Instructions (Only when selected) */}
                                    {paymentMethod === "mpesa" && (
                                        <div className="border border-orange-200 bg-orange-50 rounded-xl p-4 mb-4">
                                            <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                                                <MapPin className="h-4 w-4" /> M-Pesa Payment Instructions
                                            </h3>
                                            <ol className="text-sm text-gray-700 space-y-1 list-decimal pl-5">
                                                <li>Go to <strong>M-Pesa</strong> menu on your phone</li>
                                                <li>Select <strong>Lipa na M-Pesa</strong></li>
                                                <li>Choose <strong>Buy Goods & Services</strong></li>
                                                <li>Enter Till Number: <span className="font-bold bg-white px-1 rounded">8930612</span></li>
                                                <li>Enter Amount: <span className="font-bold bg-white px-1 rounded">KES {totalPrice}</span></li>
                                                <li>Enter your M-Pesa PIN</li>
                                            </ol>

                                            <div className="mt-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    M-Pesa Confirmation Code
                                                </label>
                                                <input
                                                    type="text"
                                                    required={paymentMethod === "mpesa"}
                                                    className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                                    placeholder="Enter M-Pesa code (e.g., SAM0...)"
                                                    autoComplete="off"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Found in your M-Pesa SMS confirmation
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="h-5 w-5" />
                                            Place Order
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-2">
                                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 sticky top-6">
                            <h2 className="font-bold text-lg mb-4 text-gray-900">Order Summary</h2>

                            <div className="space-y-4 mb-5">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="relative w-12 h-12 bg-white rounded border border-gray-200 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                            {item.quantity > 1 && (
                                                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                                    {item.quantity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                {item.name}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {item.specs.color && <span>{item.specs.color}</span>}
                                                {item.specs.size && <span> • {item.specs.size}</span>}
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                            KES {item.subtotal}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>KES {totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="font-medium">KES 300</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>VAT (16%)</span>
                                    <span>KES {(totalPrice * 0.16)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-dashed border-gray-300">
                                    <span>Total</span>
                                    <span>KES {(totalPrice + 300 + totalPrice * 0.16)}</span>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <ShieldCheck className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-gray-700">
                                        All products are KEBS-certified. Delivery within 24-48 hours nationwide.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}