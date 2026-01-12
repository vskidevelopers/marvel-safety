// convex/products.ts
import { mutation } from "convex/functions";
import { api, internal } from "../_generated/api";
import { id } from "../_generated/server";
import { v } from "convex/values";

// Define input schema
const productSchema = v.object({
  name: v.string(),
  slug: v.string(),
  description: v.string(),
  shortDescription: v.string(),
  price: v.number(),
  oldPrice: v.optional(v.number()),
  inStock: v.boolean(),
  category: v.string(),
  subcategory: v.optional(v.string()),
  tags: v.array(v.string()),
  certifications: v.array(v.string()),
  primaryImage: v.string(),
  additionalImages: v.array(v.string()),
  specs: v.object({
    material: v.optional(v.string()),
    size: v.optional(v.string()),
    color: v.optional(v.string()),
    weight: v.optional(v.number()),
    resistance: v.optional(v.array(v.string())),
  }),
  sku: v.string(),
  supplier: v.optional(v.string()),
});

export const create = mutation({
  // Validate input
  args: { product: productSchema },

  handler: async (ctx, args) => {
    // Add timestamp
    const productData = {
      ...args.product,
      dateAdded: Date.now(),
    };

    // Insert into DB
    const productId = await ctx.db.insert("products", productData);

    return { id: productId, ...productData };
  },
});
