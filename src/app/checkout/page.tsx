"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { CreditCard, Shield, Check, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/slices/cartSlice";

const CHECKOUT_STEPS = ["teslimat", "ödeme", "onay"];

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderItems, setOrderItems] = useState(cart.items);
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

  if (
    cart.items.length === 0 &&
    orderItems.length === 0 &&
    currentStep !== 2 &&
    typeof window !== "undefined"
  ) {
    router.push("/");
    return null;
  }

  const handleNextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCompleteCheckout = async () => {
    setIsLoading(true);

    try {
      setOrderItems([...cart.items]);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const randomOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      setOrderId(randomOrderId);

      const orderData = {
        id: randomOrderId,
        items: cart.items,
        totalPrice: cart.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        deliveryInfo,
        date: new Date().toISOString(),
        status: "sipariş alındı",
      };

      const previousOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([...previousOrders, orderData])
      );

      handleNextStep();
      dispatch(clearCart());
    } catch (error) {
      console.error("Ödeme işlemi sırasında hata oluştu:", error);
    } finally {
      setIsLoading(false);
    }
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
            <Button asChild>
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfaya Git
              </Link>
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
        {currentStep < 2 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              currentStep === 0 ? router.back() : handlePrevStep()
            }
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 0 ? "Sepete Dön" : "Önceki Adım"}
          </Button>
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Ödeme
        </h1>
      </div>

      <div className="mb-8">
        <div className="flex justify-between">
          {CHECKOUT_STEPS.map((step, index) => (
            <div
              key={step}
              className="relative flex-1 flex flex-col items-center"
            >
              {index < CHECKOUT_STEPS.length - 1 && (
                <div
                  className={`absolute top-4 w-full h-[2px] left-1/2 ${
                    index < currentStep
                      ? "bg-[#5D5FEF]"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              )}

              <div
                className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{renderCurrentStep()}</div>

        <div className="lg:col-span-1">
          <OrderSummary
            cartItems={currentStep === 2 ? orderItems : cart.items}
          />

          {currentStep < 2 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Shield className="h-5 w-5 mr-2 text-[#5D5FEF]" />
                <span className="text-sm">Güvenli ödeme işlemi</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300 mt-3">
                <CreditCard className="h-5 w-5 mr-2 text-[#5D5FEF]" />
                <span className="text-sm">
                  Kartınızdan ödeme anında çekilir
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
