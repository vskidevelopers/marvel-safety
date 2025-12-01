// context/cart-context.tsx
"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Cart, CartItem, MOCK_CART } from "@/app/types/cart";

interface CartContextType {
    cart: Cart;
    totalPrice: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getInitialCart(): Cart {
    if (typeof window === "undefined") return MOCK_CART;

    try {
        const saved = localStorage.getItem("marvel-cart");
        return saved ? JSON.parse(saved) : MOCK_CART;
    } catch (e) {
        console.error("Failed to parse cart, using default", e);
        return MOCK_CART;
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart>(getInitialCart);

    // Persist to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("marvel-cart", JSON.stringify(cart));
        }
    }, [cart]);

    // Calculate total price
    const totalPrice = useMemo(
        () => cart.items.reduce((sum, item) => sum + item.subtotal, 0),
        [cart.items]
    );

    const addToCart = (newItem: CartItem) => {
        setCart(prev => {
            console.log("Adding to cart:", newItem);
            console.log("Prev items >>> ", prev);
            const existingIndex = prev.items.findIndex(item => item.id === newItem.id);
            console.log("Existing item index:", existingIndex);

            if (existingIndex !== -1) {
                const updatedItems = [...prev.items];
                const existing = updatedItems[existingIndex];
                const newQuantity = existing.quantity + newItem.quantity;
                const newSubtotal = newQuantity * existing.price;

                console.log("Item already exists. Updating quantity from", existing.quantity, "to", newQuantity);

                updatedItems[existingIndex] = {
                    ...existing,
                    quantity: newQuantity,
                    subtotal: newSubtotal,
                };
                console.log("Updated item:", updatedItems[existingIndex]);
                return { ...prev, items: updatedItems };
            }

            console.log("New item added to cart. Total items:", prev.items.length + 1);
            return { ...prev, items: [...prev.items, newItem] };
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => {
            const updatedItems = prev.items.filter(item => item.id !== id);
            console.log("Removing item with id:", id);
            console.log("Remaining items:", updatedItems.length);

            if (updatedItems.length === 0) {
                console.log("Cart is empty, clearing cart and localStorage");
                localStorage.removeItem("marvel-cart");
                clearCart();
                return prev;
            }

            return { ...prev, items: updatedItems };
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        console.log("Updating quantity for item id:", id, "to:", quantity);

        if (quantity < 1) {
            console.log("Quantity is less than 1, removing item from cart");
            removeFromCart(id);
            return;
        }

        setCart(prev => {
            const updatedItems = prev.items.map(item =>
                item.id === id
                    ? { ...item, quantity, subtotal: quantity * item.price }
                    : item
            );
            const updatedItem = updatedItems.find(item => item.id === id);
            console.log("Item quantity updated:", updatedItem);
            return { ...prev, items: updatedItems };
        });
    };

    const clearCart = () => {
        setCart({
            id: `cart-${Date.now()}`,
            items: [],
            totalPrice: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                totalPrice,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}