"use client";

import { useState } from "react";
import { Tag, CheckCircle2 } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  onSelectCategory,
}: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  // Her kategori için bir emoji/icon eşleşmesi (örnek amaçlı)
  const categoryIcons: Record<string, string> = {
    electronics: "🔌",
    jewelery: "💍",
    "men's clothing": "👔",
    "women's clothing": "👗",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center pb-3 border-b border-gray-100 dark:border-gray-700">
        <Tag className="mr-2 h-5 w-5 text-[#5D5FEF]" />
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Kategoriler
        </h3>
      </div>

      <div className="space-y-2 pt-2">
        <div
          className={`
            flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors
            ${
              selectedCategory === null
                ? "bg-[#5D5FEF]/10 text-[#5D5FEF] dark:bg-[#5D5FEF]/20 font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }
          `}
          onClick={() => handleCategoryChange(null)}
        >
          <div className="flex items-center">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F0F0F5] dark:bg-gray-700 text-xl">
              🏠
            </span>
            <span className="ml-3">Tümü</span>
          </div>
          {selectedCategory === null && (
            <CheckCircle2 className="h-5 w-5 text-[#5D5FEF]" />
          )}
        </div>

        {categories.map((category) => (
          <div
            key={category}
            className={`
              flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors
              ${
                selectedCategory === category
                  ? "bg-[#5D5FEF]/10 text-[#5D5FEF] dark:bg-[#5D5FEF]/20 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }
            `}
            onClick={() => handleCategoryChange(category)}
          >
            <div className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F0F0F5] dark:bg-gray-700 text-xl">
                {categoryIcons[category] || "📦"}
              </span>
              <span className="ml-3 capitalize">{category}</span>
            </div>
            {selectedCategory === category && (
              <CheckCircle2 className="h-5 w-5 text-[#5D5FEF]" />
            )}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <button
          onClick={() => handleCategoryChange(null)}
          className="text-sm text-[#5D5FEF] hover:underline mt-2 flex items-center"
        >
          Filtreleri Temizle
        </button>
      )}
    </div>
  );
}
