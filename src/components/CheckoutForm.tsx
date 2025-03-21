import { useState } from "react";
import { MapPin } from "lucide-react";

interface CheckoutFormProps {
  deliveryInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    zipCode: string;
  };
  setDeliveryInfo: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      district: string;
      zipCode: string;
    }>
  >;
  onNext: () => void;
}

export default function CheckoutForm({
  deliveryInfo,
  setDeliveryInfo,
  onNext,
}: CheckoutFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!deliveryInfo.firstName.trim()) {
      newErrors.firstName = "Ad alanı zorunludur";
    }

    if (!deliveryInfo.lastName.trim()) {
      newErrors.lastName = "Soyad alanı zorunludur";
    }

    if (!deliveryInfo.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur";
    } else if (!/^\S+@\S+\.\S+$/.test(deliveryInfo.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (!deliveryInfo.phone.trim()) {
      newErrors.phone = "Telefon alanı zorunludur";
    }

    if (!deliveryInfo.address.trim()) {
      newErrors.address = "Adres alanı zorunludur";
    }

    if (!deliveryInfo.city.trim()) {
      newErrors.city = "İl alanı zorunludur";
    }

    if (!deliveryInfo.district.trim()) {
      newErrors.district = "İlçe alanı zorunludur";
    }

    if (!deliveryInfo.zipCode.trim()) {
      newErrors.zipCode = "Posta kodu alanı zorunludur";
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

  const cities = [
    "İstanbul",
    "Ankara",
    "İzmir",
    "Bursa",
    "Antalya",
    "Adana",
    "Konya",
    "Gaziantep",
    "Şanlıurfa",
    "Kocaeli",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-[#5D5FEF]" />
        Teslimat Bilgileri
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Ad
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={deliveryInfo.firstName}
              onChange={handleChange}
              className={`w-full border ${
                errors.firstName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Soyad
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={deliveryInfo.lastName}
              onChange={handleChange}
              className={`w-full border ${
                errors.lastName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={deliveryInfo.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleChange}
              className={`w-full border ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Adres
          </label>
          <textarea
            id="address"
            name="address"
            value={deliveryInfo.address}
            onChange={handleChange}
            rows={3}
            className={`w-full border ${
              errors.address
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              İl
            </label>
            <select
              id="city"
              name="city"
              value={deliveryInfo.city}
              onChange={handleChange}
              className={`w-full border ${
                errors.city
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
            >
              <option value="">Seçiniz</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              İlçe
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={deliveryInfo.district}
              onChange={handleChange}
              className={`w-full border ${
                errors.district
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
            />
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Posta Kodu
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={deliveryInfo.zipCode}
              onChange={handleChange}
              className={`w-full border ${
                errors.zipCode
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D5FEF] focus:outline-none`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#5D5FEF] hover:bg-[#4A4CC8] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Devam Et
          </button>
        </div>
      </form>
    </div>
  );
}
