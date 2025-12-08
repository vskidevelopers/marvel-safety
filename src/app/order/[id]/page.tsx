"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Download, Home, Package, Clock, Truck } from "lucide-react";
import { useCart } from "../../context/cart-context";

const MOCK_ORDER = {
    id: "MVL-20251202-00147",
    date: "2 December 2024",
    time: "14:32 EAT",
    paymentMethod: "cod",
    status: "confirmed",
    items: [
        { name: "EN397 Yellow Hard Hat", qty: 5, price: 850, total: 4250, sku: "MS-HF-HH-01" },
        { name: "NP 306 Masks (Box of 50)", qty: 2, price: 3500, total: 7000, sku: "MS-RES-NP306-50" },
        { name: "Class 2 Reflective Vest", qty: 10, price: 450, total: 4500, sku: "MS-HV-VST-01" },
    ],
    shipping: {
        name: "John Doe",
        phone: "+254712345678",
        location: "Plot 123, Industrial Area, Nairobi",
        city: "Nairobi",
    },
    subtotal: 15750,
    delivery: 300,
    vat: 2520,
    total: 18570,
};

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
    const [order] = useState(MOCK_ORDER);
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Success Banner */}
                <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-sm p-5 mb-6">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Order Confirmed!</h1>
                            <p className="text-gray-600 mt-1 text-sm">
                                {order.paymentMethod === "cod"
                                    ? "Pay cash to the delivery agent upon receipt"
                                    : "Payment received via M-Pesa"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 🎯 PRINT ONLY SECTION */}
                <div id="print-section">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">

                        {/* Header */}
                        <div className="bg-gray-900 text-white p-6 text-center">
                            <div className="mb-3">
                                <div className="inline-block bg-orange-500 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                                    MS
                                </div>
                            </div>
                            <h2 className="text-xl font-bold">Marvel Safety</h2>
                            <p className="text-xs text-gray-300 mt-1">
                                KEBS-Certified PPE Supplier
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                Nairobi, Kenya | +254 700 123 456
                            </p>
                        </div>

                        {/* Order Info */}
                        <div className="p-6 border-b border-dashed border-gray-300">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                                        Order Number
                                    </p>
                                    <p className="text-lg font-bold text-gray-900">{order.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                                        Date & Time
                                    </p>
                                    <p className="font-bold text-gray-900">{order.date}</p>
                                    <p className="text-xs text-gray-600">{order.time}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Badge */}
                        <div
                            className={`p-4 ${order.paymentMethod === "cod"
                                    ? "bg-emerald-50 border-b border-emerald-200"
                                    : "bg-orange-50 border-b border-orange-200"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`flex items-center justify-center h-6 w-6 rounded-full ${order.paymentMethod === "cod"
                                            ? "bg-emerald-500"
                                            : "bg-orange-500"
                                        } text-white text-xs font-bold`}
                                >
                                    {order.paymentMethod === "cod" ? "✓" : "M"}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {order.paymentMethod === "cod"
                                            ? "Pay on Delivery"
                                            : "M-Pesa Payment"}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {order.paymentMethod === "cod"
                                            ? "Pay cash when delivered"
                                            : "Confirmation received"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="p-6 border-b border-dashed border-gray-300">
                            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                                Delivery Address
                            </h3>
                            <div className="text-sm text-gray-700 space-y-1">
                                <p className="font-semibold">{order.shipping.name}</p>
                                <p>{order.shipping.phone}</p>
                                <p>{order.shipping.location}</p>
                                <p className="font-semibold">{order.shipping.city}</p>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="p-6 border-b border-dashed border-gray-300">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b-2 border-gray-300">
                                        <th className="text-left py-2 font-bold text-gray-700">
                                            Product
                                        </th>
                                        <th className="text-center py-2 font-bold text-gray-700 w-12">
                                            Qty
                                        </th>
                                        <th className="text-right py-2 font-bold text-gray-700 w-20">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-200">
                                            <td className="py-3">
                                                <p className="text-gray-900 text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    SKU: {item.sku}
                                                </p>
                                            </td>
                                            <td className="py-3 text-center text-gray-600">
                                                {item.qty}
                                            </td>
                                            <td className="py-3 text-right font-semibold text-gray-900">
                                                KES {item.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="p-6 bg-gray-50">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>KES {order.subtotal}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>KES {order.delivery}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>VAT (16%)</span>
                                    <span>KES {order.vat}</span>
                                </div>

                                <div className="border-t pt-2 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>KES {order.total}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 text-center text-xs text-gray-500">
                            <p>Thank you for choosing Marvel Safety!</p>
                            <p className="mt-1">Questions? Call +254 700 123 456</p>
                        </div>
                    </div>
                </div>

                {/* Buttons (DO NOT PRINT) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/products"
                        className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                    >
                        <Home className="h-5 w-5" /> Continue Shopping
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                    >
                        <Download className="h-5 w-5" /> Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}
