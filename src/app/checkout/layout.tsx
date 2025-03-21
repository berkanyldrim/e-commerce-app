import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ödeme | E-Ticaret Mağazası",
  description: "Güvenli ödeme işleminizi tamamlayın",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </>
  );
}
