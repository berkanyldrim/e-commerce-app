import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/slices/productsSlice";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CartItem extends Product {
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
}

export default function OrderSummary({ cartItems }: OrderSummaryProps) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const [mounted, setMounted] = useState(false);

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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2 text-[#5D5FEF]" />
          Sipariş Özeti
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 max-h-80 overflow-y-auto pr-2 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-3 border-b border-gray-100 dark:border-gray-700"
            >
              <div className="relative h-16 w-16 rounded bg-gray-50 dark:bg-gray-700/30 overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>

              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.quantity} x {formatPrice(item.price)}
                </p>
              </div>

              <div className="ml-4 text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Ara Toplam</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Kargo</span>
            <span className="font-medium text-green-600">Ücretsiz</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            <div className="flex justify-between">
              <span className="font-bold text-gray-900 dark:text-white">
                Toplam
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
