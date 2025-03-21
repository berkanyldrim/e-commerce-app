import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default async function ProductsGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4} // İlk 4 ürün için priority true olarak ayarla
        />
      ))}
    </div>
  );
}
