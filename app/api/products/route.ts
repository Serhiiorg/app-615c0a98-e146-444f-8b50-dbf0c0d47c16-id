import { NextRequest, NextResponse } from "next/server";

// Mock data for tomato products
const tomatoProducts = [
  {
    id: 1,
    name: "Sweet Cherry Tomatoes",
    description: "Small, sweet and juicy cherry tomatoes perfect for salads.",
    price: 3.99,
    image: "/images/cherry-tomatoes.jpg",
    category: "cherry",
    stock: 150,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Beefsteak Tomatoes",
    description: "Large, meaty tomatoes ideal for sandwiches and burgers.",
    price: 4.49,
    image: "/images/beefsteak-tomatoes.jpg",
    category: "beefsteak",
    stock: 75,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Heirloom Tomatoes Mix",
    description:
      "A colorful mix of heritage tomato varieties with unique flavors.",
    price: 5.99,
    image: "/images/heirloom-tomatoes.jpg",
    category: "heirloom",
    stock: 50,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Roma Tomatoes",
    description: "Firm, meaty tomatoes perfect for sauces and canning.",
    price: 3.49,
    image: "/images/roma-tomatoes.jpg",
    category: "roma",
    stock: 100,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Yellow Cherry Tomatoes",
    description: "Sweet yellow cherry tomatoes with low acidity.",
    price: 4.29,
    image: "/images/yellow-cherry-tomatoes.jpg",
    category: "cherry",
    stock: 80,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Green Zebra Heirloom",
    description: "Tangy green tomatoes with yellow stripes and rich flavor.",
    price: 6.49,
    image: "/images/green-zebra-tomatoes.jpg",
    category: "heirloom",
    stock: 30,
    rating: 4.7,
  },
];

export async function GET(request: NextRequest) {
  try {
    // Simulate API authentication check
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    // Get the category query parameter
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Filter products by category if provided
    let filteredProducts = tomatoProducts;
    if (category) {
      filteredProducts = tomatoProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Simulate a slight delay as would happen with a real API
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json(filteredProducts);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch tomato products: ${error}` },
      { status: 500 },
    );
  }
}
