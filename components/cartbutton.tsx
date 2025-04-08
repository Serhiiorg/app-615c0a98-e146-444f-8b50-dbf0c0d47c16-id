"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface CartButtonProps {
  itemCount?: number;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function CartButton({
  itemCount = 0,
  variant = "default",
  size = "default",
  className = "",
}: CartButtonProps) {
  return (
    <div data-component="CartButton" className="relative inline-block">
      <Button
        variant={variant}
        size={size}
        aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        className={className}
        asChild
      >
        <Link href="/">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Shopping Cart</span>

          {size !== "icon" && <span className="ml-2">Cart</span>}
        </Link>
      </Button>

      {itemCount > 0 && (
        <Badge className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground">
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </div>
  );
}
