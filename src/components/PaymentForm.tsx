import { useState } from "react";
import { CreditCard } from "lucide-react";

interface PaymentFormProps {
  paymentInfo: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  setPaymentInfo: React.Dispatch<
    React.SetStateAction<{
      cardNumber: string;
      cardHolder: string;
      expiryDate: string;
      cvv: string;
    }>
  >;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export default function PaymentForm({
  paymentInfo,
  setPaymentInfo,
  onNext,
  isLoading,
}: PaymentFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
        .trim()
        .slice(0, 5);
    }

    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setPaymentInfo((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = "Kart numarası zorunludur";
    } else if (paymentInfo.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Geçerli bir kart numarası giriniz";
    }

    if (!paymentInfo.cardHolder.trim()) {
      newErrors.cardHolder = "Kart sahibi adı zorunludur";
    }

    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = "Son kullanma tarihi zorunludur";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = "Geçerli bir tarih giriniz (AA/YY)";
    }

    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = "CVV zorunludur";
    } else if (paymentInfo.cvv.length !== 3) {
      newErrors.cvv = "Geçerli bir CVV giriniz";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <CreditCard className="h-5 w-5 mr-2 text-[#5D5FEF]" />
        Ödeme Bilgileri
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Kart Numarası
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            className={`w-full border ${
              errors.cardNumber
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="cardHolder"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Kart Sahibi
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={paymentInfo.cardHolder}
            onChange={handleChange}
            className={`w-full border ${
              errors.cardHolder
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
          />
          {errors.cardHolder && (
            <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Son Kullanma Tarihi
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="AA/YY"
            value={paymentInfo.expiryDate}
            onChange={handleChange}
            className={`w-full border ${
              errors.expiryDate
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="123"
            value={paymentInfo.cvv}
            onChange={handleChange}
            className={`w-full border ${
              errors.cvv
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#5D5FEF] hover:bg-[#4A4CC8] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {isLoading ? "Ödeme İşlemi" : "Ödeme Yap"}
          </button>
        </div>
      </form>
    </div>
  );
}
