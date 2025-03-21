import { Product } from "./slices/productsSlice";

export async function getProducts(): Promise<Product[]> {
  try {
    // 2 saniye cache ile veri çekme
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 120 }, // 2 dakikada bir yeniden doğrulama
    });

    if (!response.ok) {
      throw new Error("Ürünler getirilemedi.");
    }

    return await response.json();
  } catch (error) {
    console.error("Ürünleri getirirken bir hata oluştu:", error);
    return [];
  }
}
