"use client";

import { useTheme } from "@/lib/ThemeProvider";
import { Sun, Moon, Laptop } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  // Menü dışında bir yere tıklandığında menüyü kapatacak
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getButtonIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Tema ayarları"
      >
        {getButtonIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 animate-fade-in border border-gray-200 dark:border-gray-700">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Tema Seçenekleri
          </h3>

          <div className="mt-1">
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === "light"
                  ? "text-[#5D5FEF] font-medium"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <Sun className="h-4 w-4 mr-2" />
              <span>Açık</span>
              {theme === "light" && <CheckIcon className="ml-auto h-4 w-4" />}
            </button>

            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === "dark"
                  ? "text-[#5D5FEF] font-medium"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <Moon className="h-4 w-4 mr-2" />
              <span>Koyu</span>
              {theme === "dark" && <CheckIcon className="ml-auto h-4 w-4" />}
            </button>

            <button
              onClick={() => handleThemeChange("system")}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === "system"
                  ? "text-[#5D5FEF] font-medium"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <Laptop className="h-4 w-4 mr-2" />
              <span>Sistem</span>
              {theme === "system" && <CheckIcon className="ml-auto h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Basit bir check icon komponenti
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
