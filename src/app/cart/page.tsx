"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/lib/slices/cartSlice";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/slices/cartSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sepetim
          </h1>
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Alışverişe Devam Et
          </Link>
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Sepetiniz boş
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Sepetinizde henüz ürün bulunmamaktadır.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.items.map((item: CartItem) => (
                    <div key={item.id} className="flex p-4 sm:p-6 items-center">
                      <div className="relative h-16 w-16 flex-shrink-0 sm:h-24 sm:w-24 bg-gray-100 dark:bg-gray-700 rounded">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="ml-4 sm:ml-6 flex-1">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.price.toLocaleString("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex border border-gray-300 dark:border-gray-600 rounded">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 text-gray-600 dark:text-gray-400"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 text-gray-600 dark:text-gray-400"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-4 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sipariş Özeti
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Ara Toplam
                    </span>
                    <span className="font-medium">
                      {totalPrice.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Kargo
                    </span>
                    <span className="font-medium text-green-600">Ücretsiz</span>
                  </div>
                  <div className="my-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900 dark:text-white">
                        Toplam
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {totalPrice.toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <CreditCard /> Ödeme Yap
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
