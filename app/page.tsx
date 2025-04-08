"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/productgrid";
import { Button } from "@/components/ui/button";
import { Leaf, Truck, Award, ArrowRight } from "lucide-react";

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

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        // Only take first 4 products for featured section
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div data-component="HomePage">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sans leading-tight">
              Fresh Tomatoes Delivered to Your Door
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              Experience the farm-fresh flavor of our premium tomatoes,
              harvested at peak ripeness and delivered straight to you.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-medium transition-transform hover:scale-105"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 font-sans">
                Featured Tomatoes
              </h2>
              <p className="text-muted-foreground">
                Handpicked selections from our garden
              </p>
            </div>
            <Link
              href="/"
              className="text-primary font-medium flex items-center hover:underline"
            >
              View all products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <ProductGrid
            products={featuredProducts}
            isLoading={isLoading}
            onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-sans">
            Why Choose Tomato Harvest?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-sans">
                Farm Fresh
              </h3>
              <p className="text-muted-foreground">
                Our tomatoes are harvested at peak ripeness to ensure maximum
                flavor and nutrition.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-secondary/10 p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Truck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-sans">
                Fast Delivery
              </h3>
              <p className="text-muted-foreground">
                We deliver within 24 hours of harvest to ensure you receive the
                freshest tomatoes possible.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-accent/10 p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-sans">
                Organic Options
              </h3>
              <p className="text-muted-foreground">
                We offer a variety of certified organic tomatoes grown without
                synthetic pesticides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-sans">
            Ready to taste the difference?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who enjoy our premium tomatoes
            delivered fresh to their doorstep.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 font-medium"
          >
            Start Shopping
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-muted py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© 2023 Tomato Harvest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
