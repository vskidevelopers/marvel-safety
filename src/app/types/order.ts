// ✅ Order types for TypeScript
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface OrderData {
  customer: {
    fullName: string;
    phone: string;
    location: string;
    city: string;
  };
  payment: {
    method: "mpesa" | "cod";
    mpesaCode?: string;
  };
  items: OrderItem[];
  totals: {
    subtotal: number;
    vat: number;
    delivery: number;
    grandTotal: number;
  };
  status: "pending";
  // createdAt handled by Firestore
}

// ✅ Result type for order operations
export interface OrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}
