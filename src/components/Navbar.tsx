"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { totalItems = 0 } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md">
        <div className="container-custom">
          <div className="flex h-20 items-center justify-between"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 md:hidden mr-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
            >
              <span className="sr-only">Menüyü Aç</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link href="/" className="flex items-center space-x-3">
              <span className="bg-[#5D5FEF] text-white text-3xl font-bold px-3 py-1.5 rounded shadow-sm">
                E
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white hidden sm:inline-block">
                E-Ticaret
              </span>
            </Link>
          </div>

          {/* Tema ve Sepet */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <ThemeToggle />

            <Link
              href="/cart"
              className="relative p-2.5 text-gray-700 dark:text-gray-200 hover:text-[#5D5FEF] dark:hover:text-[#5D5FEF] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
            >
              <ShoppingCart className="h-7 w-7" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#5D5FEF] rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden p-5 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
          <nav className="space-y-2">
            <Link
              href="/"
              className="block px-5 py-3.5 rounded-lg text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/cart"
              className="block px-5 py-3.5 rounded-lg text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sepetim {totalItems > 0 && `(${totalItems})`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
