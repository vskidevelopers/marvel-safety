// components/ui/order-summary.tsx
export function OrderSummary({ order }: { order: any }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Shipping Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Delivery To</h3>
                <p className="text-sm text-gray-700">
                    {order.shipping.name}<br />
                    {order.shipping.location}<br />
                    {order.shipping.city}
                </p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-4">
                {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.name} × {item.qty}</span>
                        <span className="font-medium">KES {item.total}</span>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>KES {order.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>KES {order.delivery}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>KES {order.total}</span>
                </div>
            </div>
        </div>
    );
}