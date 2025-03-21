"use client";

import { ThemeProvider } from "@/lib/ThemeProvider";
import { Providers } from "@/lib/providers";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Providers>{children}</Providers>
    </ThemeProvider>
  );
}
