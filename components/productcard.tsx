"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  onAddToCart?: (id: number) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  category,
  stock,
  rating,
  onAddToCart = () => {},
}: ProductCardProps) {
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="fill-warning text-warning w-4 h-4" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="text-muted-foreground w-4 h-4" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="fill-warning text-warning w-4 h-4" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="text-muted-foreground w-4 h-4" />);
      }
    }
    return stars;
  };

  return (
    <Card
      data-component="ProductCard"
      className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
        {stock < 50 && (
          <Badge className="absolute top-2 right-2 bg-warning">Low Stock</Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg font-sans">{name}</h3>
        <Badge variant="outline" className="w-fit text-xs capitalize">
          {category}
        </Badge>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">
          {truncateDescription(description)}
        </p>

        <div className="flex items-center mt-3">
          {renderStars(rating)}
          <span className="text-xs text-muted-foreground ml-1">
            ({rating.toFixed(1)})
          </span>
        </div>

        <p className="mt-3 font-semibold text-lg">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className="w-full transition-colors"
          onClick={() => onAddToCart(id)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
