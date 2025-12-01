"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useCart } from "../context/cart-context";

interface Product {
    // Core
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;

    // Pricing & Inventory
    price: number;
    oldPrice?: number;
    inStock: boolean;
    stockCount: number;

    // Categorization
    category: string;
    subcategory?: string;
    tags?: string[];

    // Compliance
    certifications: string[];

    // Media
    primaryImage: string;
    additionalImages: string[];

    // Technical Specs
    specs: {
        material?: string;
        color?: string;
        size?: string;
        weight?: string;
        resistance?: string[];
    };

    // Admin
    sku: string;
}

export function ProductDetail({ product }: { product: Product }) {

    const { addToCart } = useCart();
    const router = useRouter(); // Move this line outside of the function
    const handleAddToCart = () => {
        // 1. Validate product exists
        if (!product || !product.id) {
            console.error("❌ Add to Cart failed: Invalid product", { product });
            return;
        }


        // 3. Log successful validation
        console.log("✅ Product validated for cart", {
            id: product.id,
            name: product.name,
            price: product.price
        });


        // 4. Add to cart
        try {
            addToCart(product);
            console.log("🛒 Added to cart successfully", {
                productId: product.id,
                quantity: 1
            });

            // 5. Navigate to cart after short delay (for UX feedback)
            router.push("/cart");


        } catch (error) {
            console.error("❌ Add to Cart failed", error);
            // Optionally show user-facing error (e.g., toast)
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumbs */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link href="/products" className="hover:text-orange-600">Products</Link> / {" "}
                    <span className="text-gray-900">{product.category}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="bg-gray-50 rounded-lg aspect-square flex items-center justify-center mb-4">
                            <img
                                src={product.primaryImage}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain p-4"
                            />
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="grid grid-cols-4 gap-2">
                            {product?.additionalImages.map((img, i) => (
                                <div key={i} className="bg-gray-100 aspect-square rounded cursor-pointer border-2 border-orange-500">
                                    <img
                                        src={img}
                                        alt={`View ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="text-sm text-orange-600 font-medium mb-1">
                            {product.category}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl font-bold text-orange-600">
                                KES {product.price.toLocaleString()}
                            </span>
                            {product.oldPrice && (
                                <span className="text-gray-500 text-lg line-through">
                                    KES {product.oldPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {product.inStock ? (
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-600 font-medium">In Stock ({product.stockCount} available)</span>
                            </div>
                        ) : (
                            <div className="text-red-600 font-medium mb-6">Out of Stock</div>
                        )}

                        <p className="text-gray-700 mb-6 text-lg">
                            {product.description}
                        </p>

                        {/* Certifications */}
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 mb-2">Certifications</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.certifications.map((cert) => (
                                    <span
                                        key={cert}
                                        className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Technical Specs */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 mb-3">Technical Specifications</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-gray-500">Material:</span>
                                    <div>{product.specs.material}</div>
                                </div>
                                <div>
                                    <span className="text-gray-500">Color:</span>
                                    <div>{product.specs.color}</div>
                                </div>
                                <div>
                                    <span className="text-gray-500">Weight:</span>
                                    <div>{product.specs.weight}</div>
                                </div>
                                <div>
                                    <span className="text-gray-500">Size:</span>
                                    <div>{product.specs.size}</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-bold text-lg transition-colors"
                            >
                                Add to Cart
                            </button>
                            <button className="flex-1 border-2 border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 py-4 rounded-lg font-bold transition-colors">
                                Request Quote
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="border-t pt-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button className="pb-4 px-1 border-b-2 border-orange-600 text-orange-600 font-medium">
                                Description
                            </button>
                            <button className="pb-4 px-1 text-gray-500 hover:text-gray-700 font-medium">
                                Specifications
                            </button>
                            <button className="pb-4 px-1 text-gray-500 hover:text-gray-700 font-medium">
                                Compliance Docs
                            </button>
                        </nav>
                    </div>

                    <div className="py-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Product Overview</h3>
                        <p className="text-gray-700 mb-4">
                            The EN397 Yellow Hard Hat is designed for maximum protection in industrial environments.
                            Featuring a 4-point harness system for superior comfort and stability, this helmet meets
                            all KEBS and EN397 safety standards.
                        </p>
                        <p className="text-gray-700">
                            Ideal for construction sites, mining operations, and manufacturing facilities across Kenya.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}