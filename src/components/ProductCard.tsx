"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { Product } from "@/lib/slices/productsSlice";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (isFavorite && !favorites.includes(product.id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...favorites, product.id])
        );
      } else if (!isFavorite && favorites.includes(product.id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify(favorites.filter((id: number) => id !== product.id))
        );
      }
    }
  }, [isFavorite, product.id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) {
      return `${price.toFixed(2)} TL`;
    }
    return price.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  };

  return (
    <TooltipProvider>
      <div className="card group relative h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] overflow-hidden border border-gray-100 dark:border-gray-700">
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
          aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite
                ? "fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400 cursor-pointer"
                : "cursor-pointer"
            }`}
          />
        </button>

        <div className="relative aspect-square bg-gray-50 dark:bg-gray-700/30 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-xl" />
          )}

          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className={`object-contain hover:scale-110 transition-transform duration-300 p-5 ${
              !imageLoaded ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="flex flex-col flex-1 p-6">
          <div className="mb-2 flex items-center text-[#FFB017]">
            <Star className="w-5 h-5 fill-current" />
            <span className="ml-1 text-sm font-medium">
              {product.rating.rate}{" "}
              <span className="text-gray-500 dark:text-gray-400">
                ({product.rating.count})
              </span>
            </span>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-xl cursor-help">
                {product.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{product.title}</p>
            </TooltipContent>
          </Tooltip>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
            {product.category}
          </p>

          <div className="mt-auto">
            <span className="text-2xl font-bold text-gray-900 dark:text-white block mb-3">
              {formatPrice(product.price)}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-[#5D5FEF] cursor-pointer hover:bg-[#4A4CC8] text-white w-full py-3 rounded-lg text-base font-medium flex items-center justify-center transition-all duration-300"
              aria-label="Sepete ekle"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>Sepete Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
