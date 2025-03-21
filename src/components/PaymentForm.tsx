import { useState } from "react";
import { CreditCard, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  onPrev,
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-[#5D5FEF]" />
          Ödeme Bilgileri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Kart Numarası</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={handleChange}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardHolder">Kart Sahibi</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="Ad Soyad"
                value={paymentInfo.cardHolder}
                onChange={handleChange}
                className={errors.cardHolder ? "border-red-500" : ""}
              />
              {errors.cardHolder && (
                <p className="text-red-500 text-sm">{errors.cardHolder}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="AA/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handleChange}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handleChange}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    İşleniyor...
                  </>
                ) : (
                  "Ödemeyi Tamamla"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
