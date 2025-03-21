"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { CreditCard, Shield, Check } from "lucide-react";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";

const CHECKOUT_STEPS = ["teslimat", "ödeme", "onay"];

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    zipCode: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (cart.items.length === 0 && typeof window !== "undefined") {
    router.push("/");
    return null;
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleNextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCompleteCheckout = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const randomOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setOrderId(randomOrderId);

    const orderData = {
      id: randomOrderId,
      items: cart.items,
      totalPrice,
      deliveryInfo,
      date: new Date().toISOString(),
      status: "sipariş alındı",
    };

    const previousOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem(
      "orders",
      JSON.stringify([...previousOrders, orderData])
    );

    setIsLoading(false);
    handleNextStep();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CheckoutForm
            deliveryInfo={deliveryInfo}
            setDeliveryInfo={setDeliveryInfo}
            onNext={handleNextStep}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
            onNext={handleCompleteCheckout}
            onPrev={handlePrevStep}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Siparişiniz Alındı!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sipariş numaranız: <span className="font-medium">{orderId}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Siparişiniz için teşekkür ederiz. Siparişiniz en kısa sürede
              hazırlanacak. Siparişinizin durumu hakkında e-posta adresinize
              bildirim gönderilecektir.
            </p>
            <Link
              href="/profile/orders"
              className="bg-[#5D5FEF] hover:bg-[#4A4CC8] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Siparişlerim
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Ödeme</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {CHECKOUT_STEPS.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-[#5D5FEF] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm capitalize ${
                  index <= currentStep
                    ? "text-gray-900 dark:text-white font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          {CHECKOUT_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 ${
                index < CHECKOUT_STEPS.length - 1
                  ? index < currentStep
                    ? "bg-[#5D5FEF]"
                    : "bg-gray-200 dark:bg-gray-700"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{renderCurrentStep()}</div>

        <div className="lg:col-span-1">
          <OrderSummary cartItems={cart.items} />

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Shield className="h-5 w-5 mr-2 text-[#5D5FEF]" />
              <span className="text-sm">Güvenli ödeme işlemi</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300 mt-3">
              <CreditCard className="h-5 w-5 mr-2 text-[#5D5FEF]" />
              <span className="text-sm">Kartınızdan ödeme anında çekilir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
