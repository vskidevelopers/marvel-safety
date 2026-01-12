// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    // Core
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    
    // Pricing & Inventory
    price: v.number(),
    oldPrice: v.optional(v.number()),
    inStock: v.boolean(),

    
    // Categorization
    category: v.string(),
    subcategory: v.optional(v.string()),
    tags: v.array(v.string()),
    
    // Compliance
    certifications: v.array(v.string()),
    
    // Media
    primaryImage: v.string(),
    additionalImages: v.array(v.string()),
    
    // Technical Specs
    specs: v.object({
      material: v.optional(v.string()),
      size: v.optional(v.string()),
      color: v.optional(v.string()),
      weight: v.optional(v.number()),
      resistance: v.optional(v.array(v.string())),
    }),
    
    // Admin
    sku: v.string(),
    supplier: v.optional(v.string()),
    dateAdded: v.number(),
  })
  .index("by_category", ["category"])
  .index("by_slug", ["slug"]),
});