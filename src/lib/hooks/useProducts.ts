import { useState, useEffect } from "react";
import { useProductFunctions } from "@/lib/firebase";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchAllProducts } = useProductFunctions();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchAllProducts();
        if (result.success) {
          setProducts(result.data || []);
        } else {
          setError("Failed to load products");
          console.error("Fetch products error:", result.message);
        }
      } catch (err) {
        setError("Network error");
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error, refetch: () => {} }; // Add refetch later if needed
}
