
import { ProductDetail } from "../product-detail";

export default function ProductPage() {
    const demoProduct = {
        id: "1",
        name: "EN397 Yellow Hard Hat",
        slug: "en397-yellow-hard-hat",
        description: "KEBS-certified industrial hard hat with 4-point harness for maximum comfort and safety. Meets EN397 standards for impact and penetration resistance.",
        shortDescription: "Industrial head protection",
        price: 850,
        oldPrice: 1000,
        inStock: true,
        stockCount: 120,
        category: "Head & Face Protection",
        certifications: ["KEBS", "EN397"],
        primaryImage: "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_800/v1763916334/hard-hat-yellow.jpg",
        additionalImages: [
            "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_400/v1763916334/hard-hat-yellow.jpg",
            "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_400/v1763916334/hard-hat-yellow.jpg",
            "https://res.cloudinary.com/dlmmsamck/image/upload/f_auto,q_auto,w_400/v1763916334/hard-hat-yellow.jpg",
        ],
        specs: {
            material: "High-Density Polyethylene (HDPE)",
            color: "Yellow",
            weight: "420g",
            size: "Universal (54-62cm)",
        },
        sku: "MS-HF-HH-01",
    };


    return <ProductDetail product={demoProduct} />;
}