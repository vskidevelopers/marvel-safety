import { Suspense } from "react";
import { ProductGrid } from "./product-grid";
import { ProductSidebar } from "./sidebar";
import { FiltersModal } from "./filters-modal";
import { ProductsHeader } from "./products-header";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <ProductsHeader />

      <div className="lg:hidden mb-6">
        <FiltersModal />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block lg:w-1/4">
          <ProductSidebar />
        </div>

        <div className="w-full lg:w-3/4">
          <Suspense fallback={<ProductSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-100 aspect-square rounded-lg animate-pulse" />
      ))}
    </div>
  );
}