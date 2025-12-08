"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    Package,
    Truck,
    CheckCircle,
    AlertCircle,
    MapPin,
    Phone,
    CreditCard,
    Calendar,
    ArrowLeft,
    Download,
    Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Mock order data (replace with Convex query)
const MOCK_ORDER = {
    id: "MVL-20251210-00152",
    customer: "Nairobi Construction Ltd",
    email: "procurement@nairobi-construction.co.ke",
    phone: "+254712345678",
    location: "Plot 456, Enterprise Road, Industrial Area",
    city: "Nairobi",
    date: "10 Dec 2024",
    time: "14:32 EAT",
    paymentMethod: "cod",
    mpesaCode: null,
    status: "confirmed",
    items: [
        {
            id: "1",
            name: "EN397 Yellow Hard Hat",
            sku: "MS-HF-HH-01",
            quantity: 50,
            price: 850,
            total: 42500,
            certifications: ["KEBS", "EN397"]
        },
        {
            id: "2",
            name: "NP 306 Masks (Box of 50)",
            sku: "MS-RES-NP306-50",
            quantity: 20,
            price: 3500,
            total: 70000,
            certifications: ["KEBS", "EN149"]
        },
        {
            id: "3",
            name: "Class 2 Reflective Vest",
            sku: "MS-HV-VST-01",
            quantity: 100,
            price: 450,
            total: 45000,
            certifications: ["KEBS"]
        }
    ],
    subtotal: 157500,
    delivery: 2000,
    vat: 25600,
    total: 185100,
    notes: "Urgent delivery required for construction site safety audit",
    createdAt: "2024-12-10T14:32:00Z",
    updatedAt: "2024-12-10T14:32:00Z"
};

const STATUS_STEPS = [
    { id: "confirmed", label: "Order Confirmed", icon: AlertCircle, time: "Today, 14:32" },
    { id: "processing", label: "Processing", icon: Package, time: "Today" },
    { id: "shipped", label: "Shipped", icon: Truck, time: "Tomorrow" },
    { id: "delivered", label: "Delivered", icon: CheckCircle, time: "2-3 days" }
];

export default function OrderDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("");

    // Load order data
    useEffect(() => {
        const loadOrder = async () => {
            setLoading(true);
            // Simulate API fetch
            await new Promise(resolve => setTimeout(resolve, 600));
            setOrder(MOCK_ORDER);
            setSelectedStatus(MOCK_ORDER.status);
            setLoading(false);
        };

        loadOrder();
    }, [params.id]);

    const handleStatusUpdate = async () => {
        if (!order) return;

        try {
            // TODO: Replace with Convex mutation
            await new Promise(resolve => setTimeout(resolve, 500));
            setOrder({ ...order, status: selectedStatus });
            toast.success("Order status updated successfully");
        } catch (error) {
            toast.error("Failed to update status");
            console.error(error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "delivered": return "bg-green-100 text-green-800";
            case "shipped": return "bg-blue-100 text-blue-800";
            case "processing": return "bg-yellow-100 text-yellow-800";
            default: return "bg-orange-100 text-orange-800";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "confirmed": return "Confirmed";
            case "processing": return "Processing";
            case "shipped": return "Shipped";
            case "delivered": return "Delivered";
            default: return status;
        }
    };

    const downloadReceipt = () => {
        toast.info("Receipt download coming soon");
        // TODO: Implement PDF generation with pdf-lib
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-8 w-24" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-4xl mx-auto py-12 text-center">
                <div className="text-gray-400 mb-3">📦</div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Order not found</h2>
                <p className="text-gray-500 text-sm mb-4">The order you&apos;re looking for doesn&apos;t exist.</p>
                <Button onClick={() => router.push("/admin/orders")}>
                    Back to Orders
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="hover:bg-gray-100 text-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-gray-900">{order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadReceipt}
                        className="border-gray-300"
                    >
                        <Download className="h-4 w-4 mr-1.5" />
                        Download Receipt
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.print()}
                        className="border-gray-300"
                    >
                        <Printer className="h-4 w-4 mr-1.5" />
                        Print
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gray-500" /> Customer Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                                <p className="font-medium text-gray-900">{order.customer}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <p className="font-medium text-gray-900">{order.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Phone</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    {order.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    {order.date} at {order.time}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                            <p className="font-medium text-gray-900">
                                {order.location}<br />
                                {order.city}
                            </p>
                        </div>

                        {order.notes && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-1">Order Notes</p>
                                <p className="text-gray-700">{order.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Order Items</h2>

                        <div className="space-y-4">
                            {order.items.map((item: any, index: number) => (
                                <div key={index} className="flex gap-4 pb-4 last:pb-0 last:border-0 border-b border-gray-200">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">SKU: {item.sku}</p>

                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {item.certifications.map((cert: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="bg-orange-100 text-orange-800 text-[10px] px-1.5 py-0.5 rounded"
                                                >
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-right text-sm">
                                        <p className="font-medium">KES {item.total.toLocaleString()}</p>
                                        <p className="text-gray-500 text-xs mt-1">{item.quantity} × KES {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Actions */}
                <div className="space-y-6">
                    {/* Status Update */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Order Status</h2>

                        {/* Status Timeline */}
                        <div className="relative mb-6">
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                            <div className="space-y-6 pl-10 relative">
                                {STATUS_STEPS.map((step, index) => {
                                    const isCompleted = STATUS_STEPS.findIndex(s => s.id === order.status) >= index;
                                    const isActive = step.id === order.status;
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.id} className="relative">
                                            <div className={`absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full ${isCompleted
                                                    ? "bg-emerald-500"
                                                    : index === STATUS_STEPS.findIndex(s => s.id === order.status)
                                                        ? "bg-orange-500"
                                                        : "bg-gray-300"
                                                }`}>
                                                <Icon className={`h-3.5 w-3.5 ${isCompleted ? "text-white" : "text-white"}`} />
                                            </div>

                                            <div>
                                                <p className={`font-medium ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                                                    {step.label}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">{step.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Status Update Form */}
                        <div className="pt-4 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update Status
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white mb-3"
                            >
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <Button
                                onClick={handleStatusUpdate}
                                disabled={selectedStatus === order.status}
                                className="w-full bg-orange-600 hover:bg-orange-700"
                            >
                                Update Status
                            </Button>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-gray-500" /> Payment Information
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Payment Method</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${order.paymentMethod === "cod"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-orange-100 text-orange-800"
                                    }`}>
                                    {order.paymentMethod === "cod" ? "Cash on Delivery" : "M-Pesa"}
                                </span>
                            </div>

                            {order.paymentMethod === "mpesa" && order.mpesaCode && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">M-Pesa Code</span>
                                    <span className="font-medium text-gray-900">{order.mpesaCode}</span>
                                </div>
                            )}

                            <div className="pt-3 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-medium">KES {order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Delivery</span>
                                    <span className="font-medium">KES {order.delivery.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">VAT (16%)</span>
                                    <span className="font-medium">KES {order.vat.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span className="text-orange-600">KES {order.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}