import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "RinovARCH — İlham Veren Yaşam",
  description: "Mimari, iç mekan ve yaşamın kusursuzca buluştuğu modern alanlar."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${outfit.variable} ${inter.variable}`}>
      <body>
        <PageLoader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
