import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
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

    if (!deliveryInfo.city) {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-[#5D5FEF]" />
          Teslimat Bilgileri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ad</Label>
              <Input
                id="firstName"
                name="firstName"
                value={deliveryInfo.firstName}
                onChange={handleChange}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Soyad</Label>
              <Input
                id="lastName"
                name="lastName"
                value={deliveryInfo.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={deliveryInfo.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea
              id="address"
              name="address"
              value={deliveryInfo.address}
              onChange={handleChange}
              rows={3}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2 w-full ">
              <Label htmlFor="city">İl</Label>
              <Select
                value={deliveryInfo.city}
                onValueChange={(value) => handleSelectChange("city", value)}
              >
                <SelectTrigger
                  id="city"
                  className={errors.city ? "border-red-500 w-full" : "w-full"}
                >
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">İlçe</Label>
              <Input
                id="district"
                name="district"
                value={deliveryInfo.district}
                onChange={handleChange}
                className={errors.district ? "border-red-500" : ""}
              />
              {errors.district && (
                <p className="text-red-500 text-sm">{errors.district}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">Posta Kodu</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={deliveryInfo.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? "border-red-500" : ""}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm">{errors.zipCode}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Devam Et</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
