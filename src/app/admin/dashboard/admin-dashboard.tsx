// components/admin/dashboard.tsx
"use client";

import {
    DollarSign,
    ShoppingBag,
    AlertTriangle,
    Users
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "KES 1.2M", icon: DollarSign, color: "bg-green-100 text-green-700" },
        { label: "Total Orders", value: "156", icon: ShoppingBag, color: "bg-blue-100 text-blue-700" },
        { label: "Low Stock Items", value: "8", icon: AlertTriangle, color: "bg-orange-100 text-orange-700" },
        { label: "Active Customers", value: "42", icon: Users, color: "bg-purple-100 text-purple-700" },
    ];

    const recentOrders = [
        {
            id: "MVL-20251202-00147",
            customer: "John Kamau",
            phone: "0712...",
            date: "Dec 2, 2024",
            total: "KES 12,500",
            status: "confirmed",
            payment: "cod"
        },
        {
            id: "MVL-20251202-00146",
            customer: "BuildRight Ltd",
            phone: "0722...",
            date: "Dec 2, 2024",
            total: "KES 45,200",
            status: "shipped",
            payment: "mpesa"
        },
    ];

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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your Marvel Safety business.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                <Icon className="h-6 w-6" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">Recent Orders</h2>
                    <Link
                        href="/admin/orders"
                        className="text-sm text-orange-600 font-medium hover:text-orange-700"
                    >
                        View All Orders
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3 text-left">Order ID</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Total</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Payment</th>
                                <th className="px-6 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentOrders.map((order, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{order.customer}</div>
                                        <div className="text-xs text-gray-500">{order.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${order.payment === "cod"
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-orange-100 text-orange-800"
                                            }`}>
                                            {order.payment === "cod" ? "Cash on Delivery" : "M-Pesa"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}