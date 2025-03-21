"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchProducts,
  fetchCategories,
  Product,
} from "@/lib/slices/productsSlice";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { useAppSelector } from "@/lib/hooks";
import { ShoppingBag, Filter, Search } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    status,
    error,
    categories,
  } = useAppSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    let result = [...products];

    // Kategori filtreleme
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Arama filtreleme
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-gray-900">
      <Navbar />

      {/* Hero Bölümü */}
      <section className="bg-gradient-to-r from-[#5D5FEF] to-[#4A4CC8] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              En Kaliteli Ürünler
            </h1>
            <p className="text-base md:text-lg opacity-90 mb-8">
              Tüm ihtiyaçlarınız için tek adres. Hızlı teslimat, uygun fiyat.
            </p>
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-3 pl-12 pr-4 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/50"
                placeholder="Ne aramıştınız?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <main className="container-custom py-10 md:py-14 animate-fade-in">
        {/* Kategori ve Filtre Başlığı - Mobil */}
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ürünler
          </h2>
          <button
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
            <span>Filtrele</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtre Sidebar - Desktop daima görünür, Mobil'de toggle */}
          <div
            className={`md:w-60 shrink-0 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 hidden md:block">
                Filtrele
              </h2>

              {status === "loading" ? (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-2 border-[#5D5FEF] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <CategoryFilter
                  categories={categories}
                  onSelectCategory={handleCategorySelect}
                />
              )}

              {/* Mobil'de kapat butonu */}
              <div className="mt-6 md:hidden">
                <button
                  className="w-full py-2.5 text-center text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  onClick={() => setShowFilters(false)}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>

          {/* Ana İçerik */}
          <div className="flex-1">
            {status === "loading" && (
              <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl p-8">
                <div className="w-12 h-12 border-4 border-[#5D5FEF] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">
                  Ürünler yükleniyor...
                </p>
              </div>
            )}

            {status === "failed" && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl p-6 mb-6">
                <p className="font-medium">Bir hata oluştu</p>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            )}

            {status === "succeeded" && (
              <>
                {/* Ürün Sayısı Bilgisi */}
                <div className="hidden md:flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ürünler
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                    {filteredProducts.length} ürün bulundu
                  </p>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-sm">
                    <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-6" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                      Ürün bulunamadı
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                      Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı
                      bir filtre veya arama terimi deneyin.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery("");
                      }}
                      className="bg-[#5D5FEF] hover:bg-[#4A4CC8] text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Tüm ürünleri göster
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
