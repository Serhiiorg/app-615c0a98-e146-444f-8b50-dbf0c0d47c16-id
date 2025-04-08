"use client";
import React from "react";
import { ProductCard } from "@/components/productcard";
import { Loader2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart?: (id: number) => void;
}

export function ProductGrid({
  products = [],
  isLoading = false,
  onAddToCart = () => {},
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        data-component="ProductGrid"
        className="flex justify-center items-center min-h-[300px]"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div
        data-component="ProductGrid"
        className="bg-muted/40 rounded-lg py-12 px-6 text-center min-h-[300px] flex flex-col items-center justify-center"
      >
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any tomato products matching your criteria. Try
          adjusting your filters or check back later!
        </p>
      </div>
    );
  }

  return (
    <div
      data-component="ProductGrid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          category={product.category}
          stock={product.stock}
          rating={product.rating}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
