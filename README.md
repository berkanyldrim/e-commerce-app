# E-Ticaret Uygulaması

Modern alışveriş deneyimi sunan, Next.js, TypeScript, Redux Toolkit ve Shadcn UI ile geliştirilmiş e-ticaret web uygulaması.

## 🚀 Demo

**Canlı Demo:** [https://e-commerce-shadcn.netlify.app/](https://e-commerce-shadcn.netlify.app/)

## 📋 Proje Hakkında

Bu proje, modern e-ticaret deneyimi sunan bir web uygulamasıdır. Next.js, TypeScript, Redux Toolkit ve Shadcn UI kullanılarak geliştirilmiştir. Ürün listeleme, filtreleme, sepet yönetimi ve ödeme süreçleri gibi tam kapsamlı e-ticaret özellikleri içerir.

## ✨ Özellikler

- 📦 Ürün Listeleme ve Filtreleme
- ❤️ Favorilere Ekleme
- 🛒 Sepet İşlemleri
- 💳 Ödeme Sayfası ve Sipariş Takibi
- 🌙 Karanlık/Aydınlık Mod
- 📱 Tamamen Mobil Uyumlu Tasarım
- ⚡ Performans ve SEO Optimizasyonu
- 🖥️ Server-Side Rendering ve Lazy Loading
- 💀 Skeleton Loading ile Gelişmiş UX

## 🔧 Kullanılan Teknolojiler

### Frontend:

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenli geliştirme
- [Redux Toolkit](https://redux-toolkit.js.org/) - Durum yönetimi
- [Tailwind CSS](https://tailwindcss.com/) - Stil
- [Shadcn UI](https://ui.shadcn.com/) - UI bileşenleri
- [Lucide Icons](https://lucide.dev/) - İkon seti

### Depolama:

- Local Storage - Sepet ve favoriler için kalıcı depolama

### API:

- [Fake Store API](https://fakestoreapi.com/) - Demo ürün verileri

## ⚙️ Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Repoyu klonlayın
git clone https://github.com/berkanyldrim/e-commerce-app.git

# Proje dizinine girin
cd e-commerce-shadcn

# Bağımlılıkları yükleyin
npm install


# Geliştirme sunucusunu başlatın
npm run dev

```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## 📁 Proje Yapısı

```
src/
├── app/                 # App router sayfaları
├── components/          # Yeniden kullanılabilir bileşenler
│   └── ui/              # Shadcn UI bileşenleri
├── lib/                 # Yardımcı işlevler ve durum yönetimi
│   ├── api.ts           # API istekleri
│   ├── slices/          # Redux parçaları
│   └── store.ts         # Redux store
└── public/              # Statik dosyalar
```

## 🎯 Proje Görevleri

### 🔹 Aşama 1 – Temel Özellikler (Tamamlandı)

- ✅ FakeStoreAPI'den ürün listesini çekme ve görüntüleme
- ✅ Ürün kartlarında görsel, başlık, fiyat ve "Sepete Ekle" butonu
- ✅ Üst menüde sepet simgesi ve ürün sayısı gösterimi
- ✅ Responsive tasarım (mobil/tablet uyumu)
- ✅ State yönetimi için Redux Toolkit kullanımı

### 🔸 Aşama 2 – Gelişmiş Özellikler (Tamamlandı)

- ✅ Kategoriye göre ürün filtreleme
- ✅ Açık/Koyu tema geçişi
- ✅ Lazy loading ve code splitting
- ✅ Shadcn UI kullanımı
- ✅ Sepet verilerini localStorage'da tutma
- ✅ Next.js ile SEO uyumlu sayfa yapısı
- ✅ Checkout sayfası ve sipariş tamamlama süreci

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için, lütfen önce neyi değiştirmek istediğinizi tartışmak için bir konu açın.

---

# E-Commerce Application

A modern shopping experience web application developed with Next.js, TypeScript, Redux Toolkit, and Shadcn UI.

## 🚀 Demo

**Live Demo:** [https://e-commerce-shadcn.netlify.app/](https://e-commerce-shadcn.netlify.app/)

## 📋 About The Project

This project is a web application that offers a modern e-commerce experience. It was developed using Next.js, TypeScript, Redux Toolkit, and Shadcn UI. It includes comprehensive e-commerce features such as product listing, filtering, cart management, and checkout processes.

## ✨ Features

- 📦 Product Listing and Filtering
- ❤️ Add to Favorites
- 🛒 Cart Operations
- 💳 Checkout Page and Order Tracking
- 🌙 Dark/Light Mode
- 📱 Fully Mobile Responsive Design
- ⚡ Performance and SEO Optimization
- 🖥️ Server-Side Rendering and Lazy Loading
- 💀 Skeleton Loading for Enhanced UX

## 🔧 Technologies Used

### Frontend:

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - Icon set

### Storage:

- Local Storage - Persistent storage for cart and favorites

### API:

- [Fake Store API](https://fakestoreapi.com/) - Demo product data

## ⚙️ Installation

Follow these steps to run the project on your local machine:

```bash
# Clone the repository
git clone https://github.com/berkanyldrim/e-commerce-app.git

# Navigate to the project directory
cd e-commerce-shadcn

# Install dependencies
npm install


# Start the development server
npm run dev

```

You can view the application in your browser at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/                 # App router pages
├── components/          # Reusable components
│   └── ui/              # Shadcn UI components
├── lib/                 # Helper functions and state management
│   ├── api.ts           # API requests
│   ├── slices/          # Redux slices
│   └── store.ts         # Redux store
└── public/              # Static files
```

## 🎯 Project Tasks

### 🔹 Phase 1 – Basic Features (Completed)

- ✅ Fetch and display product list from FakeStoreAPI
- ✅ Product cards with image, title, price, and "Add to Cart" button
- ✅ Cart icon in top menu showing number of products
- ✅ Responsive design (mobile/tablet compatibility)
- ✅ Redux Toolkit for state management

### 🔸 Phase 2 – Advanced Features (Completed)

- ✅ Product filtering by category
- ✅ Light/Dark theme toggle
- ✅ Lazy loading and code splitting
- ✅ Shadcn UI implementation
- ✅ Persist cart data in localStorage
- ✅ SEO-friendly page structure with Next.js
- ✅ Checkout page and order completion process

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
